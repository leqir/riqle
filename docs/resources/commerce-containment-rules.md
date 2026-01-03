# Commerce Containment Rules

**Epic 8 - Story 8.2**

## Purpose
Ensure commerce remains contained and optional, never interrupting the site's primary identity as a demonstration of work, thinking, and professional capability.

---

## Core Principle

**Commerce is infrastructure shown when sought, not marketing pushed when unsought.**

The site's primary identity is:
- Work portfolio (what I've built)
- Writing & thinking (how I reason)
- Professional capability (judgment demonstrated)

Commerce exists to serve this identity, not define it.

---

## Structural Containment

### 1. Resources Only Accessible Via `/resources` Page

**Rule:** All commerce lives exclusively on `/resources` and `/resources/[slug]`

✅ **Allowed:**
- Link to Resources in main navigation
- Contextual references in writing/work (e.g., "used in MarkPoint")
- Resources page in footer

❌ **Forbidden:**
- Product cards on homepage
- Featured products in hero sections
- Commerce in sidebar widgets
- Product recommendations in reading flows

**Test:**
Can a visitor read Work, Writing, About, and leave the site without ever seeing pricing or products? ✅ Must be yes.

### 2. NO Product Cards on Homepage

**Rule:** Homepage remains focused on work/thinking demonstration

✅ **Allowed:**
- Work portfolio preview
- Writing preview
- About narrative
- Contact information

❌ **Forbidden:**
- "Latest Products" section
- Featured resources
- Product testimonials
- Pricing anywhere on homepage

**Why:** Homepage sets site identity. If products appear here, site becomes "store" not "portfolio."

### 3. NO Pricing Outside Resources Section

**Rule:** Pricing appears exclusively on Resources pages

✅ **Allowed:**
- Price on `/resources` listing cards
- Price on `/resources/[slug]` detail pages
- Price in Stripe checkout (obviously)

❌ **Forbidden:**
- Price on homepage
- Price in navigation
- Price on Work/Writing pages
- Price in modals or popups

**Why:** Visible pricing shifts focus from capability to commerce.

### 4. NO Commerce Interruptions in Reading/Portfolio Flows

**Rule:** Never interrupt reading or portfolio viewing with commerce

✅ **Allowed:**
- Contextual mention: "This framework is also available as a resource"
- Bottom-of-page reference: "Related: [Resource Name] in Resources"

❌ **Forbidden:**
- Mid-article CTAs to buy products
- Sticky bars promoting products
- Exit-intent popups selling resources
- Inline product recommendations
- "Upgrade to premium" prompts

**Test:**
Can someone read all essays and view all work without being interrupted by commerce prompts? ✅ Must be yes.

---

## Navigation Treatment

### Resources Link Placement

**Required:** Resources appears in main navigation
**Position:** Equal weight to Work, Writing, About, Contact
**Styling:** No special emphasis (same font, size, color as other nav items)

✅ **Correct:**
```
About | Work | Writing | Resources | Contact
```

❌ **Incorrect:**
```
About | Work | Writing | ⭐ Resources (NEW!) | Contact
```

❌ **Incorrect:**
```
About | Work | Writing | Contact
[SHOP NOW] (special button)
```

### No Special Callouts for Products

**Rule:** Products don't get promotional treatment in navigation

❌ **Forbidden:**
- "NEW!" badges
- Special buttons
- Accent colors
- Larger font size
- Icons suggesting commerce

**Why:** Special treatment signals "this is what really matters," undermining work/thinking focus.

---

## Homepage Governance

### What Belongs on Homepage

✅ **Allowed:**
- Work portfolio (3-5 featured projects)
- Writing preview (2-3 featured essays)
- About summary (who you are, what you do)
- Contact information
- Professional navigation
- Optional: Link to Resources (equal treatment)

❌ **Forbidden:**
- Featured products section
- "Best sellers" highlight
- Product testimonials
- Pricing information
- "Latest courses" feed
- Product imagery

### Headline / Hero Section

✅ **Allowed:**
```
Nathanael
Product builder, educator, and technical operator
focused on making complex systems understandable.
```

❌ **Forbidden:**
```
Nathanael
Helping students achieve Band 6 with proven frameworks
[View Courses] [Shop Resources]
```

**Why:** Second version leads with commerce, first version leads with capability.

---

## Writing/Work/Startup Pages

### Referential Links (Allowed)

Products may be referenced contextually when relevant:

✅ **Example in Writing:**
```
"This framework is the foundation of the HSC Essay Structure Guide,
available in Resources."
```

✅ **Example in Work:**
```
"MarkPoint's feedback system is based on frameworks developed
over 500+ tutoring sessions. These frameworks are also available
as standalone resources."
```

### Prohibited: Pushing Products

❌ **Forbidden:**
```
"Want to learn this framework? Buy the complete guide for just $29!"
```

❌ **Forbidden:**
```
[Get the Framework] [Purchase Now]
(buttons interrupting essay)
```

### The Test

**Ask:** Is this reference helpful context, or am I selling?

- **Helpful context:** Explains where framework came from, mentions resource exists
- **Selling:** Encourages purchase, emphasizes price, uses CTAs

**Rule:** References should be informational, never promotional.

---

## Banned Language (Site-Wide)

### Urgency & Scarcity

These phrases are **NEVER** allowed anywhere on the site:

❌ "Buy now"
❌ "Limited time"
❌ "Don't miss out"
❌ "Exclusive offer"
❌ "Only X spots left"
❌ "Sale ends soon"
❌ "Early bird pricing"
❌ "Join now before price increases"

**Why:** Urgency tactics undermine trust and create pressure.

### Hype & Overstatement

❌ "Transform your results"
❌ "Revolutionary approach"
❌ "Game-changing system"
❌ "Secret formula"
❌ "Ultimate guide"
❌ "Guaranteed success"
❌ "Master HSC English in 7 days"

**Why:** Hype language signals marketing over substance.

### Sales-Funnel Language

❌ "Upgrade now"
❌ "Unlock premium content"
❌ "Access all resources"
❌ "Join the community"
❌ "Get exclusive access"

**Why:** Funnel language treats visitors as targets, not evaluators.

---

## Allowed Language

### Commerce-Related Language (Resources Pages Only)

✅ "Resources"
✅ "Educational materials"
✅ "Purchase"
✅ "Get access"
✅ "Available" (not "on sale")
✅ "Created from real tutoring experience"
✅ "Practical, honest, clear"

### Framing Copy

✅ "Resources created from teaching 500+ HSC students"
✅ "Designed to be practical and clear"
✅ "Based on frameworks that worked"
✅ "For students preparing for HSC English exams"

**Tone:** Informational, not promotional. Helpful, not pushy.

---

## Visual Containment

### No Commerce Imagery on Non-Commerce Pages

❌ **Forbidden:**
- Product mockups on homepage
- Course screenshots in hero sections
- Student testimonials with purchase prompts
- Product imagery in navigation
- Commerce-related graphics on Work/Writing pages

✅ **Allowed:**
- Work portfolio screenshots (showing what you built)
- Writing diagrams (explaining concepts)
- About photo (professional headshot)

**The Rule:** Imagery should demonstrate capability, not sell products.

---

## Cross-Linking Rules

### Resources → Proof (Allowed)

Resources pages **should** link to Work/Writing demonstrating credibility:

✅ "This resource is based on the teaching methodology described in
[Why Teaching Frameworks Beats Content] (Writing)"

✅ "Created from experience building MarkPoint's feedback system
(see MarkPoint in Work)"

### Proof → Resources (Cautious)

Work/Writing pages **may** reference resources, but with strict rules:

✅ **Allowed - Contextual mention:**
"This framework is also available as a standalone resource."

❌ **Forbidden - Promotional push:**
"Want to master this? Buy the complete course now!"

### The Direction Test

**Credibility → Commerce** ✅ Resources pages leverage work/writing for trust
**Commerce → Credibility** ❌ Work/writing pages don't push products

**Rule:** Trust always precedes transaction.

---

## Email & Contact Containment

### No Marketing Emails Unless Opted In

**Rule:** Customers receive transactional emails only by default

✅ **Transactional emails:**
- Purchase confirmation
- Access instructions
- Refund confirmation
- Support responses

❌ **Marketing emails (unless opted in):**
- New product announcements
- Promotional offers
- Newsletter with product pitches
- Course reminders

**Opt-in Rule:**
- Checkbox on checkout: "Send me occasional updates about new resources"
- Default: UNCHECKED
- Easy unsubscribe in every email

**Why:** Unsolicited marketing undermines trust built through commerce.

---

## Testing & Enforcement

### Containment Tests

Run these tests before launch and annually:

#### Test 1: Can You Navigate Site Without Seeing Commerce?

- [ ] Visit homepage
- [ ] Read an essay in Writing
- [ ] View a project in Work
- [ ] Read About page
- [ ] Leave site

**Pass:** Never saw pricing, products, or purchase prompts
**Fail:** Encountered commerce in any of these flows

#### Test 2: Does Site Feel Like "Work/Thinking" or "Store"?

Show site to 5 people unfamiliar with it:

- [ ] What's your first impression of this site's purpose?

**Pass:** "Portfolio", "Writing", "Professional work"
**Fail:** "Course seller", "Store", "Teacher selling stuff"

#### Test 3: Where Does Commerce Appear?

Audit every page:

- [ ] Homepage: NO commerce ✅
- [ ] About: NO commerce ✅
- [ ] Work pages: Contextual references only ✅
- [ ] Writing pages: Contextual references only ✅
- [ ] Resources pages: Commerce present ✅
- [ ] Contact: NO commerce ✅

**Pass:** Commerce only in Resources section
**Fail:** Commerce leaked into other pages

#### Test 4: Interruption Test

Try to read 3 essays and view 3 work projects:

- [ ] Were you interrupted by commerce at any point?

**Pass:** No interruptions
**Fail:** Encountered CTAs, popups, or product pushes

---

## Violation Examples

### Example 1: Homepage Product Feature (Forbidden)

```tsx
// ❌ FORBIDDEN
<section>
  <h2>Latest Resources</h2>
  <div className="grid grid-cols-3">
    {products.map(product => (
      <ProductCard product={product} />
    ))}
  </div>
</section>
```

**Why forbidden:** Homepage becomes store front, not portfolio

**Correct approach:** Products only on `/resources` page

### Example 2: Mid-Essay CTA (Forbidden)

```markdown
<!-- ❌ FORBIDDEN -->
## How I Teach Frameworks

I developed a specific approach...

[Want to learn this framework? Get the complete guide →]

The key insight was...
```

**Why forbidden:** Interrupts reading, pushes product

**Correct approach:** Optional bottom-of-page reference only

### Example 3: Navigation with Commerce Emphasis (Forbidden)

```tsx
// ❌ FORBIDDEN
<nav>
  <Link href="/about">About</Link>
  <Link href="/work">Work</Link>
  <Link href="/writing">Writing</Link>
  <Link href="/resources" className="bg-accent">
    🛒 Shop Resources
  </Link>
</nav>
```

**Why forbidden:** Special emphasis suggests primary purpose

**Correct approach:** Equal treatment for all nav links

---

## Annual Containment Audit

Once per year, perform comprehensive audit:

### Audit Checklist

- [ ] **Homepage Review**
  - NO product cards
  - NO pricing information
  - NO featured products
  - Focus remains work/thinking

- [ ] **Navigation Review**
  - Resources link present but equal
  - NO special badges or emphasis
  - NO promotional language

- [ ] **Work/Writing Pages Review**
  - NO mid-content CTAs
  - Contextual references only (if any)
  - NO pricing mentioned

- [ ] **Language Audit**
  - NO banned urgency language
  - NO hype or overpromising
  - Informational tone throughout

- [ ] **Visual Audit**
  - NO product imagery outside Resources
  - NO commerce graphics on homepage
  - Consistent professional aesthetic

### Actions if Violations Found

1. **Immediate:** Remove violation
2. **Analyze:** Why did this happen?
3. **Prevent:** Update processes to prevent recurrence
4. **Review:** Check for similar violations elsewhere

---

## Summary

**Containment ensures:**

1. **Structural separation:** Commerce only in `/resources`
2. **Homepage purity:** NO products, pricing, or promotion
3. **Reading/portfolio flows:** NO interruptions or CTAs
4. **Language discipline:** NO urgency, hype, or sales tactics
5. **Visual consistency:** Commerce doesn't dominate aesthetics

**The test is simple:**
Can someone explore your work and thinking without feeling sold to?

If yes, containment is working.
If no, commerce has leaked and must be corrected.

---

**Last Updated:** 2026-01-04
**Maintained By:** Nathanael
