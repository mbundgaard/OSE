<!--
AI Context Block: This page provides Oracle Simphony system requirements and licensing prerequisites for Muneris Mobile Ordering integration.

Purpose: Document Oracle Simphony system requirements, licensing needs, and employee setup prerequisites for implementing Muneris Mobile Ordering.

Key Topics:
- Oracle Simphony system requirements and STS capability
- STS licensing requirements per Revenue Center (RVC)
- Employee setup and property assignment requirements
- EMC access permissions for configuration

User Intent: IT staff and Simphony administrators need to understand system requirements before beginning Muneris integration implementation.

Target Users:
- IT staff implementing Oracle Simphony integration
- Simphony administrators responsible for POS configuration
- System implementers setting up restaurant technology

Prerequisites: 
- Access to Oracle Simphony system
- Understanding of Oracle Simphony architecture and terminology

Success Criteria:
- Verify Oracle Simphony system meets STS requirements
- Confirm appropriate STS licensing for all relevant RVCs
- Ensure employee setup requirements are understood
- Validate EMC access permissions for configuration

Troubleshooting Hints:
- Contact Oracle for specific STS licensing information and requirements
- Verify STS capability is available on your Oracle Simphony version
- Ensure employees have operator records in all RVCs they will access

Common Questions:
- What Oracle Simphony version is required for mobile ordering?
- How many STS licenses do I need for my restaurant?
- Which employees need to be configured for mobile ordering access?
- What EMC permissions are required for configuration?

Related Pages:
- [STS Setup](sts-setup.md) - Next step after verifying prerequisites
- [EMC Configuration](emc-configuration.md) - Employee and system configuration details
- [Getting Started](../getting-started/index.md) - Overall implementation guidance
-->

# Prerequisites

Before implementing Muneris Mobile Ordering with Oracle Simphony, verify your system meets the following requirements and complete necessary setup tasks.

## Oracle Simphony System Requirements

### STS Capability Requirements
- **Oracle Simphony system with STS (Simphony Transaction Service) capability**
- **Oracle Reporting & Analytics suite** - STS is part of this package
- **Cloud STS deployment support** - Currently required for Muneris integration

### Version Compatibility
Contact Oracle to verify your Simphony version supports STS Cloud functionality required for mobile ordering integration.

## STS Licensing Requirements

### License Scope
- **Per Revenue Center (RVC)**: STS license required for each RVC that mobile ordering will access
- **Property Coverage**: All RVCs used for mobile ordering need appropriate STS licensing
- **Oracle Reporting & Analytics licensing**: Required as STS is part of this suite

### Licensing Planning
- **Identify Target RVCs**: Determine which Revenue Centers will support mobile ordering
- **License Allocation**: Ensure sufficient STS licenses for all identified RVCs
- **Future Expansion**: Consider licensing for future RVC additions

**Contact Oracle for specific STS licensing information and requirements.**

## Employee Setup Requirements

### Employee Configuration Needs
For employees (waiters) to use Muneris mobile ordering:

- **Property Assignment**: Employee must be assigned to the property where mobile ordering will be used
- **Operator Records**: Employee must have operator record in each Revenue Center (RVC) they will use with mobile ordering
- **Access Permissions**: Employee permissions must allow POS operations in assigned RVCs

### Employee Planning
- **Identify Mobile Ordering Staff**: Determine which employees will use mobile ordering functionality
- **RVC Access Requirements**: Map employee access needs to specific Revenue Centers
- **Permission Validation**: Verify employees have appropriate POS operation permissions

## EMC Access Requirements

### Required Permissions
Ensure appropriate user roles and permissions for configuring mobile ordering settings:

- **Employee Configuration**: Access to modify employee property assignments and operator records
- **Workstation Configuration**: Permissions to enable STS Cloud and configure RVC access
- **Revenue Center Configuration**: Access to enable STS Cloud on RVCs and configure tip percentages
- **Menu Configuration**: Permissions to modify Tag Groups, Tags, and menu item assignments
- **Tender Media Configuration**: Access to create and configure payment type settings

### Administrative Access
- **EMC Administrator Role**: Recommended for comprehensive mobile ordering configuration
- **Configuration Change Authority**: Ensure permissions allow necessary system modifications
- **Property-Level Access**: Verify access to all properties requiring mobile ordering setup

## Network and Connectivity

### Oracle Cloud Connectivity
- **Internet Connectivity**: Reliable internet connection for STS Cloud communication
- **Oracle Datacenter Access**: Network configuration must allow connection to Oracle cloud services
- **Firewall Configuration**: Ensure firewall settings permit STS Cloud communication

### SignalR Connection Requirements
- **Reverse Proxy Support**: STS Cloud uses SignalR connections (similar to TeamViewer architecture)
- **Connection Persistence**: Network must support persistent connections to Oracle datacenter

## Next Steps

After verifying these prerequisites:

1. **[STS Setup](sts-setup.md)** - Configure STS deployment and API user access
2. **[EMC Configuration](emc-configuration.md)** - Complete employee and system configuration

For questions about Oracle Simphony requirements or STS licensing, contact Oracle support or your Oracle representative.