# Muneris Mobile Ordering Documentation

<!-- 
AI Context:
- Purpose: Primary entry point and navigation hub for Muneris Mobile Ordering documentation, providing clear value proposition and role-based pathways for restaurant operators
- Key Topics: Oracle Simphony mobile ordering, tablet-based POS integration, payment processing optimization, admin portal management, restaurant operations efficiency, business benefits and ROI
- User Intent: Restaurant decision makers evaluating mobile ordering solutions, IT staff planning implementation, operations managers understanding operational impact, new users needing orientation
- Target Users: Restaurant owners and decision makers, IT administrators, operations managers, Oracle Simphony specialists, implementation teams, restaurant staff trainers
- Prerequisites: Basic understanding of restaurant operations, familiarity with POS systems helpful but not required, business decision-making authority or technical implementation responsibility
- Success Criteria: Clear understanding of Muneris value proposition, confident navigation to relevant implementation sections, business case validation, implementation readiness assessment
- Troubleshooting Hints: Verify Oracle Simphony compatibility and STS licensing first, confirm payment provider availability in your region, validate network infrastructure capabilities, check hardware specifications
- Common Questions: "What makes Muneris different from other mobile ordering?", "How much does implementation cost vs. traditional terminals?", "How long does setup take?", "What Oracle licensing do I need?", "Can this work with multiple locations?"
- Related Pages: getting-started/index.md, admin-portal/overview.md, simphony-configuration/prerequisites.md, mobile-app/overview.md, getting-started/requirements.md

Key Concepts for AI Assistants:

Muneris Mobile Ordering: Purpose-built mobile ordering platform exclusively for Oracle Simphony restaurants, enabling tableside ordering and payment processing with seamless POS integration, replacing traditional payment terminals with software-based solutions on Android tablets.

Oracle Simphony Integration: Deep POS connectivity via STS (Simphony Transaction Service) providing real-time order synchronization, unified financial reporting, staff management integration, menu synchronization, and tender media mapping.

Payment Provider Flexibility: Software-based payment processing supporting Viva, Softpay, Worldline, and Adyen through Android applications, eliminating hardware vendor lock-in and enabling 70% reduction in payment terminal costs.

Round-Based Ordering: Flexible service model allowing waiters to post orders in multiple rounds (drinks first, food later) matching natural restaurant service flow, rather than all-at-once ordering.

Admin Portal: Blazor WebAssembly application (admin.muneris.app) providing passwordless JWT authentication, multi-location property management, STS configuration, payment provider setup, and QR code generation for device deployment.
-->

Welcome to **Muneris Mobile Ordering** – the only mobile ordering platform built exclusively for Oracle Simphony restaurants. Transform your restaurant operations with tableside ordering, integrated payments, and seamless POS connectivity.

!!! tip "💡 AI-Optimized Documentation"
    This documentation works seamlessly with AI assistants! Ask Claude, ChatGPT, or other AI tools to "look at docs.muneris.app and help me with [your question]" for accurate, contextual answers.

## Muneris Mobile Ordering?

Muneris Mobile Ordering transforms restaurant operations by enabling staff to take orders on tablets and process payments with seamless Oracle Simphony POS integration.

**Key Capabilities:**
- 📱 **Tableside ordering** with real-time menu synchronization
- 💳 **Integrated payment processing** with multiple provider support
- ⚙️ **Centralized management** through web-based admin portal
- 🔧 **Oracle Simphony integration** via STS (Simphony Transaction Service)

### Why Choose Muneris?

| Benefit | Value |
|---------|-------|
| **🎯 Oracle Simphony Specialists** | Built exclusively for Simphony with deep POS integration expertise |
| **💰 Reduce Hardware Costs** | Replace $1,000 payment terminals with $300 Android tablets |
| **⚡ Faster Service** | Achieve 15-20% faster table turns through streamlined workflows |
| **🔄 Payment Flexibility** | Switch providers by changing apps, not hardware |

## Quick Start Paths

Choose your path based on your role and immediate needs:

=== "🚀 New Implementation"
    
    **Just getting started?** Follow our complete setup guide.
    
    [Getting Started Guide →](getting-started/index.md){ .md-button .md-button--primary }
    
    **What you'll accomplish:**
    - Company and property setup
    - Oracle Simphony STS configuration
    - Payment provider integration
    - Device deployment

=== "⚙️ System Configuration"
    
    **Setting up the admin portal?** Configure your restaurant properties.
    
    [Admin Portal Guide →](admin-portal/overview.md){ .md-button }
    
    **What you'll accomplish:**
    - Property management
    - User administration
    - Payment configuration
    - System monitoring

=== "🔧 Oracle Integration"
    
    **Connecting to Simphony?** Set up your POS integration.
    
    [Simphony Setup →](simphony-configuration/prerequisites.md){ .md-button }
    
    **What you'll accomplish:**
    - STS license validation
    - EMC configuration
    - Token management
    - Connection testing

=== "📱 Daily Operations"
    
    **Training staff?** Learn the mobile app workflows.
    
    [Mobile App Guide →](mobile-app/overview.md){ .md-button }
    
    **What you'll accomplish:**
    - Order management
    - Payment processing
    - Team coordination
    - Customer service

## System Architecture

The Muneris platform consists of four integrated components:

### 🖥️ Admin Portal (`admin.muneris.app`)
**Web-based management interface**
- Configure restaurant properties and settings
- Set up payment providers (Viva, Softpay, Worldline, Adyen)
- Manage Oracle Simphony STS integration
- Monitor device health and system status
- Generate QR codes for device setup

### 📱 Mobile App
**Android tablet application for restaurant staff**
- Take customer orders with real-time menu sync
- Process payments with integrated terminals
- Handle round-based ordering (drinks first, food later)
- Manage team coordination and check conflicts
- Generate digital receipts with QR access

### 🔧 Oracle Simphony Integration
**Seamless POS connectivity via STS**
- Real-time order synchronization
- Unified financial reporting
- Staff management integration
- Menu and pricing updates
- Tender media mapping

### 💳 Payment Processing
**Flexible multi-provider support**
- Software-based processing (no terminal hardware)
- Multiple tip modes per property
- Provider switching without hardware changes
- Full PCI compliance maintained
- 70% reduction in payment hardware costs

## Implementation Overview

### **Prerequisites** *(1-2 weeks)*
- Oracle Simphony system with STS licensing
- Payment provider merchant account
- Android tablets and network infrastructure
- Implementation team preparation

### **Configuration** *(3-5 days)*
- Admin portal property setup
- Oracle Simphony STS integration
- Payment provider configuration
- EMC employee and workstation setup

### **Deployment** *(1-2 days)*
- Mobile app installation
- Device authentication via QR codes
- Payment processing validation
- End-to-end workflow testing

### **Go-Live** *(2-3 days)*
- Staff training and supervised testing
- Live service validation
- Issue resolution and optimization
- Full operational transition

## Frequently Asked Questions

??? question "What Oracle Simphony licenses do I need?"
    You need **STS (Simphony Transaction Service) license per revenue center** that will use mobile ordering. STS is part of the Oracle Reporting & Analytics suite. Contact Oracle for specific licensing requirements.

??? question "Can I use this with multiple restaurant locations?"
    Yes! Create separate properties for each location in the admin portal. Each property can have its own STS and payment configuration while being managed centrally.

??? question "What are the hardware requirements?"
    - Android tablets (Android 8.0+, 3GB RAM minimum)
    - Payment terminals compatible with your provider
    - Reliable Wi-Fi with internet connectivity
    - Oracle Simphony system with STS capability

??? question "Which payment providers are supported?"
    Muneris supports **Viva**, **Softpay**, **Worldline**, and **Adyen** through their Android applications. Each can be configured in demo or production mode.

??? question "How does team coordination work?"
    The app supports multi-device operations with shared check access, conflict prevention, and device independence. Any waiter can complete any check from any device.

??? question "How long does implementation take?"
    Typical implementation is **2-4 weeks total**: 1-2 weeks preparation, 3-5 days configuration, 1-2 days deployment, and 2-3 days training and go-live.

## Business Impact

### **Operational Benefits**
- **15-20% faster table turns** through streamlined processes
- **Reduced order errors** with digital menus and real-time POS sync
- **Improved tip collection** via professional payment workflows
- **Enhanced guest experience** with faster service and digital receipts

### **Cost Benefits**
- **70% reduction** in payment hardware costs
- **Payment provider flexibility** eliminates vendor lock-in
- **Reduced training time** with intuitive interfaces
- **Lower maintenance costs** using standard Android hardware

### **Technology Benefits**
- **99.99% uptime** with multi-region redundancy
- **Enterprise-grade security** with multi-layer protection
- **Real-time integration** ensures accurate financial records
- **Scalable architecture** from single locations to large chains

## Next Steps

Ready to get started? Choose the path that best fits your current needs:

- **📋 Planning implementation?** → [System Requirements](getting-started/requirements.md)
- **⚡ Ready to start setup?** → [Getting Started Guide](getting-started/index.md)
- **🔧 Configuring Oracle Simphony?** → [Simphony Configuration](simphony-configuration/prerequisites.md)
- **📱 Training on the mobile app?** → [Mobile App Guide](mobile-app/overview.md)
- **❓ Need troubleshooting help?** → [Troubleshooting Guide](reference/troubleshooting.md)
- **📚 Looking for definitions?** → [Glossary](reference/glossary.md)

## Support Resources

- **📖 Complete documentation** at docs.muneris.app
- **🤖 AI assistance** - Ask AI tools to reference this documentation
- **📧 Technical support** - Contact our team for implementation help
- **🎯 Success team** - Implementation guidance and best practices

---

*Muneris Mobile Ordering: Purpose-built for Oracle Simphony restaurants seeking modern, efficient mobile ordering capabilities.*