# EPIC 5 — Work & Portfolio (Proof of Execution)

**Epic ID:** 5
**Epic Name:** Work & Portfolio (Proof of Execution)
**Status:** Ready for Implementation
**Dependencies:** Epic 0 (Infrastructure), Epic 1 (Information Architecture), Epic 2 (Design System)
**Total Stories:** 12

---

## Epic Overview

### Purpose

Present Nathanael's work as credible, contextualized execution, not a visual showcase or résumé clone.

**This is evidence, not exhibition.**

### User Outcome

This epic ensures that:

- Employers can quickly identify real output
- Projects feel intentional rather than scattered
- Every artifact reinforces trust in judgment and follow-through

### Core Question Answered

**"Does this person ship?"**
**"Do they understand scope and tradeoffs?"**
**"Can they own work end-to-end?"**

This page exists to remove doubt, not impress visually.

---

## Architecture Decisions

### Page Structure

```
/work                    # Portfolio listing page (curated, 5-7 items max)
/work/[slug]            # Individual project detail pages
```

### Component Hierarchy

```
WorkPage
├── WorkList (curated list of 5-7 projects)
│   └── WorkCard[] (name, description, role, outcome, link)
└── Pagination (none - all projects visible)

ProjectDetailPage
├── ProjectOverview (what, why, who)
├── YourRole (ownership, decisions, implementation)
├── Execution (choices, constraints, tradeoffs)
├── Outcome (shipped, used, impact)
└── Reflection (optional: learnings, what you'd do differently)
```

### Content Model (Prisma Schema Addition)

```prisma
// Add to existing schema in Epic 0

model Project {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String   // One-line description
  role        String   // "Solo founder", "Lead developer", "Product owner"
  outcome     String   // "Shipped to 500 users", "Reduced load time by 60%"
  status      String   // "Shipped", "In production", "Experimental", "Ongoing"

  // Overview
  overview    String   // What it is, why it exists, who it was for

  // Your Role
  roleDetail  String   // What you owned, decided, implemented
  teamSize    Int?     // Optional: team size if collaborative

  // Execution
  execution   String   // Technical/design choices, constraints, tradeoffs

  // Outcome detail
  outcomeDetail String // What shipped, who used it, what changed

  // Reflection (optional)
  reflection  String?

  // Media
  screenshots String[] // Array of image URLs (sparingly)
  diagrams    String[] // Optional: architecture diagrams

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
// app/work/page.tsx - Portfolio listing
export default async function WorkPage() {
  const projects = await db.project.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
    take: 7, // Max 7 projects
  });
  return <WorkList projects={projects} />;
}

// app/work/[slug]/page.tsx - Project detail
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await db.project.findUnique({
    where: { slug: params.slug },
  });
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
```

### Design Constraints

- **Curated list** (5-7 items max, no pagination)
- **Best work first** (not chronological)
- **Text-first** (visuals support explanation)
- **Restrained visuals** (screenshots sparingly, no hero images)
- **Clear role/outcome** (precision over humility)

---

## Stories

### Story 5.1: Core Job-to-Be-Done

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As an **employer evaluating competence**,
I want **to quickly determine if Nathanael ships real work**,
So that **I can confidently conclude he understands scope, tradeoffs, and follow-through**.

#### Acceptance Criteria

**Given** an employer visits the Work page
**When** they spend <2 minutes scanning
**Then** they can name at least one concrete thing you built
**And** the work feels real, scoped, and finished (or honestly framed if ongoing)
**And** they conclude: "This person ships"

#### Implementation Checklist

- [ ] Define page metadata and SEO
  ```typescript
  // app/work/page.tsx
  export const metadata: Metadata = {
    title: 'Work | Nathanael',
    description: "Projects, products, and systems I've built and shipped.",
  };
  ```
- [ ] Create WorkPage component with job-to-be-done focus
- [ ] Document acceptance criteria for editorial review
- [ ] Create validation checklist:
  - Can employers name one concrete thing in <2 minutes?
  - Does work feel real and scoped?
  - Is "this person ships" the takeaway?

#### Testing Requirements

- [ ] Time test: Can 3 employers identify concrete work in <2 minutes?
- [ ] Reality test: Does work feel real or padded?
- [ ] Competence test: Do employers conclude you can ship?

---

### Story 5.2: Content Model — What Qualifies as "Work"

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **content curator**,
I want **clear inclusion standards for what qualifies as "work"**,
So that **signal is not diluted by padding or weak examples**.

#### Acceptance Criteria

**Given** a potential project for inclusion
**When** evaluating against standards
**Then** every listed item demonstrates initiative and ownership
**And** nothing exists "just to fill space"
**And** the work meets allowed categories

#### Allowed Categories

✅ **Projects** — Systems, tools, apps, experiments you built
✅ **Products** — Shipped artifacts used by real users
✅ **Startups** — Ventures where you had ownership or leadership
✅ **Operational work** — Systems you designed or ran (if relevant)

#### Explicit Exclusions

❌ Coursework without extension or real-world application
❌ Visual mockups with no execution
❌ "Ideas" without implementation
❌ Minor experiments that don't teach anything meaningful

#### Implementation Checklist

- [ ] Create inclusion criteria document

  ```markdown
  # Work Portfolio Inclusion Standards

  ## Allowed Categories

  1. **Projects** - Systems, tools, apps, experiments you built
  2. **Products** - Shipped artifacts used by real users
  3. **Startups** - Ventures with ownership or leadership
  4. **Operational work** - Systems designed or run (if relevant)

  ## Explicit Exclusions

  - Coursework without real-world extension
  - Mockups without execution
  - Ideas without implementation
  - Minor experiments without learnings

  ## Inclusion Checklist

  For each potential project, ask:

  - [ ] Does this demonstrate initiative and ownership?
  - [ ] Does this show real execution?
  - [ ] Would I be comfortable being questioned about this in detail?
  - [ ] Does this represent my current standards?

  ## Quality Bar

  - Must demonstrate end-to-end ownership
  - Must have concrete outcome or learning
  - Must be something you'd discuss in an interview
  ```

- [ ] Review existing work against criteria
- [ ] Create content review process
- [ ] Document why each included project qualifies

#### Testing Requirements

- [ ] Inclusion test: Does each project meet standards?
- [ ] Signal test: Can you defend each inclusion?
- [ ] Interview simulation: Would you discuss this in an interview?

---

### Story 5.3: Portfolio Structure (Macro Layout)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As an **employer with limited time**,
I want **to scan the Work page easily with optional depth**,
So that **I can choose where to click without friction or overload**.

#### Acceptance Criteria

**Given** the Work page is loaded
**When** an employer scans it
**Then** the page is readable in under 60 seconds
**And** employers can choose where to click next without friction
**And** the page shows a curated list (not grid overload)
**And** best work appears first (not most recent)

#### Recommended Layout

- **Curated list, not grid overload**
- **Maximum 5–7 items total**
- **No pagination on main Work page**
- **Best work appears first, not most recent**

#### Each Item Presented With

1. Name
2. One-line description
3. Your role
4. Outcome or status
5. Link to detail page

#### Implementation Checklist

- [ ] Create WorkList component

  ```tsx
  // components/work/WorkList.tsx
  import Link from 'next/link';

  type Project = {
    slug: string;
    title: string;
    description: string;
    role: string;
    outcome: string;
    status: string;
  };

  export function WorkList({ projects }: { projects: Project[] }) {
    return (
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
        <div className="space-y-4">
          <h1 className="text-h1 font-semibold text-stone-900">Work</h1>
          <p className="text-body max-w-2xl text-stone-600">
            Projects, products, and systems I've built and shipped.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    );
  }
  ```

- [ ] Create WorkCard component

  ```tsx
  // components/work/WorkCard.tsx
  export function WorkCard({ project }: { project: Project }) {
    return (
      <Link
        href={`/work/${project.slug}`}
        className="group block space-y-3 rounded-lg border border-stone-200 p-6 transition-colors hover:border-stone-300"
      >
        {/* Title & Status */}
        <div className="flex items-center justify-between">
          <h2 className="text-h3 group-hover:text-accent font-semibold text-stone-900">
            {project.title}
          </h2>
          <span className="text-meta text-stone-500">{project.status}</span>
        </div>

        {/* Description */}
        <p className="text-body text-stone-700">{project.description}</p>

        {/* Role & Outcome */}
        <div className="text-meta flex flex-col gap-2 text-stone-600 sm:flex-row sm:items-center sm:gap-4">
          <span>
            <strong className="text-stone-800">Role:</strong> {project.role}
          </span>
          <span className="hidden text-stone-400 sm:inline">•</span>
          <span>
            <strong className="text-stone-800">Outcome:</strong> {project.outcome}
          </span>
        </div>

        {/* CTA */}
        <div className="text-meta text-accent group-hover:underline">View details →</div>
      </Link>
    );
  }
  ```

- [ ] Implement curated ordering (displayOrder field)
- [ ] Limit to 5-7 projects max
- [ ] Remove pagination
- [ ] Ensure best work appears first

#### Testing Requirements

- [ ] Scan test: Is page readable in <60 seconds?
- [ ] Friction test: Can employers choose where to click easily?
- [ ] Overload test: Does page feel overwhelming or focused?

---

### Story 5.4: Individual Project Page Structure (The "Case-Lite")

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 6-8 hours

#### User Story

As an **employer evaluating depth of competence**,
I want **enough detail to assess capability without bloating**,
So that **I can understand what you did and how you think**.

#### Acceptance Criteria

**Given** an employer reads a project detail page
**When** they finish reading
**Then** they can assess competence without asking follow-up questions
**And** the page reads like an internal post-mortem, not a pitch
**And** all required sections are present

#### Required Sections

1. **Overview** (What it is, why it exists, who it was for)
2. **Your Role** (What you owned, decided, implemented)
3. **Execution** (Key choices, constraints, tradeoffs)
4. **Outcome** (What shipped, who used it, what changed)
5. **Reflection** (Optional: What you'd do differently, what you learned)

#### Explicit Bans

❌ "Here's the tech stack" lists without context
❌ Long feature lists
❌ Marketing copy

#### Implementation Checklist

- [ ] Create ProjectDetail component

  ```tsx
  // components/work/ProjectDetail.tsx
  type Project = {
    title: string;
    overview: string;
    roleDetail: string;
    teamSize?: number;
    execution: string;
    outcomeDetail: string;
    reflection?: string;
    screenshots: string[];
  };

  export function ProjectDetail({ project }: { project: Project }) {
    return (
      <div className="mx-auto max-w-3xl space-y-12 px-6 py-16">
        {/* Title */}
        <h1 className="text-h1 font-semibold text-stone-900">{project.title}</h1>

        {/* Overview */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Overview</h2>
          <div className="prose prose-stone max-w-none">{project.overview}</div>
        </section>

        {/* Your Role */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Your Role</h2>
          <div className="prose prose-stone max-w-none">{project.roleDetail}</div>
          {project.teamSize && (
            <p className="text-meta text-stone-600">Team size: {project.teamSize}</p>
          )}
        </section>

        {/* Execution */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Execution</h2>
          <div className="prose prose-stone max-w-none">{project.execution}</div>
        </section>

        {/* Outcome */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Outcome</h2>
          <div className="prose prose-stone max-w-none">{project.outcomeDetail}</div>
        </section>

        {/* Reflection (optional) */}
        {project.reflection && (
          <section className="space-y-4">
            <h2 className="text-h2 font-semibold text-stone-900">Reflection</h2>
            <div className="prose prose-stone max-w-none">{project.reflection}</div>
          </section>
        )}

        {/* Screenshots (sparingly) */}
        {project.screenshots.length > 0 && (
          <section className="space-y-4">
            {project.screenshots.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${project.title} screenshot ${index + 1}`}
                className="w-full rounded-lg border border-stone-200"
              />
            ))}
          </section>
        )}
      </div>
    );
  }
  ```

- [ ] Create project detail page template
- [ ] Implement all required sections
- [ ] Review for marketing copy (remove)
- [ ] Review for tech stack lists without context (remove or contextualize)
- [ ] Ensure tone is post-mortem, not pitch

#### Testing Requirements

- [ ] Completeness test: Are all required sections present?
- [ ] Tone test: Does it read like a post-mortem or pitch?
- [ ] Competence test: Can employers assess capability without follow-ups?

---

### Story 5.5: Role Clarity & Ownership (Critical for Trust)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As an **employer assessing honesty and capability**,
I want **to clearly understand what Nathanael actually did**,
So that **I trust the narrative without needing to clarify or question**.

#### Acceptance Criteria

**Given** a project page describes your role
**When** an employer reads it
**Then** they can explain your role accurately after reading
**And** no confusion about ownership remains
**And** solo vs team is always specified
**And** if team-based, your responsibility is clear

#### Requirements

Always specify:

- **Solo vs team**
- **Leadership vs contribution**

If team-based:

- State your responsibility clearly
- Avoid collective language ("we" without clarification)

#### Rules

✅ Precision > humility theater
❌ No exaggeration
❌ No vagueness

#### Implementation Checklist

- [ ] Create role clarity guidelines

  ```markdown
  # Role Clarity Guidelines

  ## Always Specify

  - Solo or team-based
  - Leadership or contribution
  - Specific responsibilities

  ## Good Examples

  - "Solo project. I designed, built, and shipped the entire platform."
  - "Led a team of 3. I owned product decisions, designed the architecture, and reviewed all PRs."
  - "Contributed as lead developer. I built the authentication system and payment integration."

  ## Bad Examples (too vague)

  - "We built a platform."
  - "I worked on the project."
  - "Contributed to the development."

  ## Precision Rules

  - Use "I" when you did it
  - Use "we" only with clarification of your role
  - Specify team size if collaborative
  - State what you owned, decided, implemented
  ```

- [ ] Review all project role descriptions
- [ ] Add teamSize field where applicable
- [ ] Clarify solo vs team for each project
- [ ] Remove vague collective language

#### Testing Requirements

- [ ] Clarity test: Can 3 employers explain your role accurately?
- [ ] Ownership test: Is it clear what you owned vs contributed?
- [ ] Honesty test: Does role description match reality?

---

### Story 5.6: Outcomes Over Outputs

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As an **employer evaluating impact**,
I want **to see outcomes, not just artifacts**,
So that **I understand the actual value created**.

#### Acceptance Criteria

**Given** a project page describes outcomes
**When** an employer reads it
**Then** every project has some outcome, even if small
**And** if no outcome exists, the learning is concrete and specific
**And** outcomes focus on impact, not generic learnings

#### Acceptable Outcomes

✅ Users onboarded
✅ Problems solved
✅ Systems stabilized
✅ Revenue generated
✅ Time saved
✅ Learning validated

#### Unacceptable Substitutes

❌ "Learned a lot"
❌ "Gained experience"
❌ "Interesting project"

#### Implementation Checklist

- [ ] Create outcome standards document

  ```markdown
  # Outcome Standards

  ## Acceptable Outcomes

  - "Onboarded 500 users in first 3 months"
  - "Reduced page load time from 4s to 1.2s"
  - "Generated $5K MRR"
  - "Saved tutoring team 10 hours/week on admin"
  - "Validated that students prefer X over Y approach"

  ## Unacceptable (too generic)

  - "Learned a lot about React"
  - "Gained valuable experience"
  - "Interesting technical challenge"

  ## Outcome Checklist

  For each project, identify:

  - [ ] What measurable change occurred?
  - [ ] Who benefited and how?
  - [ ] What was the scale of impact?
  - [ ] If no outcome, what specific learning was validated?
  ```

- [ ] Review all project outcomes
- [ ] Replace generic learnings with specific outcomes
- [ ] Quantify where possible (users, time, revenue)
- [ ] Ensure every project has concrete outcome or learning

#### Testing Requirements

- [ ] Outcome test: Does each project have specific outcome?
- [ ] Specificity test: Are outcomes concrete or generic?
- [ ] Impact test: Can employers assess value created?

---

### Story 5.7: Visual Restraint Rules (Portfolio-Specific)

**Priority:** High
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **reader**,
I want **the Work page to avoid Dribbble/Behance energy**,
So that **visuals support understanding without distraction**.

#### Acceptance Criteria

**Given** the Work page includes visuals
**When** readers view them
**Then** the portfolio still works with images removed
**And** visuals never distract from understanding
**And** visuals support explanation, text comes first

#### Allowed Visuals

✅ Screenshots (sparingly)
✅ Simple diagrams
✅ Architecture sketches
✅ Interface excerpts

#### Forbidden Visuals

❌ Full-bleed hero images
❌ Animated mockups
❌ Decorative graphics
❌ Mood boards

#### Rules

✅ Visuals support explanation
✅ Text always comes first

#### Implementation Checklist

- [ ] Create visual restraint guidelines

  ```markdown
  # Visual Restraint Guidelines (Work Page)

  ## Allowed

  - Screenshots (1-3 max per project)
  - Simple diagrams (architecture, flow)
  - Interface excerpts (to illustrate specific points)

  ## Forbidden

  - Full-bleed hero images
  - Animated mockups
  - Decorative graphics
  - Mood boards
  - Image galleries

  ## Rules

  - Text must come first
  - Images must support explanation
  - Portfolio must work with images removed
  - Max 3 images per project detail page
  ```

- [ ] Review all project visuals
- [ ] Remove decorative images
- [ ] Ensure screenshots are explanatory, not promotional
- [ ] Limit to 3 images max per project
- [ ] Test page with images disabled

#### Testing Requirements

- [ ] No-image test: Does portfolio work with images removed?
- [ ] Distraction test: Do visuals compete with text?
- [ ] Support test: Do visuals aid understanding?

---

### Story 5.8: Project Categorization & Signaling

**Priority:** Medium
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As an **employer scanning quickly**,
I want **to understand project status at a glance**,
So that **I can tell what's real vs exploratory without reading deeply**.

#### Acceptance Criteria

**Given** projects are tagged with status
**When** employers scan the Work page
**Then** they can tell what's real vs exploratory at a glance
**And** there's no confusion about maturity level
**And** tags explain status, not prestige

#### Optional Tags (Used Sparingly)

- "Shipped"
- "In production"
- "Experimental"
- "Ongoing"

#### Rules

✅ Tags explain status, not prestige
❌ Avoid novelty tags ("AI", "Web3") unless essential

#### Implementation Checklist

- [ ] Add status field to Project model (already in schema)
- [ ] Define allowed status values
  ```typescript
  // lib/constants.ts
  export const PROJECT_STATUSES = {
    SHIPPED: 'Shipped',
    IN_PRODUCTION: 'In production',
    EXPERIMENTAL: 'Experimental',
    ONGOING: 'Ongoing',
  } as const;
  ```
- [ ] Display status in WorkCard component (already implemented)
- [ ] Review all projects for accurate status
- [ ] Remove prestige tags ("AI", "Web3") unless essential

#### Testing Requirements

- [ ] Status clarity test: Can employers tell what's real vs exploratory?
- [ ] Maturity test: Is project maturity level clear?
- [ ] Prestige test: Are tags factual, not promotional?

---

### Story 5.9: Cross-Linking with Writing & Startups

**Priority:** Medium
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **deep reader**,
I want **to trace thinking across artifacts**,
So that **I can see how projects, writing, and startups connect**.

#### Acceptance Criteria

**Given** related content exists across projects, writing, and startups
**When** cross-links are added
**Then** deep readers can trace thinking across artifacts
**And** the site feels internally coherent
**And** links feel referential, not promotional
**And** there is no "Read more" sprawl

#### Examples

A project links to:

- An essay explaining a design decision
- A startup page where it's used

A startup page links back to:

- The systems you built
- The work you shipped

#### Rules

✅ Links feel referential, not promotional
❌ No "Read more" sprawl

#### Implementation Checklist

- [ ] Add relatedPosts and relatedStartups fields to Project model
  ```prisma
  model Project {
    // ... existing fields
    relatedPostSlugs    String[] // Array of post slugs
    relatedStartupSlugs String[] // Array of startup slugs
  }
  ```
- [ ] Create RelatedContent component

  ```tsx
  // components/work/RelatedContent.tsx
  export function RelatedContent({
    posts,
    startups,
  }: {
    posts?: Array<{ slug: string; title: string }>;
    startups?: Array<{ slug: string; title: string }>;
  }) {
    if (!posts?.length && !startups?.length) return null;

    return (
      <section className="space-y-4 border-t border-stone-200 pt-8">
        <h3 className="text-h3 font-semibold text-stone-900">Related</h3>

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

        {startups && startups.length > 0 && (
          <div className="space-y-2">
            <p className="text-meta text-stone-600">Startups:</p>
            <ul className="space-y-1">
              {startups.map((startup) => (
                <li key={startup.slug}>
                  <a
                    href={`/startups/${startup.slug}`}
                    className="text-body text-accent hover:underline"
                  >
                    {startup.title}
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

- [ ] Identify cross-linking opportunities
- [ ] Add related content to project pages
- [ ] Review for promotional tone (keep referential)
- [ ] Limit to 2-3 related items max per project

#### Testing Requirements

- [ ] Coherence test: Does site feel internally connected?
- [ ] Referential test: Do links feel natural, not promotional?
- [ ] Sprawl test: Is there "Read more" overload?

---

### Story 5.10: Ordering & Curation Governance

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **portfolio maintainer**,
I want **clear governance rules to prevent portfolio rot**,
So that **quality improves over time, not decreases**.

#### Acceptance Criteria

**Given** the portfolio accumulates work over time
**When** governance rules are applied
**Then** portfolio quality improves over time
**And** signal density increases, not decreases
**And** older/weaker work is archived quietly

#### Governance Rules

- Homepage features only top 2–3 projects
- Work page limited to best 5–7
- Archive older or weaker work quietly

#### Review Cadence

- Quarterly review
- Remove or demote anything that no longer represents you

#### Implementation Checklist

- [ ] Create curation governance document

  ```markdown
  # Work Portfolio Curation Governance

  ## Quarterly Review Process

  Run every 3 months:

  1. **Review all published projects**
     - Does this still represent my current standards?
     - Would I discuss this confidently in an interview today?
     - Does this demonstrate skills I want to be hired for?

  2. **Apply limits**
     - Homepage: Max 2-3 featured projects
     - Work page: Max 5-7 total projects
     - Demote or archive anything that doesn't meet current bar

  3. **Update displayOrder**
     - Best work first (not chronological)
     - Strongest signal at top
     - Weakest work archived (published: false)

  ## Archiving vs Deletion

  - Never delete projects (keep in database)
  - Set published: false to archive
  - Can be restored if relevant again

  ## Quality Bar Evolution

  - Bar should rise over time
  - What qualified 2 years ago may not qualify today
  - Signal density > quantity
  ```

- [ ] Implement featured flag (already in schema)
- [ ] Implement published flag (already in schema)
- [ ] Create admin interface for curation
- [ ] Set up quarterly review reminder
- [ ] Document archiving process

#### Testing Requirements

- [ ] Limit test: Are homepage and Work page within limits?
- [ ] Quality test: Does each project meet current standards?
- [ ] Signal test: Is signal density high?

---

### Story 5.11: Employer Scan Patterns & UX Validation

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **UX designer**,
I want **to optimize for real employer behavior**,
So that **employers extract value without reading everything**.

#### Acceptance Criteria

**Given** the Work page is designed for real scan behavior
**When** employers use it
**Then** they can extract value without reading everything
**And** deep readers are rewarded with nuance
**And** strong headings, short paragraphs, and clear role/outcome placement support scanning

#### Expected Scan Behavior

1. Read titles
2. Read one-liners
3. Click one project
4. Skim outcome
5. Decide whether to contact

#### UX Implications

✅ Strong headings
✅ Short paragraphs
✅ Clear role/outcome placement

#### Implementation Checklist

- [ ] Create scan pattern optimization checklist

  ```markdown
  # Employer Scan Pattern Optimization

  ## Expected Behavior

  1. Scan titles (3-5 seconds)
  2. Read one-liners (10-15 seconds)
  3. Click one project (30-45 seconds to skim)
  4. Decide whether to contact

  ## UX Requirements

  - **Headings**: Clear, specific, scannable
  - **One-liners**: Descriptive, not clever
  - **Role/Outcome**: Above the fold on project pages
  - **Paragraphs**: 2-3 sentences max
  - **Visual hierarchy**: Title > Description > Role > Outcome

  ## Validation Tests

  - [ ] Can employers identify one project in <10 seconds?
  - [ ] Can employers understand your role without clicking?
  - [ ] Can employers assess outcome quickly on detail page?
  ```

- [ ] Review all headings for clarity
- [ ] Review all one-liners for descriptiveness
- [ ] Ensure role/outcome visible without scrolling
- [ ] Break long paragraphs into shorter chunks
- [ ] Test scan patterns with 3-5 employers

#### Testing Requirements

- [ ] Scan test: Can employers extract value in <60 seconds?
- [ ] Depth test: Are deep readers rewarded with nuance?
- [ ] Hierarchy test: Is visual hierarchy clear?

---

### Story 5.12: Emotional Validation Checks (Work Page)

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **quality control mechanism**,
I want **to validate that the Work page produces the right emotional outcome**,
So that **employers feel confidence and trust, not doubt or skepticism**.

#### Acceptance Criteria

**Given** the Work page is complete
**When** employers read it
**Then** they feel confidence, respect, trust, and interest
**And** they do NOT feel doubt, skepticism, "this feels inflated", or "this looks like coursework"
**And** you would feel comfortable being questioned on any project listed
**And** nothing feels like padding

#### Desired Emotions

✅ Confidence
✅ Respect
✅ Trust
✅ Interest

#### Anti-Emotions

❌ Doubt
❌ Skepticism
❌ "This feels inflated"
❌ "This looks like coursework"

#### Implementation Checklist

- [ ] Create emotional validation checklist

  ```markdown
  # Work Page Emotional Validation Checklist

  ## Pre-launch Review

  - [ ] Would I feel comfortable being questioned on any project listed?
  - [ ] Does anything feel like padding or filler?
  - [ ] Does any project feel inflated or exaggerated?
  - [ ] Does any project look like coursework?

  ## External Validation (3-5 test readers)

  - [ ] Ask: "What emotions did you feel reading this?"
  - [ ] Expected: confidence, respect, trust, interest
  - [ ] Red flags: doubt, skepticism, "feels inflated", "looks like coursework"

  ## Interview Simulation

  - [ ] For each project, prepare to answer:
    - "Walk me through this project"
    - "What was the hardest part?"
    - "What would you do differently?"
    - "What was your specific role?"
  - [ ] If you can't answer confidently, remove or clarify the project
  ```

- [ ] Conduct pre-launch review
- [ ] Run external validation with 3-5 test readers
- [ ] Simulate interview scenarios for each project
- [ ] Remove any projects that trigger anti-emotions

#### Testing Requirements

- [ ] Emotional response test: Ask 3-5 readers "What emotions did you feel?"
- [ ] Interview test: Can you confidently answer detailed questions about each project?
- [ ] Padding test: Does anything feel like filler?
- [ ] Inflation test: Does anything feel exaggerated?

---

## Epic Completion Criteria

Epic 5 is considered complete when:

### Content & Structure

- [ ] All 12 stories implemented and tested
- [ ] Work page shows 5-7 curated projects max
- [ ] Each project has clear role, outcome, and detail page
- [ ] Inclusion standards documented and enforced
- [ ] Best work appears first (not chronological)

### Clarity & Trust

- [ ] Every project demonstrates initiative and ownership
- [ ] Role clarity is precise (solo vs team, ownership vs contribution)
- [ ] Outcomes are specific and measurable (not generic learnings)
- [ ] Nothing feels like padding or inflation

### Visual & UX

- [ ] Text-first layout (visuals support, don't distract)
- [ ] Scannable in <60 seconds
- [ ] Strong headings, short paragraphs
- [ ] Clear role/outcome placement
- [ ] Maximum 3 images per project detail page

### Governance & Maintenance

- [ ] Quarterly review process documented
- [ ] Curation governance rules in place
- [ ] Homepage features only 2-3 projects
- [ ] Work page limited to best 5-7

### User Validation

- [ ] 3-5 employers conclude "this person ships" in <2 minutes
- [ ] Interview simulation passes for all projects
- [ ] Emotional validation produces confidence/trust, not doubt/skepticism

---

## EPIC 5 Deliverables

By the end of EPIC 5, you have:

1. **A curated portfolio of real work**
   Maximum 5-7 projects, best work first

2. **Clear project pages with role and outcome clarity**
   Every project shows what you owned and what changed

3. **A system that discourages fluff**
   Inclusion standards prevent padding

4. **A Work page that employers trust quickly**
   Employers conclude "this person ships" in <2 minutes

---

## Why EPIC 5 Matters

### Most candidates lose credibility here by

- Overloading visuals
- Underspecifying roles
- Inflating impact
- Listing too much

### With this epic complete

**Your work speaks quietly — and that's why it's believed.**

---

**Epic Status:** Ready for Implementation
**Next Epic:** Epic 6 — Startups Showcase (MarkPoint & Others)
