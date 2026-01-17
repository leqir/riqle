# EPIC 6 — Startups Showcase (Founder Proof, Not Hype)

**Epic ID:** 6
**Epic Name:** Startups Showcase (Founder Proof, Not Hype)
**Status:** Ready for Implementation
**Dependencies:** Epic 0 (Infrastructure), Epic 1 (Information Architecture), Epic 2 (Design System)
**Total Stories:** 11

---

## Epic Overview

### Purpose

Present startups (especially MarkPoint) as evidence of ownership, decision-making, and execution under uncertainty, not as pitches, landing pages, or marketing assets.

**This is not a "founder flex."**
**This is responsibility made legible.**

### User Outcome

This epic ensures:

- Startups increase credibility rather than raising skepticism
- Failure or incompleteness is framed as learning, not weakness
- Employers see founder work as signal, not distraction

### Core Question Answered

**"What happens when no one tells you what to do?"**

Employers can conclude:

- "This person can take ownership end-to-end"
- "They can operate without instruction"
- "They understand tradeoffs, not just ideas"

---

## Architecture Decisions

### Page Structure

```
/startups              # Startups listing page (1-3 startups max)
/startups/[slug]       # Individual startup detail pages
```

### Component Hierarchy

```
StartupsPage
├── StartupsList (curated list of 1-3 startups)
│   └── StartupCard[] (name, description, role, status)
└── Pagination (none - all startups visible)

StartupDetailPage
├── Overview (what, who, problem)
├── WhyItExists (pain point, gap, rationale)
├── YourRole (ownership, decisions, responsibility)
├── WhatWasBuilt (systems, infrastructure, operations)
├── OutcomesAndStatus (shipped, used, worked, didn't work, current state)
└── WhatYouLearned (specific lessons, connection to current work)
```

### Content Model (Prisma Schema Addition)

```prisma
// Add to existing schema in Epic 0

model Startup {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String   // One-line description
  role        String   // "Founder", "Co-founder", "Product owner"
  status      String   // "Active", "Iterating", "Paused", "Sunset"

  // Overview
  overview    String   // What it does, who it's for, problem it addresses

  // Why it exists
  whyItExists String   // Pain point, gap, why existing solutions insufficient

  // Your role & responsibility
  roleDetail  String   // What you owned, decisions made, systems responsible for

  // What was built
  systemsBuilt String  // Systems, infrastructure, operational components

  // Outcomes & current status
  outcomes    String   // What shipped, who used it, what worked/didn't
  statusDetail String  // Current state explanation

  // What you learned
  learnings   String   // Specific lessons, how they inform current work

  // Metrics (optional)
  metrics     Json?    // { users: 500, revenue: "$5K MRR", retention: "40%" }

  // Media
  screenshots String[] // Array of image URLs (sparingly)
  diagrams    String[] // Optional: architecture/flow diagrams

  // Cross-linking
  relatedProjectSlugs String[] // Related Work items
  relatedPostSlugs    String[] // Related Writing

  // Metadata
  featured    Boolean  @default(false) // Homepage feature flag
  displayOrder Int     @default(0)
  published   Boolean  @default(false)

  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([displayOrder])
  @@index([featured])
}
```

### Routing

```typescript
// app/startups/page.tsx - Startups listing
export default async function StartupsPage() {
  const startups = await db.startup.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
    take: 3, // Max 3 startups
  });
  return <StartupsList startups={startups} />;
}

// app/startups/[slug]/page.tsx - Startup detail
export default async function StartupPage({ params }: { params: { slug: string } }) {
  const startup = await db.startup.findUnique({
    where: { slug: params.slug },
  });
  if (!startup) notFound();
  return <StartupDetail startup={startup} />;
}
```

### Design Constraints

- **Professional record, not sales page** (no marketing slogans, no pitch decks)
- **Curated list** (1-3 startups max, usually 1 primary venture)
- **Text-first** (visuals explain how, not sell why)
- **Honest status** (active, paused, sunset framed plainly)
- **Ownership clarity** (no vague "we" language)

---

## Stories

### Story 6.1: Core Job-to-Be-Done

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As an **employer evaluating ownership and initiative**,
I want **to understand what happens when Nathanael operates without instruction**,
So that **I can assess end-to-end ownership, self-direction, and tradeoff understanding**.

#### Acceptance Criteria

**Given** an employer visits the Startups page
**When** they spend 60–90 seconds reading
**Then** they understand your role and responsibility
**And** the page increases trust rather than triggering "side-project concern"
**And** they conclude: "This person can take ownership end-to-end"

#### Implementation Checklist

- [ ] Define page metadata and SEO
  ```typescript
  // app/startups/page.tsx
  export const metadata: Metadata = {
    title: 'Startups | Nathanael',
    description:
      "Ventures I've founded and operated—evidence of ownership, decision-making, and execution under uncertainty.",
  };
  ```
- [ ] Create StartupsPage component with job-to-be-done focus
- [ ] Document acceptance criteria for editorial review
- [ ] Create validation checklist:
  - Do employers understand role/responsibility in 60-90 seconds?
  - Does page increase trust or trigger side-project concern?
  - Is end-to-end ownership evident?

#### Testing Requirements

- [ ] Time test: Can 3 employers understand role in 60-90 seconds?
- [ ] Trust test: Does page increase or decrease credibility?
- [ ] Ownership test: Do employers conclude you can operate independently?

---

### Story 6.2: What Qualifies as a "Startup" (Inclusion Rules)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **content curator**,
I want **clear inclusion standards for what qualifies as a "startup"**,
So that **credibility is not diluted by aspirational or incomplete ventures**.

#### Acceptance Criteria

**Given** a potential startup for inclusion
**When** evaluating against standards
**Then** every listed startup involved real responsibility
**And** nothing exists purely aspirationally
**And** the venture meets included categories

#### Included

✅ Ventures where you had:

- Founder or co-founder responsibility
- Strategic ownership
- Execution accountability

✅ Products with:

- Real users
- Real constraints
- Real consequences

#### Excluded

❌ Idea decks
❌ Hackathon demos (unless evolved into real products)
❌ Experiments without users
❌ Landing pages without systems behind them

#### Implementation Checklist

- [ ] Create inclusion criteria document

  ```markdown
  # Startup Inclusion Standards

  ## Included Categories

  1. **Founder/Co-founder ventures** with strategic and execution responsibility
  2. **Products with real users** facing real constraints and consequences

  ## Explicit Exclusions

  - Idea decks or concepts
  - Hackathon demos (unless evolved)
  - Experiments without users
  - Landing pages without backend systems

  ## Inclusion Checklist

  For each potential startup, ask:

  - [ ] Did you have founder or strategic ownership?
  - [ ] Were you accountable for execution?
  - [ ] Did it have real users facing real constraints?
  - [ ] Would failure have had real consequences?
  - [ ] Can you discuss operational details confidently?

  ## Quality Bar

  - Must demonstrate end-to-end ownership
  - Must have concrete users or learnings
  - Must involve decisions with consequences
  ```

- [ ] Review existing ventures against criteria
- [ ] Create content review process
- [ ] Document why each included startup qualifies

#### Testing Requirements

- [ ] Inclusion test: Does each startup meet standards?
- [ ] Responsibility test: Can you articulate what you owned?
- [ ] Credibility test: Does inclusion increase or dilute signal?

---

### Story 6.3: Startups Page Structure (Macro)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As an **employer with limited time**,
I want **to scan the Startups page easily**,
So that **I can identify the primary venture and assess scope without pitch-like friction**.

#### Acceptance Criteria

**Given** the Startups page is loaded
**When** an employer scans it
**Then** the page reads like a professional record, not a sales page
**And** employers can identify the primary venture immediately
**And** there are no marketing slogans, traction bragging, or pitch decks

#### Recommended Structure

- Short intro sentence explaining the purpose of the page
- List of startups (usually 1–3)
- Each startup shown as:
  - Name
  - One-line description
  - Your role
  - Status (active, paused, sunset)

#### Rules

❌ No marketing slogans
❌ No traction bragging
❌ No pitch decks

#### Implementation Checklist

- [ ] Create StartupsList component

  ```tsx
  // components/startups/StartupsList.tsx
  import Link from 'next/link';

  type Startup = {
    slug: string;
    name: string;
    description: string;
    role: string;
    status: string;
  };

  export function StartupsList({ startups }: { startups: Startup[] }) {
    return (
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
        <div className="space-y-4">
          <h1 className="text-h1 font-semibold text-stone-900">Startups</h1>
          <p className="text-body max-w-2xl text-stone-600">
            Ventures I've founded and operated—evidence of ownership, decision-making, and execution
            under uncertainty.
          </p>
        </div>

        <div className="space-y-8">
          {startups.map((startup) => (
            <StartupCard key={startup.slug} startup={startup} />
          ))}
        </div>
      </div>
    );
  }
  ```

- [ ] Create StartupCard component

  ```tsx
  // components/startups/StartupCard.tsx
  export function StartupCard({ startup }: { startup: Startup }) {
    return (
      <Link
        href={`/startups/${startup.slug}`}
        className="group block space-y-3 rounded-lg border border-stone-200 p-6 transition-colors hover:border-stone-300"
      >
        {/* Name & Status */}
        <div className="flex items-center justify-between">
          <h2 className="text-h3 group-hover:text-accent font-semibold text-stone-900">
            {startup.name}
          </h2>
          <span className="text-meta text-stone-500">{startup.status}</span>
        </div>

        {/* Description */}
        <p className="text-body text-stone-700">{startup.description}</p>

        {/* Role */}
        <div className="text-meta text-stone-600">
          <strong className="text-stone-800">Role:</strong> {startup.role}
        </div>

        {/* CTA */}
        <div className="text-meta text-accent group-hover:underline">View details →</div>
      </Link>
    );
  }
  ```

- [ ] Implement curated ordering (displayOrder field)
- [ ] Limit to 1-3 startups max
- [ ] Remove any marketing language
- [ ] Ensure professional record tone

#### Testing Requirements

- [ ] Scan test: Can employers identify primary venture immediately?
- [ ] Tone test: Does page feel like a record or sales page?
- [ ] Clarity test: Is scope and status clear at a glance?

---

### Story 6.4: Individual Startup Page Structure (Ownership Clarity)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 6-8 hours

#### User Story

As an **employer evaluating how founders think and act**,
I want **to see clear ownership, decisions, and responsibility**,
So that **I understand what you owned and what would have failed without you**.

#### Acceptance Criteria

**Given** an employer reads a startup detail page
**When** they finish reading
**Then** they understand what you owned and decided
**And** they can see how you think as an owner
**And** all required sections are present
**And** there is no vague "we" language without clarification

#### Required Sections

1. **Overview** (What the startup does, who it's for, the problem it addresses)
2. **Why it exists** (Pain point, gap, why existing solutions insufficient)
3. **Your role & responsibility** (What you owned, decisions made, what would fail without you)
4. **What was built** (Systems, infrastructure, operational components)
5. **Outcomes & current status** (What shipped, who used it, what worked/didn't, current state)
6. **What you learned** (Specific lessons, connection to current work)

#### Implementation Checklist

- [ ] Create StartupDetail component

  ```tsx
  // components/startups/StartupDetail.tsx
  type Startup = {
    name: string;
    overview: string;
    whyItExists: string;
    roleDetail: string;
    systemsBuilt: string;
    outcomes: string;
    statusDetail: string;
    learnings: string;
    metrics?: Record<string, string>;
    screenshots: string[];
  };

  export function StartupDetail({ startup }: { startup: Startup }) {
    return (
      <div className="mx-auto max-w-3xl space-y-12 px-6 py-16">
        {/* Name */}
        <h1 className="text-h1 font-semibold text-stone-900">{startup.name}</h1>

        {/* Overview */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Overview</h2>
          <div className="prose prose-stone max-w-none">{startup.overview}</div>
        </section>

        {/* Why it exists */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Why it exists</h2>
          <div className="prose prose-stone max-w-none">{startup.whyItExists}</div>
        </section>

        {/* Your role & responsibility */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Your role & responsibility</h2>
          <div className="prose prose-stone max-w-none">{startup.roleDetail}</div>
        </section>

        {/* What was built */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">What was built</h2>
          <div className="prose prose-stone max-w-none">{startup.systemsBuilt}</div>
        </section>

        {/* Outcomes & current status */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Outcomes & current status</h2>
          <div className="prose prose-stone max-w-none">{startup.outcomes}</div>
          <div className="prose prose-stone max-w-none">{startup.statusDetail}</div>
        </section>

        {/* Metrics (if available) */}
        {startup.metrics && (
          <section className="space-y-4">
            <div className="text-body flex flex-wrap gap-6 text-stone-700">
              {Object.entries(startup.metrics).map(([key, value]) => (
                <div key={key}>
                  <span className="text-stone-500">{key}:</span>{' '}
                  <strong className="text-stone-900">{value}</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* What you learned */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">What I learned</h2>
          <div className="prose prose-stone max-w-none">{startup.learnings}</div>
        </section>

        {/* Screenshots (sparingly) */}
        {startup.screenshots.length > 0 && (
          <section className="space-y-4">
            {startup.screenshots.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${startup.name} screenshot ${index + 1}`}
                className="w-full rounded-lg border border-stone-200"
              />
            ))}
          </section>
        )}
      </div>
    );
  }
  ```

- [ ] Create startup detail page template
- [ ] Implement all required sections
- [ ] Review for vague "we" language (clarify or remove)
- [ ] Ensure ownership clarity in every section

#### Testing Requirements

- [ ] Completeness test: Are all required sections present?
- [ ] Ownership test: Can employers identify what you owned?
- [ ] Clarity test: Is it clear what would have failed without you?

---

### Story 6.5: Framing Incomplete or Paused Startups (Credibility, Not Shame)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 4-5 hours

#### User Story

As an **employer concerned about unfinished projects**,
I want **paused or incomplete startups framed honestly without defensiveness**,
So that **I see decision-making maturity, not instability**.

#### Acceptance Criteria

**Given** a startup is paused or incomplete
**When** employers read the explanation
**Then** paused projects increase trust rather than doubt
**And** employers see decision-making maturity
**And** the page conveys: "I can start, evaluate, and stop responsibly"

#### Required Framing

1. State status plainly
2. Explain constraints honestly
3. Emphasize decisions, not excuses

#### Explicit Bans

❌ Over-defensiveness
❌ Romanticizing struggle
❌ Apologetic tone

#### Implementation Checklist

- [ ] Create framing guidelines for paused/incomplete startups

  ```markdown
  # Framing Paused/Incomplete Startups

  ## Required Framing

  1. **State status plainly**
     - "Currently paused while I focus on X"
     - "Active but iterating based on user feedback"
     - "Sunset after validating that Y approach wasn't viable"

  2. **Explain constraints honestly**
     - "User acquisition costs exceeded sustainable unit economics"
     - "Technical constraints required a rebuild I couldn't justify"
     - "Market validation showed limited demand for this approach"

  3. **Emphasize decisions, not excuses**
     - "I decided to pause rather than scale prematurely"
     - "After testing with 50 users, I pivoted to Z instead"

  ## Good Examples

  - "Active. Currently serving 500 users, iterating on retention based on feedback."
  - "Paused. After 6 months, user feedback indicated the core assumption was wrong. I validated the learning and moved on."

  ## Bad Examples (defensive/apologetic)

  - "Unfortunately, I had to pause due to lack of time."
  - "It was really hard, but I learned so much from the struggle."
  - "I'm sorry this isn't further along, but..."

  ## Tone

  - Matter-of-fact
  - Data-driven
  - Decision-focused
  ```

- [ ] Review all startup statuses
- [ ] For paused/sunset ventures:
  - State constraints plainly
  - Explain decision rationale
  - Remove defensiveness/apology
- [ ] Test framing with "Does this increase or decrease trust?"

#### Testing Requirements

- [ ] Trust test: Do paused projects increase or decrease credibility?
- [ ] Maturity test: Do employers see decision-making capability?
- [ ] Tone test: Is framing matter-of-fact, not defensive?

---

### Story 6.6: Metrics & Outcomes (How to Include Without Bragging)

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As an **employer evaluating scope and impact**,
I want **to see meaningful metrics without hype**,
So that **I understand reality, not inflated claims**.

#### Acceptance Criteria

**Given** a startup includes metrics
**When** employers read them
**Then** metrics clarify scope, not inflate importance
**And** absence of metrics does not feel evasive
**And** only meaningful metrics are included

#### Acceptable Metrics

✅ Users onboarded
✅ Revenue (if meaningful)
✅ Essays marked / students helped
✅ Retention or engagement patterns

#### Rules

✅ Only include metrics that inform understanding
❌ Avoid vanity metrics
✅ Use ranges if exact numbers aren't appropriate

#### Implementation Checklist

- [ ] Create metrics guidelines

  ```markdown
  # Metrics Guidelines (Startups)

  ## Acceptable Metrics

  - Users onboarded: "500 students onboarded in 6 months"
  - Revenue: "$5K MRR" (if meaningful scale)
  - Work completed: "2,000+ essays marked"
  - Retention: "40% weekly active retention"
  - Engagement: "Average 3 essays per student per month"

  ## Avoid

  - Vanity metrics: "10K signups" (if no engagement)
  - Aspirational metrics: "Projected to reach..."
  - Hype language: "Explosive growth!", "10x in 3 months!"

  ## Guidelines

  - Only include if it informs understanding of scope
  - Use ranges if exact numbers aren't appropriate
  - Omit metrics if you don't have meaningful data
  - Context over raw numbers: "500 users (40% retention)" beats "500 users"

  ## Good Examples

  - "Helped 500 students achieve Band 6 in HSC English"
  - "$5K MRR from 100 paying customers"
  - "2,000+ essays marked with 40% weekly retention"

  ## Bad Examples

  - "Growing 10x month over month!"
  - "Thousands of signups!"
  - "Projected $100K ARR next quarter"
  ```

- [ ] Review all startup metrics
- [ ] Remove vanity metrics
- [ ] Add context to raw numbers
- [ ] Use ranges where appropriate
- [ ] Ensure absence of metrics doesn't feel evasive

#### Testing Requirements

- [ ] Clarity test: Do metrics inform understanding of scope?
- [ ] Hype test: Is there any bragging or inflated language?
- [ ] Context test: Are metrics contextualized or raw numbers?

---

### Story 6.7: Visual Design Constraints (Startup Pages)

**Priority:** High
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **reader**,
I want **the Startups pages to avoid startup-landing-page energy**,
So that **visuals explain how, not sell why**.

#### Acceptance Criteria

**Given** the Startups pages include visuals
**When** readers view them
**Then** the page reads well without visuals
**And** visuals never dominate the narrative
**And** visuals explain how systems work, not sell the idea

#### Allowed Visuals

✅ Simple screenshots
✅ Architecture diagrams
✅ Product flows
✅ Hand-drawn systems diagrams (sparingly)

#### Forbidden Visuals

❌ Hero mockups
❌ Explainer videos
❌ Animations
❌ Customer testimonials

#### Rules

✅ Visuals must explain how, not sell why

#### Implementation Checklist

- [ ] Create visual restraint guidelines

  ```markdown
  # Visual Restraint Guidelines (Startup Pages)

  ## Allowed

  - Screenshots (1-3 max, showing system function)
  - Architecture diagrams (how systems connect)
  - Product flows (how users move through system)
  - Hand-drawn diagrams (sparingly, to explain complexity)

  ## Forbidden

  - Hero mockups
  - Explainer videos
  - Animations or motion graphics
  - Customer testimonials
  - Marketing imagery

  ## Rules

  - Visuals must explain HOW, not sell WHY
  - Text must come first
  - Page must read well with images removed
  - Max 3 images per startup detail page
  ```

- [ ] Review all startup visuals
- [ ] Remove hero images, videos, testimonials
- [ ] Ensure screenshots are explanatory
- [ ] Limit to 3 images max per startup
- [ ] Test page with images disabled

#### Testing Requirements

- [ ] No-image test: Does page work with images removed?
- [ ] Dominance test: Do visuals dominate or support narrative?
- [ ] Explanation test: Do visuals explain how or sell why?

---

### Story 6.8: Relationship to Work & Writing (Cross-Evidence)

**Priority:** Medium
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **deep reader**,
I want **to trace ideas, systems, and outcomes across startups, work, and writing**,
So that **the site feels like one coherent story**.

#### Acceptance Criteria

**Given** related content exists across startups, work, and writing
**When** cross-links are added
**Then** employers can trace ideas → systems → outcomes
**And** the site feels like one coherent story
**And** links feel referential, not promotional

#### Cross-Linking Rules

Startup pages link to:

- Systems you built (Work)
- Essays reflecting on decisions (Writing)

Work pages link back to:

- Startup context when relevant

#### Implementation Checklist

- [ ] Add relatedProjectSlugs and relatedPostSlugs to Startup model (already in schema)
- [ ] Create StartupRelatedContent component

  ```tsx
  // components/startups/StartupRelatedContent.tsx
  export function StartupRelatedContent({
    projects,
    posts,
  }: {
    projects?: Array<{ slug: string; title: string }>;
    posts?: Array<{ slug: string; title: string }>;
  }) {
    if (!projects?.length && !posts?.length) return null;

    return (
      <section className="space-y-4 border-t border-stone-200 pt-8">
        <h3 className="text-h3 font-semibold text-stone-900">Related</h3>

        {projects && projects.length > 0 && (
          <div className="space-y-2">
            <p className="text-meta text-stone-600">Work:</p>
            <ul className="space-y-1">
              {projects.map((project) => (
                <li key={project.slug}>
                  <a
                    href={`/work/${project.slug}`}
                    className="text-body text-accent hover:underline"
                  >
                    {project.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="space-y-2">
            <p className="text-meta text-stone-600">Writing:</p>
            <ul className="space-y-1">
              {posts.map((post) => (
                <li key={post.slug}>
                  <a
                    href={`/writing/${post.slug}`}
                    className="text-body text-accent hover:underline"
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  }
  ```

- [ ] Identify cross-linking opportunities (e.g., MarkPoint → payment system → essay on commerce)
- [ ] Add related content to startup pages
- [ ] Add startup context to relevant work pages
- [ ] Review for promotional tone (keep referential)
- [ ] Limit to 2-3 related items max per startup

#### Testing Requirements

- [ ] Coherence test: Can employers trace ideas across artifacts?
- [ ] Referential test: Do links feel natural, not promotional?
- [ ] Story test: Does site feel like one coherent narrative?

---

### Story 6.9: Handling MarkPoint Specifically (Primary Venture)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 5-6 hours

#### User Story

As an **employer evaluating MarkPoint**,
I want **to see it as serious founder work, not a side hustle**,
So that **I view it as evidence of capability, not distraction**.

#### Acceptance Criteria

**Given** the MarkPoint startup page exists
**When** employers read it
**Then** MarkPoint feels like an operating company
**And** employers see it as evidence of capability, not distraction
**And** emphasis is on problem, systems, pedagogy, and operations
**And** growth marketing and hype are de-emphasized

#### Emphasis Areas

✅ Problem definition
✅ System design
✅ Pedagogical philosophy
✅ Operational rigor (payments, users, delivery)

#### De-Emphasize

❌ Growth marketing
❌ Hype language
❌ Future promises

#### Implementation Checklist

- [ ] Create MarkPoint content outline

  ```markdown
  # MarkPoint Content Structure

  ## Overview

  - What: AI-powered essay feedback platform for HSC English students
  - Who: HSC students preparing for high-stakes exams
  - Problem: Lack of timely, specific, actionable feedback on practice essays

  ## Why it exists

  - Pain point: After tutoring 500+ students, observed feedback delay as #1 constraint
  - Gap: Existing tools focus on grammar, not argument structure and evidence use
  - Why existing solutions insufficient: Generic AI tools don't understand HSC marking criteria

  ## Your role & responsibility

  - Solo founder: designed system, built platform, operated business
  - Owned: product strategy, technical architecture, pedagogical model, payment/delivery
  - Decisions: chose to focus on depth (HSC English) over breadth (all subjects)
  - What would fail: without me, the pedagogical model, marking criteria integration, and ops

  ## What was built

  - Systems: essay submission → AI analysis → structured feedback → delivery
  - Infrastructure: Stripe integration, user auth, essay storage, feedback pipeline
  - Pedagogical engine: HSC criteria mapping, rubric-based analysis, actionable suggestions
  - Operations: customer onboarding, support, iteration based on feedback

  ## Outcomes & current status

  - Active: serving 500 students
  - Revenue: $5K MRR
  - Retention: 40% weekly active users
  - What worked: depth-first approach, HSC criteria specificity
  - What didn't: initial UX too complex, needed simplification
  - Current: iterating on retention based on user feedback

  ## What you learned

  - Specific lesson 1: Depth beats breadth in education tools—students pay for specificity
  - Specific lesson 2: Feedback speed matters more than comprehensiveness for retention
  - Connection to current work: informs how I approach product scope and user value
  ```

- [ ] Write MarkPoint content focusing on:
  - Problem clarity
  - System design
  - Pedagogical rigor
  - Operational execution
- [ ] Remove growth marketing language
- [ ] Remove hype and future promises
- [ ] Emphasize what's built and operating NOW

#### Testing Requirements

- [ ] Operating company test: Does MarkPoint feel like a real company?
- [ ] Capability test: Do employers see it as evidence, not distraction?
- [ ] Tone test: Is there any hype or marketing language?

---

### Story 6.10: Emotional Validation Checks (Startups Epic)

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **quality control mechanism**,
I want **to validate that Startups pages produce the right emotional outcome**,
So that **employers feel respect and trust, not skepticism or founder fantasy**.

#### Acceptance Criteria

**Given** the Startups pages are complete
**When** employers read them
**Then** they feel respect, trust, confidence, and "this person can handle responsibility"
**And** they do NOT feel skepticism, "side-project chaos", or "founder fantasy"
**And** you would feel comfortable discussing any startup candidly
**And** no part of the page feels performative

#### Desired Employer Emotions

✅ Respect
✅ Trust
✅ Confidence
✅ "This person can handle responsibility"

#### Anti-Emotions

❌ Skepticism
❌ "Side-project chaos"
❌ "Founder fantasy"

#### Implementation Checklist

- [ ] Create emotional validation checklist

  ```markdown
  # Startups Page Emotional Validation Checklist

  ## Pre-launch Review

  - [ ] Would I feel comfortable discussing any startup candidly in an interview?
  - [ ] Does any part feel performative or exaggerated?
  - [ ] Does any startup trigger "side-project chaos" concern?
  - [ ] Does MarkPoint feel like a real operating company?

  ## External Validation (3-5 test readers)

  - [ ] Ask: "What emotions did you feel reading this?"
  - [ ] Expected: respect, trust, confidence, "can handle responsibility"
  - [ ] Red flags: skepticism, "side-project chaos", "founder fantasy"

  ## Interview Simulation

  - [ ] For each startup, prepare to answer:
    - "Why did you start this?"
    - "What was your role exactly?"
    - "What didn't work?"
    - "Would you do it again?"
  - [ ] If you can't answer confidently, revise or remove
  ```

- [ ] Conduct pre-launch review
- [ ] Run external validation with 3-5 test readers
- [ ] Simulate interview scenarios for each startup
- [ ] Remove any content that triggers anti-emotions

#### Testing Requirements

- [ ] Emotional response test: Ask 3-5 readers "What emotions did you feel?"
- [ ] Interview test: Can you discuss each startup candidly?
- [ ] Performative test: Does anything feel like a performance?
- [ ] Chaos test: Does page trigger side-project concern?

---

### Story 6.11: Governance & Curation Rules

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **portfolio maintainer**,
I want **clear governance rules to keep startups section strong over time**,
So that **signal density improves, not decreases**.

#### Acceptance Criteria

**Given** the startups section is maintained over time
**When** governance rules are applied
**Then** the startups section remains small and high-quality
**And** signal density improves over time
**And** ventures that no longer represent you are archived

#### Governance Rules

- Limit visible startups to those that still represent you
- Archive or remove ventures that no longer add signal
- Review annually

#### Implementation Checklist

- [ ] Create curation governance document

  ```markdown
  # Startups Curation Governance

  ## Annual Review Process

  Run every 12 months:

  1. **Review all published startups**
     - Does this still represent my current work?
     - Would I discuss this confidently in an interview today?
     - Does this demonstrate capabilities I want to be hired for?

  2. **Apply limits**
     - Max 1-3 startups visible
     - Primary venture (MarkPoint) always featured
     - Archive ventures that no longer add signal

  3. **Update content**
     - Refresh outcomes/status
     - Update learnings based on new perspective
     - Remove outdated metrics

  ## Archiving vs Deletion

  - Never delete startups (keep in database)
  - Set published: false to archive
  - Can be restored if relevant again

  ## Signal Density

  - Quality over quantity
  - 1 strong startup > 3 weak ones
  - Archive ventures that raise questions rather than answer them
  ```

- [ ] Implement published flag (already in schema)
- [ ] Create admin interface for curation
- [ ] Set up annual review reminder
- [ ] Document archiving process

#### Testing Requirements

- [ ] Limit test: Are there 1-3 startups max?
- [ ] Quality test: Does each startup add signal?
- [ ] Signal test: Is density high?

---

## Epic Completion Criteria

Epic 6 is considered complete when:

### Content & Structure

- [ ] All 11 stories implemented and tested
- [ ] Startups page shows 1-3 curated ventures
- [ ] Each startup has clear ownership, outcomes, and learnings
- [ ] Inclusion standards documented and enforced
- [ ] MarkPoint positioned as operating company, not side project

### Ownership & Trust

- [ ] Every startup demonstrates founder responsibility
- [ ] Role clarity is precise (what you owned, decided, built)
- [ ] Paused/incomplete ventures increase trust, not doubt
- [ ] Outcomes are honest (what worked, what didn't)

### Visual & Tone

- [ ] Professional record, not sales page (no pitch decks, no hype)
- [ ] Text-first layout (visuals explain how, not sell why)
- [ ] Matter-of-fact tone for paused/sunset ventures
- [ ] Maximum 3 images per startup detail page

### Cross-Evidence & Coherence

- [ ] Cross-links to Work and Writing where relevant
- [ ] Site feels like one coherent story
- [ ] Deep readers can trace ideas → systems → outcomes

### User Validation

- [ ] 3-5 employers conclude "can take ownership end-to-end" in 60-90 seconds
- [ ] MarkPoint feels like evidence of capability, not distraction
- [ ] Emotional validation produces respect/trust, not skepticism/chaos
- [ ] Interview simulation passes for all startups

---

## EPIC 6 Deliverables

By the end of EPIC 6, you have:

1. **A startups section that builds trust**
   Ventures presented as evidence of ownership, not ideas

2. **Clear articulation of founder responsibility**
   What you owned, decided, and would have failed without you

3. **Honest framing of outcomes and decisions**
   What worked, what didn't, what you learned

4. **A narrative that reinforces, not distracts from, employability**
   Startups signal capability, not chaos

---

## Why EPIC 6 Matters

### Many candidates hide founder work because they fear

- Skepticism ("Is this a distraction?")
- Distraction concerns ("Will they commit?")
- Unfinished narratives ("Why didn't it succeed?")

### Handled correctly, startups become your strongest signal

**Not because they succeeded — but because you owned them.**

When employers see:

- Clear problem definition
- System design decisions
- Operational execution
- Honest outcome framing
- Specific learnings

They conclude: **"This person can handle responsibility without instruction."**

---

**Epic Status:** Ready for Implementation
**Next Epic:** Epic 7 — Writing & Thinking
