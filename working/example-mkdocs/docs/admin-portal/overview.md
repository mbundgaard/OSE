# Admin Portal Overview

<!-- 
AI Context:
- Purpose: Comprehensive overview of the Muneris Admin Portal web application for restaurant configuration and management
- Key Topics: Admin portal capabilities, authentication system, property management, Oracle Simphony integration, payment provider setup, company administration
- User Intent: Restaurant administrators want to understand admin portal capabilities, IT staff planning implementation, managers evaluating configuration options
- Target Users: Restaurant administrators, IT staff, company managers, multi-location operators, implementation teams
- Prerequisites: Basic understanding of restaurant operations, familiarity with web applications, knowledge of Oracle Simphony helpful
- Success Criteria: Clear understanding of admin portal capabilities, navigation confidence, implementation readiness, configuration workflow understanding
- Troubleshooting Hints: Check authentication email delivery, verify company code accuracy, validate STS licensing, confirm payment provider credentials
- Common Questions: "How do I access the admin portal?", "How do I set up properties?", "How does authentication work?", "How do I configure payments?"
- Related Pages: ../getting-started/quick-setup.md, ../simphony-configuration/prerequisites.md, ../mobile-app/overview.md
-->

The Muneris Admin Portal is a comprehensive web-based interface for restaurant companies to manage their mobile ordering configurations, properties, and integrations with Oracle Simphony POS systems.

## What is the Admin Portal?

The Admin Portal is a Blazor WebAssembly application hosted at **admin.muneris.app** that provides restaurant administrators with complete control over their mobile ordering implementation.

### Core Capabilities
- **🏢 Company Management** - Configure company information and manage multiple admin users
- **🏪 Property Management** - Create and manage restaurant locations with individual configurations
- **🔧 Oracle Simphony Integration** - Set up STS (Simphony Transaction Service) connections per property
- **💳 Payment Provider Setup** - Configure payment processors (Viva, Softpay, Worldline, Adyen)
- **📱 Device Management** - Generate QR codes for mobile app deployment
- **👥 User Administration** - Manage admin users and access control

## Key Features

### Passwordless Authentication
The admin portal uses a modern, secure authentication system:
- **Email-based login** with 3-letter company codes
- **14-day JWT tokens** with automatic renewal
- **Bookmark-friendly URLs** for quick access
- **Company-scoped security** ensuring data isolation

### Multi-Location Support
Designed for restaurant chains and multi-location operators:
- **Separate properties** for each restaurant location
- **Location-specific configuration** for STS and payment providers
- **Centralized management** from single admin interface
- **Status tracking** across all properties

### Professional Interface
Built for business users with enterprise-grade design:
- **Left sidebar navigation** with dark theme
- **Responsive design** optimized for desktop and tablet
- **Clean, modern interface** appropriate for business use
- **Context-aware workflows** reducing configuration complexity

## System Architecture

### Technology Stack
- **Platform**: Blazor WebAssembly (.NET 8.0)
- **Hosting**: Azure App Service
- **API Integration**: Direct calls to api.muneris.app
- **Authentication**: JWT-based with 14-day expiration

### Security Features
- **Company data isolation** with multi-tenant architecture
- **No persistent storage** of authentication tokens
- **Rate limiting** (3 attempts per minute per region)
- **Automatic secret rotation** every 14 days

## Main Sections

### Dashboard
Landing page providing:
- Company overview and status
- Quick access to common tasks
- Property status summary
- Recent activity and notifications

### Properties
Complete property lifecycle management:
- **Create properties** for restaurant locations
- **Configure basic information** (name, contact, country)
- **Email confirmation workflow** for property activation
- **Status tracking** (pending/confirmed/configured)
- **QR code generation** for confirmed properties

### STS Configuration
Oracle Simphony integration setup:
- **Property selection** dropdown for configuration context
- **Connection settings** and validation
- **Token management** and connectivity testing
- **Real-time validation** of STS connectivity

### Payment Configuration
Payment provider integration:
- **Provider selection** (Viva, Softpay, Worldline, Adyen, None)
- **Demo/production mode** configuration
- **Provider-specific settings** with validation
- **Real-time connectivity testing**

### Company Settings
Business information management:
- **Company details** (name, description, VAT number)
- **Contact information** and invoice settings
- **Activation status** and support contact
- **Company-wide configuration options**

### User Management
Admin user administration:
- **Add/remove admin users** within company
- **Email management** and access credentials
- **Equal permissions** for all admin users
- **User activity tracking**

## Getting Started

### Initial Setup Process
1. **Access Portal**: Navigate to admin.muneris.app
2. **Company Creation**: Complete company registration form
3. **Email Authentication**: Request and use login link
4. **Property Creation**: Set up first restaurant location
5. **STS Configuration**: Configure Oracle Simphony integration
6. **Payment Setup**: Configure payment provider
7. **Email Confirmation**: Activate property via email confirmation
8. **QR Code Deployment**: Generate and deploy device setup codes

### Daily Operations
- **Bookmark access** using JWT token URLs for quick login
- **Property monitoring** and status tracking
- **Configuration updates** as business needs change
- **New location setup** for business expansion
- **User management** as team composition changes

## Business Benefits

### Operational Efficiency
- **Centralized management** of all restaurant locations
- **Streamlined configuration** with validation and testing
- **Professional interface** reducing training time
- **Context-aware workflows** preventing configuration errors

### Cost Optimization
- **Reduced IT overhead** with web-based administration
- **Flexible payment providers** eliminating vendor lock-in
- **Efficient deployment** through QR code device setup
- **Scalable architecture** supporting growth without complexity

### Enterprise Features
- **Multi-user administration** for team collaboration
- **Company-scoped security** ensuring data protection
- **Professional design** appropriate for business environments
- **Reliable hosting** on Azure with 99.99% uptime

## Implementation Workflow

### Phase 1: Company Setup
- Create company account and initial admin user
- Configure company information and business details
- Set up authentication and bookmark access

### Phase 2: Property Configuration
- Create properties for each restaurant location
- Configure basic property information
- Complete email confirmation workflow

### Phase 3: Integration Setup
- Configure Oracle Simphony STS integration per property
- Set up payment provider connections with validation
- Test all integrations for proper connectivity

### Phase 4: Deployment
- Generate QR codes for device setup
- Deploy mobile apps using QR codes
- Validate complete order-to-payment workflow

## Support and Training

### Getting Help
- **Documentation**: Comprehensive guides for all portal functions
- **Email Support**: Direct support for configuration assistance
- **Validation Tools**: Built-in testing for all integrations
- **Professional Services**: Implementation assistance available

### Best Practices
- **Regular monitoring** of property status and confirmations
- **Test configurations** in demo mode before production
- **Maintain accurate contact information** for notifications
- **Use multiple admin users** for team redundancy

## Frequently Asked Questions

??? question "How do I access the admin portal?"
    Navigate to admin.muneris.app and use your email address with your 3-letter company code. The system will send you a secure login link that provides 14-day access.

??? question "Can I manage multiple restaurant locations?"
    Yes! Create separate properties for each location. Each property can have its own STS and payment configuration while being managed from the same admin interface.

??? question "How does the authentication system work?"
    The portal uses passwordless authentication with JWT tokens. Login links are valid for 14 days and can be bookmarked for quick access. No passwords required.

??? question "What Oracle Simphony integration is required?"
    You need STS (Simphony Transaction Service) licensing for each revenue center. The admin portal provides tools to configure and validate your STS connection.

??? question "Which payment providers are supported?"
    The portal supports Viva, Softpay, Worldline, and Adyen. Each can be configured in demo or production mode with provider-specific settings.

??? question "How do I set up devices for my restaurant?"
    After configuring and confirming a property, generate QR codes in the admin portal. Staff scan these codes to set up tablets and mobile devices.

## Next Steps

Ready to get started with the Admin Portal?

1. **[Quick Setup Guide](../getting-started/quick-setup.md)** - Complete implementation process
2. **[System Requirements](../getting-started/requirements.md)** - Technical prerequisites
3. **[Simphony Configuration](../simphony-configuration/prerequisites.md)** - Oracle integration setup
4. **[Mobile App Overview](../mobile-app/overview.md)** - Staff operational procedures

---

*The Admin Portal provides complete control over your Muneris Mobile Ordering implementation with professional tools designed for restaurant operations.*