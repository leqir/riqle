# Refund Policy & Support Process

**Epic 8 - Story 8.10**

## Purpose
Establish clear, welcoming refund procedures and support processes that signal confidence in quality and respect for students. Refunds should be easy, not adversarial.

---

## Core Principle

**If someone wants a refund, give it immediately—no friction, no questions.**

Reasons:
- Signals confidence in product quality
- Demonstrates trust-first approach
- Removes purchase risk for students
- Filters for right-fit customers
- Protects operator integrity

---

## Refund Policy

### 14-Day No-Questions Refund

**Policy statement:**
```
14-day refund, no questions asked.

If a resource doesn't work for you, just email
support@riqle.com and I'll refund immediately.

The goal is to help students, not extract revenue.
```

### Why 14 Days?

**Long enough to:**
- Download and review materials
- Try applying frameworks
- Evaluate actual value
- Make calm decision

**Not so long that:**
- Students forget they purchased
- Materials become fully consumed
- Refund feels like theft

**14 days is the sweet spot:** Fair to students, sustainable for operator.

### "No Questions Asked" Means Exactly That

**Do NOT ask:**
- "Why are you requesting a refund?"
- "What didn't you like?"
- "Can we offer you something else instead?"
- "Are you sure?"

**Simply respond:**
```
Subject: Refund processed

Hi [Name],

Your refund has been processed and should appear
in your account within 5-7 business days.

No hard feelings—hope you find what you need.

Nathanael
```

**Why no questions:**
- Reduces friction (easier to buy when refund is easy)
- Demonstrates confidence (not defensive)
- Respects student's decision
- Maintains trust even in refund

### Optional: Feedback Request (After Refund)

**After refund is processed**, you may optionally ask:

```
P.S. If you have a moment, I'd appreciate knowing
what didn't work for you. It helps me improve resources
for future students. But no pressure—only if you want to.
```

**Rules:**
- Only AFTER refund is processed
- Make it optional ("no pressure")
- Keep it brief
- Don't argue with feedback

---

## Refund Process

### Step 1: Student Requests Refund

**Email to:** support@riqle.com

**Student says (anything like):**
- "I'd like a refund for [Product Name]"
- "This wasn't what I expected"
- "Can I get my money back?"
- "Please refund my purchase"

### Step 2: Operator Processes Immediately

**Timeline:** Within 24 hours (ideally within 4 hours)

**No verification needed:**
- Don't check purchase date (trust student)
- Don't ask for proof of purchase (look it up)
- Don't require forms or explanations
- Just process refund

**Stripe Refund Process:**
```bash
1. Log into Stripe Dashboard
2. Find payment by email
3. Click "Refund"
4. Select "Full refund"
5. Confirm
```

**Or via Stripe API:**
```typescript
// In webhook handler or admin tool
await stripe.refunds.create({
  payment_intent: paymentIntentId,
  reason: 'requested_by_customer',
});
```

### Step 3: Confirm with Student

**Email template:**
```
Subject: Refund processed

Hi [Name],

Your refund for [Product Name] has been processed.

You should see $[amount] back in your account within
5-7 business days, depending on your bank.

The download links have been deactivated.

No hard feelings—hope you find what you need.

If you have any questions, just reply to this email.

Nathanael
```

**Rules:**
- Confirm refund processed
- State timeline (5-7 days)
- Professional but warm tone
- No defensiveness or guilt-tripping

### Step 4: Update Records

**Database actions:**
```typescript
// Mark order as refunded
await db.order.update({
  where: { id: orderId },
  status: 'refunded',
  refundedAt: new Date(),
});

// Deactivate entitlement
await db.entitlement.update({
  where: { userId_productId },
  active: false,
  revokedAt: new Date(),
  revokeReason: 'Refund requested by customer',
});

// Log for audit trail
await db.auditLog.create({
  action: 'refund_processed',
  entity: 'order',
  entityId: orderId,
  details: {
    productId,
    amount: order.total,
    reason: 'requested_by_customer',
  },
});
```

### Step 5: Deactivate Access

**What to deactivate:**
- Download links (if time-limited)
- Course access (if applicable)
- Future updates (if subscription-like)

**What NOT to do:**
- Delete files they already downloaded
- Retroactively block access to what they had
- Make it punitive

**Why:** They got a refund; that's the end of it. No punishment.

---

## Refund Edge Cases

### Outside 14-Day Window

**If student requests after 14 days:**

Option 1 (Recommended): Grant anyway
```
Hi [Name],

I see it's been [X] days since purchase, but I'm
happy to process the refund anyway. It's processing
now and should appear in your account in 5-7 days.

Nathanael
```

Option 2: Politely decline (only if clearly abuse)
```
Hi [Name],

My standard policy is 14 days, and it's been [X] days
since your purchase.

That said, if there's a specific issue with the
resource, I'm happy to discuss. Just let me know
what's going on.

Nathanael
```

**Default to Option 1 unless:**
- Pattern of abuse (same person, multiple refunds)
- Extremely long time (6+ months)
- Suspicious behavior

**Why generous:** Goodwill costs less than bad reputation

### Technical Issues

**If student says:**
- "Download links don't work"
- "Files are corrupted"
- "Can't access materials"

**Response: Fix first, refund if not resolved**
```
Hi [Name],

Sorry to hear you're having trouble accessing the files.

Let me send you fresh download links right now:
[Links]

If those don't work, let me know and I'll refund
you immediately. The goal is for this to work, not
to make you jump through hoops.

Nathanael
```

**Why:** Technical issues aren't quality issues. Try to solve.

### Duplicate Purchases

**If student accidentally bought twice:**

**Response: Refund duplicate immediately**
```
Hi [Name],

I see you purchased [Product] twice. I've refunded
the duplicate purchase immediately.

You should see $[amount] back in your account
within 5-7 days.

Let me know if you need anything else!

Nathanael
```

### Wrong Product

**If student bought wrong thing:**

**Response: Refund + offer correct product**
```
Hi [Name],

I've processed your refund for [Wrong Product].

Based on what you described, [Correct Product] might
be a better fit. Here's the link if you want to check
it out: [Link]

But no pressure—just wanted to point you in the
right direction.

Nathanael
```

**Why:** Help them find right solution, don't just refund and abandon

---

## Support Process

### Support Channels

**Primary: Email**
- support@riqle.com
- Response time: <24 hours (aim for <4 hours)
- Handles: Refunds, access issues, questions

**Why email:**
- Asynchronous (no pressure)
- Written record
- Professional
- Scalable

**NOT supported:**
- Live chat (creates pressure)
- Phone support (not scalable)
- Social media DMs (not professional)

### Support Email Template

**For general questions:**
```
Subject: Re: [Student's subject]

Hi [Name],

[Direct answer to question]

[Additional helpful context if relevant]

Let me know if you need anything else!

Nathanael
```

**Rules:**
- Answer directly (no fluff)
- Be helpful but concise
- Sign with real name (not "Support Team")
- Respond within 24 hours

### Common Support Requests

#### 1. Download Links Not Working

**Response:**
```
Hi [Name],

I've generated fresh download links for you:
[Links]

These links will work for 7 days.

If you still have trouble, just let me know and
I'll find another way to get you the files.

Nathanael
```

#### 2. Questions About Content

**Response:**
```
Hi [Name],

[Direct answer]

If this resource doesn't cover what you need,
let me know and I can point you to something
else—or just refund you if nothing fits.

Nathanael
```

#### 3. Technical Questions

**Response:**
```
Hi [Name],

[Direct answer if simple]

If this gets complicated, feel free to request
a refund instead. I don't want you fighting
with technical issues.

Nathanael
```

#### 4. Requests for Customization

**Response:**
```
Hi [Name],

The resource is designed for [target audience]
and doesn't include [requested feature].

If that doesn't work for you, I'm happy to
refund. No hard feelings.

Alternatively, [suggest workaround if simple].

Nathanael
```

---

## Refund Rate Monitoring

### Target Refund Rate: <5%

**If refund rate <2%:**
- Suggests very good fit
- Or price too low (people don't bother refunding)
- Review pricing against value

**If refund rate 2-5%:**
- Healthy range
- Normal filtering for fit
- Maintain current approach

**If refund rate >5%:**
- Quality issue (review product)
- Clarity issue (description not matching reality)
- Wrong audience targeting

**Actions when >5%:**
1. Review refund reasons (if students shared)
2. Compare product description vs. actual content
3. Check if targeting right audience
4. Consider product quality improvements
5. Don't lower price (fixes wrong problem)

### Monthly Refund Review

**Questions to ask:**
1. What's the current refund rate?
2. Are there patterns in refund timing?
3. Any common reasons mentioned?
4. Do any products have higher refund rates?
5. Is anything broken or misleading?

**Actions:**
- Document patterns
- Update product descriptions if clarity issue
- Improve quality if quality issue
- Consider retiring product if persistent issues

---

## Refund Philosophy: Why This Approach?

### Employer Perspective
**Impression:** "They handle customer issues professionally"

- Easy refunds signal confidence
- No defensiveness shows maturity
- Professional process demonstrates capability
- Would mention in interview proudly

### Student Perspective
**Impression:** "This is safe to try"

- Easy refunds reduce purchase risk
- No-questions policy builds trust
- Fast processing respects their time
- Makes them more likely to buy

### Operator Perspective
**Impression:** "I'm selling with integrity"

- Easy refunds filter for right customers
- No guilt about pricing or quality
- Comfortable discussing in interviews
- Sleep well at night

---

## Support Philosophy

### Not a Cost Center, a Quality Signal

**Good support:**
- Increases trust (future purchases)
- Filters for good-fit customers
- Builds reputation
- Demonstrates professionalism

**Bad support:**
- Defensive, argumentative
- Friction-filled refunds
- Ghosting customers
- Makes refunds adversarial

**Rule:** Treat support as marketing, not expense

---

## Email Tone Guidelines

### ✅ Good Tone

**Characteristics:**
- Warm but professional
- Direct but helpful
- Human (sign with real name)
- Solution-focused

**Examples:**
```
"I've processed your refund—no hard feelings."
"Let me send you fresh links right now."
"If that doesn't work, just let me know."
```

### ❌ Bad Tone

**Avoid:**
- Defensive ("Our policy clearly states...")
- Robotic ("Your ticket #12345 has been...")
- Guilt-trippy ("We put so much work into...")
- Corporate ("Per our Terms of Service...")

**Examples to avoid:**
```
"As stated in our refund policy..."
"We regret to inform you that..."
"Your request has been escalated to..."
"Please review our FAQ before contacting..."
```

---

## Summary

**Refund policy:**

1. **14-day no-questions refund** (easy, not adversarial)
2. **Process within 24 hours** (respect student's time)
3. **No friction or forms** (trust by default)
4. **Warm but professional** (human, not corporate)
5. **Target <5% refund rate** (quality signal)

**Support philosophy:**

1. **Email only** (professional, asynchronous)
2. **<24 hour response** (respect time)
3. **Solution-focused** (help, don't defend)
4. **Sign with real name** (human, not "Support Team")

**The test:**
Would you feel proud if a hiring manager asked, "How do you handle refunds?"

If yes, policy is correct.
If no, make it easier and more welcoming.

**Remember:**
Easy refunds signal confidence. Adversarial refunds signal desperation.

---

**Last Updated:** 2026-01-04
**Maintained By:** Nathanael
