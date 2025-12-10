# Mobile App Overview

<!--
AI Context Block:
- Purpose: Provide technical overview of Muneris Mobile Ordering mobile app for restaurant operations
- Key Topics: Mobile app architecture, Oracle Simphony integration, device-based ordering, payment processing
- User Intent: Understanding what the mobile app does and how it fits into restaurant operations
- Target Users: Operations managers, IT staff, restaurant staff, system administrators
- Prerequisites: Basic understanding of restaurant POS systems and mobile device management
- Success Criteria: User understands mobile app capabilities and integration requirements
- Troubleshooting Hints: Check Oracle Simphony connection if orders aren't posting, verify payment app installation for card processing
- Common Questions: What devices are supported? How does it integrate with our POS? How are payments processed? How do multiple devices coordinate?
- Related Pages: Device Setup, Daily Operations, Payment Processing, Device Management, Admin Portal Configuration
-->

## What is Muneris Mobile Ordering

Muneris Mobile Ordering is an Android device application that enables restaurant staff to take orders and process payments away from traditional point-of-sale terminals. The app integrates directly with Oracle Simphony POS systems and supports multiple payment providers for card processing.

## Core Capabilities

- **Table-side ordering** on Android devices
- **Real-time integration** with Oracle Simphony POS systems
- **Card payment processing** through integrated payment provider apps
- **Round-based ordering system** for flexible order management
- **Multi-device coordination** for team-based restaurant operations
- **Digital receipt generation** with QR code access for customers

## Technical Architecture

### Platform Requirements
- **Android devices** smartphones with and without printers
- **Oracle Simphony POS** integration via STS (Simphony Transaction Service)
- **Payment provider apps** installed on each device for card processing
- **Network connectivity** for real-time POS communication

### Core Integrations

#### Oracle Simphony Integration
- **Direct POS connection** through Simphony Transaction Service (STS)
- **Real-time order posting** to restaurant's existing POS system
- **Menu synchronization** with Simphony item configurations
- **Check management** coordinated with POS operations

#### Payment Processing Integration
- **Provider-specific apps** handle card transactions (Viva, Softpay, Worldline, Adyen)
- **Integrated payment flow** within ordering workflow
- **Tip processing** with configurable tip modes
- **Receipt generation** with digital QR code access

#### Admin Portal Integration
- **Device configuration** managed through admin.muneris.app
- **Property setup** and payment provider configuration
- **QR code generation** for device setup and app configuration

## Operational Overview

### Device Setup Process
1. **QR code scanning** from admin portal for initial configuration
2. **Email confirmation** to activate device for restaurant use
3. **App validation** confirms payment provider app installation
4. **Automatic configuration** of restaurant settings and integrations

### Ordering Workflow
1. **Round-based ordering** allows multiple order additions to single check
2. **Real-time menu access** from Oracle Simphony system
3. **Team coordination** across multiple devices for large parties
4. **Flexible check management** with split bills and order modifications

### Payment Processing
1. **Integrated payment flow** within the ordering app
2. **Provider app handling** for secure card processing
3. **Tip mode configuration** (percentage, fixed amount, or custom)
4. **Digital receipt delivery** via QR code for customer access

## Multi-Device Restaurant Deployment

- **Coordinated operations** across multiple devices
- **Shared check management** for team-based service
- **Device-specific configuration** managed centrally through admin portal
- **Automatic failover** capabilities for device reliability

## Security Model

- **Device-specific authentication** through email confirmation process
- **Encrypted communication** with Oracle Simphony and payment providers
- **No sensitive data storage** on individual devices
- **Automatic security updates** through app update mechanism

This mobile app provides restaurants with flexible, integrated ordering and payment capabilities while maintaining seamless integration with existing Oracle Simphony POS infrastructure.