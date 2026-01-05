# Access Model Decision Matrix

**Epic:** 10 - Customer Access & Delivery
**Story:** 10.3 - Access Models (Choose Deliberately)
**Status:** Complete
**Last Updated:** 2026-01-05

---

## Purpose

Document the deliberate choice of access model for Riqle products, ensuring the access method matches product complexity and customer expectations.

---

## Decision Summary

**Primary Access Model:** Email-Based Access
**Rationale:** Simple resources, one-time purchases, avoid unnecessary complexity
**Implementation:** JWT-signed magic links with entitlement validation
**Review Date:** After 100 purchases or 6 months (whichever comes first)

---

## Access Model Options

### Option 1: Email-Based Access

#### Description
Customers receive a magic link via email that grants access to their purchased content. No account creation required.

#### Use When:
- **One-time resources** (PDFs, templates, guides)
- **Simple products** with few files
- **Customer doesn't need frequent re-access**
- **Simplicity is paramount**

#### Technical Implementation:
```typescript
// 1. Generate JWT token
const token = jwt.sign(
  {
    email: customer.email,
    productId: product.id,
    entitlementId: entitlement.id,
  },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// 2. Create magic link
const magicLink = `${process.env.NEXT_PUBLIC_URL}/access/${product.slug}?token=${token}`;

// 3. Send email with link
await sendEmail({
  to: customer.email,
  subject: `Your ${product.title} is ready`,
  body: `Access your purchase: ${magicLink}`,
});

// 4. Validate on access page
const { email, productId } = jwt.verify(token, process.env.JWT_SECRET);
const entitlement = await db.entitlement.findUnique({
  where: { userId_productId: { userId: email, productId } },
});

// 5. Check entitlement is active
if (!entitlement || !entitlement.active) {
  return { error: 'Access denied' };
}

// 6. Show downloads
return { downloads: product.downloads };
```

#### Benefits:
✅ **No account required** - Zero friction for one-time purchases
✅ **Instant access** - Magic link works immediately
✅ **Simple recovery** - Resend email, regenerate link
✅ **Minimal support** - Fewer password reset requests
✅ **Right-sized** - Complexity matches product simplicity
✅ **Privacy-friendly** - No forced data collection

#### Trade-offs:
⚠️ **Links expire** - 7-day default (can be extended)
⚠️ **No dashboard** - Customer must save email or use resend flow
⚠️ **Email dependency** - Lost email requires resend flow
⚠️ **Multi-purchase friction** - Each product has separate email

#### Customer Experience:
1. Purchase completes
2. Receive email with magic link
3. Click link → Access page loads
4. Download files
5. Save email for future access OR use resend flow

#### Example Products:
- "Common Module 1984 Exemplar Essay" (PDF)
- "Notion Daily Planner Template" (Notion duplicate link)
- "Startup Pitch Deck Template" (Google Slides link)

---

### Option 2: Account-Based Access

#### Description
Customers create an account (via magic link or social login) and access purchases through a persistent dashboard.

#### Use When:
- **Multiple products per customer**
- **Frequent re-access expected**
- **Customer wants to see all purchases in one place**
- **Future product updates need to be delivered**
- **Subscription or membership model**

#### Technical Implementation:
```typescript
// 1. Customer creates account (NextAuth magic link)
const user = await signIn('email', { email: customer.email });

// 2. Grant entitlement to user
await db.entitlement.create({
  data: {
    userId: user.id,
    productId: product.id,
    orderId: order.id,
    active: true,
  },
});

// 3. User dashboard shows all entitlements
const entitlements = await db.entitlement.findMany({
  where: { userId: user.id, active: true },
  include: { product: true },
});

// 4. Each product has dedicated access page
// /dashboard/products/[productSlug]

// 5. Downloads require authentication
const session = await getServerSession();
if (!session) {
  return { error: 'Not authenticated' };
}

// 6. Check entitlement
const hasAccess = await checkAccess(session.user.id, productId);
if (!hasAccess) {
  return { error: 'No access' };
}

// 7. Show downloads
return { downloads: product.downloads };
```

#### Benefits:
✅ **Persistent access** - No need to save emails
✅ **Dashboard view** - See all purchases in one place
✅ **Easy updates** - Deliver product updates to existing customers
✅ **Better LTV** - Encourages repeat purchases
✅ **Analytics** - Track usage patterns
✅ **Professional** - Feels like established platform

#### Trade-offs:
⚠️ **Complexity** - More code, more maintenance
⚠️ **Support burden** - Password resets, account lockouts
⚠️ **Forced friction** - Must create account for simple download
⚠️ **Over-engineering** - Overkill for one-time PDFs
⚠️ **Privacy concern** - Requires more data collection

#### Customer Experience:
1. Purchase completes
2. Prompted to create account (or auto-created)
3. Login to dashboard
4. See all purchases listed
5. Click product → Access page → Download

#### Example Products:
- Online courses with multiple lessons
- Membership sites with recurring content
- Software with regular updates
- Multi-product bundles

---

## Decision for Riqle

### Primary Model: Email-Based Access

#### Rationale

**Product Characteristics:**
- Current products: PDFs, templates, guides
- Single-file or simple multi-file products
- One-time purchase model
- No recurring updates expected
- Target audience values simplicity

**Customer Expectations:**
- Simple, frictionless access
- No forced account creation
- Quick download and go
- Privacy-conscious audience

**Technical Considerations:**
- Smaller codebase to maintain
- Lower support burden
- Easier to implement initially
- Can migrate to account-based later if needed

**Employer Signal:**
- Demonstrates right-sizing decisions
- Shows restraint and judgment
- Avoids over-engineering trap
- Matches complexity to need

#### Implementation Requirements

**Required Components:**
1. JWT token generation and validation
2. Magic link email templates
3. Access page with entitlement check
4. Signed URL generation for downloads
5. Self-serve email resend flow

**Database Schema:**
- ✅ Entitlement model (already exists from Epic 9)
- ✅ EmailLog model (already exists)
- ✅ Product model with download URLs

**API Endpoints:**
- `/access/[productSlug]` - Access page with token validation
- `/api/access/resend` - Resend magic link
- `/api/downloads/[productId]` - Generate signed download URLs (already exists)

**Email Templates:**
- Purchase confirmation with magic link
- Access resend email

---

### Secondary Model: Account-Based Access (Future)

#### When to Implement

**Triggers:**
- Launching courses or memberships
- Average customer purchases >2 products
- Customer requests for dashboard
- Need to deliver updates to existing customers

#### Migration Strategy

If/when account-based access is needed:

1. **Add optional account creation**
   - Keep email-based as default
   - Offer "Create account to see all purchases"
   - Don't force migration

2. **Migrate entitlements gradually**
   - Match entitlements by email to user accounts
   - Preserve existing magic links
   - Allow both access methods during transition

3. **Build dashboard incrementally**
   - Start with simple list of entitlements
   - Add features based on actual need
   - Avoid over-building

4. **Communicate clearly**
   - Explain benefits of account
   - Don't create FOMO or urgency
   - Make migration optional, not mandatory

---

## Comparison Matrix

| Criteria | Email-Based | Account-Based | Winner |
|----------|-------------|---------------|--------|
| **Simplicity** | ⭐⭐⭐⭐⭐ | ⭐⭐ | Email |
| **Friction** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Email |
| **Privacy** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Email |
| **Support burden** | ⭐⭐⭐⭐ | ⭐⭐ | Email |
| **Multi-purchase UX** | ⭐⭐ | ⭐⭐⭐⭐⭐ | Account |
| **Persistent access** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Account |
| **Update delivery** | ⭐⭐ | ⭐⭐⭐⭐⭐ | Account |
| **Initial dev time** | ⭐⭐⭐⭐⭐ | ⭐⭐ | Email |
| **Maintenance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Email |
| **Matches current products** | ⭐⭐⭐⭐⭐ | ⭐⭐ | Email |

**Score for Riqle (Current):** Email-Based Access wins 8/10 criteria

---

## Implementation Plan

### Phase 1: Email-Based Access (Current Epic 10)

**Stories:**
- ✅ 10.1: Core job-to-be-done documentation
- ✅ 10.2: Access philosophy document
- ✅ 10.3: Access model decision (this document)
- ⏳ 10.4: Post-purchase confirmation
- ⏳ 10.5: Access landing pages
- ⏳ 10.6: Secure downloads
- ⏳ 10.7: Recovery flows
- ⏳ 10.8-10.14: Supporting stories

**Timeline:** Epic 10 completion (estimated 2-3 weeks)

### Phase 2: Account-Based Access (Future, if needed)

**Triggers:**
- Launching subscription products
- Average customer purchases >2 products
- Support requests for unified dashboard

**Stories (Future Epic):**
- User dashboard creation
- Entitlement migration tools
- Account linking from email-based purchases
- Optional account creation flow

**Timeline:** TBD based on product roadmap

---

## Architecture: Email-Based Access

### Flow Diagram

```
Purchase completes (Stripe webhook)
  ↓
Entitlement granted (Epic 9)
  ↓
JWT token generated
  {
    email: customer@example.com,
    productId: "prod_123",
    entitlementId: "ent_456",
    exp: Date.now() + 7 days
  }
  ↓
Magic link created
  https://riqle.com/access/product-slug?token=eyJhbGc...
  ↓
Email sent to customer (Epic 9)
  ↓
Customer clicks magic link
  ↓
Access page validates token
  - JWT signature valid?
  - Token not expired?
  - Entitlement exists?
  - Entitlement active?
  ↓
Downloads shown
  - Generate signed URLs (1-hour expiry)
  - Show download buttons
  ↓
Customer downloads files
  ↓
[Done]
```

### Recovery Flow Diagram

```
Customer lost email
  ↓
Visits product page
  ↓
Sees "Already purchased? Resend access"
  ↓
Clicks resend
  ↓
Enters email
  ↓
System checks:
  - Email has entitlement for this product?
  - Entitlement is active?
  ↓
If yes:
  - Generate new JWT token
  - Send new magic link email
  ↓
If no:
  - Show "No purchase found for this email"
  - Suggest checking email or contacting support
```

---

## Security Considerations

### JWT Token Security

**Expiry:** 7 days (configurable)
- Long enough for customer convenience
- Short enough to limit exposure if leaked

**Payload:**
```json
{
  "email": "customer@example.com",
  "productId": "prod_123",
  "entitlementId": "ent_456",
  "iat": 1704409200,
  "exp": 1705014000
}
```

**Signing:** HS256 with strong secret (32+ character random string)

**Validation:** Always check:
1. Signature is valid
2. Token not expired
3. Entitlement exists in database
4. Entitlement is active

### Download URL Security

**Signed URLs:** 1-hour expiry
- Generated on-demand
- Not stored anywhere
- Regenerated each access

**Private storage:** Vercel Blob or S3 private bucket
- Files not publicly accessible
- Signed URLs required for download

**Rate limiting:** Soft limits to prevent abuse
- 10 downloads per hour per entitlement
- Monitored for abuse patterns

---

## Testing Requirements

### Complexity Match Test

**Question:** Does access method match product complexity?
**Test:** Compare access flow complexity to product value/complexity
**Pass criteria:** Simple products have simple access

**Result:** ✅ Pass - Email-based access matches simple PDF products

### Confusion Test

**Question:** Are customers confused by access options?
**Test:** User testing, support request analysis
**Pass criteria:** <10% support requests about "how to access"

**Result:** ⏳ Pending implementation

### Consistency Test

**Question:** Is one model used per product type?
**Test:** Audit all products for access method consistency
**Pass criteria:** All current products use email-based access

**Result:** ✅ Pass - Single model chosen for all current products

---

## Review Checklist

Before marking Story 10.3 complete:

- [x] Access model decision matrix created
- [x] Primary model chosen with clear rationale
- [x] Implementation requirements documented
- [x] Migration path defined (if needed later)
- [x] Security considerations addressed
- [x] Testing requirements defined
- [x] Comparison criteria evaluated
- [x] Flow diagrams created

---

**Status:** ✅ Story 10.3 Complete - Email-Based Access Model Chosen
**Next:** Story 10.4 - Post-Purchase Confirmation Experience
