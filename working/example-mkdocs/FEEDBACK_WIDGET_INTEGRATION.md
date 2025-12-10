# Feedback Widget Integration Guide

This document explains how to integrate and use the sliding feedback widget in your MkDocs Material site.

## Overview

The feedback widget provides a user-friendly way for visitors to submit feedback about your documentation. It features:

- Blue feedback button fixed on the right edge of the screen
- Smooth slide-in panel from the right when clicked
- Form with URL (auto-captured), comment (required), and email (optional) fields
- Submits feedback as JSON POST to your configured endpoint
- Works with Material theme's light/dark modes
- Mobile responsive design

## Installation

The feedback widget has been integrated into your MkDocs site through the Material theme's custom overrides feature.

### Files Created

1. **`overrides/css/feedback-widget.css`** - Styles for the feedback widget
2. **`overrides/js/feedback-widget.js`** - JavaScript functionality
3. **`overrides/main.html`** - Template override to include the widget on all pages

### Configuration

The widget is already configured and will automatically appear on all pages. No additional setup is required in `mkdocs.yml` since the Material theme's `custom_dir` setting is already pointing to the `overrides` directory.

## Customization

### Endpoint Configuration

To change the submission endpoint, edit the `ENDPOINT` constant in `overrides/js/feedback-widget.js`:

```javascript
const ENDPOINT = 'https://your-endpoint-url.com';
```

### Styling

The widget uses CSS custom properties for easy theming. You can override these in your own CSS:

```css
.feedback-widget {
  --feedback-primary: #2196F3;     /* Primary button color */
  --feedback-hover: #1976D2;       /* Button hover color */
  --feedback-text: #ffffff;        /* Button text color */
  --feedback-overlay: rgba(0, 0, 0, 0.5); /* Overlay background */
  /* ... and more */
}
```

### Form Fields

To add or modify form fields, edit the HTML in `overrides/js/feedback-widget.js` and update the data object in the `submitFeedback` function.

## Data Submitted

The widget sends the following data as JSON:

```json
{
  "url": "https://docs.example.com/current-page",
  "comment": "User's feedback text",
  "email": "user@example.com",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://previous-page.com"
}
```

## Features

### User Experience

- **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- **Validation**: Client-side form validation with helpful error messages
- **Rate Limiting**: Prevents rapid successive submissions
- **Auto-close**: Panel closes automatically after successful submission

### Developer Features

- **No Dependencies**: Pure vanilla JavaScript
- **Error Handling**: Graceful handling of network errors
- **Loading States**: Visual feedback during submission
- **Dark Mode Support**: Automatic adaptation to Material theme color scheme

## Troubleshooting

### Widget Not Appearing

1. Ensure `mkdocs.yml` has `custom_dir: overrides` under the theme section
2. Check browser console for JavaScript errors
3. Verify all three files exist in the correct locations

### Submission Failures

1. Check the endpoint URL is correct and accessible
2. Verify the endpoint accepts POST requests with JSON content
3. Check browser console for network errors

### Styling Issues

1. Clear browser cache after making CSS changes
2. Ensure no conflicting CSS rules from other customizations
3. Check CSS file is being loaded (inspect Network tab)

## Testing

To test the widget locally:

```bash
mkdocs serve
```

Then:
1. Click the "Feedback" button on the right edge
2. Fill in the comment field (required)
3. Optionally add an email
4. Submit and verify the success message

## Maintenance

The widget is designed to be low-maintenance. Consider:

- Monitoring the endpoint for submitted feedback
- Updating the endpoint URL if it changes
- Customizing success/error messages as needed
- Adding additional fields if required