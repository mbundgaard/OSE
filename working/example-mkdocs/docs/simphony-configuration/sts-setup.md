<!--
AI Context Block: This page provides practical STS (Simphony Transaction Service) configuration guidance for Oracle Simphony administrators implementing Muneris integration.

Purpose: Document STS deployment models, API user creation procedures, and token management for Muneris Mobile Ordering integration with Oracle Simphony.

Key Topics:
- STS deployment models (Cloud STS focus)
- API user creation and configuration in Oracle Reporting & Analytics
- Token lifecycle and management
- Connection validation procedures
- Common STS configuration issues and solutions

User Intent: Simphony administrators need step-by-step guidance to configure STS for mobile ordering API access.

Target Users:
- Simphony administrators responsible for POS configuration
- IT staff implementing Oracle Simphony integration
- System implementers setting up restaurant technology

Prerequisites:
- Oracle Simphony system with STS capability verified
- Appropriate STS licensing in place per RVC
- EMC access permissions for configuration

Success Criteria:
- STS Cloud deployment configured correctly
- API user created with proper property access
- STS connectivity validated through token creation
- Location reference and RVC availability confirmed

Troubleshooting Hints:
- Expired API passwords (60-day cycle) lead to failed STS configuration
- STS must be enabled on both property and RVC levels
- Verify Simphony has registered with STS hub in Oracle cloud
- Check network connectivity between Simphony and Oracle cloud services

Common Questions:
- What is the difference between Cloud STS and Local STS?
- How do I create an API user for STS access?
- Why is my API password expiring every 60 days?
- How does token refresh work in the Muneris system?

Related Pages:
- [Prerequisites](prerequisites.md) - Required before STS setup
- [EMC Configuration](emc-configuration.md) - Complete system configuration after STS setup
- [Getting Started](../getting-started/index.md) - Overall implementation guidance
-->

# STS Setup

Configure Simphony Transaction Service (STS) to enable API communication between Muneris Mobile Ordering and Oracle Simphony systems.

## STS Deployment Overview

### Cloud STS (Currently Supported)
- **Hosting**: Oracle datacenter
- **Connection Method**: SignalR reverse proxy connection
- **How it works**: Simphony connects to Oracle datacenter and opens SignalR connection. When Muneris app connects to STS Cloud, connection is forwarded to Simphony
- **Similar to**: TeamViewer and other remote access tools

### Local STS (Future Support)
- **Hosting**: Locally at restaurant property
- **Status**: Planned for future Muneris support

**Current Requirement**: Cloud STS deployment is required for Muneris Mobile Ordering integration.

## API User Configuration

### API User Setup in Oracle Reporting & Analytics

Create API user for STS access with these requirements:

- **Client ID**: Required for STS API access
- **Username and Password**: Required for initial token creation only
- **Property Access**: API user must be granted access to specific properties where mobile ordering will be used

### Configuration Steps

1. **Access Oracle Reporting & Analytics**
   - Log into Oracle Reporting & Analytics system
   - Navigate to API user management section

2. **Create API User**
   - Generate new API user with appropriate permissions
   - Record Client ID, Username, and Password for Muneris configuration
   - Grant access to properties requiring mobile ordering

3. **Property Access Assignment**
   - Assign API user access to all properties where mobile ordering will be deployed
   - Verify user has sufficient permissions for mobile ordering operations

### Oracle Documentation References
- **API User Creation**: [Oracle API User Configuration Guide](https://docs.oracle.com/en/industries/food-beverage/back-office/20.1/rause/t_API_user_add.htm)
- **STS API Documentation**: [Oracle STS API Reference](https://docs.oracle.com/en/industries/food-beverage/simphony/omsstsg2api/change_history.html)

## API Password Management

### Password Expiration
- **Expiration Cycle**: API password expires every 60 days
- **Impact**: Only affects initial token creation
- **Token Maintenance**: Once access tokens are issued with refresh tokens, system maintains connectivity automatically

### Password Renewal Process
1. **Monitor Expiration**: Track 60-day password expiration cycle
2. **Update Password**: Update API user password in Oracle system before expiration
3. **Notify Muneris**: Provide updated credentials to Muneris support for configuration update

## Token Management

### Token Lifecycle
- **Access Token Duration**: 10 days
- **Refresh Token**: Issued with access token for automatic renewal
- **Refresh Frequency**: Muneris backend refreshes tokens every 6 hours
- **Regional Distribution**: Token refresh occurs in one region and distributes to other regions

### Automatic Token Refresh
- **Backend Responsibility**: Token refresh handled by Muneris backend, not individual devices
- **Proactive Refresh**: 6-hour refresh cycle provides time to address issues before token expiration
- **Failure Notification**: Muneris receives notifications if token refresh fails
- **Regional Coordination**: Refresh process coordinated across multiple Muneris API regions

## Connection Validation

### Initial Setup Validation
During STS token creation, Muneris performs these validation checks:

1. **Token Connectivity**: Verify STS token functions correctly
2. **Location Reference**: Confirm location reference exists in Simphony
3. **Revenue Center Availability**: Ensure at least one RVC is available for mobile ordering

### Ongoing Connectivity Monitoring
- **Real-time Validation**: App performs connectivity checks during startup
- **Error Reporting**: Connection issues reported for troubleshooting
- **Automatic Recovery**: System handles temporary connectivity issues gracefully

## Common STS Configuration Issues

### Expired API Password
- **Issue**: 60-day password expiration affects initial token creation
- **Solution**: Update API user password in Oracle system before expiration
- **Prevention**: Set calendar reminder for password renewal

### STS Not Enabled on Property
- **Issue**: STS functionality not activated for the property
- **Solution**: Enable STS in EMC property configuration
- **Verification**: Check property settings in EMC

### STS Not Enabled on RVC
- **Issue**: Individual Revenue Centers not configured for STS access
- **Solution**: Enable STS on all relevant RVCs in EMC configuration
- **Impact**: Only STS-enabled RVCs available through mobile ordering

### Simphony Not Registered with STS Hub
- **Issue**: Simphony system has not registered with STS hub in Oracle cloud
- **Solution**: Verify STS Cloud enablement and network connectivity
- **Check**: Confirm Simphony can reach Oracle cloud services

## Troubleshooting Steps

### Verification Checklist
- [ ] STS licensing active and current for all relevant RVCs
- [ ] API user created with proper property access permissions
- [ ] API password current (within 60-day cycle)
- [ ] STS enabled at property level in EMC
- [ ] STS enabled on individual RVCs in EMC
- [ ] Network connectivity between Simphony and Oracle cloud services validated

### Connectivity Testing
1. **Test STS Token Creation**: Verify API credentials work for token generation
2. **Validate Location Reference**: Confirm location exists in Simphony system
3. **Check RVC Availability**: Ensure at least one RVC accessible through STS
4. **Network Verification**: Test connectivity to Oracle cloud services

### Support Resources
- **Oracle Documentation**: Reference provided Oracle documentation links for detailed procedures
- **Muneris Support**: Contact support@muneris.dk for mobile ordering-specific STS configuration assistance

## Next Steps

After completing STS setup:

1. **[EMC Configuration](emc-configuration.md)** - Configure employees, workstations, RVCs, and menu structure
2. **Muneris Admin Portal**: Complete STS configuration in Muneris Admin Portal with API credentials

STS configuration establishes the API foundation for mobile ordering integration. Proper setup ensures reliable communication between Muneris and Oracle Simphony systems.