# Feedback System Specification

## Overview

Simpel feedback-workflow: brugere indsender feedback via vidensbanken, Azure Function committer til repo, du puller og behandler med Claude Code.

## Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Feedback       │     │  Azure          │     │  git pull       │     │  Claude Code    │
│  Widget         │────▶│  Function       │────▶│                 │────▶│                 │
│                 │     │                 │     │  Ny mappe i     │     │  "Behandl       │
│  - URL          │     │  - Commit       │     │  working/       │     │   feedback      │
│  - Navn         │     │    mappe med    │     │  feedback/      │     │   2025-12-10-   │
│  - Emne         │     │    feedback.md  │     │                 │     │   143022"       │
│  - Kommentar    │     │    + filer      │     │                 │     │                 │
│  - Filer        │     │                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Mappestruktur

```
working/
  feedback/
    2025-12-10-143022/
      feedback.md           ← url, navn, emne, kommentar
      screenshot.png
      dokument.pdf
    2025-12-11-091500/
      feedback.md
      proces-beskrivelse.docx
```

Mappe: `working/feedback/{YYYY-MM-DD-HHmmss}/`

Fordele ved `working/feedback/`:
- Holder rod-mappen ren
- `working/` er allerede ekskluderet fra MkDocs build og deploy workflow
- Feedback er "arbejdsmateriale" der behandles og slettes

---

## 1. Feedback Widget (Frontend)

### Placering
- Fixed position button i højre side (som nu)
- Slide-in panel ved klik

### Formular felter

| Felt | Type | Påkrævet | Beskrivelse |
|------|------|----------|-------------|
| URL | Hidden | Ja | Auto-captured fra `window.location.href` (inkl. hash) |
| Navn | Text | Ja | Brugerens navn |
| Emne | Text | Ja | Kort beskrivelse af feedback |
| Kommentar | Textarea | Ja | Detaljeret feedback |
| Filer | File input | Nej | Upload en eller flere filer |

### Fil upload
- Multiple files allowed
- Accepterede filtyper: `.png`, `.jpg`, `.jpeg`, `.gif`, `.pdf`, `.docx`, `.xlsx`, `.txt`, `.md`
- Max filstørrelse: 10 MB per fil
- Max antal filer: 5

### UI tekster (dansk)

```
Knap: "Feedback"
Overskrift: "Del din feedback"
Beskrivelse: "Hjælp os med at forbedre dokumentationen"

Labels:
- Navn: "Dit navn"
- Emne: "Emne"
- Kommentar: "Din feedback"
- Filer: "Vedhæft filer (valgfrit)"

Placeholders:
- Navn: "Indtast dit navn"
- Emne: "Hvad handler din feedback om?"
- Kommentar: "Beskriv din feedback, forslag eller rettelse..."

Knapper:
- Upload: "Vælg filer..." / "Tilføj filer"
- Submit: "Send feedback"
- Cancel: "Annuller"

Beskeder:
- Success: "Tak for din feedback! Vi kigger på det snarest."
- Error: "Der opstod en fejl. Prøv igen senere."
- Uploading: "Sender..."
- File too large: "Filen er for stor (max 10 MB)"
- Too many files: "Max 5 filer tilladt"
```

### Eksempel HTML struktur

```html
<form id="feedback-form" enctype="multipart/form-data">
  <input type="hidden" name="url" id="feedback-url">

  <div class="form-group">
    <label for="feedback-name">Dit navn *</label>
    <input type="text" id="feedback-name" name="name" required>
  </div>

  <div class="form-group">
    <label for="feedback-subject">Emne *</label>
    <input type="text" id="feedback-subject" name="subject" required>
  </div>

  <div class="form-group">
    <label for="feedback-comment">Din feedback *</label>
    <textarea id="feedback-comment" name="comment" required></textarea>
  </div>

  <div class="form-group">
    <label for="feedback-files">Vedhæft filer (valgfrit)</label>
    <input type="file" id="feedback-files" name="files" multiple
           accept=".png,.jpg,.jpeg,.gif,.pdf,.docx,.xlsx,.txt,.md">
    <div id="file-list"></div>
  </div>

  <button type="submit">Send feedback</button>
</form>
```

---

## 2. Azure Function (Backend)

Kode ligger i `working/code/Feedback/`

### Endpoint

```
POST https://<function-app>.azurewebsites.net/api/feedback
Content-Type: multipart/form-data
```

### Request format

```
------boundary
Content-Disposition: form-data; name="url"

https://ose.muneris.dk/konference/#booking-proces
------boundary
Content-Disposition: form-data; name="name"

Lone Palm
------boundary
Content-Disposition: form-data; name="subject"

Mangler info om gruppebookinger
------boundary
Content-Disposition: form-data; name="comment"

Der mangler information om hvordan gruppebookinger over 10 personer håndteres...
------boundary
Content-Disposition: form-data; name="files"; filename="eksempel.png"
Content-Type: image/png

<binary data>
------boundary--
```

### Response format

```json
{
  "success": true,
  "message": "Feedback modtaget",
  "issueNumber": 42,
  "issueUrl": "https://github.com/mbundgaard/OSE/issues/42"
}
```

### Azure Function kode (C#)

```csharp
using System;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Octokit;
using SendGrid;
using SendGrid.Helpers.Mail;

public static class FeedbackFunction
{
    private const string RepoOwner = "mbundgaard";
    private const string RepoName = "OSE";

    [FunctionName("Feedback")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "feedback")] HttpRequest req,
        ILogger log)
    {
        log.LogInformation("Feedback received");

        try
        {
            // Parse form data
            var form = await req.ReadFormAsync();

            var url = form["url"].ToString();
            var name = form["name"].ToString();
            var subject = form["subject"].ToString();
            var comment = form["comment"].ToString();
            var files = req.Form.Files;

            // Validate required fields
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(subject) || string.IsNullOrEmpty(comment))
            {
                return new BadRequestObjectResult(new { success = false, message = "Alle påkrævede felter skal udfyldes" });
            }

            // Setup GitHub client
            var github = new GitHubClient(new ProductHeaderValue("OSE-Feedback"));
            github.Credentials = new Credentials(Environment.GetEnvironmentVariable("GITHUB_TOKEN"));

            // Create folder with timestamp
            var timestamp = DateTime.UtcNow.ToString("yyyy-MM-dd-HHmmss");
            var folderPath = $"working/feedback/{timestamp}";

            // Map URL to file path and section
            var docFilePath = MapUrlToFilePath(url);
            var section = ExtractSection(url);

            // Create feedback.md with all details
            var feedbackMd = BuildFeedbackMd(url, docFilePath, section, name, subject, comment);
            await github.Repository.Content.CreateFile(
                RepoOwner, RepoName, $"{folderPath}/feedback.md",
                new CreateFileRequest($"Feedback: {subject}", feedbackMd, "main")
            );

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

                    // Commit file to folder
                    var safeFileName = SanitizeFileName(file.FileName);
                    await github.Repository.Content.CreateFile(
                        RepoOwner, RepoName, $"{folderPath}/{safeFileName}",
                        new CreateFileRequest($"Feedback fil: {file.FileName}", fileContent, "main", true)
                    );

                    log.LogInformation($"Committed file: {folderPath}/{safeFileName}");
                }
            }

            log.LogInformation($"Feedback committed to {folderPath}");

            // Send email notification
            await SendNotificationEmail(timestamp, subject, name, docFilePath, section);

            return new OkObjectResult(new {
                success = true,
                message = "Feedback modtaget",
                folder = folderPath
            });
        }
        catch (Exception ex)
        {
            log.LogError(ex, "Error processing feedback");
            return new StatusCodeResult(500);
        }
    }

    private static string SanitizeFileName(string name)
    {
        // Remove invalid characters, limit length
        var sanitized = Regex.Replace(name, @"[<>:""/\\|?*\s]", "-");
        sanitized = Regex.Replace(sanitized, @"-+", "-"); // Remove double dashes
        sanitized = sanitized.Trim('-');
        if (sanitized.Length > 100) sanitized = sanitized.Substring(0, 100).Trim('-');
        return sanitized.ToLowerInvariant();
    }

    private static string MapUrlToFilePath(string url)
    {
        // https://ose.muneris.dk/konference/#section -> docs/konference/index.md
        var uri = new Uri(url);
        var path = uri.AbsolutePath.Trim('/');

        if (string.IsNullOrEmpty(path) || path == "/")
            return "docs/index.md";

        path = path.TrimEnd('/');
        return $"docs/{path}/index.md";
    }

    private static string ExtractSection(string url)
    {
        var uri = new Uri(url);
        if (!string.IsNullOrEmpty(uri.Fragment))
        {
            return uri.Fragment.TrimStart('#');
        }
        return null;
    }

    private static string BuildFeedbackMd(string url, string filePath, string section,
        string name, string subject, string comment)
    {
        return $@"# {subject}

| Felt | Værdi |
|------|-------|
| **Side** | [{filePath}]({url}) |
| **Sektion** | {section ?? "Hele siden"} |
| **Fra** | {name} |

## Beskrivelse

{comment}
";
    }

    private async Task SendNotificationEmail(string feedbackId, string subject,
        string name, string filePath, string section)
    {
        var apiKey = Environment.GetEnvironmentVariable("MAILGUN_API_KEY");
        var domain = Environment.GetEnvironmentVariable("MAILGUN_DOMAIN");
        var recipient = Environment.GetEnvironmentVariable("NOTIFICATION_EMAIL");

        using var client = new HttpClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
            "Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes($"api:{apiKey}"))
        );

        var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            { "from", $"OSE Vidensbank <feedback@{domain}>" },
            { "to", recipient },
            { "subject", $"[Feedback] {subject}" },
            { "text", $"Feedback ID: {feedbackId}\nFra: {name}\nSide: {filePath}\n\nBehandl: Behandl feedback {feedbackId}" }
        });

        await client.PostAsync($"https://api.eu.mailgun.net/v3/{domain}/messages", content);
    }
}
```

### NuGet packages

```xml
<PackageReference Include="Octokit" Version="13.0.1" />
```

### Application Settings

| Setting | Beskrivelse |
|---------|-------------|
| `GITHUB_TOKEN` | GitHub Personal Access Token med `repo` scope |
| `MAILGUN_API_KEY` | Mailgun API nøgle |
| `MAILGUN_DOMAIN` | Mailgun domain (fx `mg.muneris.dk`) |
| `MAILGUN_FROM_EMAIL` | Afsender email (valgfrit) |
| `NOTIFICATION_EMAIL` | Din email (modtager notifikationer) |

### CORS

Tillad requests fra:
- `https://ose.muneris.dk`
- `http://localhost:8000` (development)

---

## 3. Behandling med Claude Code

### 1. Pull seneste ændringer

```bash
cd ~/source/repos/OSE
git pull
```

### 2. Se ny feedback

```bash
ls working/feedback/
```

### 3. Bed Claude behandle feedback

```
Behandl feedback 2025-12-10-143022
```

Claude læser automatisk `working/feedback/2025-12-10-143022/feedback.md` og eventuelle vedhæftede filer.

### 4. Review og commit

- Gennemgå ændringerne
- Commit og push
- Slet feedback-mappen (valgfrit)

---

## 4. Eksempel: Komplet flow

### 1. Bruger udfylder feedback

```
URL: https://ose.muneris.dk/konference/#booking-proces
Navn: Lone Palm
Emne: Mangler info om gruppebookinger
Kommentar: Der mangler information om hvordan gruppebookinger over 10 personer håndteres.
Filer: gruppebooking-process.pdf
```

### 2. Azure Function committer til repo

Opretter mappe `working/feedback/2025-12-10-143022/` med:

**feedback.md:**
```markdown
# Mangler info om gruppebookinger

| Felt | Værdi |
|------|-------|
| **Side** | [docs/konference/index.md](https://ose.muneris.dk/konference/#booking-proces) |
| **Sektion** | booking-proces |
| **Fra** | Lone Palm |

## Beskrivelse

Der mangler information om hvordan gruppebookinger over 10 personer håndteres.
```

**gruppebooking-process.pdf** (vedhæftet fil)

### 3. Du får email

```
Emne: [Feedback] Mangler info om gruppebookinger

Ny feedback modtaget

Feedback ID: 2025-12-10-143022
Fra: Lone Palm
Side: docs/konference/index.md
Sektion: booking-proces
Emne: Mangler info om gruppebookinger

Behandl med Claude Code:
  Behandl feedback 2025-12-10-143022
```

### 4. Pull og behandl

```bash
git pull
claude
```

```
Behandl feedback 2025-12-10-143022
```

### 5. Claude laver ændringer

Claude læser:
- `working/feedback/2025-12-10-143022/feedback.md`
- `working/feedback/2025-12-10-143022/gruppebooking-process.pdf`
- `docs/konference/index.md`

Claude foreslår og laver ændringer:

```diff
 ## Booking-proces

 1. Kunde henvender sig via telefon, email eller hjemmeside
 2. Projektleder opretter booking i Picasso
 3. Sender kontrakt til kunden

+### Gruppebookinger (10+ personer)
+
+Ved gruppebookinger over 10 personer:
+1. Kontakt salgsafdelingen direkte
+2. Der udarbejdes særskilt tilbud
+3. Depositum kræves ved bekræftelse
```

### 6. Review og commit

```bash
git add docs/konference/index.md
git commit -m "Tilføjet info om gruppebookinger"
git push
```

---

## 5. Sikkerhed

### Rate limiting
- Max 10 requests per IP per time
- Implementeres i Azure Function

### Input validation
- Sanitize alle input felter (særligt mappenavne)
- Validate filtyper og størrelse
- Escape special characters i GitHub issue body

### Fil sikkerhed
- Kun tilladte filtyper (whitelist)
- Max filstørrelse (10 MB)
- Sanitize filnavne

### GitHub token
- Brug fine-grained PAT med minimum permissions:
  - `repo` scope (for at oprette issues og committe filer)
- Gem token sikkert i Azure Function App Settings

---

## 6. Implementation checklist

### Frontend (feedback-widget.js)
- [ ] Ændre email felt til navn felt
- [ ] Tilføj fil upload felt (multiple)
- [ ] Tilføj fil liste visning med fjern-knap
- [ ] Opdater validering (navn required, fil størrelse/antal)
- [ ] Opdater endpoint URL til Azure Function
- [ ] Opdater success/error beskeder

### Azure Function
- [ ] Opret Azure Function App
- [ ] Deploy feedback endpoint
- [ ] Konfigurer GitHub PAT med repo scope
- [ ] Konfigurer Mailgun til email notifikation
- [ ] Tilføj CORS settings i Azure
- [ ] Test endpoint

### GitHub repo
- [ ] Opret mappe `working/feedback/` (tom `.gitkeep` fil)

### Test
- [ ] Test feedback uden filer
- [ ] Test feedback med flere filer
- [ ] Test fil størrelse validering
- [ ] Test email notifikation
- [ ] Test Claude Code workflow manuelt

---

## 7. Fremtidige forbedringer

- **Feedback kategorier**: Dropdown med typer (fejl, forslag, spørgsmål, nyt indhold)
- **Slack/Teams notifikation**: Alternativ til email
- **Dashboard**: Simpel oversigt over ubehandlet feedback
- **Automatisk cleanup**: Slet gamle feedback-mapper efter X dage
