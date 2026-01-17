# Post-Purchase Success Criteria

**Epic:** 10 - Customer Access & Delivery
**Story:** 10.1 - Core Job-to-Be-Done
**Status:** Complete
**Last Updated:** 2026-01-05

---

## Purpose

Define measurable success criteria for the post-purchase experience to ensure customers never wonder what happens after payment.

## Core Job-to-Be-Done

**When a customer completes a purchase, they need to:**

1. Know exactly where their purchase is
2. Know how to access it immediately
3. Know how to access it again later
4. Know what to do if something goes wrong
5. Feel relief, not anxiety

---

## Customer Success Criteria

### Customer Never Wonders

- [ ] Where purchased content is
- [ ] How to access it
- [ ] How to access it again later
- [ ] What to do if link is lost
- [ ] How to get support

### Support Inquiries Target

**Goal:** Minimize preventable support requests through proactive clarity

- **"I can't find my purchase" emails:** <5% of purchases
- **"How do I download" emails:** <2% of purchases
- **Access-related support:** <10% of purchases total

### Customer Experience Goals

- **Immediate clarity post-purchase** - Within 60 seconds of payment
- **Self-serve recovery** - No support needed for lost access
- **No confusion about access** - Single, clear path to files
- **Relief, not regret** - Emotional response is calm confidence

---

## Questions Customers Ask (And Our Answers)

### 1. "Where is my stuff?"

**When asked:** Immediately after payment, on checkout success page

**Answer:**
- **Success page:** "Your purchase is ready. Check your email for access instructions."
- **Email (within 60s):** "Your [Product Name] is ready to access" with direct link
- **Access page:** Shows download links immediately

**Implementation:**
- Stripe checkout redirects to `/resources/success?session_id={id}`
- Success page shows clear "Check your email" message
- Email sent automatically via webhook fulfillment
- Email contains magic link to access page

---

### 2. "How do I access it?"

**When asked:** On success page, in email, when returning later

**Answer:**
- **Success page:** "We've sent an email to [email] with your access link"
- **Email:** Big, obvious "Access Your Purchase" button
- **Access page:** Clean list of download buttons

**Implementation:**
- Email contains JWT-signed magic link: `/access/[productSlug]?token={jwt}`
- Access page validates token → checks entitlement → shows downloads
- Download buttons trigger signed URL generation
- Files served securely with 1-hour expiry

---

### 3. "How do I access it again later?"

**When asked:** Days/weeks after purchase, when link is lost

**Answer:**
- **Proactive (in email):** "Save this email - you can use it anytime to access your purchase"
- **Recovery flow:** Visit product page → "Already purchased? Click here to resend access"
- **Support (if needed):** "Email support@riqle.com with your purchase email"

**Implementation:**
- Magic links don't expire for 7 days (can be extended)
- Product pages detect existing entitlement → show "Access Your Purchase" instead of "Buy"
- Self-serve email resend: `/access/resend?email={email}&productId={id}`
- Admin can manually regenerate access links

---

### 4. "What if I lose the link?"

**When asked:** When customer can't find original email

**Answer:**
- **Product page:** "Already purchased this? We'll resend your access link."
- **Resend page:** Enter purchase email → receive new magic link
- **No friction:** No account required, just email verification

**Implementation:**
- `/access/resend` page with email input
- Validates email has entitlement for product
- Generates new JWT token
- Sends fresh access email
- Rate limited: 3 resends per hour per email

---

### 5. "What if something goes wrong?"

**When asked:** When download fails, access denied, or email not received

**Answer:**
- **Access page errors:** Clear, actionable error messages
- **Email not received:** "Didn't receive email? Check spam, or resend here"
- **Download fails:** "Download failed? Click here to try again"
- **Support fallback:** "Still having trouble? Email support@riqle.com"

**Implementation:**
- Error states with specific fixes (see Story 10.10)
- Retry buttons for failed operations
- Spam folder reminder on success page
- Support email prominently displayed
- Admin tools to diagnose access issues (see Story 10.11)

---

### 6. "Can I download multiple times?"

**When asked:** When customer wants to re-download or download on multiple devices

**Answer:**
- **Access page:** "You can download as many times as you need"
- **No artificial limits:** Trust-based approach
- **Reasonable limits:** Soft rate limiting (e.g., 10 downloads/hour) to prevent abuse

**Implementation:**
- No hard download limits
- Soft rate limiting via Redis/Upstash
- Monitoring for abuse patterns
- Manual intervention only if needed

---

### 7. "What format is it in?"

**When asked:** Before and after purchase

**Answer:**
- **Product page:** Clear "Format: PDF" or "Format: Notion Template" label
- **Email:** Mentions format in description
- **Access page:** Shows file format and size

**Implementation:**
- Product.format field displayed everywhere
- File metadata shown on access page
- Clear iconography for different formats

---

### 8. "Can I get a refund?"

**When asked:** Within 14 days of purchase, if dissatisfied

**Answer:**
- **Product page:** "14-day refund, no questions asked"
- **Confirmation email:** Refund policy clearly stated
- **Access page:** Link to refund request form
- **Support:** "Email support@riqle.com for refund requests"

**Implementation:**
- Manual refund processing via Stripe Dashboard
- Automatic entitlement revocation on refund (Epic 9)
- Refund notification email sent automatically
- Access revoked immediately upon refund

---

## Proactive Flow Design

### Flow 1: Perfect Path (95% of customers)

```
Payment completes
  ↓
Success page shows: "Check email for access"
  ↓
Email arrives (within 60s) with magic link
  ↓
Customer clicks link
  ↓
Access page loads, validates entitlement
  ↓
Download buttons shown
  ↓
Customer downloads files
  ↓
[Done - no questions asked]
```

**Design Requirements:**
- Success page: Clear, calm confirmation
- Email: Arrives within 60 seconds
- Magic link: Works immediately
- Access page: No login required
- Downloads: Immediate, no friction

---

### Flow 2: Lost Email (4% of customers)

```
Customer can't find email
  ↓
Returns to product page
  ↓
Sees "Already purchased? Resend access" button
  ↓
Enters email
  ↓
Receives new magic link
  ↓
[Rejoins perfect path]
```

**Design Requirements:**
- Product pages detect existing entitlement
- Prominent "Resend access" option
- Email verification (no spam)
- Instant email resend

---

### Flow 3: Support Required (1% of customers)

```
Customer has unusual issue
  ↓
Error message shows specific problem
  ↓
Suggests self-serve fix if possible
  ↓
If not resolved: Shows support email
  ↓
Customer emails support
  ↓
Admin uses tools to diagnose and fix
```

**Design Requirements:**
- Actionable error messages
- Self-serve options where possible
- Clear support email address
- Admin diagnostic tools (Story 10.11)

---

## Success Metrics

### Quantitative

| Metric | Target | Measurement |
|--------|--------|-------------|
| Email delivery rate | >99% | Monitor Resend delivery logs |
| Email open rate | >60% | Resend analytics |
| Access link click rate | >80% | Track magic link usage |
| Support requests (access) | <10% | Manual tracking |
| "Can't find purchase" emails | <5% | Manual tracking |
| Average time to first download | <5 minutes | Monitor access logs |

### Qualitative

- Customer sentiment: Relief, not anxiety
- Clarity: No confusion about next steps
- Trust: System feels reliable, not fragile
- Professionalism: Employer signal maintained

---

## Testing Checklist

### Clarity Test
- [ ] Customer knows where purchase is within 60 seconds
- [ ] Customer can explain access process in one sentence
- [ ] No ambiguous language in emails or UI

### Support Test
- [ ] Access-related support <10% of purchases
- [ ] "Can't find purchase" emails <5%
- [ ] Support team can resolve access issues in <5 minutes

### Anxiety Test
- [ ] Customer feels relief after purchase
- [ ] No post-purchase uncertainty
- [ ] Recovery flows are obvious and accessible

### Self-Serve Test
- [ ] Customer can resend access without support
- [ ] Customer can re-download without limits
- [ ] Customer knows what to do if something fails

---

## Dependencies

**Required from Epic 9:**
- ✅ Webhook fulfillment creates entitlements
- ✅ Confirmation email sent automatically
- ✅ Order records created correctly

**Required from Epic 10:**
- ⏳ Story 10.2: Access philosophy defined
- ⏳ Story 10.3: Access model chosen (email-based)
- ⏳ Story 10.4: Post-purchase confirmation page
- ⏳ Story 10.5: Access landing pages with entitlement checks
- ⏳ Story 10.6: Secure download implementation
- ⏳ Story 10.7: Self-serve recovery flows

---

## Review Criteria

Before marking Story 10.1 complete:

- [ ] All customer questions documented
- [ ] All questions have clear, proactive answers
- [ ] Flows designed to prevent questions being asked
- [ ] Success criteria are measurable
- [ ] Testing requirements are clear
- [ ] No gaps in customer journey coverage

---

**Status:** ✅ Story 10.1 Complete - Post-Purchase Success Criteria Defined
**Next:** Story 10.2 - Access Philosophy Document
