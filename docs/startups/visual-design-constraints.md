# Visual Design Constraints (Startup Pages)

**Epic 6 - Story 6.7**

## Purpose
Ensure startup pages avoid startup-landing-page energy, with visuals that explain how systems work rather than sell the idea.

---

## Core Principle

**Visuals must explain HOW, not sell WHY.**

The page should:
- Read well without images
- Use visuals to explain systems
- Avoid marketing energy
- Maintain professional record tone

---

## Allowed Visuals

### ✅ Simple Screenshots (1-3 max)
**Purpose:** Show what users actually see and interact with

**Good Examples:**
- Dashboard showing user interface
- Key workflow screens
- Actual product functionality

**Guidelines:**
- Maximum 3 screenshots per startup
- Show real interface, not mockups
- Demonstrate functionality, not polish
- Include only if they clarify understanding

**Bad Examples:**
- Polished marketing screenshots
- Multiple angles of same feature
- Screenshots without explanatory value

### ✅ Architecture Diagrams
**Purpose:** Explain how systems connect and work

**Good Examples:**
- System architecture showing components
- Data flow diagrams
- Integration diagrams (Stripe, APIs, database)

**Guidelines:**
- Simple, clear diagrams
- Focus on system design decisions
- Explain technical choices
- Can be hand-drawn

**Bad Examples:**
- Overly complex diagrams
- Marketing-style infographics
- Decorative rather than explanatory

### ✅ Product Flows
**Purpose:** Show how users move through the system

**Good Examples:**
- User journey from signup to value delivery
- Core workflow diagrams
- Decision trees for product logic

**Guidelines:**
- Clarify user experience decisions
- Explain why flow works this way
- Show constraints or tradeoffs
- Keep simple and readable

### ✅ Hand-Drawn Systems Diagrams (sparingly)
**Purpose:** Explain complex interactions simply

**Good Examples:**
- Quick sketch of how components interact
- Hand-drawn flow showing decision points
- Whiteboard-style architecture explanation

**Guidelines:**
- Use when clarity matters more than polish
- Keep minimal and focused
- Explain what's not obvious from text
- One per startup max

---

## Forbidden Visuals

### ❌ Hero Mockups
**Why forbidden:**
- Screams "startup landing page"
- Marketing energy, not explanation
- Often aspirational, not real
- Distracts from narrative

**Examples to avoid:**
- Polished product screenshots on MacBook mockups
- Multiple device mockups arranged artistically
- Hero images with gradient backgrounds

### ❌ Explainer Videos
**Why forbidden:**
- Requires time commitment
- Feels promotional
- Text should explain concept
- Videos suggest you can't explain clearly

### ❌ Animations or Motion Graphics
**Why forbidden:**
- Unnecessary flourish
- Distracts from content
- Adds complexity without value
- Feels like marketing

### ❌ Customer Testimonials (visual)
**Why forbidden:**
- Testimonials are selling tools
- Professional record, not social proof
- Let the work speak for itself

**Note:** Brief quotes in text are okay if they clarify outcomes, but no testimonial sections or user photos.

### ❌ Marketing Imagery
**Why forbidden:**
- Stock photos
- Lifestyle images
- Abstract concepts
- Anything that "sells" rather than "explains"

---

## Visual Restraint Rules

### Rule 1: Text Must Come First
**The page must work with images removed.**

**Test:** Disable images in browser. Does page still communicate effectively?

**If no:**
- Images are crutch, not support
- Revise text to stand alone
- Use images only for clarification

### Rule 2: Maximum 3 Images Per Startup Detail Page
**Strict limit to avoid visual dominance**

**Allowed:**
- 2 screenshots + 1 architecture diagram
- 3 screenshots
- 1 screenshot + 2 diagrams
- 3 flow diagrams

**Not allowed:**
- 5+ images (too much visual weight)
- Image galleries
- Multiple variations of same view

### Rule 3: Visuals Explain, Don't Impress
**Every visual must have explanatory purpose**

**Good reasons to include:**
- "This shows how the feedback engine works"
- "This clarifies the user workflow"
- "This explains the technical architecture"

**Bad reasons (remove visual):**
- "This looks cool"
- "This makes it feel more polished"
- "This shows we have a real product"

### Rule 4: Real > Polished
**Prefer real screenshots over polished mockups**

**Use:**
- Actual interface (even if imperfect)
- Real user data (anonymized)
- Production screenshots

**Avoid:**
- Polished mockups
- Perfectly staged demo data
- Aspirational designs

---

## Image Presentation Guidelines

### Styling
- Simple border: `border border-stone-200`
- Rounded corners: `rounded-xl`
- No drop shadows
- No animations or transitions
- No hover effects

### Layout
- Full width of content column
- Consistent spacing between images
- No image grids or galleries
- Stack vertically with space between

### Captions
- Optional brief caption if needed for clarity
- Keep captions minimal and functional
- No marketing language in captions

**Example:**
```tsx
<div className="overflow-hidden rounded-xl border border-stone-200">
  <Image
    src={url}
    alt="MarkPoint feedback interface showing rubric-based analysis"
    width={800}
    height={600}
    className="h-auto w-full"
  />
</div>
```

---

## Placement Guidelines

### Where to Place Visuals

1. **After text sections**
   - Diagrams go after "What was built" section
   - Screenshots go after "Outcomes & current status" section
   - Never lead with visuals

2. **Optional sections at end**
   - "Architecture" section (diagrams)
   - "Screenshots" section (interface views)
   - Clearly labeled
   - Can be skipped by readers

3. **Never above the fold**
   - First screen should be text only
   - Visuals support, don't lead

---

## Review Checklist

Before adding visuals to a startup page, verify:

- [ ] **Page works without images**
  - Text explains concept fully
  - Images are supplementary, not required
  - No-image test passes

- [ ] **Maximum 3 images**
  - Count: __/3
  - Each image has clear purpose
  - Removed any redundant images

- [ ] **No forbidden visual types**
  - No hero mockups
  - No videos or animations
  - No customer testimonials
  - No marketing imagery

- [ ] **Visuals explain HOW, not sell WHY**
  - Architecture/flow diagrams show system design
  - Screenshots show functionality, not polish
  - Nothing feels promotional

- [ ] **Real > Polished**
  - Using actual screenshots, not mockups
  - Real data (anonymized if needed)
  - Not aspirational or staged

- [ ] **Proper styling applied**
  - Simple border and rounded corners
  - No shadows or effects
  - Consistent spacing
  - Professional but minimal

---

## Examples: Good vs. Bad

### Good: Architecture Diagram
**Visual:** Simple diagram showing:
- Next.js frontend → tRPC API → Prisma → PostgreSQL
- Stripe webhook flow
- AI feedback pipeline

**Why good:**
- Explains technical decisions
- Shows system complexity
- Clarifies architecture choices
- Useful reference for technical readers

### Good: Key Screenshot
**Visual:** Dashboard showing essay feedback interface with rubric

**Why good:**
- Shows actual product
- Explains user experience
- Demonstrates core value delivery
- One image, focused purpose

### Bad: Hero Mockup
**Visual:** Polished MacBook mockup with product on screen, gradient background

**Why bad:**
- Feels like startup landing page
- Marketing energy, not explanation
- Doesn't clarify anything
- Distracts from narrative

### Bad: Image Gallery
**Visual:** 8 screenshots showing every feature

**Why bad:**
- Too many images (max 3)
- Visuals dominate narrative
- Feels like feature showcase
- Overwhelming, not clarifying

---

## Common Mistakes

### Mistake 1: Leading with Visuals
**Problem:** Large hero image at top of page

**Fix:** Start with text (name, overview). Visuals come later.

### Mistake 2: Too Many Screenshots
**Problem:** 5+ screenshots trying to show every feature

**Fix:** Pick 1-3 most important views. Focus on core functionality.

### Mistake 3: Polished Mockups Instead of Real Product
**Problem:** Using design mockups instead of actual interface

**Fix:** Use real screenshots, even if imperfect. Realness > polish.

### Mistake 4: Decorative Visuals
**Problem:** Images included to "make page look better"

**Fix:** Remove any visual that doesn't explain how something works.

---

## Summary

**Visual restraint in startup pages:**
- Maximum 3 images per startup
- Text must work without images
- Visuals explain HOW, not sell WHY
- Real screenshots > polished mockups
- No marketing imagery or hero shots
- Simple, functional styling

**Purpose:**
- Avoid startup-landing-page energy
- Maintain professional record tone
- Let substance speak over style
- Support narrative, don't dominate it

---

**Last Updated:** 2026-01-04
**Maintained By:** Nathanael
