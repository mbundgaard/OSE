# Azure Function Feedback Endpoint Specification

This document describes how to implement an Azure Function to receive feedback from the OSE Vidensbank website.

## Overview

The feedback widget sends form data via HTTP POST to an Azure Function endpoint. The function should:

1. Receive the form data (including optional file attachment)
2. Send an email notification with the feedback
3. Optionally store the attachment in Azure Blob Storage
4. Return a success/error response

## Endpoint

```
POST https://<function-app-name>.azurewebsites.net/api/feedback
```

### CORS Configuration

The Azure Function must allow CORS from:
- `https://ose.muneris.dk` (production)
- `http://localhost:8000` (local development with mkdocs serve)

## Request Format

**Content-Type:** `multipart/form-data`

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | The page URL where feedback was submitted |
| `subject` | string | Yes | Subject/topic of the feedback |
| `comment` | string | Yes | The feedback message |
| `email` | string | Yes | Sender's email address |
| `file` | file | No | Optional attachment (max 10MB recommended) |

### Example Request (JavaScript)

```javascript
const formData = new FormData();
formData.append('url', 'https://ose.muneris.dk/konference/');
formData.append('subject', 'Fejl i dokumentation');
formData.append('comment', 'Der mangler information om...');
formData.append('email', 'bruger@example.dk');
formData.append('file', fileInput.files[0]); // Optional

const response = await fetch('https://your-function.azurewebsites.net/api/feedback', {
  method: 'POST',
  body: formData
});
```

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Feedback received"
}
```

**HTTP Status:** `200 OK`

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

**HTTP Status:** `400 Bad Request` or `500 Internal Server Error`

## Azure Function Implementation (C#)

### Function Code

```csharp
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;
using Azure.Storage.Blobs;

public static class FeedbackFunction
{
    [FunctionName("feedback")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        log.LogInformation("Feedback received");

        try
        {
            // Parse form data
            var form = await req.ReadFormAsync();

            var url = form["url"].ToString();
            var subject = form["subject"].ToString();
            var comment = form["comment"].ToString();
            var email = form["email"].ToString();

            // Validate required fields
            if (string.IsNullOrEmpty(subject) ||
                string.IsNullOrEmpty(comment) ||
                string.IsNullOrEmpty(email))
            {
                return new BadRequestObjectResult(new {
                    success = false,
                    message = "Missing required fields"
                });
            }

            // Handle file attachment (optional)
            string attachmentUrl = null;
            byte[] fileBytes = null;
            string fileName = null;
            string contentType = null;

            if (req.Form.Files.Count > 0)
            {
                var file = req.Form.Files["file"];
                if (file != null && file.Length > 0)
                {
                    fileName = file.FileName;
                    contentType = file.ContentType;

                    using (var ms = new MemoryStream())
                    {
                        await file.CopyToAsync(ms);
                        fileBytes = ms.ToArray();
                    }

                    // Optional: Upload to Blob Storage
                    // attachmentUrl = await UploadToBlob(fileBytes, fileName);
                }
            }

            // Send email
            await SendEmail(url, subject, comment, email, fileBytes, fileName, contentType);

            return new OkObjectResult(new {
                success = true,
                message = "Feedback received"
            });
        }
        catch (Exception ex)
        {
            log.LogError(ex, "Error processing feedback");
            return new StatusCodeResult(500);
        }
    }

    private static async Task SendEmail(
        string url,
        string subject,
        string comment,
        string senderEmail,
        byte[] fileBytes,
        string fileName,
        string contentType)
    {
        var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
        var recipientEmail = Environment.GetEnvironmentVariable("FEEDBACK_RECIPIENT_EMAIL");

        var client = new SendGridClient(apiKey);

        var from = new EmailAddress("noreply@ose.muneris.dk", "OSE Vidensbank");
        var to = new EmailAddress(recipientEmail);
        var emailSubject = $"[Vidensbank Feedback] {subject}";

        var htmlContent = $@"
            <h2>Ny feedback modtaget</h2>
            <p><strong>Fra:</strong> {senderEmail}</p>
            <p><strong>Emne:</strong> {subject}</p>
            <p><strong>Side:</strong> <a href='{url}'>{url}</a></p>
            <hr>
            <p><strong>Kommentar:</strong></p>
            <p>{comment.Replace("\n", "<br>")}</p>
        ";

        var plainTextContent = $@"
Ny feedback modtaget

Fra: {senderEmail}
Emne: {subject}
Side: {url}

Kommentar:
{comment}
        ";

        var msg = MailHelper.CreateSingleEmail(from, to, emailSubject, plainTextContent, htmlContent);

        // Add reply-to so you can reply directly to the sender
        msg.ReplyTo = new EmailAddress(senderEmail);

        // Add attachment if present
        if (fileBytes != null && fileBytes.Length > 0)
        {
            var base64Content = Convert.ToBase64String(fileBytes);
            msg.AddAttachment(fileName, base64Content, contentType);
        }

        await client.SendEmailAsync(msg);
    }

    // Optional: Upload file to Azure Blob Storage
    private static async Task<string> UploadToBlob(byte[] fileBytes, string fileName)
    {
        var connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGE_CONNECTION_STRING");
        var containerName = "feedback-attachments";

        var blobServiceClient = new BlobServiceClient(connectionString);
        var containerClient = blobServiceClient.GetBlobContainerClient(containerName);

        // Create unique filename
        var uniqueFileName = $"{DateTime.UtcNow:yyyy-MM-dd}/{Guid.NewGuid()}-{fileName}";
        var blobClient = containerClient.GetBlobClient(uniqueFileName);

        using (var stream = new MemoryStream(fileBytes))
        {
            await blobClient.UploadAsync(stream, overwrite: true);
        }

        return blobClient.Uri.ToString();
    }
}
```

### Required NuGet Packages

```xml
<PackageReference Include="Microsoft.NET.Sdk.Functions" Version="4.1.1" />
<PackageReference Include="SendGrid" Version="9.28.1" />
<PackageReference Include="Azure.Storage.Blobs" Version="12.18.0" />
```

### Application Settings

Configure these in Azure Portal or `local.settings.json`:

| Setting | Description |
|---------|-------------|
| `SENDGRID_API_KEY` | Your SendGrid API key |
| `FEEDBACK_RECIPIENT_EMAIL` | Email address to receive feedback |
| `AZURE_STORAGE_CONNECTION_STRING` | (Optional) For file storage |

### local.settings.json (for development)

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "SENDGRID_API_KEY": "your-sendgrid-api-key",
    "FEEDBACK_RECIPIENT_EMAIL": "feedback@example.dk"
  },
  "Host": {
    "CORS": "*"
  }
}
```

## Alternative: Using Azure Communication Services

If you prefer Azure Communication Services over SendGrid:

```csharp
using Azure.Communication.Email;

private static async Task SendEmailWithACS(string subject, string comment, string senderEmail)
{
    var connectionString = Environment.GetEnvironmentVariable("ACS_CONNECTION_STRING");
    var client = new EmailClient(connectionString);

    var emailMessage = new EmailMessage(
        senderAddress: "DoNotReply@your-domain.azurecomm.net",
        recipientAddress: "feedback@example.dk",
        content: new EmailContent($"[Vidensbank Feedback] {subject}")
        {
            PlainText = comment,
            Html = $"<p>{comment}</p>"
        });

    await client.SendAsync(Azure.WaitUntil.Completed, emailMessage);
}
```

## Testing

### Local Testing

1. Run the Azure Function locally:
   ```bash
   func start
   ```

2. Test with curl:
   ```bash
   curl -X POST http://localhost:7071/api/feedback \
     -F "url=https://ose.muneris.dk/test" \
     -F "subject=Test feedback" \
     -F "comment=Dette er en test" \
     -F "email=test@example.dk" \
     -F "file=@/path/to/testfile.pdf"
   ```

### Production Testing

Once deployed, update the endpoint in the feedback widget JavaScript and test the full flow.

## Security Considerations

1. **Rate Limiting**: Consider adding rate limiting to prevent abuse
2. **File Validation**: Validate file types and sizes before processing
3. **Input Sanitization**: Sanitize all input before including in emails
4. **CORS**: Only allow requests from your domain

## Deployment

1. Create Azure Function App in Azure Portal
2. Configure application settings (SendGrid key, recipient email)
3. Deploy function code
4. Update CORS settings to allow `https://ose.muneris.dk`
5. Update feedback widget endpoint URL

## Widget Integration

Once the Azure Function is deployed, update the endpoint in:

`overrides/js/feedback-widget.js`

```javascript
const ENDPOINT = 'https://your-function-app.azurewebsites.net/api/feedback';
```
