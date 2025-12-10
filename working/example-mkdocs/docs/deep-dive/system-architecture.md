# System Architecture

<!--
AI Context: This page provides detailed analysis of Muneris Mobile Ordering's system architecture, focusing on how the four main components are implemented and how they coordinate across the distributed system. It targets enterprise architects who need to understand component implementation details and integration patterns. All content is based strictly on documented component architectures and integration workflows.

Purpose: Enable technical evaluation of system implementation and integration complexity for enterprise deployments.

Common User Questions:
- How are the four main system components (Backend API, Admin Portal, Mobile App, Documentation Site) implemented?
- What are the specific technical architectures of each component?
- How do the components integrate and communicate with each other?
- What are the documented integration patterns with external systems?
- How does the multi-region deployment work across all components?

Prerequisites: Understanding of distributed systems, Azure cloud services, and API design
Success Criteria: Reader understands complete system implementation based on documented architecture
-->

Muneris Mobile Ordering implements a four-component distributed architecture where Backend API (Azure Functions), Admin Portal (Blazor WebAssembly), Mobile App (.NET MAUI), and Documentation Site (MkDocs) coordinate to deliver comprehensive mobile ordering functionality. Each component is designed with specific implementation patterns that enable independent scaling, regional deployment, and clear integration boundaries.


## Backend API

### Serverless Architecture Implementation

**Technology Foundation**:

- **Platform**: Azure Functions with .NET 8.0 runtime
- **Deployment Model**: Serverless compute with automatic scaling
- **Organization**: Single project containing multiple functions organized by feature
- **Regional Distribution**: Identical function deployments across France, Germany, and Ireland

**Function Organization Pattern**:

**HTTP-Triggered Functions (CRUD Operations)**:

- **Property Management**: CreateProperty, UpdateProperty, GetProperty, ListProperties
- **Company Management**: CreateCompany, UpdateCompany, GetCompany, ActivateCompany  
- **Device Management**: RegisterDevice, UpdateDeviceStatus, GetDeviceInfo
- **Receipt Management**: StoreReceipt, GetReceipt for digital display

**Timer-Triggered Functions**:

- **STS Token Management**: RefreshStsTokens every 12 hours with master region control
- **Data Cleanup**: CleanupReceipts deletes receipt data older than 48 hours
- **System Maintenance**: Automated maintenance tasks and health monitoring

### Regional Architecture Strategy

**European Multi-Region Design**:
The platform deploys across three European regions (France, Germany, Ireland) from initial implementation rather than starting with a single region and expanding later.

**Architectural Benefits**:

- **Data Sovereignty Compliance**: All customer data remains within EU boundaries for GDPR compliance
- **Regional Independence**: Each region operates completely independently with isolated Table Storage
- **Automatic Resilience**: If one region fails, the other two continue serving traffic without interruption
- **Performance Distribution**: Geographic distribution reduces latency for European customers
- **Regulatory Alignment**: Single regulatory framework across all deployment regions

**Regional Isolation Architecture**:

- **Complete Independence**: Each region contains full Azure Functions backend and isolated Table Storage
- **No Cross-Region Dependencies**: Regions operate without requiring communication with other regions
- **Independent Failure Domains**: Regional outages affect only that region's traffic
- **Traffic Manager Coordination**: DNS-based routing automatically directs traffic to healthy regions

### Deployment Architecture Strategy

**Deployment Slot Strategy**:
Every regional deployment uses Azure App Service deployment slots with staging/production swap methodology.

**Strategic Deployment Advantages**:

1. **Zero-Downtime Updates**: Production updates occur while system remains fully operational
   - **Shared Table Storage**: Both staging and production slots access same regional Table Storage
   - **Seamless Data Continuity**: No data migration or synchronization required during deployment
   - **Continuous Service**: Restaurant operations continue uninterrupted during updates

2. **Instant Error Recovery**: Critical error recovery measured in seconds rather than minutes
   - **Immediate Rollback**: Single slot swap operation reverses problematic deployment
   - **No Data Loss**: Table Storage remains unchanged during rollback
   - **Minimal Service Impact**: Error recovery faster than most monitoring systems can detect issues

**Deployment Process Benefits**:

- **Risk Mitigation**: All deployments tested in production environment with production data before traffic exposure
- **Operational Confidence**: Ability to quickly reverse changes reduces deployment risk
- **Business Continuity**: Restaurant operations never interrupted by technology updates
- **Scalable Updates**: Same deployment strategy works across all three regional deployments

### Data Storage Implementation

**Azure Table Storage Architecture**:

**Table Structure Organization**:

- **Companies Table**: Company information with 3-letter codes and approval status
- **Users Table**: Admin users linked to companies with email confirmation workflow
- **Properties Table**: Restaurant locations with STS and payment configurations
- **Devices Table**: Tablet registrations with health monitoring data
- **Receipts Table**: Transaction receipts with 48-hour automatic deletion
- **Settings Table**: Global configuration including master region designation
- **StsTokens Table**: Oracle Simphony authentication tokens with refresh management

**Data Replication Pattern**:

- **Write Operations**: Data written to receiving region, then replicated to other regions with replication flag
- **Replication Flag**: Prevents infinite forwarding loops during cross-region synchronization
- **Read Consistency**: Reads always served from local region data for performance
- **Eventual Consistency**: Small delays possible between regions during data synchronization

### Master Region Coordination

**Master Region Responsibilities**:

- **STS Token Refresh**: Initiate token refresh for all properties across all regions
- **Token Distribution**: Send new tokens to other regions with replication flag
- **System Coordination**: Coordinate time-sensitive operations across the platform
- **Alert Generation**: Monitor system health and generate operational alerts

**Master Region Identification**:

- **Configuration**: Settings table with IsMaster=true designation
- **Static Assignment**: Master region does not rotate automatically
- **Manual Failover**: Master reassignment requires manual intervention during regional failures
- **Service Continuity**: Non-master regions continue serving read operations during master region issues





















## Admin Portal

### Client-Side Architecture Implementation

**Technology Foundation**:

- **Platform**: Blazor WebAssembly (.NET 8.0) with full client-side execution
- **Hosting**: Azure App Service at admin.muneris.app domain
- **Architecture**: Single Page Application (SPA) with no server-side rendering
- **API Integration**: Direct calls to api.muneris.app with regional routing

**Component Organization Strategy**:

**Authentication Implementation**:

- **Unified Authentication Page**: Combined login/signup interface with mode switching
- **JWT Token Management**: 14-day tokens with URL parameter validation
- **Bookmark-Friendly URLs**: Users can bookmark authenticated URLs for quick access
- **Automatic Token Renewal**: Expired tokens trigger new login link email delivery

**Property Management Implementation**:

- **Property CRUD Operations**: Create, read, update, delete functionality for restaurant properties
- **Email Confirmation Workflow**: Property activation requires email confirmation before QR code generation
- **Status Tracking**: Visual indicators for property confirmation and configuration completion
- **QR Code Generation**: Property-specific QR codes generated after confirmation for device setup

**Configuration Management Architecture**:

**STS Configuration Implementation**:

- **Property Context Selection**: Dropdown selection to choose which property to configure
- **Connection Validation**: Real-time STS connectivity testing through API calls
- **Parameter Management**: STS endpoints, credentials, and connection parameter storage
- **Token Status Monitoring**: Display STS token health and refresh status

**Payment Configuration Implementation**:

- **Multi-Provider Support**: Configuration interfaces for Viva, Softpay, Worldline, Adyen providers
- **Provider-Specific Settings**: Dynamic configuration forms based on selected payment provider
- **Demo/Production Toggle**: Environment switching between sandbox and production credentials
- **Connectivity Validation**: Real-time payment provider connection testing

### Component Interaction Patterns

**API Communication Architecture**:
- **API-First Design**: Admin portal consumes same API endpoints used by mobile applications
- **Client-Side Architecture**: Full client-side execution eliminates server-side session management
- **JWT Token Integration**: Seamless authentication across admin portal and API backend
- **Property Context Management**: Context switching between properties for configuration management
- **Real-Time Validation**: Configuration changes validated immediately through API calls

**User Experience Implementation**:
- **Progressive Enhancement**: Portal works fully without JavaScript, enhanced with Blazor functionality
- **Responsive Design**: Desktop-first design that adapts to tablet usage
- **Professional Styling**: Clean, modern interface following enterprise design standards
- **Error Handling**: Graceful API failure handling with user-friendly error messages

### Passwordless Login Process Walkthrough

The Muneris Admin Portal implements a sophisticated passwordless authentication system that combines security with user convenience. This walkthrough explains the complete login experience, including the bookmark-friendly URL system that enables seamless daily access.

#### Passwordless Login Experience

##### Initial Login Process

**Step 1: Portal Access**
- **User navigates to**: `admin.muneris.app`
- **Portal presents**: Clean login form with two required fields
  - Email address
  - Company identification (3-letter code)
- **User interface**: Professional, simple design with clear field labels

**Step 2: Login Request Submission**

- **User enters**: Email and company code
- **User clicks**: "Request Login Link" button
- **Form validation**: Client-side validation ensures both fields are completed
- **API call**: Portal submits credentials to `/auth/login` endpoint

**Step 3: Backend Validation**

The backend performs several security checks:

- **Company verification**: Confirms the 3-letter company code exists in the system
- **User validation**: Verifies the email address belongs to a registered user within that specific company
- **Rate limiting**: Checks for abuse (maximum 3 attempts per email per minute per region)

**Step 4: Response Handling**

**Success Response (HTTP 200)**:

- **User sees**: "A login link has been sent to your email address. Please check your inbox and click the link to access the admin portal."
- **User remains**: On the authentication page with success message
- **Backend action**: JWT token generated and email sent with authentication link

**Error Response (HTTP 400)**:

- **User sees**: "Invalid email or company"
- **No details exposed**: Security-conscious error messaging
- **User can**: Retry with correct credentials

**Rate Limiting Response (HTTP 429)**:

- **User sees**: "Too many requests. Please wait before trying again."
- **Protection**: Prevents automated attacks while allowing legitimate retries

##### Email Authentication Link

**JWT Token Generation**
When login is successful, the backend creates a JWT token:

```json
{
  "sub": "user_id",
  "email": "user@company.com", 
  "companyCode": "ABC",
  "companyName": "Company Name Ltd",
  "iat": 1643723400,
  "exp": 1644937400
}
```

**Authentication Email**

- **Subject**: "Muneris Admin Portal Access"
- **Content**: Professional email with authentication link
- **Link format**: `https://admin.muneris.app?token=[JWT_TOKEN]`
- **Security**: Token is URL-safe encoded and cryptographically signed
- **Expiration**: Link valid for 14 days from generation

##### Token Validation and Portal Access

**Step 5: Email Link Click**
- **User clicks**: Authentication link in email
- **Browser opens**: `admin.muneris.app?token=[JWT_TOKEN]`
- **Portal extracts**: Token from URL parameters
- **API validation**: Portal calls `/auth/validate` endpoint with token

**Step 6: Token Validation Process**

**Backend validation checks**:

1. **Token signature**: Verifies JWT signature using current or previous secret key
2. **Token expiration**: Confirms token hasn't expired (14-day window)
3. **User existence**: Validates user still exists in the specified company
4. **Company status**: Ensures company is still active

**Validation responses**:

- **HTTP 200**: Token valid, portal loads with company data
- **HTTP 202**: Token expired but user valid, new login link sent automatically
- **HTTP 400**: Invalid token or user no longer exists

**Step 7: Portal Loading**

**Successful authentication**:

- **Portal loads**: Full admin interface with company-specific data
- **Navigation available**: Dashboard, Properties, STS Configuration, Payment Configuration, Company Settings, Users
- **User context**: Clear indication of logged-in user and company
- **Bookmark opportunity**: User can now bookmark the current URL for future access

#### Bookmark-Friendly URL System

##### The Bookmark Advantage

**How Bookmarking Works**

- **Current URL**: `https://admin.muneris.app?token=[VALID_JWT_TOKEN]`
- **User action**: Browser bookmark creation (Ctrl+D or bookmark menu)
- **Bookmark contains**: Complete URL including the JWT token
- **Future access**: Clicking bookmark provides direct authenticated access

**Daily Access Workflow**

1. **User clicks**: Bookmarked URL
2. **Browser navigates**: To admin portal with token in URL
3. **Portal validates**: Token automatically on page load
4. **Immediate access**: No additional login steps required (if token valid)
5. **Session duration**: 14 days of seamless access

##### Token Lifecycle Management

**Active Token Period (14 days)**
- **Direct access**: Bookmark provides immediate portal access
- **No additional steps**: User bypasses login form entirely
- **Company data**: Portal loads with appropriate company information
- **Full functionality**: All admin features immediately available

**Token Expiration Handling**

*Automatic Renewal Process*:
1. **User clicks**: Bookmarked URL with expired token
2. **Portal detects**: Token expiration during validation
3. **Backend checks**: User still exists in company
4. **Automatic action**: New JWT token generated and emailed
5. **User notification**: "Your session has expired. A new login link has been sent to your email address. This window can be closed."
6. **Email delivery**: Fresh 14-day token sent to user's email
7. **New bookmark**: User can update bookmark with fresh token URL

*Bookmark Update Process*
- **User receives**: New authentication email
- **User clicks**: Fresh authentication link
- **Portal loads**: With new 14-day token
- **Bookmark update**: User can replace old bookmark with new URL
- **Continued access**: Another 14 days of direct access

##### Security Considerations

**Token Security Features**

- **URL-Safe Encoding**: Tokens safely transmitted in URLs
- **Cryptographic Signing**: Prevents token tampering or forgery
- **Company Scoping**: Tokens only provide access to specific company data
- **Time Limitation**: 14-day automatic expiration reduces exposure window
- **Secret Rotation**: Application secrets rotate every 14 days for enhanced security

**User Privacy Protection**

- **No Persistent Storage**: Tokens not stored in browser localStorage or cookies
- **URL-Only Storage**: Token exists only in bookmarked URL
- **Session Isolation**: Each user session independent of others
- **No Cross-Company Access**: JWT tokens strictly enforce company boundaries

##### User Experience Benefits

**Convenience Features**
- **One-Time Setup**: Initial login creates bookmark for ongoing use
- **Instant Access**: Bookmark provides immediate portal access for 14 days
- **No Password Management**: Eliminates password creation, memory, and reset issues
- **Professional Workflow**: Suitable for business users who need regular access
- **Mobile Friendly**: Works equally well on desktop and mobile browsers

**Business Workflow Integration**
- **Daily Operations**: Bookmark enables quick access for routine administrative tasks
- **Multi-User Support**: Each admin user can maintain their own bookmark
- **Company Isolation**: Users only access their company's data and settings
- **Audit Trail**: All access tracked and logged for security monitoring

#### Troubleshooting Common Scenarios

##### Login Issues

**"Invalid email or company" error**:

- **Check**: Email address spelling and company code accuracy
- **Verify**: User has been added to the company by existing admin
- **Confirm**: Company has been approved by Muneris staff

**Email not received**:

- **Check**: Spam/junk folders for authentication email
- **Verify**: Email address is correct and accessible
- **Wait**: Allow a few minutes for email delivery
- **Retry**: Submit login request again if email doesn't arrive

##### Bookmark Issues

**Bookmark doesn't work**:

- **Check**: Token may have expired (14-day limit)
- **Action**: Click bookmark anyway - system will automatically send new login link
- **Wait**: Check email for new authentication link
- **Update**: Replace bookmark with new URL from fresh email

**Portal shows login form instead of dashboard**:

- **Cause**: Token in bookmarked URL has expired or become invalid
- **Solution**: Complete login process to get fresh token
- **Prevention**: Update bookmark with new token URL when received

##### Browser-Specific Considerations

**Bookmark sharing**:

- **Security**: Don't share bookmarked URLs - they contain your authentication token
- **Individual use**: Each user should maintain their own bookmark
- **Token scope**: Bookmarks only work for the specific user who received the token

**Browser security**:

- **HTTPS required**: Authentication only works over secure connections
- **URL integrity**: Ensure complete URL is bookmarked including token parameter
- **Clear cache**: If experiencing issues, clear browser cache and retry login process

#### Advanced Usage Scenarios

##### Multi-Device Access

- **Same user, multiple devices**: Can bookmark on laptop, phone, tablet
- **Token sharing**: Same JWT token works across user's devices
- **Security note**: Be cautious about token access on shared or public devices

##### Team Administration

- **Multiple admin users**: Each user maintains their own authentication flow
- **Independent bookmarks**: Each admin's bookmark contains their specific token
- **Company data access**: All admin users see same company data but use individual authentication

##### Integration with Business Processes

- **Scheduled access**: Bookmark enables quick access for routine property management
- **Configuration updates**: Fast access for updating payment or STS settings
- **Monitoring workflows**: Regular check-ins for property status and device health

This walkthrough demonstrates how the Muneris Admin Portal combines enterprise-grade security with exceptional user convenience through its passwordless authentication and bookmark-friendly design.























## Mobile App

### Cross-Platform Restaurant Application

**Technology Foundation**:

- **Platform**: .NET MAUI for cross-platform mobile development
- **Target Platform**: Android tablets for restaurant deployment
- **Architecture**: Native application with local encryption and API integration
- **Deployment**: Restaurant-owned devices that remain at location






















### Oracle Simphony Integration Implementation

**STS Communication Pattern**:

- **Direct API Integration**: Direct REST API calls to Simphony Transaction Service (without traversing the backend)
- **Real-Time Processing**: Orders posted to Simphony workflow in real time
- **Check Management**: Access to open checks and order status information in real time
- **Menu Synchronization**: Menu and pricing updates from Simphony

**Operational Workflow Integration**:

- **Check Access**: View and manage all open checks for the restaurant
- **Conflict Prevention**: Verify that check is not open on Workstation when open in app
- **Order Posting**: Submit orders directly to Simphony
- **Status Updates**: Real-time order status synchronization with kitchen workflow

### Order Processing Implementation

**App Startup Sequence**:

**Phase 1: Backend Authentication**

- **Device Authentication**: Validate device credentials with Muneris backend
- **Authorization Check**: Verify device authorization for associated property
- **Connection Establishment**: Secure communication channel with backend API

**Phase 2: Property Configuration Download**

- **Configuration Retrieval**: Download complete property settings from backend
- **STS Parameters**: Oracle Simphony connection details and authentication tokens
- **Payment Configuration**: Payment Service Provider settings and credentials
- **Operational Settings**: Restaurant-specific configuration and customization

**Phase 3: Payment App Validation**

- **Provider Connection**: Establish connection with configured payment provider application
- **Login Verification**: Validate payment app login status and store selection
- **Configuration Alignment**: Verify payment app settings match downloaded configuration
- **Readiness Confirmation**: Ensure payment processing capability before operational use

**Phase 4: Simphony Integration**

- **STS Connection Test**: Validate connection with Oracle Simphony Transaction Service
- **Menu Download**: Retrieve current menu items and pricing from Simphony
- **Employee Validation**: Verify waiter credentials against Simphony system
- **Operational Readiness**: Confirm all systems ready for order processing

### Order Management Workflow Implementation

**Order Composition Process**:

- **Menu Loading**: Load property menu from API with local caching for performance
- **Order Entry**: Digital order composition with real-time validation
- **Flexible Timing**: Support for staged ordering (drinks first, food later, etc.)
- **Local Storage**: Current round order details stored locally during composition

**Payment Processing Architecture**:

- **Payment Integration**: Seamless integration with payment provider applications
- **Tip Processing**: Five different tip modes based on property configuration
- **Transaction Validation**: Multiple validation layers before payment processing
- **Receipt Generation**: Automatic digital receipt creation and QR code generation














## Documentation Site

### Multi-Region Documentation Platform

**Technology Foundation**:

- **Platform**: MkDocs static site generator with Material theme
- **Hosting**: Azure Functions + Azure Blob Storage across three regions
- **Domain**: docs.muneris.app with Azure Traffic Manager routing
- **AI Integration**: Azure OpenAI with Retrieval-Augmented Generation (RAG)

### Azure Hosting Implementation

**Function-Based Architecture**:

- **Static Content Function**: Serves MkDocs-generated site files from blob storage
- **AI Assistant Functions**: Handle AI-powered question answering and assistance
- **Regional Deployment**: Identical functions deployed to all regions
- **Traffic Manager Integration**: DNS-based routing to healthy regional functions

**Content Management Architecture**:

**Development Workflow**:

- **Local Development**: MkDocs development server with live reload for content creation
- **Source Control**: Markdown files saved in Azure DevOps
- **Build Process**: `mkdocs build` generates complete static site in `site/` directory
- **Manual Deployment**: Content manually synchronized across regional blob containers

**Regional Content Distribution**:

- **Blob Storage Structure**: Complete MkDocs site structure replicated per region
- **Content Synchronization**: Copying of built site to all regional containers using Azure dev-ops
- **Consistency Management**: Verification of content consistency across regions
- **Health Monitoring**: Regional availability monitoring through Traffic Manager

















## System Integration Patterns

### Component Communication Architecture

**API-First Integration**:

- **Consistent Interface**: All components use same RESTful API endpoints
- **JWT Authentication**: Uniform authentication across admin portal and mobile app
- **Regional Routing**: Traffic Manager automatically routes to healthy API regions
- **Error Handling**: Standardized error responses and retry logic across components

**Data Flow Coordination**:

**Property Configuration Flow**:
```
1. Admin Portal: Configure property settings (STS, Payment providers)
2. Backend API: Validate and store configuration in regional Table Storage
3. Mobile App: Download configuration during startup sequence
4. External Integration: Validate connectivity with Oracle STS and payment providers
```

**Order Processing Flow**:
```
1. Mobile App: Compose order with local menu cache
2. Payment Provider: Process payment through provider application
3. Backend API: Coordinate order submission and receipt generation
4. Oracle STS: Submit order to Simphony for kitchen workflow
5. Documentation Site: Serve digital receipt via QR code link
```

### External System Integration

**Oracle Simphony Integration Pattern**:

- **Direct STS Communication**: Mobile app communicates directly with Simphony Transaction Service
- **Token Management**: Backend API manages STS authentication tokens across regions
- **Menu Synchronization**: Real-time menu and pricing updates from Simphony system
- **Order Posting**: Direct order submission to appropriate restaurant terminals

**Payment Provider Integration Pattern**:

- **Multi-Provider Support**: Abstraction layer supporting Viva, Softpay, Worldline, Adyen
- **Provider Applications**: Integration with provider-specific applications on restaurant tablets
- **Configuration Management**: Provider-specific settings managed through admin portal
- **Demo/Production Modes**: Environment switching for testing and live operations

**Email Integration Pattern**:

- **Property Confirmation**: Email-based property activation workflow
- **User Management**: Admin user invitation and management communications
- **Authentication**: JWT token delivery via email for passwordless authentication
- **System Notifications**: Operational alerts and configuration change notifications












## Performance and Scaling

### Auto-Scaling Architecture

**Serverless Scaling Foundation**:

- **Azure Functions Auto-Scaling**: Automatic instance scaling based on demand without code changes
- **Regional Independence**: Each region scales independently based on local traffic patterns
- **Cost Optimization**: Pay-per-use model aligned with restaurant traffic patterns
- **Performance Distribution**: Geographic load distribution across three European regions

**Data Management Scaling**:

- **Table Storage Partitioning**: Property-based partitioning optimized for access patterns
- **Regional Storage Independence**: Each region maintains complete operational data
- **Query Optimization**: Database schema designed for documented access patterns
- **Cache Management**: Local caching in mobile app reduces API load and improves performance

### Operational Resilience Implementation

**Regional Failover Capabilities**:

- **Traffic Manager Health Checks**: Continuous monitoring of regional API health
- **Automatic Traffic Redirection**: DNS-based failover to healthy regions within minutes
- **Service Continuity**: Restaurant operations continue during regional outages
- **Independent Recovery**: Failed regions rejoin automatically when health restored

**Component Resilience Patterns**:

- **API Retry Logic**: Automatic retry mechanisms for transient failures
- **Local Caching**: Mobile app continues operation during connectivity issues
- **Graceful Degradation**: Components provide reduced functionality during external service failures
- **Error Recovery**: Fast recovery procedures for all system components

## Related Guidance

For step-by-step setup procedures, see [Getting Started](../getting-started/index.md).
This section explains the component implementations behind those procedures.

For architectural reasoning, see [Design Philosophy](design-philosophy.md).
For security implementation details, see [Security Architecture](security-architecture.md).
For regional performance characteristics, see [Performance & Distributed Systems](performance-distributed.md).

*This system architecture analysis provides comprehensive insights into how the four main components are implemented and coordinate to deliver reliable restaurant mobile ordering functionality while maintaining clear boundaries and integration patterns.*