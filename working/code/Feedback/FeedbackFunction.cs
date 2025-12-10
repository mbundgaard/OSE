using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Octokit;

namespace Feedback;

public class FeedbackFunction
{
    private readonly ILogger<FeedbackFunction> _logger;

    private const string RepoOwner = "mbundgaard";
    private const string RepoName = "OSE";

    public FeedbackFunction(ILogger<FeedbackFunction> logger)
    {
        _logger = logger;
    }

    [Function("Feedback")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "feedback")] HttpRequest req)
    {
        _logger.LogInformation("Feedback received");

        try
        {
            // Parse form data
            var form = await req.ReadFormAsync();

            var url = form["url"].ToString();
            var name = form["name"].ToString();
            var subject = form["subject"].ToString();
            var comment = form["comment"].ToString();
            var files = form.Files;

            // Validate required fields
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(subject) || string.IsNullOrEmpty(comment))
            {
                return new BadRequestObjectResult(new { success = false, message = "Alle felter skal udfyldes" });
            }

            // Setup GitHub client
            var githubToken = Environment.GetEnvironmentVariable("GITHUB_TOKEN");
            if (string.IsNullOrEmpty(githubToken))
            {
                _logger.LogError("GITHUB_TOKEN not configured");
                return new StatusCodeResult(500);
            }

            var github = new GitHubClient(new Octokit.ProductHeaderValue("OSE-Feedback"))
            {
                Credentials = new Credentials(githubToken)
            };

            // Create folder with timestamp
            var timestamp = DateTime.UtcNow.ToString("yyyy-MM-dd-HHmmss");
            var folderPath = $"working/feedback/{timestamp}";

            // Map URL to file path and section
            var docFilePath = MapUrlToFilePath(url);
            var section = ExtractSection(url);

            // Create feedback.md with all details
            var commitMessage = $"{name}: {subject}";
            var feedbackMd = BuildFeedbackMd(url, docFilePath, section, name, subject, comment);
            await github.Repository.Content.CreateFile(
                RepoOwner, RepoName, $"{folderPath}/feedback.md",
                new CreateFileRequest(commitMessage, feedbackMd, "main")
            );
            _logger.LogInformation($"Created feedback.md in {folderPath}");

            // Commit uploaded files
            if (files.Count > 0)
            {
                foreach (var file in files)
                {
                    // Validate file size (10 MB max)
                    if (file.Length > 10 * 1024 * 1024)
                    {
                        return new BadRequestObjectResult(new { success = false, message = $"Fil for stor: {file.FileName}" });
                    }

                    // Read file content
                    using var memoryStream = new MemoryStream();
                    await file.CopyToAsync(memoryStream);
                    var fileContent = Convert.ToBase64String(memoryStream.ToArray());

                    // Commit file to folder (content already base64 encoded, don't encode again)
                    var safeFileName = SanitizeFileName(file.FileName);
                    await github.Repository.Content.CreateFile(
                        RepoOwner, RepoName, $"{folderPath}/{safeFileName}",
                        new CreateFileRequest(commitMessage, fileContent, "main", false)
                    );

                    _logger.LogInformation($"Committed file: {folderPath}/{safeFileName}");
                }
            }

            _logger.LogInformation($"Feedback committed to {folderPath}");

            // Send email notification
            await SendNotificationEmail(timestamp, subject, name, docFilePath, section);

            return new OkObjectResult(new
            {
                success = true,
                message = "Feedback modtaget",
                folder = folderPath
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing feedback");
            return new StatusCodeResult(500);
        }
    }

    private static string SanitizeFileName(string name)
    {
        var sanitized = Regex.Replace(name, @"[<>:""/\\|?*\s]", "-");
        sanitized = Regex.Replace(sanitized, @"-+", "-");
        sanitized = sanitized.Trim('-');
        if (sanitized.Length > 100) sanitized = sanitized[..100].TrimEnd('-');
        return sanitized.ToLowerInvariant();
    }

    private static string MapUrlToFilePath(string url)
    {
        if (string.IsNullOrEmpty(url)) return "docs/index.md";

        try
        {
            var uri = new Uri(url);
            var path = uri.AbsolutePath.Trim('/');

            if (string.IsNullOrEmpty(path))
                return "docs/index.md";

            path = path.TrimEnd('/');
            return $"docs/{path}/index.md";
        }
        catch
        {
            return "docs/index.md";
        }
    }

    private static string? ExtractSection(string url)
    {
        if (string.IsNullOrEmpty(url)) return null;

        try
        {
            var uri = new Uri(url);
            if (!string.IsNullOrEmpty(uri.Fragment))
            {
                return uri.Fragment.TrimStart('#');
            }
        }
        catch { }

        return null;
    }

    private static string BuildFeedbackMd(string url, string filePath, string? section,
        string name, string subject, string comment)
    {
        return $"""
            # {subject}

            | Felt | Værdi |
            |------|-------|
            | **Side** | [{filePath}]({url}) |
            | **Sektion** | {section ?? "Hele siden"} |
            | **Fra** | {name} |

            ## Beskrivelse

            {comment}
            """;
    }

    private async Task SendNotificationEmail(string feedbackId, string subject,
        string name, string filePath, string? section)
    {
        var apiKey = Environment.GetEnvironmentVariable("MAILGUN_API_KEY");
        var domain = Environment.GetEnvironmentVariable("MAILGUN_DOMAIN");
        var recipient = Environment.GetEnvironmentVariable("NOTIFICATION_EMAIL");
        var fromEmail = Environment.GetEnvironmentVariable("MAILGUN_FROM_EMAIL") ?? $"feedback@{domain}";

        if (string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(domain) || string.IsNullOrEmpty(recipient))
        {
            _logger.LogWarning("Email notification skipped - Mailgun settings not configured");
            return;
        }

        var emailText = $"""
            Ny feedback modtaget

            Feedback ID: {feedbackId}
            Fra: {name}
            Side: {filePath}
            Sektion: {section ?? "Hele siden"}
            Emne: {subject}

            Behandl med Claude Code:
              Behandl feedback {feedbackId}
            """;

        using var client = new HttpClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
            "Basic",
            Convert.ToBase64String(Encoding.ASCII.GetBytes($"api:{apiKey}"))
        );

        var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            { "from", $"OSE Vidensbank <{fromEmail}>" },
            { "to", recipient },
            { "subject", $"[Feedback] {subject}" },
            { "text", emailText }
        });

        var response = await client.PostAsync(
            $"https://api.eu.mailgun.net/v3/{domain}/messages",
            content
        );

        if (response.IsSuccessStatusCode)
        {
            _logger.LogInformation($"Notification email sent for feedback {feedbackId}");
        }
        else
        {
            var error = await response.Content.ReadAsStringAsync();
            _logger.LogWarning($"Failed to send notification email: {response.StatusCode} - {error}");
        }
    }
}
