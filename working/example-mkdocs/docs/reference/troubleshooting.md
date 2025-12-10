# Troubleshooting

<!-- 
AI Context:
- Purpose: Comprehensive troubleshooting guide for diagnosing and resolving technical issues across all system components
- Key Topics: Admin portal issues, mobile app problems, payment failures, Oracle Simphony integration errors, device connectivity, diagnostic procedures
- User Intent: Users want to quickly identify and resolve technical problems to restore system functionality
- Target Users: Restaurant IT staff, support personnel, managers, waiters encountering operational issues
- Prerequisites: Basic system access, ability to check device/network status, admin portal access for configuration issues
- Success Criteria: Issue identified and resolved, system functionality restored, prevention measures understood
- Troubleshooting Hints: Start with most common issues, check network connectivity first, verify basic configuration before complex diagnostics
- Common Questions: "Why isn't X working?", "How do I fix Y error?", "Troubleshooting steps for Z?", "System not responding?", "Error message meanings?"
- Related Pages: All technical documentation pages, ../admin-portal/configuration.md, ../mobile-app/overview.md, ../getting-started/requirements.md
-->

Solutions for common issues with the Muneris Mobile Ordering platform.

## Admin Portal Issues

### Cannot Access Admin Portal

#### "Invalid email or company"
**Symptoms**: Error message when trying to log in
**Causes**: 
- Email not registered as admin user
- Incorrect company code
- Company not yet activated

**Solutions**:
1. **Verify email address** - Check spelling and ensure it's registered
2. **Check company code** - Confirm 3-letter code is correct (case-sensitive)
3. **Contact support** - If company is new, may need activation
4. **Verify user status** - Ensure you haven't been removed as admin user

#### Login Email Not Received
**Symptoms**: No login link email arrives
**Causes**:
- Email in spam folder
- Email address typo
- Email server delays

**Solutions**:
1. **Check spam/junk folder** - Login emails may be filtered
2. **Wait 5-10 minutes** - Email delivery may be delayed
3. **Verify email address** - Ensure correct spelling
4. **Try different email client** - Some email providers may block

#### "Too many requests"
**Symptoms**: Rate limiting error message
**Causes**: More than 3 login attempts per minute

**Solutions**:
1. **Wait one minute** - Rate limits reset every minute
2. **Don't retry immediately** - Multiple rapid attempts extend the delay
3. **Check credentials** - Verify email and company code before next attempt

### Property Configuration Issues

#### Property Not Confirming
**Symptoms**: Property remains in "pending" status
**Causes**:
- Confirmation email not received
- Confirmation link expired
- Email server issues

**Solutions**:
1. **Check email** - Look in all folders including spam
2. **Request new confirmation** - Delete and recreate property if needed
3. **Verify email address** - Ensure property email is correct and monitored
4. **Check email server** - Ensure corporate email allows external links

#### STS Configuration Failing
**Symptoms**: Cannot connect to Oracle Simphony
**Causes**:
- Incorrect STS endpoint URL
- Invalid credentials
- Network connectivity issues
- STS service down

**Solutions**:
1. **Verify endpoint URL** - Check STS server address is correct
2. **Test credentials** - Ensure STS authentication details are valid
3. **Check network** - Verify restaurant network can reach STS servers
4. **Contact Oracle support** - For STS service status issues

#### Payment Configuration Problems
**Symptoms**: Payment provider validation fails
**Causes**:
- Incorrect merchant credentials
- Wrong demo/production mode
- Payment provider account issues

**Solutions**:
1. **Verify credentials** - Check merchant ID, API keys, terminal IDs
2. **Confirm mode** - Ensure demo/production setting matches credentials
3. **Test provider account** - Verify account is active with payment provider
4. **Check network access** - Ensure can reach payment provider APIs

## Mobile App Issues

### App Startup Problems

#### App Won't Start
**Symptoms**: App crashes or fails to launch
**Causes**:
- Device storage full
- App needs update
- Android system issues

**Solutions**:
1. **Restart device** - Power cycle the tablet
2. **Clear app cache** - Android Settings > Apps > Muneris > Storage > Clear Cache
3. **Check storage space** - Ensure device has adequate free space
4. **Update app** - Install latest version if available

#### System Validation Failures
**Symptoms**: Red warnings on app startup
**Causes**:
- Payment app not configured
- STS connectivity issues
- Network problems

**Solutions**:
1. **Check payment app** - Verify payment provider app is installed and configured
2. **Test network** - Ensure WiFi/cellular connectivity
3. **Restart apps** - Close and reopen both Muneris and payment apps
4. **Contact management** - Report persistent connectivity issues

### Order Entry Issues

#### Cannot Access Check
**Symptoms**: "Check is being used by another device" error
**Causes**: Another waiter is editing the check

**Solutions**:
1. **Wait for release** - Other waiter will finish and release check
2. **Communicate with team** - Ask colleague to release check if done
3. **Try different check** - Work on other orders while waiting
4. **Contact manager** - If check appears permanently locked

#### Menu Items Won't Load
**Symptoms**: Empty menu or items not displaying
**Causes**:
- STS connection issues
- Network connectivity problems
- Oracle Simphony system down

**Solutions**:
1. **Refresh menu** - Pull down to refresh menu data
2. **Check network** - Verify strong WiFi/cellular signal
3. **Restart app** - Close and reopen Muneris app
4. **Test STS connection** - Contact IT if Simphony system is down

#### Items Won't Post to POS
**Symptoms**: Orders not appearing in kitchen/bar systems
**Causes**:
- STS connectivity failure
- Oracle Simphony system issues
- Network interruption

**Solutions**:
1. **Check network connection** - Verify internet connectivity
2. **Retry posting** - Attempt to post round again
3. **Restart app** - Close and reopen if posting consistently fails
4. **Use backup procedures** - Manually enter orders in POS if needed

### Payment Processing Issues

#### Payment Terminal Not Responding
**Symptoms**: Terminal doesn't activate for card tap
**Causes**:
- Terminal power issues
- Network connectivity problems
- Hardware malfunction

**Solutions**:
1. **Check power** - Ensure terminal is plugged in and powered on
2. **Check connections** - Verify USB/network cables are secure
3. **Restart terminal** - Power cycle the payment terminal
4. **Test with different device** - Try terminal with another tablet

#### Payment App Communication Error
**Symptoms**: Cannot start payment or get response from payment app
**Causes**:
- Payment app not running
- Android communication issues
- Payment app configuration problems

**Solutions**:
1. **Open payment app** - Ensure payment provider app is running
2. **Check payment app config** - Verify store/merchant settings
3. **Restart both apps** - Close and reopen both Muneris and payment apps
4. **Restart device** - Full device restart if communication issues persist

#### Card Payment Failures
**Symptoms**: Cards consistently being declined
**Causes**:
- Terminal connectivity issues
- Merchant account problems
- Card reader hardware issues

**Solutions**:
1. **Test with known good card** - Use test card or staff card
2. **Check terminal connectivity** - Verify network connection to payment processor
3. **Clean card reader** - Gently clean contactless reader surface
4. **Contact payment provider** - Check merchant account status

#### Digital Receipt Issues
**Symptoms**: QR codes not generating or receipt links not working
**Causes**:
- Muneris API connectivity issues
- Receipt upload failures
- Network problems

**Solutions**:
1. **Check network** - Verify internet connectivity
2. **Retry payment** - Process payment again if receipt failed
3. **Manual receipt** - Offer to email receipt if QR code fails
4. **Report to management** - Persistent receipt issues need IT attention

## Network and Connectivity Issues

### WiFi Connection Problems
**Symptoms**: Intermittent or no network connectivity
**Solutions**:
1. **Check WiFi signal** - Move closer to router for stronger signal
2. **Restart WiFi** - Turn device WiFi off and on
3. **Forget and reconnect** - Delete WiFi network and reconnect
4. **Check router status** - Verify restaurant WiFi is working

### STS Connectivity Issues
**Symptoms**: Cannot connect to Oracle Simphony
**Solutions**:
1. **Test basic connectivity** - Verify internet access works
2. **Check STS service** - Contact Oracle if STS service is down
3. **Verify credentials** - Ensure STS authentication hasn't expired
4. **Restart network equipment** - Reset restaurant network hardware

### Payment Provider Connectivity
**Symptoms**: Payment processing consistently fails
**Solutions**:
1. **Test provider network** - Verify payment provider service status
2. **Check merchant account** - Ensure account is active and in good standing
3. **Verify terminal connectivity** - Test payment terminal network connection
4. **Contact provider support** - Escalate to payment provider technical support

## Device Management Issues

### Tablet Performance Problems
**Symptoms**: App running slowly or freezing
**Solutions**:
1. **Close background apps** - Clear other running applications
2. **Restart device** - Power cycle tablet
3. **Check storage space** - Free up device storage if low
4. **Update Android** - Install system updates if available

### Battery and Charging Issues
**Symptoms**: Tablet won't hold charge or charge slowly
**Solutions**:
1. **Check charging cable** - Verify cable and adapter are working
2. **Clean charging port** - Remove lint or debris from charging port
3. **Replace charging equipment** - Try different cable/adapter
4. **Battery replacement** - Consider battery replacement for old devices

### Multiple Device Coordination
**Symptoms**: Conflicts between multiple tablets
**Solutions**:
1. **Coordinate check usage** - Establish team protocols for check management
2. **Share payment terminals** - Ensure all devices can access payment hardware
3. **Network capacity** - Verify WiFi can handle multiple devices
4. **Update all devices** - Ensure all tablets have same app version

## Escalation Procedures

### When to Contact IT Support
- **Persistent network issues** - WiFi or internet connectivity problems
- **STS configuration problems** - Oracle Simphony integration failures
- **Payment provider issues** - Merchant account or terminal problems
- **App crashes or errors** - Consistent software problems

### When to Contact Muneris Support
- **Admin portal access issues** - Login or authentication problems
- **Property configuration failures** - Setup and validation issues
- **Receipt generation problems** - Digital receipt system issues
- **Device binding problems** - QR code or device setup issues

### When to Contact Oracle Support
- **STS service outages** - Simphony Transaction Service down
- **POS integration issues** - Menu data or check management problems
- **License questions** - STS or Credit Card Interface licensing
- **Employee validation failures** - Simphony user account issues

### When to Contact Payment Provider
- **Merchant account issues** - Account status or configuration problems
- **Terminal hardware problems** - Card reader malfunctions
- **Transaction processing failures** - Payment authorization issues
- **Settlement and reporting** - Payment reconciliation problems

## Emergency Procedures

### System-Wide Outage
**If Muneris system is completely unavailable:**
1. **Use manual POS** - Take orders directly in Oracle Simphony
2. **Cash payments** - Accept cash until card processing restored
3. **Document issues** - Keep record of problems for support
4. **Communicate with guests** - Explain temporary payment limitations

### Payment System Failure
**If card processing is unavailable:**
1. **Accept cash only** - Until payment system restored
2. **ATM information** - Provide directions to nearest ATM
3. **Manual card processing** - Use manual card imprinters if available
4. **Document transactions** - Keep records for later processing

### Network Outage
**If internet connectivity is lost:**
1. **Check cellular backup** - Use cellular data if available
2. **Manual operations** - Use paper orders and cash payments
3. **Document all transactions** - Keep detailed records
4. **Resume when restored** - Enter transactions when connectivity returns

## Preventive Maintenance

### Daily Checks
- **Device battery levels** - Ensure tablets are charged
- **Network connectivity** - Verify strong WiFi signals
- **Payment terminal status** - Check terminal power and connectivity
- **App performance** - Monitor for slowdowns or issues

### Weekly Tasks
- **Clean devices** - Wipe screens and payment terminals
- **Check for updates** - Install app and system updates
- **Review error logs** - Monitor for recurring issues
- **Test backup procedures** - Verify cash payment processes work

### Monthly Reviews
- **Network performance** - Check WiFi speed and reliability
- **Device health** - Monitor battery life and performance
- **User training** - Refresh staff on troubleshooting procedures
- **Support contacts** - Verify escalation contact information

## Getting Additional Help

### Support Resources
- **Muneris Support** - Technical issues with platform
- **Oracle Support** - Simphony and STS related issues
- **Payment Provider Support** - Card processing problems
- **Local IT Support** - Network and device issues

### Documentation Resources
- **Admin Portal Guide** - Configuration and setup procedures
- **Mobile App Guide** - Daily operations and workflows
- **Oracle Simphony Documentation** - POS system information
- **Payment Provider Manuals** - Terminal and app documentation

### Training and Education
- **Staff training sessions** - Regular system education
- **Manager certification** - Advanced troubleshooting training
- **Vendor training** - Oracle and payment provider education
- **Best practices sharing** - Learn from other restaurants' experiences