# Device Setup

<!--
AI Context Block:
- Purpose: Guide restaurant staff and IT administrators through Android device setup for Muneris Mobile Ordering
- Key Topics: Android device requirements, QR code setup, app installation, email confirmation, payment app prerequisites
- User Intent: Setting up tablets or smartphones for restaurant ordering operations
- Target Users: IT staff, operations managers, restaurant staff responsible for device setup
- Prerequisites: Android device, admin portal access for QR code generation, confirmed property in admin portal
- Success Criteria: Device successfully configured and authenticated for restaurant use with working payment processing
- Troubleshooting Hints: Ensure payment provider app installed before setup, check network connectivity if QR code scan fails, verify property is confirmed in admin portal
- Common Questions: What Android versions are supported? How do I get the QR code? What if email confirmation doesn't arrive? Which payment apps do I need?
- Related Pages: Overview, Device Management, Admin Portal Configuration, Payment Processing
-->

## Device Requirements

### Android Device Specifications
- **Android version**: 8.0 (API level 26) or higher
- **RAM**: Minimum 3GB recommended for optimal performance
- **Storage**: At least 8GB available space for app and data
- **Network**: WiFi connectivity required for POS integration
- **Camera**: For QR code scanning during setup

### Supported Device Types
- **Android tablets** (recommended for table-side service)
- **Android smartphones** (suitable for counter service or small restaurants)

## Pre-Setup Requirements

### Admin Portal Configuration
Before device setup, ensure the following is completed in the admin portal:

- **Property created** and confirmed via email in admin portal
- **Payment provider configured** for the property
- **Oracle Simphony (STS) configured** for POS integration
- **QR code generated** and available in admin portal

### Payment Provider App Installation

**Install payment provider app BEFORE Muneris app setup:**

- **Viva**: Install Viva Terminal app from Google Play Store
- **Softpay**: Install SoftPay Terminal app from provider
- **Worldline**: Install appropriate Worldline terminal app
- **Adyen**: Install Adyen POS Mobile app
- **None**: No additional app required for cash-only operations

!!! warning "Payment App Required"
    The Muneris app validates payment provider app installation during startup. Install the correct payment app before proceeding with device setup.

## Installation Methods

### QR Code Installation (Recommended)
1. **Access admin portal** at admin.muneris.app
2. **Navigate to Properties** section
3. **Select confirmed property** to view QR code
4. **Scan QR code** with Android device camera
5. **Follow download prompts** to install Muneris Mobile Ordering app

### Manual Installation via MDM
For managed device deployments:
1. **Deploy APK** through Mobile Device Management (MDM) system
2. **Configure app settings** via MDM policy management
3. **Automatic configuration** applies restaurant settings during first launch

## Device Configuration

### QR Code Configuration (Standard Setup)
1. **Launch Muneris app** after installation
2. **Scan configuration QR code** displayed in admin portal
3. **App downloads** restaurant-specific configuration automatically
4. **Configuration includes**:
   - Property identification and settings
   - Payment provider configuration
   - Oracle Simphony connection details
   - Menu and pricing synchronization

### Automatic Configuration via MDM
For enterprise deployments:
1. **MDM policy application** configures app settings automatically
2. **No QR code scanning** required for managed devices
3. **Centralized configuration** ensures consistency across devices

## Email Confirmation Process

### Confirmation Steps
1. **App prompts for email confirmation** after configuration
2. **Check email** for confirmation message from Muneris system
3. **Click confirmation link** in email to activate device
4. **Return to app** to complete setup process

### Email Confirmation Details
- **Confirmation required** for each individual device
- **Email sent to** property contact email configured in admin portal
- **Activation link** validates device for restaurant use
- **Security measure** prevents unauthorized device usage

## App Startup Sequence

### Initial Validation
When app launches for the first time:

1. **Configuration validation**: Verifies downloaded settings are complete
2. **Payment app check**: Confirms required payment provider app is installed
3. **Network connectivity test**: Validates connection to Oracle Simphony
4. **Menu synchronization**: Downloads current menu items and pricing
5. **Device registration**: Registers device with restaurant property

### Startup Requirements
- **Active internet connection** for initial synchronization
- **Payment provider app running** in background
- **Email confirmation completed** for device activation
- **Oracle Simphony system online** for menu download

## Troubleshooting Setup Issues

### QR Code Scanning Problems
- **Check camera permissions** for Muneris app
- **Ensure adequate lighting** for QR code visibility
- **Verify QR code** is current and from correct property
- **Try manual configuration** if QR scanning fails repeatedly

### Payment App Integration Issues
- **Verify correct payment app** installed for configured provider
- **Check payment app permissions** and background execution
- **Restart both apps** if integration fails during startup
- **Contact payment provider** for app-specific setup issues

### Email Confirmation Delays
- **Check spam/junk folders** for confirmation email
- **Verify email address** configured correctly in admin portal
- **Request new confirmation** through app settings if needed
- **Contact support** if confirmation emails not received after 30 minutes

### Network Connectivity Problems
- **Test internet connection** on device browser
- **Check firewall settings** for Oracle Simphony access
- **Verify STS configuration** in admin portal
- **Test with mobile hotspot** to isolate network issues

## Multi-Device Setup Considerations

### Coordinated Deployment
- **Setup devices individually** with same property QR code
- **Each device requires** separate email confirmation
- **Test device coordination** before going live
- **Assign device roles** for optimal restaurant workflow

### Device Identification
- **Devices auto-identify** within restaurant property
- **Unique device IDs** generated during setup process
- **Device management** available through admin portal
- **Team coordination** handled automatically by app

Successful device setup enables restaurant staff to take orders and process payments seamlessly integrated with existing Oracle Simphony POS operations.