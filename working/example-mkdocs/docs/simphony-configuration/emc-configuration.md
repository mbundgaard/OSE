<!--
AI Context Block: This page provides comprehensive EMC (Enterprise Management Console) configuration procedures for Muneris Mobile Ordering integration with Oracle Simphony.

Purpose: Document step-by-step EMC configuration procedures for employee setup, workstation configuration, RVC enablement, menu structure, and tender media setup to support Muneris Mobile Ordering.

Key Topics:
- Employee configuration and property/RVC assignment
- Workstation STS Cloud enablement and RVC access
- Revenue Center STS enablement and tip configuration
- Menu structure configuration (Tag Groups and Tags)
- Tender media creation for payment integration
- Configuration validation procedures

User Intent: Simphony administrators need detailed EMC configuration steps to complete mobile ordering setup after STS configuration.

Target Users:
- Simphony administrators responsible for POS configuration
- IT staff implementing Oracle Simphony integration
- System implementers completing restaurant technology setup

Prerequisites:
- STS setup completed with API user configured
- EMC access permissions for configuration tasks
- Understanding of restaurant operational requirements

Success Criteria:
- Employees configured with property assignment and RVC operator records
- Workstations enabled for STS Cloud with appropriate RVC access
- All relevant RVCs enabled for STS Cloud with tip percentages configured
- Menu structure organized with Tag Groups and Tags for mobile navigation
- Tender media created and ready for Admin Portal mapping

Troubleshooting Hints:
- Employee cannot login: verify property assignment and operator records
- RVC not available in mobile app: check STS enablement on both workstation and RVC
- Menu not displaying correctly: verify Tag Group and Tag configuration with menu item assignments
- Payment types missing: confirm tender media creation and Admin Portal mapping

Common Questions:
- How do I assign employees to properties and RVCs?
- What is the maximum number of RVCs per workstation?
- How do tip percentages work with mobile ordering?
- What is the difference between Tag Groups and Tags in menu structure?
- How do tender media relate to payment processing?

Related Pages:
- [Prerequisites](prerequisites.md) - System requirements before EMC configuration
- [STS Setup](sts-setup.md) - Required before EMC configuration
- [Getting Started](../getting-started/index.md) - Overall implementation guidance
-->

# EMC Configuration

Complete Enterprise Management Console (EMC) configuration to enable Muneris Mobile Ordering functionality with proper employee access, menu structure, and payment integration.

## Employee Configuration

### Employee Setup Requirements
For employees to use Muneris mobile ordering app:

- **Property Assignment**: Employee must be assigned to property where mobile ordering will be used
- **Operator Records**: Employee must have operator record in each Revenue Center (RVC) they will use
- **Access Control**: Configuration enables employee authentication in Muneris app

### Configuration Steps
1. **Navigate to EMC Employee Configuration**
2. **Assign Employee to Property**
   - Select relevant property for mobile ordering deployment
   - Confirm employee assignment
3. **Create Operator Records**
   - Create operator record for each RVC the employee will access
   - Verify employee permissions allow POS operations in assigned RVCs
4. **Validate Configuration**
   - Confirm employee can access all required RVCs
   - Test employee login functionality

## Workstation Configuration

### STS Cloud Enablement Requirements
- **STS Cloud Activation**: Must be enabled on workstation configuration
- **Purpose**: Enables workstation participation in STS API communications
- **Integration**: Required for mobile ordering connectivity

### RVC Access Configuration
- **RVC Assignment**: Workstation must have access to relevant Revenue Centers
- **Maximum Limit**: Workstation can access maximum of 8 RVCs
- **Mobile Ordering Impact**: Only workstation-accessible RVCs available through mobile ordering

### Configuration Steps
1. **Navigate to EMC Workstation Configuration**
2. **Enable STS Cloud**
   - Activate STS Cloud functionality
   - Verify enablement successful
3. **Assign RVCs to Workstation**
   - Select appropriate RVCs for mobile ordering (maximum 8)
   - Prioritize RVCs based on mobile ordering requirements
4. **Validate Configuration**
   - Confirm workstation can access assigned RVCs
   - Verify STS Cloud activation

## Revenue Center (RVC) Configuration

### STS Cloud Enablement
- **Requirement**: STS Cloud must be enabled on all RVCs for mobile ordering use
- **Scope**: Each RVC used for mobile ordering requires individual STS enablement
- **Impact**: Only STS-enabled RVCs accessible via Muneris app

### Tip Percentage Configuration
- **Configuration Level**: Tip percentages configured per order type, per RVC
- **Mobile Integration**: Percentages appear as suggested tip options in mobile ordering app
- **Flexibility**: Different tip percentages for different order types within each RVC

### Configuration Steps
1. **Navigate to EMC Revenue Center Configuration**
2. **Enable STS Cloud on Each RVC**
   - Select RVC for mobile ordering
   - Enable STS Cloud functionality
   - Repeat for all RVCs requiring mobile ordering access
3. **Configure Tip Percentages**
   - Set tip percentages for relevant order types
   - Consider typical customer expectations for mobile orders
   - Configure different percentages per order type if needed
4. **Validate RVC Settings**
   - Confirm STS Cloud enabled on all target RVCs
   - Verify tip percentages configured appropriately

## Menu Structure Configuration

### Tag Groups (Main Categories)
- **Function**: Tag Groups become main categories for menu items in mobile ordering app
- **Organization**: Organize menu items into logical top-level groupings
- **Display**: Tag Groups appear as primary navigation in mobile app interface

### Tags (Sub-Categories)
- **Function**: Tags become sub-categories where actual menu items are displayed
- **Item Display**: Menu items organized under specific tags within tag groups
- **Single Tag Logic**: If tag group contains only one tag, that tag will not display separately - menu items appear directly under tag group

### Menu Hierarchy Best Practices
- **Logical Organization**: Structure tag groups and tags to match restaurant menu organization
- **Mobile Optimization**: Consider mobile interface limitations when organizing menu items
- **Customer Navigation**: Ensure menu structure provides intuitive navigation for mobile users

### Configuration Steps
1. **Navigate to EMC Tag Group Configuration**
2. **Create Tag Groups (Main Categories)**
   - Create logical main categories for menu organization
   - Examples: Appetizers, Main Courses, Desserts, Beverages
   - Consider customer browsing patterns
3. **Create Tags (Sub-Categories)**
   - Create sub-categories within each Tag Group
   - Examples: Hot Appetizers, Cold Appetizers under Appetizers Tag Group
   - Balance detail with simplicity for mobile interface
4. **Assign Menu Items to Tags**
   - Navigate to menu item configuration
   - Assign each menu item to appropriate tag
   - Verify logical organization for customer navigation
5. **Review Menu Hierarchy**
   - Test menu structure logic for mobile interface
   - Ensure intuitive customer navigation flow

## Tender Media Configuration

### Payment Type Setup
- **Function**: Tender Media defines payment type names in Simphony (Visa, Mastercard, Amex, etc.)
- **Integration Requirement**: Payment types must be created in Simphony and mapped in Muneris Admin Portal
- **Mobile Ordering Impact**: Enables proper payment processing and reporting integration

### Admin Portal Mapping Process
- **Two-Step Process**: Create tender media in Simphony, then configure mappings in Admin Portal
- **Payment Integration**: Ensures seamless integration between mobile payment processing and Simphony financial records
- **Missing Payment Types**: Result in payments posted to default tender

### Configuration Steps
1. **Navigate to EMC Tender Media Configuration**
2. **Create Tender Media Entries**
   - Create entries for all payment types used in mobile ordering
   - Common types: Visa, Mastercard, American Express, Discover
   - Include any restaurant-specific payment methods
3. **Configure Payment Type Properties**
   - Set appropriate properties for each tender media entry
   - Verify configuration aligns with payment processing requirements
4. **Record Tender Media Information**
   - Document tender media names and IDs for Admin Portal mapping
   - Prepare information for Muneris Admin Portal configuration

**Next Step**: Complete tender media mapping in Muneris Admin Portal using created tender media entries.

## Configuration Validation

### Pre-Implementation Checklist

#### Employee Configuration
- [ ] Employees assigned to property where mobile ordering will be used
- [ ] Operator records created for employees in all relevant RVCs
- [ ] Employee permissions verified for POS operations

#### Workstation Configuration  
- [ ] STS Cloud enabled on workstation configuration
- [ ] Appropriate RVCs assigned to workstation (maximum 8)
- [ ] Workstation can access all required RVCs for mobile ordering

#### RVC Configuration
- [ ] STS Cloud enabled on all RVCs for mobile ordering
- [ ] Tip percentages configured per order type for each RVC
- [ ] RVC settings align with mobile ordering operational requirements

#### Menu Structure
- [ ] Tag Groups created for logical menu organization
- [ ] Tags created within Tag Groups for sub-categories
- [ ] Menu items assigned to appropriate tags
- [ ] Menu hierarchy optimized for mobile interface navigation

#### Tender Media
- [ ] Tender Media created for all payment types used in mobile ordering
- [ ] Payment type properties configured appropriately
- [ ] Tender Media information documented for Admin Portal mapping

### Post-Configuration Testing
1. **Employee Login Test**
   - Test employee authentication with configured credentials
   - Verify employees can access assigned RVCs
2. **Menu Synchronization Verification**
   - Confirm menu items, categories, and pricing display correctly
   - Verify Tag Group and Tag structure appears properly in mobile app
3. **RVC Availability Check**
   - Confirm all configured RVCs available through mobile ordering
   - Verify tip percentages appear correctly in mobile payment flow

### Common Configuration Problems

#### Employee Access Issues
- **Employee Cannot Login**: Verify property assignment and operator records exist
- **RVC Access Denied**: Check operator record creation for specific RVCs

#### Menu Display Problems
- **Menu Not Displaying**: Check Tag Group and Tag configuration, verify menu item assignments
- **Categories Missing**: Verify Tag Group creation and menu item tag assignments

#### RVC Availability Issues
- **RVC Not Available**: Check STS enablement on both workstation and RVC
- **Limited RVC Access**: Verify workstation RVC assignments (maximum 8)

#### Payment Integration Issues
- **Payment Types Missing**: Confirm Tender Media creation and prepare for Admin Portal mapping
- **Default Tender Used**: Missing payment types result in default tender posting

## Next Steps

After completing EMC configuration:

1. **Muneris Admin Portal Configuration**
   - Complete property setup with EMC configuration details
   - Map tender media to payment providers
   - Configure final integration settings

2. **System Testing**
   - Perform end-to-end testing with configured settings
   - Validate mobile app functionality with EMC configuration
   - Test payment processing integration

3. **Staff Training**
   - Train employees on mobile ordering app usage
   - Review operational procedures with configured settings

EMC configuration completes the Oracle Simphony setup required for Muneris Mobile Ordering integration. Proper configuration ensures seamless operation between Simphony POS systems and mobile ordering functionality.