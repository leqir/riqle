# Commerce UX Guidelines

**Epic 8 - Story 8.8**

## Purpose
Define specific UX patterns for the Resources section that create a calm, trustworthy commerce experience. Ensure every interaction signals professionalism, clarity, and respect—never pressure or manipulation.

---

## Core Principle

**Commerce should feel boring and safe, not exciting or pressured.**

The goal is for students to:
- Evaluate calmly
- Decide rationally
- Purchase confidently
- Feel respected throughout

---

## UX Philosophy: Three Emotional States

### 1. Before Purchase: Calm Evaluation
**Desired feeling:** "I can take my time to decide. No one is rushing me."

**UX Patterns:**
- Static pricing (no countdown timers)
- Complete information upfront
- No popups or interruptions
- Clear exit paths (can leave anytime)
- No pressure language

### 2. During Purchase: Confident Transaction
**Desired feeling:** "This is straightforward. I know exactly what's happening."

**UX Patterns:**
- Stripe-native checkout (trusted platform)
- Clear steps shown
- Transparent about what happens next
- Refund policy visible
- Professional, clean presentation

### 3. After Purchase: Satisfied Resolution
**Desired feeling:** "I got what I expected. This was worth it."

**UX Patterns:**
- Immediate access to materials
- Clear delivery confirmation
- Support contact visible
- Refund process simple
- No upsells or cross-sells

---

## Component-Level Guidelines

### Resource Listing Page (/resources)

#### Header Section
```tsx
✅ Good:
<h1>Resources</h1>
<p>Educational materials created from teaching 500+ HSC students...</p>

❌ Bad:
<h1>🔥 Premium HSC Resources</h1>
<p>Transform your grades with our PROVEN systems!</p>
```

**Rules:**
- Calm headline (no emojis, no hype)
- Informational intro (not promotional)
- Philosophy-first (explain why these exist)
- No "featured deals" or urgency

#### Resource Cards
```tsx
✅ Good:
<ResourceCard
  title="HSC Essay Framework"
  description="Practical essay structure based on 500+ marked essays"
  format="PDF"
  price="A$69"
  cta="View details"
/>

❌ Bad:
<ResourceCard
  title="🎯 MASTER HSC Essays!"
  description="Revolutionary framework - Get Band 6 FAST!"
  format="PDF + BONUSES"
  price="$69 (SAVE $30!)"
  cta="BUY NOW"
/>
```

**Rules:**
- Title: Clear, descriptive (no hype)
- Description: One-line summary (factual)
- Format: Simple, honest
- Price: Transparent, clean (no fake discounts)
- CTA: Calm language ("View details", not "Buy now")

#### Footer Trust Note
```tsx
✅ Good:
<footer>
  <h3>Refund Policy</h3>
  <p>14-day refund, no questions asked. If a resource doesn't
     work for you, just email and I'll refund immediately.</p>
</footer>

❌ Bad:
<footer>
  <h3>🎁 Special Offer!</h3>
  <p>Buy 2 get 1 FREE! Limited time only...</p>
</footer>
```

**Rules:**
- Trust-building message (not sales)
- Refund policy prominent
- Calm tone (not promotional)
- No urgency or pressure

---

### Resource Detail Page (/resources/[slug])

#### Content Structure (7 Required Sections)

**1. Header**
```tsx
✅ Good:
<header>
  <h1>HSC Essay Structure Framework</h1>
  <p>Practical framework for organizing HSC English essays...</p>
</header>

❌ Bad:
<header>
  <span className="badge">🔥 BESTSELLER</span>
  <h1>The ULTIMATE HSC Essay System!</h1>
  <p>Join 1000+ students getting Band 6...</p>
</header>
```

**2. Who It's For (Clarity Section)**
```tsx
✅ Good:
<section>
  <h2>Who this is for</h2>
  <div>
    <p>✓ This is for: HSC English Advanced students...</p>
    <p>✗ This is NOT for: University essays...</p>
  </div>
</section>

❌ Bad:
<section>
  <h2>Is this for you?</h2>
  <p>If you're serious about getting Band 6...</p>
  <button>Take the quiz!</button>
</section>
```

**Rules:**
- Explicit about who it's for
- Explicit about who it's NOT for
- No qualification quizzes
- No gatekeeping language

**3. What It Is**
```tsx
✅ Good:
<section>
  <h2>What it is</h2>
  <p>A 15-page framework explaining how to structure...</p>
</section>
```

**Rules:**
- Clear, factual description
- Specific about format and scope
- No hype or overselling
- Honest about limitations

**4. What It Covers**
```tsx
✅ Good:
<section>
  <h2>What it covers</h2>
  <ul>
    <li>Thesis development (pages 1-4)</li>
    <li>Evidence selection (pages 5-8)</li>
    <li>Argument structure (pages 9-12)</li>
  </ul>
</section>

❌ Bad:
<section>
  <h2>What you'll learn</h2>
  <ul>
    <li>✨ MASTER essay structure</li>
    <li>🎯 DOMINATE your exams</li>
    <li>🚀 SKYROCKET your grades</li>
  </ul>
</section>
```

**Rules:**
- Bullet-level clarity
- Specific page/section references
- Factual language (no hype verbs)
- No emojis or exaggeration

**5. How It Was Created**
```tsx
✅ Good:
<section className="bg-stone-50">
  <h2>How it was created</h2>
  <p>This framework emerged from marking 500+ HSC essays...</p>
</section>
```

**Rules:**
- Experience-based origin story
- Specific numbers (students taught, hours invested)
- Honest about process
- Background highlight (visual distinction)

**6. What You Get**
```tsx
✅ Good:
<section>
  <h2>What you get</h2>
  <p>Format: PDF</p>
  <ul>
    <li>15-page framework document</li>
    <li>3 worked examples</li>
    <li>Self-assessment checklist</li>
  </ul>
</section>

❌ Bad:
<section>
  <h2>Your complete package includes</h2>
  <ul>
    <li>Core framework ($49 value)</li>
    <li>Bonus examples ($30 value)</li>
    <li>EXCLUSIVE checklist ($20 value)</li>
    <li>Total value: $99 - yours for $69!</li>
  </ul>
</section>
```

**Rules:**
- Clear deliverables list
- No inflated "value" calculations
- No fake bonuses
- Simple, transparent

**7. Price & Purchase**
```tsx
✅ Good:
<section>
  <h2>Price</h2>
  <p className="price">A$69</p>
  <button>Purchase</button>
  <p>14-day refund, no questions asked</p>
</section>

❌ Bad:
<section>
  <h2>Special Offer</h2>
  <p className="old-price">$99</p>
  <p className="new-price">$69 (Save 30%!)</p>
  <button>BUY NOW - OFFER ENDS SOON!</button>
  <p>⏰ Only 3 spots left at this price!</p>
</section>
```

**Rules:**
- Clean price display (no strikethrough)
- One price (no tiers or options)
- Calm CTA ("Purchase", not "BUY NOW")
- Refund policy immediately below button
- No urgency language or timers

#### Related Content Section
```tsx
✅ Good:
<section>
  <h2>Related work & thinking</h2>
  <p>This resource is grounded in real experience...</p>
  <ul>
    <li><Link href="/writing/...">Essay title</Link></li>
    <li><Link href="/work/...">Project title</Link></li>
  </ul>
</section>
```

**Rules:**
- Links to Writing/Work for credibility
- Informational framing (not promotional)
- Shows thinking behind the resource
- Credibility before commerce

---

## Typography & Visual Design

### Type Scale
Following site-wide Apple HIG standards:

```css
/* Headers */
h1: clamp(2.5rem, 5vw, 4rem)    /* Page title */
h2: 2xl (1.5rem)                 /* Section headers */
h3: lg (1.125rem)                /* Subsections */

/* Body */
p: lg (1.125rem)                 /* Main content */
small: base (1rem)               /* Meta info */
```

### Color Palette
**Primary:**
- Text: stone-900 (dark, readable)
- Background: white
- Accents: indigo-600 (calm, professional)

**No urgency colors:**
- ❌ Red (creates alarm)
- ❌ Orange (suggests urgency)
- ❌ Bright yellow (attention-grabbing)

**Allowed accents:**
- ✅ Indigo (professional, calm)
- ✅ Stone/Gray (neutral)
- ✅ Green (only for success states, not CTAs)

### Spacing
**Generous whitespace:**
- Section gaps: 12 (3rem)
- Component gaps: 6 (1.5rem)
- Card padding: 8 (2rem)

**Why:** Space creates calm, reduces pressure

### Borders & Shadows
**Subtle, professional:**
```css
border: 1px solid stone-200
border-radius: 1rem (rounded-2xl)
shadow: sm on hover only
```

**No aggressive styling:**
- ❌ Thick borders
- ❌ Bright border colors
- ❌ Heavy shadows
- ❌ Pulsing animations

---

## Interaction Patterns

### Hover States
```tsx
✅ Good:
<Link
  className="transition-colors hover:text-indigo-600"
>
  View details
</Link>

❌ Bad:
<Link
  className="animate-pulse bg-gradient hover:scale-110"
>
  🔥 BUY NOW!
</Link>
```

**Rules:**
- Subtle color transitions
- No scale transforms (feels pushy)
- No animations (feels manipulative)
- Professional, calm

### Button Design
```tsx
✅ Good - Primary CTA:
<button className="
  bg-indigo-600
  text-white
  px-8 py-4
  rounded-full
  hover:bg-indigo-700
  transition-colors
">
  Purchase
</button>

❌ Bad - Manipulative CTA:
<button className="
  bg-red-600
  text-white
  px-12 py-6
  rounded-full
  animate-pulse
  shadow-2xl
">
  🔥 BUY NOW - LIMITED TIME!
</button>
```

**Rules:**
- Calm colors (indigo, not red/orange)
- Simple text ("Purchase", not "BUY NOW")
- No pulsing or aggressive animations
- Professional sizing (not oversized)

### Loading States
```tsx
✅ Good:
<button disabled>
  <Spinner />
  Processing...
</button>

❌ Bad:
<button disabled>
  ⏳ DON'T CLOSE THIS PAGE!
  Processing your order...
</button>
```

**Rules:**
- Simple spinner
- Calm messaging
- No alarm language
- Professional presentation

---

## Mobile Responsiveness

### Card Layout
```tsx
✅ Good:
/* Desktop: Clean list */
<div className="space-y-6">
  {resources.map(...)}
</div>

/* Mobile: Same layout, adjusted spacing */
<div className="space-y-4">
  {resources.map(...)}
</div>

❌ Bad:
/* Horizontal scroll cards */
<div className="flex overflow-x-auto">
  {resources.map(...)}
</div>
```

**Rules:**
- Vertical list on all devices
- No horizontal scrolling
- Touch-friendly tap targets (min 44px)
- Readable at mobile sizes

### Navigation
```tsx
✅ Good:
<nav>
  <Link href="/resources">Resources</Link>
</nav>

/* Equal treatment in mobile menu */
```

**Rules:**
- Resources link in main nav (equal weight)
- No special mobile-only commerce features
- Consistent with site-wide nav patterns

---

## Error States

### Product Not Found
```tsx
✅ Good:
<div>
  <h1>Resource Not Found</h1>
  <p>This resource may have been moved or is no longer available.</p>
  <Link href="/resources">View all resources</Link>
</div>

❌ Bad:
<div>
  <h1>Oops! 😢</h1>
  <p>This product is sold out! But check out these alternatives...</p>
  {/* Upsell carousel */}
</div>
```

**Rules:**
- Clear, professional message
- No upselling on error pages
- Simple navigation back
- No emotional manipulation

### Purchase Failed
```tsx
✅ Good:
<div>
  <h2>Purchase could not be completed</h2>
  <p>Your card was not charged. Please try again or contact support.</p>
  <button>Try again</button>
  <Link href="/contact">Contact support</Link>
</div>

❌ Bad:
<div>
  <h2>⚠️ PAYMENT FAILED!</h2>
  <p>Hurry! Your cart will expire in 10 minutes!</p>
  <button className="animate-pulse">RETRY NOW</button>
</div>
```

**Rules:**
- Calm error messaging
- Clear next steps
- Support contact visible
- No artificial urgency

---

## Email Communication

### Purchase Confirmation
```
✅ Good:

Subject: Your purchase: HSC Essay Framework

Hi [Name],

Thanks for purchasing the HSC Essay Framework.

What you get:
- 15-page framework document
- 3 worked examples
- Self-assessment checklist

Download your files:
[Download link - expires in 7 days]

Questions or need a refund?
Just reply to this email.

Nathanael

❌ Bad:

Subject: 🎉 CONGRATS! You're on your way to Band 6!

Hey [Name]!

You just made the BEST decision for your HSC journey!

Here's your download link (but first...)

EXCLUSIVE OFFER: Get our Advanced Course for 50% off!
[Big CTA button]

Download link (expires in 24 hours):
[Link]
```

**Rules:**
- Professional subject line (no emojis)
- Clear delivery information
- Simple download process
- No upsells in confirmation email
- Support contact prominent

---

## Accessibility

### Keyboard Navigation
- All interactive elements keyboard-accessible
- Logical tab order (header → content → purchase → footer)
- Focus indicators visible
- No keyboard traps

### Screen Readers
```tsx
✅ Good:
<button aria-label="Purchase HSC Essay Framework for $69">
  Purchase
</button>

<img src="..." alt="Example essay structure diagram" />
```

**Rules:**
- Descriptive ARIA labels
- Alt text on all images
- Semantic HTML structure
- Screen reader tested

### Color Contrast
- Text: WCAG AA minimum (4.5:1)
- UI elements: WCAG AA minimum (3:1)
- No reliance on color alone for information

---

## Performance

### Page Load
- Resource listing: <2 seconds
- Resource detail: <2 seconds
- Images lazy-loaded
- Fonts preloaded

### Image Optimization
- Product images: WebP format
- Max width: 1200px
- Responsive images (`srcset`)
- Proper aspect ratios (no layout shift)

---

## Testing Checklist

Before launching any commerce page:

### Visual Design
- [ ] No urgency colors (red, orange, bright yellow)
- [ ] Calm typography (proper scale)
- [ ] Generous whitespace
- [ ] Professional shadows/borders
- [ ] Consistent with site-wide design

### Content
- [ ] No urgency language
- [ ] No hype language
- [ ] Clear, factual descriptions
- [ ] Refund policy visible
- [ ] Related content linked

### Interaction
- [ ] Calm hover states
- [ ] Professional button design
- [ ] No aggressive animations
- [ ] Error states handled well
- [ ] Loading states clear

### Three-Audience Test
- [ ] Employer: Would show this in interview?
- [ ] Student: Can evaluate calmly?
- [ ] Operator: Proud of this presentation?

---

## Summary

**Commerce UX should:**

1. **Feel calm:** No urgency, pressure, or manipulation
2. **Be clear:** Transparent about everything
3. **Show respect:** Treats students as evaluators, not targets
4. **Build trust:** Credibility before commerce
5. **Stay professional:** Employer-safe at all times

**The test:**
If someone screen-shares this page in a job interview, would you be proud of every design decision?

If yes, UX is correct.
If no, revise design.

**Remember:**
Commerce that feels boring and safe is commerce that builds trust.

---

**Last Updated:** 2026-01-04
**Maintained By:** Nathanael
