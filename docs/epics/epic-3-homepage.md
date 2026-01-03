# Epic 3: Homepage - Identity Compression Engine

**Status:** Ready for Implementation (Requires Epic 0, 1, 2)
**Priority:** Critical - First Impression Surface
**Estimated Complexity:** Very High
**Dependencies:** Epic 0 (Infrastructure), Epic 1 (IA), Epic 2 (Design System)

---

## Epic Overview

### Purpose

Enable employers to understand Nathanael's **capability, credibility, and direction in 30-45 seconds**, then invite deeper exploration without pressure.

**This is not a "hero section."**
**This is a professional decoding surface.**

### Core Job-to-be-Done

Answer five employer questions immediately:
1. **Who is this?**
2. **What do they actually do?**
3. **Have they built real things?**
4. **Can I trust their judgment?**
5. **Would I want them on my team?**

**If any element does not help answer one of these, it does not belong.**

### User Outcome

When Epic 3 is complete, the homepage:
- ✅ Explains you in under a minute (30-45 seconds target)
- ✅ Rewards deeper interest without forcing it
- ✅ Never feels salesy or performative
- ✅ Provides clear employer skim path
- ✅ Stays stable even as content grows
- ✅ Can be confidently linked in any application

**The homepage doesn't ask for attention. It earns it.**

### Functional Requirements Covered

- FR1: Homepage displays identity, positioning, and proof with 30-45 second comprehension target
- NFR1: Homepage initial page load < 2 seconds

### Non-Functional Requirements Covered

From Product Brief:
- Employer-first optimization (30-45 second skim)
- Commerce as evidence (not persuasion)
- Professional legitimacy (serious operator signal)

From UX Design:
- Progressive disclosure (clarity → proof → texture)
- Calm first impression (Apple-like restraint)
- Typography over decoration

---

## Architecture Decisions

### Homepage as Static Route

**Approach:** Server-rendered static page with minimal JavaScript
- Next.js Server Component for `/` route
- Static data fetching at build time
- Zero client-side JavaScript for initial render
- Progressive enhancement for interactions

**Why:**
- Instant load time (< 1s First Meaningful Paint)
- SEO optimized
- Works without JavaScript
- Credibility through speed

### Content Strategy

**Homepage content is curated, not dynamic:**
- Featured projects/posts selected manually (not "latest 3")
- Content stored in database but rendered statically
- Quarterly review cadence (not real-time)
- Homepage is a snapshot of "best representation"

### Performance Budget

**Hard Constraints:**
- First Meaningful Paint: < 1s
- Total page weight: < 100KB (compressed)
- Zero render-blocking JavaScript
- No layout shift (CLS = 0)
- No third-party scripts above fold

---

## Stories

### Story 3.1: Core Job-to-be-Done Definition (Anchor for Every Decision)

**Priority:** Critical (Must Do First)
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a site architect,
I want every homepage element to answer one of five employer questions,
So that no element exists without justification.

#### Acceptance Criteria

**Given** the five core questions are defined
**When** reviewing any homepage element
**Then** it must answer at least one of the five questions:
1. Who is this?
2. What do they actually do?
3. Have they built real things?
4. Can I trust their judgment?
5. Would I want them on my team?

**And** if an element doesn't answer a question, it is removed

**Given** a first-time visitor lands on homepage
**When** they view one screen + one scroll
**Then** they can answer all five questions
**And** no copy or component exists "for personality" alone

#### Five Core Questions Mapping

**Question 1: Who is this?**
- Answered by: Name (large, calm typography)
- Location: Above fold, top of page
- Format: "Nathanael" or "Nathanael / Riqle"

**Question 2: What do they actually do?**
- Answered by: Positioning statement (1-2 lines max)
- Location: Immediately below name
- Format: "Student → Tutor → Builder → Founder"
- Plain language, no buzzwords

**Question 3: Have they built real things?**
- Answered by: Proof anchors (2-3 items)
- Location: Second screen (after one scroll)
- Format: Project name + outcome + link

**Question 4: Can I trust their judgment?**
- Answered by:
  - Writing link (signals thinking quality)
  - Optional: Featured essay or principle
  - Quantified outcomes (500+ students, etc.)
- Location: Throughout homepage

**Question 5: Would I want them on my team?**
- Answered by: Combination of all above
- Signals: Restraint, precision, real outcomes, clear thinking
- Anti-signals removed: Hype, posturing, self-praise

#### Implementation Checklist

- [ ] Document five questions in `docs/homepage/core-questions.md`:
  ```markdown
  # Homepage Core Questions

  Every element must answer one of these:

  1. **Who is this?**
     - Name (large, calm)
     - No titles, emojis, descriptors

  2. **What do they actually do?**
     - Positioning statement (1-2 lines)
     - Plain language
     - Legible in 5 seconds

  3. **Have they built real things?**
     - 2-3 proof anchors
     - Name + outcome + link
     - Specific, not performative

  4. **Can I trust their judgment?**
     - Writing link
     - Optional featured essay
     - Quantified outcomes

  5. **Would I want them on my team?**
     - Demonstrated through restraint
     - Real outcomes
     - Clear thinking
  ```
- [ ] Create decision checklist for homepage elements
- [ ] Review every existing homepage element against questions
- [ ] Remove elements that don't answer questions
- [ ] Test with user: Can they answer all five questions after one screen + scroll?

#### Testing Requirements

- [ ] Every element answers at least one question
- [ ] User can answer all five questions in 30-45 seconds
- [ ] No "personality" elements without purpose
- [ ] Homepage validated against criteria

---

### Story 3.2: Above-the-Fold Structure (The 30-45 Second Surface)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 6-8 hours

#### User Story

As an employer,
I want immediate clarity with zero cognitive load,
So that I understand who this person is without scrolling.

#### Acceptance Criteria

**Given** the above-fold area is implemented
**When** an employer lands on the homepage
**Then** they see (in strict priority order):
1. Name (large, calm typography)
2. Positioning statement (1-2 lines max)
3. Context sentence (domain/impact)
4. Primary routing CTAs (View work, Read writing)
5. Secondary link to Resources (subtle)

**And** the area feels calm, spare, and inevitable
**And** nothing visually competes with the text
**And** employers don't need to scroll to understand

**Given** explicit exclusions are enforced
**When** reviewing the above-fold area
**Then** NO glass effects exist
**And** NO images appear
**And** NO animations run
**And** NO slogans or self-praise appear

#### Required Elements (Strict Priority Order)

**1. Name**
```tsx
<h1 className="text-display font-semibold text-stone-900">
  Nathanael
</h1>
```
- Large, calm typography (48-64px)
- No titles next to name
- No emojis
- No descriptors

**2. Positioning Statement (1-2 Lines Max)**
```tsx
<p className="text-h2 text-stone-700 mt-4">
  Student → Tutor → Builder → Founder
</p>
```
- What you do + domain of impact
- Plain language, no buzzwords
- Legible in 5 seconds
- Examples:
  - "Student → Tutor → Builder → Founder"
  - "Building MarkPoint. Teaching systems thinking."

**3. Context Sentence**
```tsx
<div className="text-body text-stone-600 mt-6 space-y-1">
  <p>Founder of MarkPoint</p>
  <p>Former HSC English tutor (500+ students to Band 6)</p>
  <p>Ships production code daily</p>
</div>
```
- 2-3 brief factual statements
- Domain indicators
- No claims without proof

**4. Primary Routing CTAs**
```tsx
<div className="mt-8 flex gap-4">
  <a href="/work" className="text-lg font-medium text-stone-900 hover:text-accent">
    View Work →
  </a>
  <a href="/writing" className="text-lg font-medium text-stone-900 hover:text-accent">
    Read Writing →
  </a>
</div>
```
- Text links (not heavy buttons)
- Arrows for direction
- Clear verbs

**5. Secondary Link to Resources (Subtle)**
```tsx
<p className="mt-6 text-meta text-stone-500">
  <a href="/resources" className="hover:text-stone-700">
    Educational resources
  </a>
</p>
```
- Smaller, muted
- Neutral copy
- Skippable

#### Complete Above-Fold Component

```tsx
// app/page.tsx (Homepage - Above Fold)
export default function HomePage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-24 md:py-32">
        {/* Above the Fold */}
        <section className="min-h-[80vh] flex flex-col justify-center">
          {/* Name */}
          <h1 className="text-display font-semibold text-stone-900">
            Nathanael
          </h1>

          {/* Positioning Statement */}
          <p className="text-h2 text-stone-700 mt-4 max-w-2xl">
            Student → Tutor → Builder → Founder
          </p>

          {/* Context */}
          <div className="mt-8 space-y-2 text-body text-stone-600">
            <p>Founder of MarkPoint (startup with X users)</p>
            <p>Taught 500+ students to Band 6 in HSC English</p>
            <p>Ships production code daily</p>
          </div>

          {/* Primary CTAs */}
          <div className="mt-12 flex flex-wrap gap-6">
            <a
              href="/work"
              className="text-lg font-medium text-stone-900 hover:text-accent transition-colors"
            >
              View Work →
            </a>
            <a
              href="/writing"
              className="text-lg font-medium text-stone-900 hover:text-accent transition-colors"
            >
              Read Writing →
            </a>
          </div>

          {/* Secondary Resources Link */}
          <p className="mt-8 text-meta text-stone-500">
            <a href="/resources" className="hover:text-stone-700 transition-colors">
              Educational resources
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
```

#### Explicit Exclusions

**NO:**
- Glass effects above fold
- Images or photos
- Animations on load
- Slogans ("Turning ideas into reality")
- Self-praise ("Award-winning", "Passionate")
- Decorative elements
- Background patterns
- Gradient text
- Icons or symbols

**ONLY:**
- Text
- White/off-white background
- Simple links
- Generous white space

#### Implementation Checklist

- [ ] Create homepage route: `app/page.tsx`
- [ ] Implement above-fold section with all required elements
- [ ] Ensure strict priority order (name → positioning → context → CTAs)
- [ ] Remove all excluded elements (glass, images, animations)
- [ ] Test on mobile and desktop
- [ ] Verify 30-45 second comprehension with test user
- [ ] Check accessibility (keyboard nav, screen reader)

#### Testing Requirements

- [ ] Above-fold area feels calm and spare
- [ ] Nothing competes visually with text
- [ ] Employers understand without scrolling
- [ ] No glass effects, images, or animations
- [ ] Load time < 1 second
- [ ] Works without JavaScript
- [ ] User can answer "who is this?" and "what do they do?" immediately

---

### Story 3.3: Visual Tone of First Screen (Credibility Zone)

**Priority:** High
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a designer,
I want the first screen to establish trust before intrigue,
So that employers feel calm and confident immediately.

#### Acceptance Criteria

**Given** visual tone rules are applied
**When** viewing the first screen
**Then** it uses white/off-white background
**And** maximum contrast for text
**And** large type with generous spacing
**And** no visual metaphors or decorative elements

**Given** the credibility zone is implemented
**When** reviewing the page
**Then** it feels like an Apple internal memo, not a marketing page
**And** content would survive being printed
**And** page works if all CSS effects are disabled

#### Visual Tone Rules

**Background:**
- Color: `stone-50` (off-white, not pure white)
- No gradients
- No patterns
- No textures

**Text Contrast:**
- Headings: `stone-900` (near-black, not pure black)
- Body: `stone-700` (soft charcoal)
- Meta: `stone-500` (muted)
- All meet WCAG AA contrast requirements (4.5:1 minimum)

**Typography:**
- Display: 48-64px (3-4rem)
- Large body: 18-20px (1.125-1.25rem)
- Line height: 1.5-1.7 (generous)
- Font weight: Regular (400) and Semibold (600) only

**Spacing:**
- Vertical rhythm: 32-48px between sections
- Generous padding: 24-32px
- Max-width: 896px (max-w-4xl)
- Centered content container

**No Visual Metaphors:**
- No icons
- No illustrations
- No decorative shapes
- No background images
- Text does all the work

#### This Screen Should Feel Like

**✅ Apple Internal Memo:**
- Precise, minimal
- Information-dense but spacious
- Professional but not corporate
- Serious but approachable

**❌ NOT Like:**
- SaaS landing page
- Portfolio showcase
- Personal brand site
- Marketing page

#### Implementation Checklist

- [ ] Apply background color:
  ```tsx
  <div className="min-h-screen bg-stone-50">
  ```
- [ ] Ensure text contrast:
  ```tsx
  <h1 className="text-stone-900">Nathanael</h1>
  <p className="text-stone-700">Positioning...</p>
  <span className="text-stone-500">Metadata</span>
  ```
- [ ] Use large typography:
  ```tsx
  <h1 className="text-[clamp(2rem,5vw,4rem)]">
  ```
- [ ] Apply generous spacing:
  ```tsx
  <section className="space-y-12 py-24">
  ```
- [ ] Remove all visual metaphors
- [ ] Test with CSS disabled (content still makes sense)
- [ ] Test print preview (layout survives)

#### Testing Requirements

- [ ] Background is off-white (stone-50), not pure white
- [ ] Text contrast meets WCAG AA
- [ ] Large type, generous spacing
- [ ] No visual metaphors or decorations
- [ ] Feels like Apple internal memo
- [ ] Works if CSS disabled
- [ ] Survives being printed
- [ ] Establishes trust immediately

---

### Story 3.4: Second Screen - Proof Anchors (Selective Evidence)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-6 hours

#### User Story

As an employer,
I want to quickly see proof of real work,
So that I can validate capability without extensive research.

#### Acceptance Criteria

**Given** proof anchors are implemented
**When** scrolling to the second screen
**Then** I see 2-3 proof anchors maximum
**And** each includes: name, one-line description, outcome, link
**And** no grids of logos appear
**And** metrics have context
**And** proof is specific, not performative

**Given** an employer reviews proof
**When** they click one proof item
**Then** they feel confident about capability
**And** outcomes are clear and quantified

#### Structure

**2-3 Proof Anchors Maximum:**

1. **One Project/System** (e.g., Riqle)
2. **One Startup** (MarkPoint)
3. **Optional:** One educational outcome or metric

**Each Anchor Includes:**
- Name (clear, direct)
- One-line description (what it is)
- Outcome or scope (quantified if possible)
- Link to deep-dive page

#### Proof Anchor Component

```tsx
// components/ProofAnchor.tsx
export function ProofAnchor({
  name,
  description,
  outcome,
  href,
}: {
  name: string;
  description: string;
  outcome: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block group space-y-2 p-6 rounded-lg border border-stone-200 hover:border-stone-300 transition-colors"
    >
      <h3 className="text-h3 font-semibold text-stone-900 group-hover:text-accent transition-colors">
        {name}
      </h3>
      <p className="text-body text-stone-700">{description}</p>
      <p className="text-meta text-stone-600">{outcome}</p>
    </a>
  );
}
```

#### Complete Second Screen Component

```tsx
// app/page.tsx (Homepage - Proof Anchors Section)
<section className="py-24 border-t border-stone-200">
  <div className="max-w-4xl mx-auto px-6 md:px-8">
    <h2 className="text-h2 font-semibold text-stone-900 mb-12">
      Built & Operated
    </h2>

    <div className="space-y-6">
      {/* Proof Anchor 1: MarkPoint */}
      <ProofAnchor
        name="MarkPoint"
        description="Startup focused on [problem space]. Live product with real users."
        outcome="X users, $Y MRR, featured on Product Hunt"
        href="/startups/markpoint"
      />

      {/* Proof Anchor 2: Riqle */}
      <ProofAnchor
        name="Riqle"
        description="Personal platform with commerce, built from scratch with production-grade infrastructure."
        outcome="T3 Stack, Stripe integration, full test coverage"
        href="/work/riqle"
      />

      {/* Proof Anchor 3: Teaching Outcomes */}
      <ProofAnchor
        name="HSC English Tutoring"
        description="Taught 500+ students over 5 years, developing frameworks that consistently produce Band 6 results."
        outcome="90% of students achieved Band 5 or 6"
        href="/about#teaching"
      />
    </div>

    <p className="mt-12 text-body text-stone-600">
      <a href="/work" className="font-medium text-stone-900 hover:text-accent transition-colors">
        See all work →
      </a>
    </p>
  </div>
</section>
```

#### Rules

**No Grids of Logos:**
- Avoid "As seen on..." badges
- No client logo galleries
- No "technologies used" icon grids
- Text-first always

**No Metrics Without Context:**
- ❌ "500+ students" (what does this mean?)
- ✅ "500+ students taught, 90% achieved Band 5 or 6"
- ❌ "X users" (compared to what?)
- ✅ "X users, $Y MRR, featured on Product Hunt"

**No "Featured Everywhere" Syndrome:**
- Avoid listing every mention
- Quality over quantity
- Real outcomes over press

#### Implementation Checklist

- [ ] Create `ProofAnchor` component
- [ ] Identify 2-3 best proof items:
  - Must have real outcomes
  - Must be specific
  - Must link to deep-dive
- [ ] Implement second screen section
- [ ] Write clear, factual copy (no hype)
- [ ] Add subtle borders (not heavy cards)
- [ ] Link to deep-dive pages (Work, Startups, About)
- [ ] Test hover states (subtle)
- [ ] Verify mobile layout (stacks vertically)

#### Testing Requirements

- [ ] Maximum 2-3 proof anchors shown
- [ ] Each has name, description, outcome, link
- [ ] No logo grids
- [ ] Metrics have context
- [ ] Proof is specific, not performative
- [ ] Clicking proof item leads to detailed page
- [ ] Layout works on mobile and desktop

---

### Story 3.5: Third Screen - Direction & Thinking (Optional Depth)

**Priority:** Medium
**Complexity:** Low
**Estimated Time:** 3-4 hours

#### User Story

As a curious employer,
I want to understand judgment and trajectory,
So that I can assess cultural fit and thinking quality.

#### Acceptance Criteria

**Given** the third screen is implemented
**When** viewing after proof anchors
**Then** I see optional content:
  - "Currently focused on..." (1-2 sentences)
  - Link to featured essay
  - Optional: Short principle or philosophy statement

**And** this section is skippable (not required for understanding)
**And** no manifesto language appears
**And** no long blocks of text

**Given** a curious employer engages
**When** they read this section
**Then** they feel invited, not obligated
**And** skimmers are not penalized for ignoring it

#### Content Types Allowed

**1. "Currently Focused On..." (1-2 Sentences)**
```tsx
<div className="space-y-2">
  <h3 className="text-h3 font-semibold text-stone-900">Currently</h3>
  <p className="text-body text-stone-700">
    Building MarkPoint to solve [problem]. Exploring systems thinking applied to education.
  </p>
</div>
```

**2. Link to Featured Essay**
```tsx
<div className="space-y-2">
  <h3 className="text-h3 font-semibold text-stone-900">Recent Thinking</h3>
  <a
    href="/writing/building-in-public"
    className="block text-body text-stone-900 hover:text-accent transition-colors"
  >
    Building in Public: Lessons from MarkPoint →
  </a>
  <p className="text-meta text-stone-600">
    On transparency, iteration, and learning from users.
  </p>
</div>
```

**3. Short Principle/Philosophy (Optional)**
```tsx
<div className="space-y-2">
  <h3 className="text-h3 font-semibold text-stone-900">Philosophy</h3>
  <p className="text-body text-stone-700">
    Outcomes over credentials. Systems over hacks. Teaching what works.
  </p>
</div>
```

#### Complete Third Screen Component

```tsx
// app/page.tsx (Homepage - Direction & Thinking Section)
<section className="py-24 border-t border-stone-200 bg-stone-100/50">
  <div className="max-w-3xl mx-auto px-6 md:px-8">
    <div className="space-y-12">
      {/* Currently Focused On */}
      <div className="space-y-3">
        <h3 className="text-h3 font-semibold text-stone-900">Currently</h3>
        <p className="text-body text-stone-700">
          Building MarkPoint to [solve problem]. Exploring how systems thinking
          transforms education outcomes.
        </p>
      </div>

      {/* Featured Essay */}
      <div className="space-y-3">
        <h3 className="text-h3 font-semibold text-stone-900">Recent Thinking</h3>
        <a
          href="/writing/building-in-public"
          className="block group"
        >
          <p className="text-body font-medium text-stone-900 group-hover:text-accent transition-colors">
            Building in Public: Lessons from MarkPoint →
          </p>
          <p className="text-meta text-stone-600 mt-1">
            On transparency, iteration, and learning from real users.
          </p>
        </a>
      </div>

      {/* Optional: Philosophy/Principle */}
      <div className="space-y-3">
        <h3 className="text-h3 font-semibold text-stone-900">Approach</h3>
        <p className="text-body text-stone-700">
          Outcomes over credentials. Systems over hacks. Teaching what actually works.
        </p>
      </div>
    </div>
  </div>
</section>
```

#### Rules

**This Section Must Be Skippable:**
- Not required for core understanding
- Optional depth for interested employers
- Skimmers can skip without penalty

**No Manifesto Language:**
- ❌ "I believe in changing the world through education"
- ✅ "Teaching what works, iterating based on outcomes"
- ❌ "My mission is to empower..."
- ✅ "Building tools that solve real problems"

**No Long Blocks of Text:**
- Maximum 2-3 sentences per item
- Prefer bullets or short paragraphs
- White space between items

#### Implementation Checklist

- [ ] Create third screen section (optional depth)
- [ ] Add "Currently focused on..." with 1-2 sentences
- [ ] Link to one featured essay (best thinking)
- [ ] Optional: Add short principle/philosophy
- [ ] Use subtle background (stone-100/50) to differentiate
- [ ] Ensure section is visually skippable
- [ ] Remove any manifesto language
- [ ] Keep text blocks short (2-3 sentences max)

#### Testing Requirements

- [ ] Section is skippable (not required for understanding)
- [ ] No manifesto or overly philosophical language
- [ ] Text blocks short (2-3 sentences max)
- [ ] Featured essay link works
- [ ] Curious users feel invited, not obligated
- [ ] Skimmers not penalized for ignoring

---

### Story 3.6: Commerce Presence on Homepage (Strict Containment)

**Priority:** Medium
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a site operator,
I want commerce acknowledged without reframing the site as a store,
So that employers see capability first and students can find resources if needed.

#### Acceptance Criteria

**Given** commerce is present on homepage
**When** an employer views the page
**Then** they can miss commerce entirely and still understand capability
**And** no product cards appear
**And** no testimonials or sales language exist
**And** no pricing appears on homepage

**Given** a student visits
**When** they look for resources
**Then** they can find the Resources link
**And** copy is neutral ("Educational resources")
**And** no urgency cues pressure them

#### Allowed

**One Subtle Link to "Resources":**
```tsx
<p className="mt-6 text-meta text-stone-500">
  <a href="/resources" className="hover:text-stone-700 transition-colors">
    Educational resources
  </a>
</p>
```
- Small, muted text
- Neutral copy
- Low visual priority
- Skippable

**Alternative (Footer or Third Screen):**
```tsx
<div className="mt-12 pt-12 border-t border-stone-200">
  <p className="text-meta text-stone-600">
    Resources built from teaching experience available at{' '}
    <a href="/resources" className="text-stone-900 hover:text-accent">
      /resources
    </a>
  </p>
</div>
```

#### Forbidden

**NO Product Cards:**
```tsx
// ❌ DO NOT DO THIS
<div className="grid grid-cols-3 gap-4">
  <ProductCard title="HSC Guide" price="$29" />
  <ProductCard title="Essay Course" price="$99" />
</div>
```

**NO Testimonials:**
```tsx
// ❌ DO NOT DO THIS
<blockquote>
  "This guide changed my life!" - Student
</blockquote>
```

**NO Sales Language:**
- ❌ "Get instant access"
- ❌ "Transform your HSC results"
- ❌ "Limited time offer"
- ✅ "Educational resources"
- ✅ "Built from teaching experience"

**NO Pricing on Homepage:**
- ❌ "$29 - HSC Essay Guide"
- ✅ "HSC Essay Guide" (price on /resources page)

#### Implementation Checklist

- [ ] Add subtle Resources link:
  - Location: Below primary CTAs OR in third screen OR footer
  - Style: `text-meta text-stone-500`
  - Copy: "Educational resources" or "Teaching resources"
- [ ] Ensure link is skippable (low visual priority)
- [ ] Remove any product cards if they exist
- [ ] Remove any testimonials
- [ ] Remove any sales language or urgency cues
- [ ] Remove any pricing from homepage
- [ ] Test: Can employer miss commerce entirely?
- [ ] Test: Can student find resources if looking?

#### Testing Requirements

- [ ] Employer can miss commerce entirely
- [ ] Student can find resources link if looking
- [ ] No product cards
- [ ] No testimonials
- [ ] No sales language or urgency
- [ ] No pricing on homepage
- [ ] Link is subtle and neutral

---

### Story 3.7: CTA Strategy (Routing, Not Conversion)

**Priority:** High
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a user,
I want clear options for navigation,
So that I feel guided but not pressured into actions.

#### Acceptance Criteria

**Given** CTAs are implemented
**When** viewing the homepage
**Then** primary CTAs (View Work, Read Writing) are clear
**And** secondary CTAs (Startups, Resources, Contact) are present but less prominent
**And** all CTAs feel like options, not instructions
**And** nothing feels like a conversion funnel

**Given** CTA design is reviewed
**When** comparing to best practices
**Then** text links are preferred over buttons
**And** buttons only used where action is expected
**And** no contrasting "conversion colors" are used

#### CTA Hierarchy

**Primary CTAs (Most Important):**
- View Work
- Read Writing

**Secondary CTAs (Available, Less Prominent):**
- Startups
- Resources
- Contact

**Tertiary (Footer or End of Page):**
- About
- Other pages

#### Primary CTA Implementation

```tsx
// Primary CTAs - Text Links with Arrows
<div className="mt-12 flex flex-wrap gap-6">
  <a
    href="/work"
    className="text-lg font-medium text-stone-900 hover:text-accent transition-colors"
  >
    View Work →
  </a>
  <a
    href="/writing"
    className="text-lg font-medium text-stone-900 hover:text-accent transition-colors"
  >
    Read Writing →
  </a>
</div>
```

**Characteristics:**
- Text-based (not heavy buttons)
- Font size: `text-lg` (18px)
- Font weight: `font-medium` (500)
- Color: `stone-900` (dark, not accent)
- Hover: `accent` color
- Arrow for direction (→)

#### Secondary CTA Implementation

```tsx
// Secondary CTAs - Smaller, Muted
<div className="mt-8 flex flex-wrap gap-4 text-meta">
  <a href="/startups" className="text-stone-600 hover:text-stone-900">
    Startups
  </a>
  <span className="text-stone-300">·</span>
  <a href="/resources" className="text-stone-600 hover:text-stone-900">
    Resources
  </a>
  <span className="text-stone-300">·</span>
  <a href="/contact" className="text-stone-600 hover:text-stone-900">
    Contact
  </a>
</div>
```

**Characteristics:**
- Smaller text: `text-meta` (14px)
- Muted color: `stone-600`
- Separated by dots (·)
- Less visual weight

#### Button Usage (Rare)

Buttons ONLY for expected actions (not navigation):
```tsx
// Only use buttons for forms or actions
<button className="px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800">
  Send Message
</button>
```

**DO NOT use buttons for:**
- Navigation ("View Work")
- Page routing
- Simple links

**DO use buttons for:**
- Form submission
- Triggering actions
- Modal opens/closes

#### Rules

1. **Text Links Preferred Over Buttons**
   - Navigation = text links
   - Actions = buttons
   - No heavy button styling for links

2. **Buttons Only Where Action Expected**
   - Form submit
   - Modal triggers
   - Actual user actions

3. **No Contrasting "Conversion Colors"**
   - ❌ Bright CTA buttons (green, orange)
   - ✅ Restrained stone-900 or accent
   - No color psychology tricks

4. **CTAs Feel Like Options, Not Instructions**
   - "View Work →" (invitation)
   - NOT "See My Work!" (command)
   - Calm, neutral tone

#### Implementation Checklist

- [ ] Implement primary CTAs as text links:
  - "View Work →"
  - "Read Writing →"
  - Large (text-lg), medium weight
  - Arrows for direction
- [ ] Implement secondary CTAs as smaller links:
  - Startups, Resources, Contact
  - Smaller (text-meta), muted
  - Separated by dots
- [ ] Remove any button styling from navigation links
- [ ] Ensure no conversion colors (bright CTAs)
- [ ] Test hover states (subtle color change)
- [ ] Verify CTAs feel like options, not commands

#### Testing Requirements

- [ ] Primary CTAs are text links, not buttons
- [ ] Secondary CTAs are smaller and muted
- [ ] No bright conversion colors
- [ ] CTAs feel like options, not instructions
- [ ] Hover states are subtle
- [ ] Nothing feels like a funnel

---

### Story 3.8: Content Prioritization Logic (What Earns Homepage Real Estate)

**Priority:** Medium
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a content manager,
I want clear rules for what gets featured on the homepage,
So that it remains curated and doesn't become a feed.

#### Acceptance Criteria

**Given** content prioritization rules are defined
**When** selecting homepage content
**Then** homepage is curated, not chronological
**And** maximum items per section are enforced
**And** "best work" beats "latest work"

**Given** governance rules exist
**When** managing homepage content
**Then** featured items are manually chosen
**And** homepage is reviewed quarterly (not weekly)
**And** homepage never becomes a feed

#### Rules

**1. Homepage is Curated, Not Chronological**
- NOT: "Latest 3 projects"
- YES: "Best 3 projects (manually selected)"

**2. Maximum Items Per Section Enforced**
- Proof anchors: 2-3 max
- Featured essay: 1 max
- Primary CTAs: 2 (Work, Writing)

**3. "Best Work" Beats "Latest Work"**
- Select for impact, not recency
- Older but better work can stay featured
- New work doesn't automatically replace old

#### Governance

**Featured Items Must Be Manually Chosen:**
- No automatic "latest 3" queries
- Admin manually marks items as "homepage featured"
- Database has `featuredOnHomepage: boolean`

**Review Homepage Quarterly, Not Weekly:**
- Don't chase recency
- Stable representation over time
- Quarterly review to update if needed

**Homepage Never Becomes a Feed:**
- No chronological listings
- No "recent posts" sections
- No activity streams

#### Implementation Checklist

- [ ] Add `featuredOnHomepage` field to content models:
  ```prisma
  model Project {
    featuredOnHomepage Boolean @default(false)
  }

  model Post {
    featuredOnHomepage Boolean @default(false)
  }
  ```
- [ ] Create admin interface to toggle featured status
- [ ] Implement homepage query for featured items only:
  ```typescript
  // Get featured items for homepage
  const featuredProjects = await db.project.findMany({
    where: {
      status: 'published',
      featuredOnHomepage: true,
    },
    orderBy: { order: 'asc' }, // Manual ordering
    take: 3,
  });
  ```
- [ ] Enforce maximum items (2-3 proof anchors, 1 essay)
- [ ] Document quarterly review process
- [ ] Remove any chronological queries

#### Testing Requirements

- [ ] Homepage shows curated content (not "latest")
- [ ] Maximum items enforced (2-3 proof, 1 essay)
- [ ] Admin can manually select featured items
- [ ] Homepage doesn't become a feed
- [ ] Best work stays featured (not replaced by latest)

---

### Story 3.9: Performance Constraints (Credibility Protection)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 6-8 hours

#### User Story

As a site operator,
I want the homepage to load instantly,
So that performance signals professionalism and credibility.

#### Acceptance Criteria

**Given** performance constraints are enforced
**When** loading the homepage
**Then** first meaningful paint is under 1 second (good connection)
**And** homepage is usable before all assets load
**And** no layout shift occurs (CLS = 0)

**Given** performance budget exists
**When** adding new features
**Then** minimal JS is used
**And** no blocking animations appear
**And** fonts are optimized
**And** no third-party trackers exist above fold

#### Performance Requirements

**1. Minimal JavaScript**
- Server-rendered (Next.js Server Components)
- Zero client-side JS for initial render
- Progressive enhancement only
- No heavy frameworks on homepage

**2. No Blocking Animations**
- No animations that delay content
- No loading spinners (content loads fast enough)
- No splash screens

**3. Optimized Fonts**
- Use next/font for automatic optimization
- Variable fonts for reduced file size
- Font-display: swap (avoid FOUT)
- Subset to Latin characters only

**4. No Third-Party Trackers Above Fold**
- Analytics loaded after interaction or delay
- No tracking scripts blocking render
- Privacy-first analytics (Plausible/Fathom)

#### Performance Budget

**Hard Constraints:**
- First Meaningful Paint: < 1s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: 0 (no shift)
- Time to Interactive: < 3s
- Total page weight: < 100KB (compressed)

#### Implementation Checklist

- [ ] Use Next.js Server Components for homepage:
  ```tsx
  // app/page.tsx - Server Component (default)
  export default async function HomePage() {
    // Server-rendered, no client JS
    return <div>...</div>;
  }
  ```
- [ ] Optimize font loading:
  ```tsx
  // app/layout.tsx
  import { Inter } from 'next/font/google';

  const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
  });
  ```
- [ ] Defer analytics loading:
  ```tsx
  // Load analytics after page interactive
  useEffect(() => {
    setTimeout(() => {
      // Load Plausible or Fathom
    }, 3000);
  }, []);
  ```
- [ ] Prevent layout shift:
  ```css
  /* Reserve space for content */
  min-height: 100vh;
  ```
- [ ] Remove blocking scripts
- [ ] Test with Lighthouse (aim for 95+ performance score)
- [ ] Test on slow 3G connection
- [ ] Monitor Core Web Vitals

#### Testing Requirements

- [ ] First Meaningful Paint < 1s (good connection)
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift = 0
- [ ] No blocking animations or spinners
- [ ] Fonts optimized (next/font)
- [ ] No third-party trackers above fold
- [ ] Lighthouse score 95+ (Performance)
- [ ] Page weight < 100KB compressed
- [ ] Works on slow 3G

---

### Story 3.10: Emotional Validation Checks (Design QA)

**Priority:** High
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a site operator,
I want the homepage to evoke the correct emotions,
So that employers and I both feel confident about the representation.

#### Acceptance Criteria

**Given** emotional targets are defined
**When** an employer views the homepage
**Then** they feel: Calm, Clarity, Trust, Respect, Light Intrigue
**And** they do NOT feel: Confusion, Pressure, Impressiveness Anxiety, "Personal Brand" Energy

**Given** operator (Nathanael) reviews homepage
**When** viewing as the site owner
**Then** "This represents me accurately"
**And** "I'm not trying too hard"
**And** comfortable sending to serious employer without explanation

#### Employer Emotions to Validate

**✅ Target Emotions:**
1. **Calm** - Not overwhelmed, site feels stable
2. **Clarity** - Understand who you are immediately
3. **Trust** - Believe claims, see real proof
4. **Respect** - Feel taken seriously, not sold to
5. **Light Intrigue** - Want to learn more (but not required)

**❌ Anti-Emotions (Must NOT Appear):**
1. **Confusion** - "What does this person actually do?"
2. **Pressure** - "Am I supposed to buy something?"
3. **Impressiveness Anxiety** - "They're trying too hard to impress me"
4. **"Personal Brand" Energy** - "This feels like influencer marketing"

#### Validation Process

**Employer Test (External):**
- Show to 3-5 employers/recruiters
- Ask: "What do you think this person does?"
- Ask: "Would you consider them for a role?"
- Ask: "How do you feel after viewing?"
- Expected answers: Calm, clear, trustworthy

**Operator Test (Internal):**
- Review your own homepage monthly
- Ask: "Does this represent me accurately?"
- Ask: "Am I trying too hard?"
- Ask: "Would I be comfortable sending this to [specific serious employer] without explanation?"
- Expected answers: Yes, No, Yes

#### Implementation Checklist

- [ ] Create emotional validation checklist:
  ```markdown
  # Homepage Emotional QA

  ## Target Emotions (Employer)
  - [ ] Calm (not overwhelmed)
  - [ ] Clarity (understand immediately)
  - [ ] Trust (believe claims)
  - [ ] Respect (taken seriously)
  - [ ] Light intrigue (want to learn more)

  ## Anti-Emotions (Must NOT appear)
  - [ ] Confusion (unclear what you do)
  - [ ] Pressure (feel sold to)
  - [ ] Impressiveness anxiety (trying too hard)
  - [ ] "Personal brand" energy (influencer vibe)

  ## Operator Check
  - [ ] Represents me accurately
  - [ ] Not trying too hard
  - [ ] Comfortable sending to serious employer without explanation

  ## Test Questions
  1. What does this person do? (Should be clear)
  2. Have they built real things? (Should be yes)
  3. Would you consider them? (Should be yes)
  4. How do you feel? (Should be calm/clear/trusting)
  ```
- [ ] Test with 3-5 external reviewers (employers/recruiters)
- [ ] Review monthly as operator
- [ ] Adjust based on feedback
- [ ] Document in `docs/homepage/emotional-validation.md`

#### Testing Requirements

- [ ] Employer feels: Calm, Clarity, Trust, Respect, Light Intrigue
- [ ] Employer does NOT feel: Confusion, Pressure, Anxiety, "Personal Brand"
- [ ] Operator feels: Accurate representation, not trying too hard
- [ ] Operator comfortable sending to serious employer
- [ ] External validation from 3-5 reviewers
- [ ] Monthly operator self-review

---

### Story 3.11: Accessibility & Usability on Homepage

**Priority:** High
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a user with accessibility needs,
I want the homepage to be fully accessible,
So that professionalism includes inclusion.

#### Acceptance Criteria

**Given** accessibility standards are met
**When** using keyboard navigation
**Then** all interactive elements are reachable via Tab
**And** focus states are clearly visible
**And** Enter/Space activates links/buttons

**Given** screen reader support exists
**When** using a screen reader
**Then** all content is readable in logical order
**And** landmarks are properly labeled
**And** images have alt text (if any)

**Given** motion preferences are respected
**When** a user has `prefers-reduced-motion` enabled
**Then** all animations are disabled or minimal

#### Requirements Recap

**Keyboard Navigable:**
- Tab through all links/CTAs
- Enter to activate
- Skip link to main content
- Logical tab order

**Clear Focus States:**
```css
*:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

**Legible Text Sizes:**
- Minimum 16px body text
- Scalable with browser zoom
- Works at 200% zoom

**High Contrast:**
- WCAG AA compliance (4.5:1 for text)
- stone-900 on stone-50 = excellent contrast

**Motion Respect:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### Implementation Checklist

- [ ] Add skip link:
  ```tsx
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-stone-900 text-white px-4 py-2 rounded"
  >
    Skip to main content
  </a>
  ```
- [ ] Add semantic HTML:
  ```tsx
  <nav aria-label="Main navigation">...</nav>
  <main id="main-content">...</main>
  ```
- [ ] Ensure visible focus states
- [ ] Test keyboard navigation (Tab through all links)
- [ ] Test screen reader (VoiceOver/NVDA)
- [ ] Verify text contrast (WCAG AA)
- [ ] Test at 200% browser zoom
- [ ] Add `prefers-reduced-motion` CSS
- [ ] Run axe DevTools accessibility scan

#### Testing Requirements

- [ ] All links reachable via keyboard (Tab)
- [ ] Focus states clearly visible
- [ ] Screen reader reads content in logical order
- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] Text readable at 200% zoom
- [ ] Motion disabled with `prefers-reduced-motion`
- [ ] Skip link works
- [ ] Semantic HTML (nav, main)
- [ ] axe DevTools reports no critical issues

---

## Epic Completion Criteria

Epic 3 is considered **COMPLETE** when:

✅ Five core employer questions answered above fold
✅ Above-fold structure implemented (name, positioning, context, CTAs)
✅ Visual tone feels like Apple internal memo (calm, precise)
✅ Proof anchors (2-3) show real work with outcomes
✅ Optional third screen provides thinking/direction depth
✅ Commerce contained (subtle Resources link only)
✅ CTAs feel like routing, not conversion
✅ Content prioritization rules documented (curated, not feed)
✅ Performance budget met (< 1s FMP, CLS = 0)
✅ Emotional validation passed (employer + operator tests)
✅ Accessibility standards met (keyboard, screen reader, WCAG AA)

**Deliverables:**
1. `app/page.tsx` - Complete homepage implementation
2. `components/ProofAnchor.tsx` - Proof anchor component
3. `docs/homepage/core-questions.md` - Five question framework
4. `docs/homepage/content-prioritization.md` - Curation rules
5. `docs/homepage/performance-budget.md` - Performance constraints
6. `docs/homepage/emotional-validation.md` - QA checklist

**The homepage earns attention. It doesn't ask for it.**
