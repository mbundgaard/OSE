# Mobile App Changelog

<!--
AI Context: Mobile Application Release Tracking
Purpose: Version-based tracking of mobile app releases with status designations and categorized changes
Key Topics: App versions, release status, feature additions, bug fixes, performance improvements
User Intent: Understanding app changes, checking release status, planning device updates
Target Users: Restaurant staff, IT administrators, implementation teams, operations managers
Prerequisites: Basic understanding of mobile app deployment and restaurant operations
Success Criteria: Users can identify current app version, understand changes, and plan updates appropriately
Troubleshooting Hints: Check version compatibility with device OS, verify stable releases for production use
Common Questions: What's in the latest version? Is this version stable? When will new features be available?
Related Pages: /mobile-app/overview, /mobile-app/device-setup, /getting-started/quick-setup
-->

Track version releases, new features, and improvements to the Muneris Mobile Ordering staff application.

## Version 3.4.1 ![Beta](https://img.shields.io/badge/Status-Beta-yellow)
**Released:** May 22, 2025

### ✅ Added
- **Mobile Ordering Without Payment**: Option to use Mobile Ordering without a payment provider configured

### 📝 Changed
- **Softpay Error Messages**: More clear Softpay activation error messages for better troubleshooting

### 🐛 Fixed
- **Pricing Fix**: Wrong item price in Share by item when using quantity and priced condiments

---

## Version 3.4.0 ![Alpha](https://img.shields.io/badge/Status-Alpha-red)
**Released:** May 20, 2025

### ✅ Added
- **Automatic Softpay Integration**: Automatic Softpay login and store selection during startup
- **Dynamic Pricing Display**: Show actual item price based on lowest price required condiment in each group
- **Upsell Price Display**: Show required condiment prices as upsell prices based on lowest condiment price in each group

??? info "Alpha Release Information"
    **Important**: This is an early development release for testing purposes only.
    - Features focus on improved payment integration and pricing transparency
    - Automatic Softpay configuration reduces manual setup time
    - Dynamic pricing provides clearer cost information to customers

---

## Version 3.3.9 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** May 16, 2025

### ✅ Added
- **Visual Feedback**: Activity spinner changes color on loading screen for better user experience

### 🐛 Fixed
- **Payment Flexibility**: Allow 0% tip percentage on order pay full
- **ReOrder Pricing**: Correct unit price in ReOrder list with shared items
- **Order Completeness**: Include items on order page pay full
- **Condiment Groups**: Allow the same condiment group to be used as both allowed and required

??? info "Technical Details"
    - Improved payment flow flexibility
    - Enhanced condiment configuration options
    - Better visual feedback during loading states

---

## Version 3.3.8 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** May 15, 2025

### 📝 Changed
- **Framework Rollback**: Revert to .NET 8 for improved stability
- **Device Compatibility**: Added support for Android 11 again (required for Ciontek CS50 devices from Viva)

??? info "Compatibility Notes"
    This version specifically addresses compatibility with Viva's Ciontek CS50 payment devices by restoring Android 11 support.

---

## Version 3.3.7 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** May 13, 2025

### 🐛 Fixed
- **Pricing Logic**: Price definition sorting fix (critical pricing calculation improvement)

---

## Version 3.3.6 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** May 12, 2025

### 🐛 Fixed
- **Combo Pricing**: Price error in combo group price (zero vs null handling)

---

## Version 3.3.5 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** May 12, 2025

### 🐛 Fixed
- **Tip Configuration**: Preset tip percentage index error when using no preset percentage

---

## Version 3.3.4 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** May 12, 2025

### 🐛 Fixed
- **Softpay Tipping**: Softpay tip without percent suggestions (handles Simphony STS returning no tip definition instead of 0%)

---

## Version 3.3.3 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** May 12, 2025

### ✅ Added
- **Legacy Device Support**: New scan logic for old devices which still use old OS API calls
- **Combo Pricing Display**: Combo group item prices are now shown as upsell prices

### 📝 Changed
- **Price Calculation**: Price definition sorting to always use the first available price (may change in future)

### 🐛 Fixed
- **Payment Calculation**: Pay full on order page could calculate incorrect price (will be changed to STS calculate total in future)

---

## Version 3.3.2 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** May 8, 2025

### ✅ Added
- **QR Scanning**: Landi QR code scan support for hardware using new OS API calls

### 🐛 Fixed
- **Navigation Error**: Exiting from order page with empty item list gave object reference error

---

## Version 3.3.1 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** May 5, 2025

### ✅ Added
- **Printing Support**: Landi plain print capability (special characters support still needs fixing)

### 📝 Changed
- **Refund Policy**: Refund is always full amount

??? bug "Known Issues"
    - Landi printing does not yet support special characters - fix pending

---

## Version 3.3.0 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** April 28, 2025

### ✅ Added
- **Color Themes**: Color themes managed by Muneris (default is Simphony colors, customers can request custom themes)
- **Quick Ordering**: Option to specify separate Tag and TagGroup for quick ordering
- **User Experience**: Menu item selection delay so users can see which item is pressed
- **Combo Meals**: Full support for Combo meals

### 🐛 Fixed
- **Display Compatibility**: Rearrange information in top bar to accommodate display notch
- **Print Reliability**: Handle print 404 error when CAPS is slow to create the check

---

## Version 3.2.1 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** April 8, 2025

### 🐛 Fixed
- **Condiment Logic**: Condiment count matches menu item count (consistent with Simphony behavior)
- **Print Formatting**: LANDI text size on check preview page to avoid line wrapping
- **UI Components**: Color mapping bug where some buttons were switched around

---

## Version 3.2.0 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** April 8, 2025

### ✅ Added
- **Rebranding**: Renamed app to Muneris
- **Admin Features**: Option to show payment app information from admin menu
- **API Enhancement**: Use STS GetMenu v2 to get definition sequence on condiment items
- **Integration Support**: Tag/TagGroup prefix for compatibility with other ordering solutions (like online ordering)
- **Custom Integrations**: Proof-of-concept for custom integrations

### 📝 Changed
- **Payment SDK**: Softpay SDK updated to version 1.6.1
- **Customization**: Button colors can now be specified in JSON config in EMC

---

## Version 3.1.3 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** April 3, 2025

### 📝 Changed
- **Payment Workflow**: Revised payment flow for improved reliability
- **Pricing Display**: Show price on required condiments for transparency

### 🐛 Fixed
- **Payment Processing**: Pay full amount bug resolved

---

## Version 3.1.2 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** April 1, 2025

### ✅ Added
- **Order Channel**: Added order channel support (available in Simphony 19.8)

### 🐛 Fixed
- **UI Controls**: Pay full button IsEnabled bug

---

## Version 3.1.1 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** March 31, 2025

### ✅ Added
- **User Feedback**: More loading indicators throughout the application

### 📝 Changed
- **Payment Integration**: Order pay full is now one call to STS (like QuickOrder)

### 🐛 Fixed
- **Display Issues**: Button view bug resolved

---

## Version 3.1.0 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** March 31, 2025

### ✅ Added
- **Order Management**: ReOrder items functionality
- **Input Enhancement**: Native text input support

### 📝 Changed
- **Code Quality**: Cleanup views for better maintainability
- **Error Handling**: Reload/admin functionality from loading error page

---

## Version 3.0.6 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** March 28, 2025

### 📝 Changed
- **Code Maintenance**: Code cleanup for improved performance

### 🐛 Fixed
- **Payment Flow**: Cash and send order button bug

---

## Version 3.0.5 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** March 27, 2025

### ✅ Added
- **Order Flexibility**: Item quantity support

---

## Version 3.0.4 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** March 25, 2025

### ✅ Added
- **User Experience**: Sending order spinner for visual feedback
- **Form Control**: Disable SEND button to prevent duplicate submissions

---

## Version 3.0.3 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** March 25, 2025

### 📝 Changed
- **Data Handling**: Handle condiments with multiple definitions (always take the first one)

---

## Version 3.0.2 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** March 25, 2025

### 🐛 Fixed
- **Display Issue**: Fix items with missing names on ordering page (ListView vs. CollectionView)

---

## Version 3.0.1 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** March 23, 2025

### ✅ Added
- **Table Service**: Order-at-table functionality for full TSR and limited QSR
- **Administration**: Admin menu with app reset and version installation options

---

## Version 3.0.0 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** March 18, 2025

### ✅ Added
- **Major Feature**: Initial work on order-at-table functionality

??? info "Version 3.0 Major Release"
    This major release introduces order-at-table capabilities, marking a significant expansion of the app's functionality from traditional mobile ordering to comprehensive table service support.

---

## Version 2.1.5 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** February 11, 2025

### 🐛 Fixed
- **Data Processing**: Fix item shared decimal bug

---

## Version 2.1.4 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** January 13, 2025

### ✅ Added
- **Printing**: Custom print functionality

### 🐛 Fixed
- **Configuration**: Softpay tipping logic config bug

---

## Version 2.1.3 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** December 16, 2024

### ✅ Added
- **Payment Processing**: Added POS reference to Softpay (due to acquirer error resolution)

---

## Version 2.1.2 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** December 12, 2024

### ✅ Added
- **Bill Splitting**: Added seats to share by item functionality

---

## Version 2.1.1 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** December 12, 2024

### ✅ Added
- **Payment Splitting**: Share by item functionality

### 🐛 Fixed
- **Item Management**: Missing item bug (condiment-related)

---

## Version 2.1.0 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** December 12, 2024

### ✅ Added
- **Payment Features**: Additional share logic for flexible bill splitting
- **Terminal Management**: Busy terminal logic to handle device conflicts

---

## Version 2.0.4 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** December 4, 2024

### 📝 Changed
- **Payment Configuration**: Softpay TipMode changed from 0 to 4

---

## Version 2.0.3 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** November 28, 2024

### ✅ Added
- **Search Functionality**: Table number search capability

### 🐛 Fixed
- **Printing**: Missing print bug resolved

---

## Version 2.0.2 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** November 27, 2024

### 📝 Changed
- **Environment**: Softpay production configuration (take 2)

---

## Version 2.0.1 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** November 27, 2024

### 📝 Changed
- **Environment**: Softpay production configuration (take 1)

---

## Version 2.0.0 ![Stable](https://img.shields.io/badge/Status-Stable-green)
**Released:** November 20, 2024

### ✅ Added
- **Payment Integration**: Softpay & PaymentService integration

??? info "Version 2.0 Major Release"
    This major release introduces comprehensive payment processing capabilities with Softpay integration, marking a significant milestone in the app's payment functionality.

---

## Legacy Versions (1.x Series)

### Version 1.1.11 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** November 10, 2024

### ✅ Added
- **Validation**: Check total due validation

### Version 1.1.10 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** October 27, 2024

### ✅ Added
- **Output**: Printing functionality

### Version 1.1.9 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** October 9, 2024

### ✅ Added
- **Payment Data**: Card type and masked PAN in VivaPaymentData

### Version 1.1.8 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** October 3, 2024

### 📝 Changed
- **Viva Integration**: Check Viva merchant before reset Viva app

### Version 1.1.7 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** October 1, 2024

### ✅ Added
- **Service Calculation**: Added service total via STS when picking up check (and before payment, if opened for more than 5 min)
- **Payment Reference**: Added "PayAtTable:" prefix to merchant ref
- **Error Handling**: Retry STS payment posting dialog

### 📝 Changed
- **QR Configuration**: QR code is download pay-at-table, not config

### Version 1.1.6 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** September 27, 2024

### 📝 Changed
- **Initialization**: Moved Viva payment app activation to AFTER reading store code from Simphony

### Version 1.1.5 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** September 26, 2024

### ✅ Added
- **Multi-Location**: Added VivaStoreCode to support multiple locations under the same merchant in Viva

### Version 1.1.4 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** September 23, 2024

### ✅ Added
- **Payment Management**: Added ResellerConfig to cancel payments via Viva cloud

### Version 1.1.3 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** September 20, 2024

### 📝 Changed
- **Environment**: DEMO configuration

### Version 1.1.2 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** September 16, 2024

### 📝 Changed
- **Data Storage**: Save check print as ext detail instead of info lines

### Version 1.1.1 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** September 13, 2024

### ✅ Added
- **Device Management**: Alias via terminals table
- **Data Structure**: Ref obj with details

### Version 1.1.0 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** September 11, 2024

### ✅ Added
- **Production Ready**: First production release with receipt QR code and cc print in info lines

### Version 1.0.9 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** September 9, 2024

### ✅ Added
- **Device Identity**: Device alias functionality
- **Security**: Security enhancements

### Version 1.0.8 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** September 4, 2024

### ✅ Added
- **Encryption**: Add initial encryption to communication key exchange

### Version 1.0.7 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** August 28, 2024

### 📝 Changed
- **Security**: Reset public key during MDM config

### Version 1.0.6 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** August 28, 2024

### 🐛 Fixed
- **Stability**: App crashes on first run after allowing camera access, key resiliency during integration re-config/reset

### Version 1.0.5 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** August 28, 2024

### 📝 Changed
- **Configuration**: Refresh MDM config
- **Security**: Reset public key before scan

### Version 1.0.4 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** August 28, 2024

### 📝 Changed
- **Dependencies**: Don't check if payment app is installed

### Version 1.0.3 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** August 27, 2024

### ✅ Added
- **Testing**: Test release to Viva

### Version 1.0.2 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** July 15, 2024

### ✅ Added
- **Testing**: Test release to Sovino

### Version 1.0.1 ![EOL](https://img.shields.io/badge/Status-EOL-red)
**Released:** July 15, 2024

### ✅ Added
- **Initial Release**: Initial test release

---

## Release Schedule & Support

### Release Cadence
- **Stable Releases**: Regular maintenance updates and feature releases
- **Beta Releases**: Testing versions for upcoming features
- **Alpha Releases**: Early development releases for internal testing

### Version Support
- **Current Stable (3.x)**: Full support with critical fixes within 24 hours
- **Previous Stable (2.x)**: Security and critical fixes for 6 months
- **Legacy (1.x)**: End of life - no longer supported
- **Beta/Alpha**: Testing support only, not recommended for production

### Key Milestones
- **Version 1.0**: Initial release with basic pay-at-table functionality
- **Version 2.0**: Major payment integration with Softpay
- **Version 3.0**: Introduction of order-at-table and table service features
- **Version 3.3**: Combo meals support and enhanced pricing display
- **Version 3.4**: Mobile ordering without payment provider requirement

---

*For technical support or to report issues with any version, contact [support@muneris.dk](mailto:support@muneris.dk) with your device model and app version.*