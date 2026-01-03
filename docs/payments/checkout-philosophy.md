# Checkout Philosophy: Boring Is a Feature

**Epic 9 - Story 9.2: Trust Through Familiarity**
**Created:** 2026-01-04
**Status:** Active Governance

---

## Core Principle

**Making money invisible means making checkout boring.**

Not hidden — **boring, reliable, and unquestionable**.

---

## Design Principles

### 1. Stripe-Native Look and Feel

✅ **Do:**

- Use Stripe Checkout (hosted payment page)
- Don't customize beyond logo and brand color
- Leverage Stripe's built-in trustworthiness
- Let Stripe handle all payment UI

❌ **Don't:**

- Build custom payment forms
- Try to make checkout "unique"
- Override Stripe's design patterns

**Why:** Stripe has spent millions building trust. Customers recognize and trust their interface. Your custom checkout can't compete with that trust signal.

### 2. Minimal Copy

✅ **Do:**

- Product name
- Price
- "Purchase" button
- Essential details only

❌ **Don't:**

- Sales copy on checkout page
- Multiple CTAs
- Persuasion language
- Marketing messages

**Example - Good:**

```
1984 Common Module Exemplar Essay
$59 AUD

[Purchase]

14-day refund, no questions asked
```

**Example - Bad:**

```
🔥 LIMITED TIME: 1984 Essay Masterclass
NORMALLY $199 → TODAY ONLY $59!
⏰ Offer expires in 2:34:12

✨ EXCLUSIVE BONUSES:
• 3 extra essay guides FREE!
• Personal feedback session ($200 value)
• Lifetime updates ($99 value)

Total Value: $498 → You Pay: $59 (88% OFF!)

Only 3 spots left at this price!

[BUY NOW BEFORE IT'S GONE →]
```

### 3. One Decision Per Screen

✅ **Do:**

- Payment details
- Confirm purchase
- That's it

❌ **Don't:**

- Upsells ("Want premium?")
- Cross-sells ("Customers also bought...")
- Additional choices
- Optional extras

**Why:** Every additional decision increases friction and decreases trust. Keep checkout to its core job: collect payment.

### 4. No Persuasion Language

**Forbidden phrases:**

- "Limited time"
- "Only X left"
- "Buy now and get..."
- "Special offer"
- "Don't miss out"
- "Hurry"
- "Last chance"
- "Exclusive"
- "Bonus"
- "Free gift"

**Allowed phrases:**

- "Purchase"
- "Complete purchase"
- "Proceed to payment"
- Simple, neutral instructions

---

## Explicit Bans

### ❌ Upsells

**NO:**

- "Upgrade to premium for $20 more?"
- "Add 2 more products for 50% off?"
- "Get the bundle and save $30"

**Why:** Upsells signal that you're trying to extract maximum revenue, not provide value.

### ❌ Cross-sells

**NO:**

- "Customers who bought this also bought..."
- "Recommended for you"
- "Complete your collection"

**Why:** Cross-sells make checkout about sales, not trust.

### ❌ Countdown Timers

**NO:**

- "Offer expires in 02:34:12"
- "Price increases in 3 hours"
- "Timer" of any kind

**Why:** Artificial urgency is manipulation. You're building credibility, not running a clearance sale.

### ❌ Scarcity Language

**NO:**

- "Only 5 spots left"
- "Limited availability"
- "Almost sold out"

**Why:** Digital products don't have scarcity. Fake scarcity damages trust.

### ❌ Bonus Stacking

**NO:**

- "Buy now and get 3 bonuses!"
- "Includes: PDF + Video + Template + Guide"
- "Plus these FREE extras..."

**Why:** If it's valuable, include it. If it's not, don't mention it. Bonus stacking is creator-economy nonsense.

---

## Trust Signals (Allowed)

These are **not** persuasion — they're reassurance:

✅ **Allowed:**

- "14-day refund, no questions asked"
- "Secure payment via Stripe"
- Product format (PDF, Video, etc.)
- What's included (factual list)
- File size/download details

These reduce anxiety without manipulating urgency.

---

## Checkout Flow Design

### Pre-Checkout (Product Detail Page)

**Calm, neutral presentation:**

```
[Product sections: What it is, Who it's for, etc.]

Price: $59 AUD

[Purchase] ← Single button, neutral label

14-day refund, no questions asked
```

### Stripe Checkout (Hosted)

**Let Stripe handle everything:**

- Payment details
- Address (if needed)
- Email confirmation
- Security signals

**Your configuration:**

```typescript
stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [{ price: stripePriceId, quantity: 1 }],
  success_url: '/resources/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: '/resources/[slug]',
  allow_promotion_codes: false, // No discount codes
});
```

### Post-Checkout (Success Page)

**Simple confirmation:**

```
Purchase complete

Thank you for your purchase. You should receive an email with
access instructions shortly.

If you don't receive an email within 5 minutes, please contact support.
```

No:

- Celebration ("Congratulations!")
- Additional offers
- Marketing opt-ins
- Social sharing buttons

---

## Email Confirmations

**Transactional only:**

✅ **Send:**

- Payment confirmation
- Access instructions
- Refund confirmation

❌ **Don't send:**

- Marketing emails
- Newsletter opt-ins
- "While you're here..." emails
- Tips and tricks
- Product updates (unless critical)

**Email tone:**

```
Hi,

Thank you for purchasing [Product Name].

Access your files:
[Download Link]

What's included:
• [Item 1]
• [Item 2]

Need help?
Reply to this email.

Refund policy:
14-day window, no questions asked.

—
Nathanael
```

Simple, functional, respectful.

---

## Forbidden Patterns

### Creator Economy Energy

**Don't:**

- Hype language
- Emoji abuse 🔥🎉💰
- ALL CAPS
- Excessive exclamation marks!!!
- "Value stacking" ($497 value for $47!)

### Conversion Optimization Tricks

**Don't:**

- Exit-intent popups
- Discount codes on first visit
- "Special price just for you"
- Abandoned cart emails
- Price anchoring

### Social Proof Manipulation

**Don't:**

- "1,247 people bought this today"
- Fake live purchase notifications
- "Sarah from Sydney just purchased"
- Testimonials on checkout page

---

## Testing Checkout Philosophy

Before launching any checkout change, ask:

1. **Familiarity Test**
   - Does this feel like Stripe, or like a sales page?

2. **Trust Test**
   - Would you enter your credit card here?

3. **Energy Test**
   - Is there any "creator checkout energy"?

4. **Employer Test**
   - If an employer saw this, would they think "professional" or "sales funnel"?

If any answer is wrong, simplify further.

---

## Example: Good vs Bad

### ✅ Good (Boring = Trustworthy)

```
Product: 1984 Common Module Exemplar Essay
Format: PDF
Price: $59 AUD

[Purchase]

14-day refund, no questions asked
```

### ❌ Bad (Trying Too Hard)

```
🔥 MEGA SALE: HSC English Masterclass Bundle 🔥

⏰ PRICE INCREASES IN: 02:34:12

NORMALLY $497 → TODAY: $59 (88% OFF!)

✨ INSTANT ACCESS TO:
✓ 1984 Exemplar Essay (Valued at $99)
✓ BONUS #1: Essay Template Pack ($149 value)
✓ BONUS #2: Marking Rubric Guide ($99 value)
✓ BONUS #3: Video Walkthrough ($150 value)

🎁 PLUS: Get 3 FREE Resources When You Buy Today!

⚡ ONLY 3 SPOTS LEFT AT THIS PRICE! ⚡

Total Package Value: $497
Your Investment Today: Just $59
You SAVE: $438 (88% OFF)

[🚀 YES! GIVE ME ACCESS NOW →]

❌ This Deal Expires Soon — Don't Miss Out!
```

**The bad example:**

- Screams "sales funnel"
- Multiple CTAs
- Fake urgency
- Value stacking
- Creator economy energy
- Would make employers cringe

---

## Maintenance & Drift Prevention

**Monthly check:**

- Has any persuasion language crept in?
- Are we still using Stripe-native checkout?
- Have we added any upsells?
- Is checkout still boring?

**If drift detected:**

1. Document what changed and why
2. Evaluate against this philosophy
3. Revert if necessary
4. Update philosophy if principles were wrong (rare)

**Remember:** Boring is hard to maintain. Sales tactics are seductive. Stay disciplined.

---

## Why This Matters

When employers evaluate your site, checkout is a **competence signal**:

- **Professional checkout** = "This person can build production systems"
- **Sales funnel checkout** = "This person is a creator entrepreneur"

You're optimizing for employment, not conversion rate.

**Boring checkout is a feature, not a bug.**
