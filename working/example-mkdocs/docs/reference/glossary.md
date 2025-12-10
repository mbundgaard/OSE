# Glossary

<!-- 
AI Context:
- Purpose: Comprehensive glossary defining all terminology used across the Muneris Mobile Ordering platform and documentation
- Key Topics: Business terms, Oracle Simphony concepts, payment processing terminology, technical architecture terms, operational definitions
- User Intent: Users want to understand specific terms and concepts referenced throughout the documentation and system
- Target Users: All users including restaurant staff, administrators, IT staff, managers, implementation teams, support personnel
- Prerequisites: None - this is a reference document for clarifying terminology from all other documentation
- Success Criteria: User understands terminology needed for their role, can reference definitions as needed during implementation or operations
- Troubleshooting Hints: Use search functionality to quickly find terms, check related pages for context, refer to key concepts section for AI interactions
- Common Questions: "What is STS?", "What's a property?", "What are rounds?", "Payment provider definitions?", "Technical term meanings?"
- Related Pages: All documentation pages reference these terms, particularly ../admin-portal/configuration.md, ../mobile-app/taking-orders.md
-->

This glossary defines terms used across the Muneris Mobile Ordering platform and documentation.

!!! tip "Quick Search"
    Use ++ctrl+f++ (or ++cmd+f++ on Mac) to quickly find specific terms in this glossary.

## Business Terms

### **Company**
Restaurant business or restaurant group that uses the Muneris Mobile Ordering solution. Each company has a unique 3-letter code and can operate multiple properties.

### **Property**
A restaurant location or establishment within a company. Each property has its own configuration for Oracle Simphony integration, payment processing, and device setup. Properties must be confirmed via email before becoming active.

### **Revenue Center**
Oracle Simphony term for different areas within a restaurant (dining room, bar, takeout). Each revenue center using the Muneris app requires its own STS license.

### **Guest**
Restaurant customer who dines at the establishment. Guests interact with the system only during tip selection and card payment processes.

### **Waiter**
Restaurant staff member who uses the Muneris mobile app to take orders and process payments. Uses existing Oracle Simphony employee credentials.

### **User**
Administrator who configures settings in the admin portal, typically restaurant IT staff or managers. Multiple users can be added per company with equal permissions.

## Oracle Simphony/POS Terms

### **STS (Simphony Transaction Service)**
Oracle cloud service that provides API access to local Simphony POS systems. Required for remote integration between Muneris and restaurant POS systems.

### **STS Token**
Authentication credential for communicating with Oracle Simphony Transaction Service. Automatically refreshed every 12 hours with a 10-day lifetime.

### **Check**
Restaurant order/bill containing all items ordered by guests at a table. Checks can be open (active) or closed (completed and paid).

### **Round**
Ordering context that distinguishes between current items being added and previous items already sent to kitchen/bar. Enables flexible service timing (drinks first, food later).

### **Employee ID**
Oracle Simphony user account identifier that waiters use to log into the Muneris app. Uses existing POS system credentials.

### **Check Locking**
System mechanism preventing multiple waiters from simultaneously editing the same check to avoid conflicts and order errors.

### **Transaction Posting**
Process of sending order data (items, payments, or both) to the Oracle Simphony POS system via STS API calls.

## Payment Processing Terms

### **Payment Service Provider (PSP)**
Company that provides payment processing software and hardware (Viva, Softpay, Worldline, Adyen).

### **Payment Terminal**
Physical card reader device where guests tap their payment cards to complete transactions.

### **Demo Mode**
Configuration setting that determines whether sandbox (test) or production (live) payment credentials are used.

### **Tip Modes**
Five different approaches for handling customer tips (four types and no tips):

1. **Amount Before Tap** - Enter tip amount before card interaction
2. **Total Before Tap** - Confirm total including tip before card interaction
3. **Amount After Tap** - Enter tip amount after card authorization
4. **Total After Tap** - Confirm total including tip after card authorization

### **Merchant ID**
Unique identifier assigned by payment providers to identify the restaurant's payment processing account.

### **Digital Receipt**
PDF version of receipts accessible to guests via QR code, automatically deleted after 48 hours for privacy compliance.

### **QR Code (Property)**
Setup code generated in admin portal and scanned during app installation to link device to specific property configuration.

### **QR Code (Receipt)**
Code displayed after payment completion that links to digital receipt for guest access.

## Technical Terms

### **Company Code**
Unique 3-letter uppercase identifier for each company, used during admin portal login and system identification.

### **Property Code**
Unique identifier for a property configuration used by devices to authenticate and access property-specific data.

### **JWT Token**
JSON Web Token used for admin portal authentication, valid for 14 days and enables bookmark-based portal access.

### **120-Second Confirmation**
Time window during device setup when email confirmation link must be clicked to complete device binding to property.

### **Keystore**
Secure storage mechanism on Android devices used to protect sensitive configuration data from unauthorized access.

### **Digital Signing**
Application integrity verification that prevents tampering and ensures secure access to encrypted configuration data.

### **Azure Functions**
Microsoft serverless platform hosting the Muneris API backend services across multiple global regions.

### **Traffic Manager**
Azure service routing API calls across multiple regions using DNS-based load balancing and health monitoring.

### **Table Storage**
Azure NoSQL database service storing all Muneris platform data including companies, properties, devices, and receipts.

## System Integration Terms

### **Admin Portal**
Web-based interface at admin.muneris.app for configuring company settings, properties, STS integration, and payment providers.

### **Mobile App**
Android application used by restaurant waiters on tablets for taking orders and processing payments.

### **API Integration**
Direct communication between Muneris components and external services (Oracle STS, payment providers, Azure services).

### **Regional Failover**
Automatic process redirecting traffic from failed Azure regions to healthy regions to maintain service availability.

### **Replication Flag**
Mechanism preventing infinite loops when synchronizing data across multiple Azure regions.

## Operational Terms

### **Device Setup**
One-time configuration process linking restaurant tablets to property configuration via QR code scanning and email confirmation.

### **Company Activation**
Manual approval process where Muneris staff reviews and activates newly created company accounts before platform access.

### **Rollout**
Deployment process of implementing Muneris solution across multiple restaurant locations within a company.

### **Multi-location**
Single company operating multiple restaurant properties, each with potentially different STS and payment configurations.

### **Check Print**
Physical or digital receipt generated by the POS system showing itemized order details, totals, and payment information.

### **Credit Card Receipt**
Payment confirmation document generated by payment provider showing transaction details and card information.

## Error and Status Terms

### **Open Check**
Active restaurant order that has items but has not yet been fully paid and closed in the POS system.

### **Closed Check**
Completed order that has been fully paid and finalized in both the payment system and POS.

### **Pending Property**
Property that has been created but not yet confirmed via email, unable to be used for device setup or operations.

### **Confirmed Property**
Property that has completed email confirmation and is ready for STS configuration, payment setup, and device binding.

### **Rate Limiting**
Security mechanism allowing maximum 3 login attempts per minute per region to prevent automated attacks on admin portal.

### **Session Recovery**
Process where current round order details are lost if app closes unexpectedly, but previous rounds remain preserved in POS.

## Licensing Terms

### **STS License**
Oracle Simphony licensing requirement - one license needed per revenue center that will use the Muneris mobile app.

### **Credit Card Interface License**
Oracle Simphony licensing requirement - one license needed per POS workstation for payment processing functionality.

### **Acquirer Agreement**
Banking relationship for payment processing, configured in payment service provider backend systems.

## Data and Security Terms

### **48-Hour Retention**
Digital receipts and associated data automatically deleted after 48 hours for privacy compliance and storage optimization.

### **HTTPS Encryption**
All communication between Muneris components uses secure HTTPS protocols for data protection in transit.

---

*This glossary is continuously updated as new features and terminology are introduced to the Muneris Mobile Ordering platform.*