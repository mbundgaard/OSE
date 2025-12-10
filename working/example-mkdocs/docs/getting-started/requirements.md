<!--
AI Context Block - System Requirements

Purpose: Essential technical prerequisites and compatibility checklist for successful Muneris Mobile Ordering implementation

Key Topics: Oracle Simphony compatibility, hardware specifications, network requirements, payment provider prerequisites, budget planning

User Intent: IT staff and implementation teams need comprehensive requirements checklist to ensure system compatibility and proper preparation before implementation

Target Users:
- IT administrators evaluating technical compatibility
- Implementation teams gathering requirements
- Restaurant managers planning budget and resources
- Oracle Simphony administrators checking system capabilities

Prerequisites: 
- Access to Oracle Simphony system information
- Understanding of current restaurant technology infrastructure
- Authority to evaluate and approve technical requirements

Success Criteria:
- User confirms Oracle Simphony compatibility
- User validates hardware requirements
- User ensures network requirements can be met
- User has realistic budget expectations
- User identifies any preparation gaps

Troubleshooting Hints:
- If Oracle Simphony version is unclear, contact Oracle support
- If STS licensing questions arise, verify with Oracle representative
- If network requirements seem complex, engage IT networking team
- If hardware specs are uncertain, consult with device procurement team

Common Questions:
- "Is my Oracle Simphony version compatible?"
- "What STS licensing do I need?"
- "What hardware specifications are required?"
- "What are the network requirements?"
- "How much should I budget for implementation?"

Related Pages:
- Getting Started Overview: index.md
- Quick Setup Guide: quick-setup.md
- Simphony Configuration Details: ../simphony-configuration/prerequisites.md
- Mobile App Technical Details: ../mobile-app/device-setup.md
- Admin Portal Access: ../admin-portal/overview.md
-->

# System Requirements

This checklist covers all technical prerequisites and compatibility requirements for implementing Muneris Mobile Ordering.

## Oracle Simphony Compatibility

### Required Simphony Version
- [ ] **Simphony 19.4** minimum (10.7 is recommended for best compatibility)
- [ ] **STS (Simphony Transaction Service)** installed and licensed

### STS Licensing Requirements
- [ ] **STS API license** for each RVC that uses mobile ordering
- [ ] **API access enabled** in Simphony configuration

!!! info "Oracle Support"
    Contact your Oracle representative to verify STS licensing and API access.

### Simphony Configuration Check
- [ ] **Revenue Centers** configured for restaurant operations
- [ ] **Employee accounts** set up for order processing
- [ ] **Menu items** properly configured with pricing
- [ ] **Payment tenders** configured for integration

---

## Payment Provider Prerequisites

### Merchant Account Requirements
- [ ] **Active merchant account** with supported payment provider
- [ ] **API credentials** and access tokens
- [ ] **Demo/sandbox account** for testing
- [ ] **Production approval** for live processing

### Supported Payment Providers
- [ ] **Viva Wallet** (Greece, EU markets)
- [ ] **Softpay** (Nordic markets)
- [ ] **Worldline** (European markets)
- [ ] **Adyen** (Global markets)

### Payment Testing Requirements
- [ ] **Demo mode access** for initial testing
- [ ] **Test cards** for transaction validation (depending on payment provider)
- [ ] **Production credentials** ready for go-live
- [ ] **Settlement account** configured for fund transfers

---

## Software Prerequisites

### Admin Portal Access
- [ ] **Modern web browser** (Chrome, Firefox, Safari, Edge)
- [ ] **JavaScript enabled** for portal functionality
- [ ] **Company administrator email** for initial setup

### Mobile App Installation
- [ ] **Google Play Store** access for Android deployment
- [ ] **Device management system** for enterprise app distribution (optional)
- [ ] **App update management** process for ongoing maintenance

---

## Budget Planning Checklist

### Implementation Costs
- [ ] **Oracle STS licensing** fees (contact Oracle for pricing)
- [ ] **Payment provider setup** and transaction fees
- [ ] **Hardware procurement** (android devices and accessories)
- [ ] **Professional services** for implementation support

### Ongoing Operational Costs
- [ ] **Monthly STS licensing** per RVC
- [ ] **Payment processing fees** typical per transaction
- [ ] **Device maintenance and replacement**

### Hidden Cost Considerations
- [ ] **Staff training time** and potential productivity impact
- [ ] **Network infrastructure upgrades** if required
- [ ] **Additional Oracle configuration** or customization
- [ ] **Backup internet service** for redundancy

---

## Pre-Implementation Validation

### Oracle Simphony Readiness
- [ ] **STS version compatibility** confirmed with Oracle
- [ ] **API access credentials** obtained and tested
- [ ] **Menu configuration** reviewed and validated
- [ ] **Payment tender setup** confirmed in Simphony

### Infrastructure Readiness
- [ ] **Network performance** tested and validated
- [ ] **Hardware specifications** confirmed and ordered
- [ ] **Security requirements** reviewed and approved
- [ ] **IT support resources** identified and available

### Business Readiness
- [ ] **Implementation timeline** planned around operations
- [ ] **Staff training schedule** coordinated
- [ ] **Go-live date** selected with operational considerations
- [ ] **Support contacts** identified for first-week assistance

---

## Compatibility Quick Check

Use this rapid assessment to identify potential blockers:

| Requirement | Status | Action if Missing |
|-------------|---------|-------------------|
| Oracle Simphony 2.9+ | ✅ ❌ | Contact Oracle for upgrade |
| STS License | ✅ ❌ | Purchase STS API license |
| Broadband Internet | ✅ ❌ | Upgrade internet service |
| Android Devices | ✅ ❌ | Procure compatible devices |
| Merchant Account | ✅ ❌ | Contact payment provider |
| IT Support | ✅ ❌ | Engage IT resources |

---

## Next Steps

### If All Requirements Met ✅
Proceed to [Quick Setup Guide](quick-setup.md) to begin implementation planning.

### Need Help?
- **Oracle questions** - Contact your Oracle representative
- **Payment provider setup** - Reach out to merchant services
- **Technical questions** - Review [Troubleshooting Guide](../reference/troubleshooting.md)
- **Implementation planning** - Contact Muneris implementation team

---

*Complete this requirements checklist before proceeding with implementation to ensure smooth deployment and avoid delays.*