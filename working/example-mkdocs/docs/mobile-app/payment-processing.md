# Payment Processing

<!--
AI Context Block:
- Purpose: Guide restaurant staff through payment processing workflows and tip management using Muneris Mobile Ordering
- Key Topics: Payment workflows, tip modes, receipt generation, QR code receipts, cash payments, card processing integration
- User Intent: Processing customer payments efficiently with proper tip handling and receipt delivery
- Target Users: Restaurant staff, servers, cashiers processing customer payments
- Prerequisites: Device setup completed, payment provider app installed and configured, completed orders ready for payment
- Success Criteria: Staff can process payments smoothly, handle tips appropriately, and provide customers with receipts
- Troubleshooting Hints: If payment app won't open, check background permissions; if receipts don't generate, verify network connectivity; restart payment app if card processing fails
- Common Questions: How do I add tips? Can customers choose tip amounts? How do customers get receipts? What if card payment fails? How do I process cash payments?
- Related Pages: Overview, Device Setup, Daily Operations, Device Management
-->

## Payment Workflow Overview

The Muneris Mobile Ordering payment system integrates with provider-specific payment apps to process card transactions while maintaining control over tip management and receipt generation.

### Payment Process Steps
1. **Complete order entry** and review total with customer
2. **Select payment method** (card or cash)
3. **Configure tip mode** and amount if applicable
4. **Process payment** through integrated provider app
5. **Generate receipt** with QR code for customer access
6. **Complete transaction** and return to ordering

## Tip Mode Configuration

### Available Tip Modes

#### Percentage-Based Tips
- **Pre-configured percentages**: Common options like 15%, 18%, 20%
- **Customer selection**: Choose from available percentage options
- **Automatic calculation**: Tip amount calculated from order total
- **Display total**: Shows tip amount and final total before processing

#### Fixed Amount Tips
- **Set dollar amounts**: Fixed tip options (e.g., $2, $5, $10)
- **Quick selection**: Fast tip processing for standard amounts
- **Custom amounts**: Option to enter specific tip amount
- **Total calculation**: Adds tip to order total automatically

#### Custom Tip Entry
- **Manual entry**: Customer or staff enters specific tip amount
- **Flexible amounts**: Any tip amount within reasonable limits
- **Percentage or dollar**: Accept tips as percentage or fixed amount
- **Real-time calculation**: Updates total immediately with tip entry

#### No Tip Option
- **Skip tip selection**: Proceed directly to payment processing
- **Zero tip processing**: Complete transaction without tip
- **Optional tips**: Customer choice whether to add gratuity
- **Service charge alternative**: Use if service charges already applied

### Tip Configuration Management
- **Property-specific settings**: Configure tip modes per restaurant location
- **Admin portal control**: Set available tip options through admin.muneris.app
- **Default selections**: Configure most common tip mode for efficiency
- **Staff override**: Allow staff to modify tip modes as needed

## Card Payment Processing

### Payment Provider Integration
Card payments are processed through provider-specific apps installed on each device:

#### Payment Flow
1. **Muneris calculates total**: Order amount plus selected tip
2. **Payment app launches**: Automatically opens configured provider app
3. **Amount transfer**: Transaction total sent to payment app
4. **Customer interaction**: Customer completes card payment in provider app
5. **Result return**: Payment result sent back to Muneris app
6. **Receipt generation**: Muneris generates receipt with transaction details

#### Supported Payment Providers
- **Viva**: Integration with Viva Terminal app
- **Softpay**: Integration with SoftPay Terminal app  
- **Worldline**: Integration with Worldline terminal apps
- **Adyen**: Integration with Adyen POS Mobile app

### Card Payment Troubleshooting
- **Payment app not responding**: Check app permissions and background execution
- **Transaction failures**: Retry payment or switch to different payment method
- **Network connectivity**: Ensure stable internet for payment processing
- **Provider app updates**: Keep payment provider apps updated for reliability

## Cash Payment Processing

### Cash Transaction Workflow
1. **Select cash payment option** in Muneris app
2. **Configure tip amount** if customer adding cash tip
3. **Enter cash received** from customer
4. **Calculate change due** automatically
5. **Process transaction** without external payment app
6. **Generate receipt** for customer with QR code access

### Cash Handling Features
- **Change calculation**: Automatic change computation
- **Tip integration**: Add cash tips to transaction total
- **Receipt generation**: Same receipt system as card payments
- **POS integration**: Cash transactions posted to Oracle Simphony

## Receipt Generation and Access

### Digital Receipt System
Muneris generates digital receipts accessible through QR codes for customer convenience:

#### Receipt Generation Process
1. **Transaction completion**: Receipt generated immediately after payment
2. **QR code creation**: Unique QR code generated for receipt access
3. **Customer display**: Show QR code on device screen for customer
4. **Link creation**: QR code contains link to web-accessible receipt

#### Receipt Contents
- **Order details**: All items, quantities, and modifications
- **Pricing breakdown**: Item prices, subtotals, taxes, and tips
- **Payment information**: Payment method and transaction details
- **Restaurant information**: Property name, location, and contact details
- **Transaction timestamp**: Date and time of order completion

### QR Code Receipt Access

#### Customer Experience
1. **QR code display**: Staff shows QR code on device screen
2. **Customer scanning**: Customer scans QR code with their smartphone
3. **Receipt access**: QR code opens receipt in web browser
4. **Digital storage**: Customer can save or share receipt as needed

#### QR Code Features
- **Immediate access**: Receipts available instantly after payment
- **Web-based viewing**: No app installation required for customers
- **Mobile-optimized**: Receipt display optimized for smartphone viewing
- **Permanent links**: Receipts remain accessible for extended period

### Receipt Troubleshooting
- **QR code not generating**: Check network connectivity and retry
- **Receipt access problems**: Verify QR code scanning and internet connection
- **Missing information**: Confirm all order details before payment processing
- **Display issues**: Ensure device screen brightness adequate for QR scanning

## Payment Security and Compliance

### Secure Payment Processing
- **Provider app security**: Card data handled exclusively by certified payment apps
- **No sensitive storage**: Muneris does not store card information
- **PCI compliance**: Payment providers maintain PCI DSS compliance
- **Encrypted transmission**: All payment data encrypted during processing

### Transaction Integrity
- **Amount verification**: Payment amounts verified between apps
- **Transaction validation**: Confirmation of successful payment processing
- **Audit trails**: Complete transaction records maintained
- **Error handling**: Graceful handling of payment failures and retries

## Best Practices for Payment Processing

### Efficient Payment Workflows
- **Review totals** with customers before processing payment
- **Explain tip options** clearly to customers
- **Verify payment method** before launching payment processing
- **Confirm transaction success** before completing service

### Customer Service Excellence
- **Clear total display**: Show order total, tip, and final amount clearly
- **Payment options explanation**: Help customers understand available payment methods
- **Receipt delivery**: Ensure customers can access QR code receipt easily
- **Handle payment issues**: Provide alternative payment methods if problems occur

### Staff Training Recommendations
- **Practice payment flows**: Ensure staff comfortable with all payment scenarios
- **Tip mode familiarity**: Train on all available tip configuration options
- **Troubleshooting knowledge**: Basic problem-solving for common payment issues
- **Customer interaction**: Professional handling of payment and tip discussions

### Operational Efficiency
- **Quick tip selection**: Use most common tip modes for faster processing
- **Payment provider reliability**: Monitor payment app performance and update as needed
- **Network stability**: Maintain strong WiFi for reliable payment processing
- **Device management**: Keep devices charged and payment apps functioning properly

Payment processing integration provides restaurants with flexible, secure transaction capabilities while maintaining excellent customer service through digital receipt delivery and comprehensive tip management options.