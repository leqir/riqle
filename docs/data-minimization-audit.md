# Data Minimization Audit

## Overview

This document audits the data collected by the Riqle platform against the principle: **"If you don't collect it, you can't leak it."**

**Audit Date:** 2024-01-27
**Next Review:** 2024-02-27

---

## Data Minimization Philosophy

### Core Principle

Collect only what is **absolutely necessary** for the product to function. No extra fields "just in case" or "for the future."

### What We DO Collect

1. **Email** (User.email) - **Required**
   - **Purpose**: User identification, order confirmation, access delivery
   - **Justification**: Essential for passwordless auth and digital delivery
   - **GDPR Classification**: Personal Data

2. **Purchase Records** (Order table)
   - **Fields**: Order ID, Total, Currency, Stripe IDs
   - **Purpose**: Financial record keeping, tax compliance, refund processing
   - **Justification**: Legal requirement (7 years retention)
   - **GDPR Classification**: Personal Data

3. **Entitlements** (Entitlement table)
   - **Fields**: User ID, Product ID, Active status, Expiry date
   - **Purpose**: Access control for paid products
   - **Justification**: Core business function
   - **GDPR Classification**: Personal Data

4. **Customer Email (Order.customerEmail)** - **Required**
   - **Purpose**: Order fulfillment without user account requirement
   - **Justification**: Allows purchases without registration
   - **Note**: Denormalized for easy lookup
   - **GDPR Classification**: Personal Data

### What We DON'T Collect (Intentionally)

| Field | Why We DON'T Collect It |
|-------|------------------------|
| **Name** | Not needed for digital product delivery. Email is sufficient identifier. |
| **Phone Number** | Not needed for digital delivery. Email is sufficient communication channel. |
| **Address** | Not needed for digital products. No physical shipping. |
| **Date of Birth** | Not relevant to product or service. |
| **Gender** | Not relevant to product or service. |
| **Demographics** | Not needed for core business function. Complicates GDPR compliance. |
| **Behavioral Analytics** | Minimal analytics only. No cross-site tracking. No user profiling. |
| **IP Addresses** | Only temporarily for fraud prevention (not stored long-term). |
| **Credit Card Numbers** | Stripe handles all payment data (PCI compliant). We never see card numbers. |
| **Passwords** | Passwordless auth (magic links) eliminates password storage risks. |

---

## Schema Audit: Current State

### ✅ COMPLIANT: Minimal Required Data

**User Model (Minimal)**
```prisma
model User {
  id                String   @id @default(cuid())
  email             String   @unique           // ✅ Required, essential
  stripeCustomerId  String?  @unique           // ✅ Optional, for Stripe integration
  emailVerified     DateTime?                 // ✅ Optional, for auth verification
  createdAt         DateTime @default(now())   // ✅ Audit trail
  updatedAt         DateTime @updatedAt        // ✅ Audit trail
}
```

**Order Model (Minimal)**
```prisma
model Order {
  id                    String  @id
  userId                String?                // ✅ Optional (allow guest purchases)
  customerEmail         String                 // ✅ Required, for fulfillment
  total                 Int                    // ✅ Required, financial record
  currency              String @default("USD") // ✅ Required, financial record
  stripeSessionId       String? @unique        // ✅ Optional, Stripe integration
  stripePaymentIntentId String? @unique        // ✅ Optional, Stripe integration
  status                OrderStatus            // ✅ Required, order tracking
  createdAt             DateTime @default(now()) // ✅ Audit trail
  updatedAt             DateTime               // ✅ Audit trail
}
```

**Entitlement Model (Minimal)**
```prisma
model Entitlement {
  id        String   @id
  userId    String                   // ✅ Required, access control
  productId String                   // ✅ Required, access control
  orderId   String?                  // ✅ Optional, audit trail
  active    Boolean @default(true)   // ✅ Required, access control
  expiresAt DateTime?                // ✅ Optional, time-limited access
  createdAt DateTime @default(now()) // ✅ Audit trail
}
```

### ⚠️ REVIEW: Optional Fields (Not Critical)

**User Model - Optional Fields**
```prisma
model User {
  name     String?  // ⚠️ Optional, consider removing
  password String?  // ⚠️ Optional, passwordless auth preferred
  image    String?  // ⚠️ Optional, not essential
}
```

**Recommendation**:
- `name`: Remove if not used. Email is sufficient identifier.
- `password`: Keep optional for future flexibility, but prefer magic links.
- `image`: Remove if not used. Profile pictures not needed for this product.

**Order Model - Optional Fields**
```prisma
model Order {
  customerName String?  // ⚠️ Optional, consider removing
}
```

**Recommendation**:
- `customerName`: Remove. Not needed for digital product delivery. Adds PII surface area with no benefit.

### ✅ COMPLIANT: Audit & System Fields

**Audit Log**
```prisma
model AuditLog {
  id        String   @id
  userId    String?                 // ✅ Optional, some actions are anonymous
  action    String                  // ✅ Required, what happened
  entity    String                  // ✅ Required, what was affected
  entityId  String                  // ✅ Required, which record
  details   Json?                   // ✅ Optional, additional context
  ipAddress String?                 // ⚠️ PII - should be temporary only
  userAgent String?                 // ⚠️ PII - should be temporary only
  createdAt DateTime @default(now()) // ✅ Required, when it happened
}
```

**Recommendation**:
- `ipAddress` and `userAgent`: Implement 30-day auto-delete policy. Only for fraud detection, not long-term storage.

---

## Data Retention Policy

| Data Type | Retention Period | Justification |
|-----------|-----------------|---------------|
| User Accounts | Until user deletes account | Core business data |
| Orders | 7 years | Tax/legal requirement |
| Entitlements | Until revoked or expired | Access control |
| Email Logs | 30 days | Operational debugging |
| Audit Logs | 90 days | Security monitoring |
| IP Addresses | 30 days max | Fraud prevention only |
| Failed Jobs | 7 days | Operational debugging |

---

## Privacy by Design: Implementation

### ✅ Implemented

1. **Email-Only Authentication**
   - No passwords to store or hash
   - No password resets needed
   - Simpler, more secure

2. **Guest Checkout**
   - Order.userId is optional
   - Users can purchase without creating account
   - Email used for delivery

3. **Denormalized Email in Orders**
   - Order.customerEmail is separate from User.email
   - Orders exist independently of user accounts
   - Allows account deletion without breaking order history

4. **Stripe Integration**
   - Stripe handles all payment data (PCI compliant)
   - We never see credit card numbers
   - Reduces our PII surface area dramatically

5. **Minimal Analytics**
   - No cross-site tracking
   - No user profiling
   - No behavioral analytics
   - Server-side only (Vercel Analytics)

### 🚧 To Implement

1. **Auto-Delete IP Addresses**
   - Implement scheduled job to delete IP addresses older than 30 days
   - Keep only for fraud detection window

2. **Remove Unused Optional Fields**
   - Consider removing `User.name` if not actively used
   - Consider removing `User.image` if not actively used
   - Remove `Order.customerName` (not needed)

3. **Data Export Tool**
   - User can request all their data in JSON format
   - GDPR Article 20: Right to data portability

4. **Data Deletion Tool**
   - User can delete their account and data
   - Anonymize historical order records (keep for tax, remove PII)
   - GDPR Article 17: Right to erasure

---

## GDPR Compliance Checklist

### Article 5: Principles

- [x] **Lawfulness, fairness, transparency**: Clear privacy policy, transparent data use
- [x] **Purpose limitation**: Only collect data for stated purposes
- [x] **Data minimization**: Collect only what's necessary (this audit)
- [x] **Accuracy**: Users can update their email
- [ ] **Storage limitation**: Implement retention periods and auto-delete
- [x] **Integrity and confidentiality**: HTTPS, database encryption
- [x] **Accountability**: This documentation, audit trail

### User Rights

- [x] **Right to access** (Article 15): Users can see their data
- [ ] **Right to rectification** (Article 16): Users can update their email
- [ ] **Right to erasure** (Article 17): Need to implement deletion tool
- [ ] **Right to data portability** (Article 20): Need to implement export tool
- [x] **Right to object** (Article 21): Users can object to processing (we collect minimal data)

---

## Recommendations

### High Priority

1. **Remove `Order.customerName`**
   - Not needed for digital delivery
   - Reduces PII surface area
   - Migration: Set to NULL, remove field

2. **Implement Data Deletion**
   - Allow users to delete account via admin panel or API
   - Anonymize orders (keep for tax, remove email)
   - Delete all other personal data

3. **Implement Data Export**
   - Provide JSON export of all user data
   - Include: profile, orders, entitlements
   - GDPR Article 20 compliance

### Medium Priority

4. **Auto-Delete IP Addresses**
   - Scheduled job: Delete IP addresses older than 30 days
   - Keep audit logs but remove IP/User-Agent

5. **Review Optional Fields**
   - `User.name`: Remove if not used in UI
   - `User.image`: Remove if not used in UI
   - `User.password`: Keep optional, but prefer magic links

### Low Priority

6. **Data Minimization Monitoring**
   - Alert when new PII fields added to schema
   - Require justification for any new personal data field
   - Code review checklist includes data minimization

---

## Security Posture Statement (Updated)

"We protect what matters using proven, boring security practices. We collect minimal data (email, orders, entitlements only), secure it properly, and are transparent about our approach. We're not paranoid, but we're not careless. **If you don't collect it, you can't leak it.**"

---

## References

- GDPR: https://gdpr.eu/
- ICO Data Minimization: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/
- Privacy by Design: https://www.ipc.on.ca/wp-content/uploads/Resources/7foundationalprinciples.pdf

---

Last Updated: 2024-01-27
Next Audit: 2024-02-27
