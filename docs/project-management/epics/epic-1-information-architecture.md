# Epic 1: Information Architecture & System Design

**Status:** Ready for Implementation (Requires Epic 0 Complete)
**Priority:** Critical - Foundation for All Content
**Estimated Complexity:** High
**Dependencies:** Epic 0 (Database schema, content models)

---

## Epic Overview

### Objective

Design the site as an **employer-first information system** that:

- Communicates capability in 30-45 seconds
- Rewards deeper attention in 2-3 minutes
- Supports commerce without polluting the professional narrative

This epic is the blueprint for the entire site structure:

- Pages and their responsibilities
- Navigation patterns
- Content models and taxonomy
- URL structure and routing
- Content hierarchy rules
- Progressive disclosure UX strategy

### User Outcome

When Epic 1 is complete, the system has:

- ✅ Clear sitemap with job-to-be-done for each page
- ✅ Employer skim path optimized for 30-45 second comprehension
- ✅ Progressive disclosure rules preventing content overload
- ✅ Predictable, boring-by-design navigation
- ✅ Clean, stable URL patterns
- ✅ Content taxonomy preventing conceptual mess
- ✅ Feature/curation rules for homepage
- ✅ Cross-linking strategy turning site into coherent proof web
- ✅ Tone guide and microcopy standards
- ✅ SEO and accessibility baseline
- ✅ "Do not build" guardrails protecting employer-safe identity

**This epic makes the site navigable, coherent, and professional.**

### Functional Requirements Covered

- FR22: Navigation system (About, Work, Writing, Resources, Contact)
- FR23: Responsive design foundation

### Non-Functional Requirements Covered

- NFR13: WCAG AA accessibility compliance (baseline)

### Additional Requirements

From UX Design Specification:

- Progressive disclosure pattern (clarity → proof → texture)
- Employer-first optimization (30-45 second skim)
- Semantic HTML with proper ARIA
- Keyboard navigation support

---

## Architecture Decisions

### Content Model Design Philosophy

**Principle:** Content types reflect **intent and ownership**, not just format.

- **Writing** = Long-form thinking (essays showing judgment)
- **Projects** = Things you built (technical/UX proof)
- **Startups** = Ventures you own (MarkPoint as proof of operator capability)
- **Resources** = Products you sell (HSC materials, courses)

**Key Decision:** A startup is NOT a project. Ownership and scope differ.

### URL Strategy

**Philosophy:** URLs are forever. They're stable references you can share for years.

**Pattern:** `/<content-type>/<slug>`

- No dates in URLs (unless necessary for blog chronology)
- No query parameters (`?id=123`)
- Human-readable slugs
- Redirect strategy if slugs change

### Navigation Philosophy

**Boring by Design** - Navigation should be instantly legible, never clever.

- Always visible header (no hidden hamburger on desktop)
- Flat hierarchy (no mega-menus)
- Current page clearly indicated
- Mobile navigation simple (no fancy animations)

---

## Stories

### Story 1.1: Define Sitemap and Page Responsibilities

**Priority:** Critical (Must Do First)
**Complexity:** Medium
**Estimated Time:** 4-6 hours

#### User Story

As a site architect,
I want every page to answer a distinct question with no redundancy,
So that the site remains coherent and each page has a clear job-to-be-done.

#### Acceptance Criteria

**Given** the sitemap is designed
**When** reviewing all pages
**Then** every page has a single job-to-be-done statement
**And** no page exists "because personal sites have it"
**And** all required Day 1 pages are defined
**And** optional future pages are identified but deferred

**Given** page responsibilities are documented
**When** adding new content
**Then** it's immediately clear which page type it belongs to
**And** there's no overlap or confusion

#### Required Pages (Day 1)

**Home: Identity Compression + Routing**

- Job-to-be-done: "Help employers understand who you are in 30-45 seconds and route them to proof"
- Key elements: Name, positioning, 2-3 proof anchors, clear CTAs
- NOT: A feed, a blog, a portfolio grid

**About: Narrative, Trajectory, Values, "Now"**

- Job-to-be-done: "Answer 'who is this person and why should I care?'"
- Key elements: Personal story, non-linear path explanation, values, current focus
- NOT: A resume, a timeline, a hero's journey

**Work: Projects + Proof + Outcomes**

- Job-to-be-done: "Show what you've built with context and outcomes"
- Key elements: Featured projects, quantified impact, technical depth
- NOT: A logo grid, a case study factory

**Writing: Essays That Show Judgment and Depth**

- Job-to-be-done: "Demonstrate thinking quality and domain knowledge"
- Key elements: Long-form essays, instant load times, focused topics
- NOT: A blog, a newsletter, a content marketing engine

**Startups: MarkPoint + Ventures (As Proof)**

- Job-to-be-done: "Prove operator capability and ownership mindset"
- Key elements: Problem/solution, traction, learnings
- NOT: A pitch deck, a portfolio project

**Resources: Catalogue + Trust-First Commerce**

- Job-to-be-done: "Offer educational products with calm framing after establishing proof"
- Key elements: HSC materials, courses, evidence-backed descriptions
- NOT: A sales funnel, a landing page

**Contact: One Clear Action**

- Job-to-be-done: "Make it easy to reach you"
- Key elements: Email (primary), optional form
- NOT: A lead capture system, a calendar booking widget

#### Optional Pages (Future)

- **Resume:** Printable, recruiter-friendly (if needed)
- **Now:** Separate "current focus" page (Derek Sivers style)
- **Uses:** Tools stack for credibility (optional)
- **Changelog:** Site updates log (optional)
- **Policies:** Privacy/terms/refunds (required before launch if commerce)

#### Implementation Checklist

- [ ] Create sitemap document with all pages
- [ ] Write job-to-be-done statement for each page:

  ```markdown
  # Sitemap

  ## Required Pages (Day 1)

  ### Home

  **Job:** Help employers understand who you are in 30-45 seconds and route them to proof
  **Key Elements:** Name, positioning, 2-3 proof anchors, CTAs
  **NOT:** A feed, a blog, a portfolio grid

  ### About

  **Job:** Answer "who is this person and why should I care?"
  **Key Elements:** Personal story, trajectory, values, current focus
  **NOT:** A resume, a timeline

  [... continue for all pages]
  ```

- [ ] Identify overlaps and consolidate
- [ ] Mark Day 1 vs Future pages clearly
- [ ] Review with user for approval
- [ ] Document in `docs/sitemap.md`

#### Testing Requirements

- [ ] Every page has exactly one job-to-be-done
- [ ] No two pages have overlapping jobs
- [ ] User can explain what each page does in one sentence
- [ ] Sitemap is complete and approved

---

### Story 1.2: Define the "Employer Skim Path" (30-45 Seconds)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a site architect,
I want to pre-plan exactly how an employer will scan the site,
So that the most important proof is discoverable in 30-45 seconds.

#### Acceptance Criteria

**Given** the employer skim path is designed
**When** an employer visits the homepage
**Then** they can understand identity, see proof, and find next steps in under 45 seconds
**And** the path to best proof is 3 clicks or fewer

**Given** the homepage skim layout is defined
**When** viewing the homepage
**Then** the first screen shows: Who (name), What (positioning), Proof (2-3 anchors), CTAs
**And** commerce (Resources) exists but is not dominant
**And** the layout supports scanning, not reading

#### Skim Path Default

**Primary Path:** Home → Work → (Writing or Startups) → Contact

**Homepage Skim Layout (Above Fold):**

1. **Who:** Name + identity (Nathanael / Riqle)
2. **What:** One-line positioning ("Student → Tutor → Builder → Founder")
3. **Proof:** 2-3 anchors
   - "Built MarkPoint (startup with X users)"
   - "Taught 500+ students to Band 6 in HSC English"
   - "Ships production code daily"
4. **CTA Routing:**
   - Primary: "View Work" → `/work`
   - Secondary: "Read Writing" → `/writing`
   - Tertiary: "Resources" → `/resources` (present but not dominant)

**Work Page Skim:**

- Featured projects (3-5 max)
- Each with: Title, outcome, tech, link
- Clear "See All Projects" if more exist

**Writing Page Skim:**

- Latest 1-3 featured essays
- Titles that promise value
- Clear "All Writing" archive

**Startups Page Skim:**

- MarkPoint front and center
- Problem/solution/traction immediately visible
- Other ventures tucked below if they exist

#### Implementation Checklist

- [ ] Document skim path in sitemap
- [ ] Design homepage wireframe showing skim layout:
  ```
  [Name + Identity]
  [One-line positioning]
  [Proof anchor 1]
  [Proof anchor 2]
  [Proof anchor 3]
  [CTA: View Work] [CTA: Read Writing]
  [Subtle: Resources]
  ```
- [ ] Identify maximum content per screen:
  - Homepage: 7-10 items max above fold
  - Work: 3-5 featured projects
  - Writing: 1-3 featured essays
- [ ] Test with timer: Can someone understand you in 45 seconds?
- [ ] Document in `docs/employer-skim-path.md`

#### Testing Requirements

- [ ] Employer can complete skim path in 30-45 seconds
- [ ] Best proof is ≤ 3 clicks from homepage
- [ ] Homepage doesn't reveal 15 things at once
- [ ] Resources present but not hijacking identity
- [ ] User can verbally walk through the path

---

### Story 1.3: Progressive Disclosure Rules (Calm First, Depth Later)

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a UX designer,
I want progressive disclosure rules to prevent content overload,
So that the first impression is calm while depth exists for those who want it.

#### Acceptance Criteria

**Given** progressive disclosure rules are defined
**When** viewing the homepage first screen
**Then** only clarity + routing is shown (no complex visuals, no content overload)
**And** depth appears after scroll or on deeper pages
**And** commerce exists but never hijacks identity

**Given** the rules are documented
**When** building any page
**Then** designers follow: "Message first, texture later"
**And** no page violates the "calm first" principle

#### Progressive Disclosure Strategy

**Scroll 1 (Above Fold): Pure Clarity**

- Who you are
- What you do
- Where to go next
- NO: Detailed case studies, full bio, product pitches

**Scroll 2: Proof**

- Featured work snippets
- Key outcomes/metrics
- Selected writing titles
- NO: Full content, complete portfolios

**Scroll 3+: Texture**

- More context if needed
- Additional proof points
- Footer navigation
- NO: Everything at once

**Deep Pages (e.g., /work/project-slug): Full Depth**

- Complete case study
- Technical details
- Process documentation
- Outcomes and learnings

#### Rules to Encode

1. **First screen = Clarity only**
   - No complex visuals
   - No animations on load
   - No walls of text

2. **Depth on demand**
   - Scroll reveals more
   - Click reveals full content
   - User controls depth

3. **Commerce contained**
   - Resources link present but not dominant
   - No urgency/scarcity on homepage
   - Commerce exists as evidence, not persuasion

4. **Typography over decoration**
   - Text does the work first
   - Visuals support, don't distract
   - Whitespace is intentional

#### Implementation Checklist

- [ ] Define scroll zones for homepage:

  ```markdown
  ## Homepage Progressive Disclosure

  ### Scroll 1: Clarity (0-100vh)

  - Name + Identity
  - One-line positioning
  - 2-3 proof anchors
  - Primary CTAs

  ### Scroll 2: Proof (100vh-200vh)

  - Featured project 1 (title + outcome)
  - Featured project 2 (title + outcome)
  - Featured essay 1 (title)

  ### Scroll 3: Texture (200vh+)

  - Additional context if needed
  - Footer navigation
  ```

- [ ] Apply same pattern to all major pages
- [ ] Document "calm-first" violations to avoid:
  - Auto-playing video
  - Heavy animation on load
  - Popups/modals
  - Content carousels
  - Scroll hijacking
- [ ] Create design checklist for future pages
- [ ] Document in `docs/progressive-disclosure-rules.md`

#### Testing Requirements

- [ ] Homepage feels "Apple simple" on first view
- [ ] No content overload above fold
- [ ] Depth exists but doesn't overwhelm
- [ ] Commerce never hijacks identity
- [ ] Every page follows scroll hierarchy

---

### Story 1.4: Navigation Model (Boring by Design)

**Priority:** High
**Complexity:** Low
**Estimated Time:** 3-4 hours

#### User Story

As a user,
I want predictable navigation that's instantly legible,
So that I can find what I need without thinking.

#### Acceptance Criteria

**Given** navigation is implemented
**When** viewing any page on desktop
**Then** navigation is always visible (no hidden header)
**And** current page is clearly indicated
**And** all major sections are one click away

**Given** mobile navigation exists
**When** viewing on mobile
**Then** navigation is simple and fast (hamburger or bottom nav)
**And** no fancy full-screen animations
**And** mobile nav opens/closes quickly

**Given** navigation is tested
**When** a first-time visitor arrives
**Then** they can reach any major section in 1 click
**And** no one needs to scroll to find nav
**And** navigation never changes unpredictably per page

#### Top-Level Navigation (Recommended)

**Desktop:**

```
[Logo/Name]                    About | Work | Writing | Startups | Resources | Contact
```

**Mobile:**

```
[Logo]                                                                    [☰]

(Hamburger expands to)
About
Work
Writing
Startups
Resources
Contact
```

**Alternative Mobile (Bottom Nav):**

```
[About] [Work] [Writing] [More]
                          └─ Startups
                          └─ Resources
                          └─ Contact
```

#### Requirements

**Desktop Navigation:**

- Always visible at top
- Sticky header (optional, but recommended)
- Current page highlighted
- Hover states (subtle)
- Logo/name links to home

**Mobile Navigation:**

- Hamburger icon (top right)
- Slide-in or dropdown menu
- Fast open/close (no 500ms animations)
- Clear close button
- Current page highlighted

**Navigation State:**

- Active page: Bold or underlined
- Hover: Subtle color change or underline
- Focus: Visible outline for keyboard navigation

**No:**

- Hidden navigation on desktop
- Mega-menus
- Nested dropdowns (keep flat)
- Auto-hiding headers that reappear
- Different nav per page

#### Implementation Checklist

- [ ] Choose navigation style:
  - Recommended: Horizontal top nav (desktop), hamburger (mobile)
- [ ] Define navigation component structure:

  ```typescript
  // components/Navigation.tsx
  export function Navigation() {
    const pathname = usePathname();
    const navItems = [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/work' },
      { label: 'Writing', href: '/writing' },
      { label: 'Startups', href: '/startups' },
      { label: 'Resources', href: '/resources' },
      { label: 'Contact', href: '/contact' },
    ];

    return (
      <nav>
        {navItems.map(item => (
          <a
            key={item.href}
            href={item.href}
            className={pathname === item.href ? 'active' : ''}
          >
            {item.label}
          </a>
        ))}
      </nav>
    );
  }
  ```

- [ ] Implement mobile navigation
- [ ] Add keyboard navigation support (Tab, Enter)
- [ ] Add ARIA labels for accessibility
- [ ] Style active/hover/focus states
- [ ] Test on all breakpoints
- [ ] Document in `docs/navigation-spec.md`

#### Testing Requirements

- [ ] Navigation visible on all pages (desktop)
- [ ] Current page clearly indicated
- [ ] Mobile nav opens/closes quickly
- [ ] Keyboard navigation works (Tab through items, Enter to activate)
- [ ] All major sections reachable in 1 click
- [ ] No scroll required to find nav

---

### Story 1.5: URL Strategy (Timeless, Clean, SEO-Friendly)

**Priority:** High
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a site architect,
I want stable, clean URLs that become permanent references,
So that links never break and SEO remains strong.

#### Acceptance Criteria

**Given** URL patterns are defined
**When** creating any content type
**Then** it follows the established pattern consistently
**And** slugs are human-readable and stable
**And** no dates appear in URLs (unless necessary)

**Given** a slug changes
**When** the old URL is accessed
**Then** it redirects to the new URL (301 permanent redirect)
**And** no broken links exist

**Given** URL standards are documented
**When** adding new content types
**Then** the pattern is clear and consistent
**And** all URLs remain clean (no query parameters for content)

#### URL Standards

**Pages (Static):**

```
/                 → Homepage
/about            → About page
/work             → Work/portfolio index
/writing          → Writing/essays index
/startups         → Startups index
/resources        → Resources/products catalog
/contact          → Contact page
```

**Content (Dynamic):**

```
/writing/<slug>       → Individual post/essay
/work/<slug>          → Individual project
/startups/<slug>      → Individual startup
/resources/<slug>     → Individual product
```

**Admin (Not Public):**

```
/admin/*              → Admin routes (all prefixed)
/account/*            → Customer portal routes
```

**Auth:**

```
/login                → Login page
/signup               → Signup page (if applicable)
/reset-password       → Password reset
```

#### Slug Policy

**Rules:**

1. **Human-readable:** `building-markpoint` not `post-123`
2. **Stable:** Never change unless absolutely necessary
3. **Lowercase:** `my-project` not `My-Project`
4. **Hyphens:** `word-word` not `word_word` or `wordword`
5. **No dates:** `/writing/building-in-public` not `/writing/2024/01/building-in-public`
   - Exception: If chronology is critical to identity (rare for this site)
6. **Unique per type:** `work/markpoint` and `startups/markpoint` can coexist

**Redirect Strategy:**

- If slug changes: Create 301 redirect from old → new
- Store redirects in config or database
- Test old URLs continue to work

#### Implementation Checklist

- [ ] Define URL pattern for each content type
- [ ] Document in routing config:
  ```typescript
  // app/routing-patterns.ts
  export const ROUTES = {
    home: '/',
    about: '/about',
    work: '/work',
    workItem: (slug: string) => `/work/${slug}`,
    writing: '/writing',
    post: (slug: string) => `/writing/${slug}`,
    startups: '/startups',
    startup: (slug: string) => `/startups/${slug}`,
    resources: '/resources',
    resource: (slug: string) => `/resources/${slug}`,
    contact: '/contact',
  } as const;
  ```
- [ ] Implement slug generation utility:
  ```typescript
  // lib/slugify.ts
  export function slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Trim hyphens
  }
  ```
- [ ] Add slug uniqueness validation in database
- [ ] Implement redirect system (Next.js `redirects` in `next.config.js`)
- [ ] Create URL testing suite
- [ ] Document in `docs/url-strategy.md`

#### Testing Requirements

- [ ] All content types follow established patterns
- [ ] Slugs are human-readable
- [ ] Slug generation is deterministic
- [ ] Redirects work for changed slugs
- [ ] No duplicate slugs within same content type
- [ ] URLs work across all environments

---

### Story 1.6: Content Taxonomy and Naming Conventions

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a content manager,
I want clear content categories and naming conventions,
So that content remains coherent long-term and I never debate "where should this go?"

#### Acceptance Criteria

**Given** content taxonomy is defined
**When** creating new content
**Then** it clearly fits into one category
**And** categories don't overlap
**And** naming is consistent

**Given** content types are differentiated
**When** reviewing the taxonomy
**Then** startups are not "projects" (ownership differs)
**And** resources are not "writing" (one is product, one is thinking)
**And** writing supports but doesn't become marketing copy

#### Content Types You Will Manage

**1. Writing: Long-Form Essays Showing Thinking**

- Purpose: Demonstrate judgment, depth, domain knowledge
- Examples:
  - "Building in Public: Lessons from MarkPoint"
  - "Why I Left Academia to Build Startups"
  - "Teaching 500 Students What the HSC Really Tests"
- NOT:
  - Product marketing copy
  - Feature announcements
  - Tutorials (unless they show thinking)
- Naming: Post, Essay, Article (use "Post" in database/code)

**2. Projects: Things You Built (Technical/UI/UX)**

- Purpose: Proof of execution, technical capability
- Examples:
  - "Riqle: Personal Platform with Commerce"
  - "HSC Essay Analysis Tool"
  - "Portfolio redesign for [client]"
- NOT:
  - Ventures you own (that's a startup)
  - Resources you sell (that's a product)
- Naming: Project

**3. Startups: Ventures You Own (Proof of Operator Capability)**

- Purpose: Show ownership, skin in the game, operator mindset
- Examples:
  - "MarkPoint: [Problem/Solution/Traction]"
  - Future ventures
- NOT:
  - Client projects (those are projects)
  - Side projects without ownership
- Naming: Startup, Venture

**4. Resources: Products You Sell (Digital Goods, Courses)**

- Purpose: Educational offerings with commerce
- Examples:
  - "HSC English Essay Writing Guide"
  - "Band 6 Analysis Framework Course"
- NOT:
  - Free writing (that's Writing)
  - Case studies (those are Projects or Startups)
- Naming: Product, Resource (use "Product" in database)

**5. Courses (Optional, Future): Structured Learning Offerings**

- Purpose: Multi-module educational experiences
- Examples:
  - "Complete HSC English Course"
  - "Building Your First Startup"
- NOT:
  - Single-file resources (those are Products)
- Naming: Course

#### Taxonomy Rules

**Rule 1: Intent and Ownership Determine Type**

- Did you build it for a client? → Project
- Do you own it and operate it? → Startup
- Does it sell access? → Product/Resource
- Does it show thinking? → Writing

**Rule 2: No Overlaps**

- A startup (MarkPoint) is NOT in Projects
- A product is NOT in Writing
- Writing CAN reference projects/startups/products

**Rule 3: Writing Supports, Doesn't Sell**

- Writing can explain the philosophy behind a product
- Writing can tell the story of building a startup
- Writing should NOT become a sales page

**Rule 4: Categories Are Stable**

- Once published in a category, it stays there
- Recategorization is rare and requires redirect

#### Implementation Checklist

- [ ] Document content taxonomy:

  ```markdown
  # Content Taxonomy

  ## Writing

  **Purpose:** Demonstrate thinking
  **Examples:** Essays, reflections, analysis
  **NOT:** Marketing copy, tutorials-as-ads

  ## Projects

  **Purpose:** Proof of building capability
  **Examples:** Client work, side projects
  **NOT:** Ventures you own (those are Startups)

  [... continue for all types]
  ```

- [ ] Create decision tree for new content:
  ```
  New content → Do you sell access?
    Yes → Product/Resource
    No → Do you own and operate it?
      Yes → Startup
      No → Did you build it?
        Yes → Project
        No → Is it long-form thinking? → Writing
  ```
- [ ] Add content type field to database (already in schema from Epic 0)
- [ ] Create content type validation in admin
- [ ] Document in `docs/content-taxonomy.md`

#### Testing Requirements

- [ ] Every content type has clear definition
- [ ] Decision tree works for edge cases
- [ ] No content fits multiple categories
- [ ] User can explain taxonomy in 30 seconds
- [ ] Taxonomy documented and approved

---

### Story 1.7: Content Hierarchy Rules (What Gets Featured and Why)

**Priority:** Medium
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a content curator,
I want clear rules for what gets featured,
So that the homepage stays focused and decision fatigue is prevented.

#### Acceptance Criteria

**Given** feature rules are defined
**When** selecting featured content
**Then** maximum limits are respected
**And** best proof appears first (not newest)
**And** "credibility density" wins over chronology

**Given** the homepage is curated
**When** reviewing featured items
**Then** it never becomes a feed
**And** featured items represent best proof
**And** there's a "best-of" view on Work/Writing

#### Feature Logic

**Maximum Featured Items:**

- **Projects:** 3-5 max on homepage, "See All Work" for more
- **Essays:** 1-3 max on homepage, "All Writing" archive
- **Startups:** 1 primary (MarkPoint) + others tucked deeper
- **Products:** 0-2 featured on Resources page (not homepage)

**Ordering Logic:**

**Employers See Best Proof First:**

- NOT: Chronological (newest first)
- YES: Curated (best first)

**What Makes Something "Best"?**

1. **Credibility density:** Does it prove capability quickly?
2. **Outcome clarity:** Are results quantified?
3. **Relevance:** Does it match employer expectations?
4. **Recency:** Is it still relevant? (But not the primary factor)

**Example Ordering (Projects):**

```
1. MarkPoint (ownership + traction + ongoing)
2. Riqle (technical depth + production-grade)
3. Client Project with Measurable Outcomes
4. Side Project (if it shows unique skill)
5. [Archive] Older projects
```

**Featured vs Archive:**

- **Featured:** Best 3-5 items, manually curated
- **Archive:** Everything else, chronological or alphabetical

#### Implementation Checklist

- [ ] Add `featured` boolean to content models (already in schema):

  ```prisma
  model Project {
    featured Boolean @default(false)
    order    Int     @default(0)  // Manual ordering
  }

  model Post {
    featured Boolean @default(false)  // Add this
    order    Int     @default(0)      // Add this
  }
  ```

- [ ] Create curation rules document:

  ```markdown
  # Feature Curation Rules

  ## Projects

  - Maximum: 3-5 featured
  - Order by: Credibility density → Outcome clarity → Recency
  - Examples:
    1. MarkPoint (ownership)
    2. Riqle (technical depth)
    3. High-impact client work

  ## Writing

  - Maximum: 1-3 featured
  - Order by: Thought quality → Relevance → Engagement
  - Examples:
    1. "Building MarkPoint: Lessons"
    2. "Why I Teach: From Student to Tutor"
  ```

- [ ] Implement featured content queries:

  ```typescript
  // Get featured projects
  const featuredProjects = await db.project.findMany({
    where: { featured: true, status: 'published' },
    orderBy: { order: 'asc' },
    take: 5,
  });

  // Get all projects for archive
  const allProjects = await db.project.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
  });
  ```

- [ ] Create admin interface to:
  - Toggle featured status
  - Set manual order
  - Preview featured content
- [ ] Document in `docs/curation-rules.md`

#### Testing Requirements

- [ ] Featured limits respected (3-5 projects, 1-3 essays)
- [ ] Best proof appears first, not newest
- [ ] Archive view exists for all content
- [ ] Admin can easily manage featured status
- [ ] Homepage never becomes a feed

---

### Story 1.8: Cross-Linking System (Make Proof Compound)

**Priority:** Medium
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a site architect,
I want a cross-linking system that turns the site into a coherent web of evidence,
So that proof compounds and visitors see connections.

#### Acceptance Criteria

**Given** cross-linking rules are defined
**When** viewing any major page
**Then** related links exist that feel like references, not upsells
**And** commerce pages link to proof, not hype
**And** the site feels like a coherent narrative

**Given** content is interconnected
**When** reading an essay about MarkPoint
**Then** it links to the MarkPoint startup page
**When** viewing a product (HSC Guide)
**Then** it links to: teaching philosophy essay, tutoring outcomes, sample work

#### Cross-Linking Strategy

**Project Pages Link To:**

- Relevant essays explaining approach/learnings
- Related projects (if applicable)
- Startup page (if project is part of a startup)

**Example (MarkPoint Project):**

```
Related:
- Essay: "Building MarkPoint: Lessons Learned"
- Startup: MarkPoint (full story)
- Technology: Next.js, Prisma, Stripe
```

**Essay Pages Link To:**

- Referenced projects/startups
- Other essays on similar topics
- Products (only if genuinely relevant)

**Example (Essay: "Teaching 500 Students"):**

```
Related:
- Resource: HSC English Essay Guide (built from this experience)
- About: My journey from student to tutor
- Contact: Work with me
```

**Product/Resource Pages Link To:**

- Philosophy/method essay (WHY this exists)
- Sample work or writing showing expertise
- Proof of outcomes (testimonials, student results)

**Example (HSC Essay Guide):**

```
Built from real experience:
- Essay: "What the HSC Really Tests"
- Proof: Taught 500+ students to Band 6
- Method: Analysis framework explained
```

**Startup Pages Link To:**

- Case studies or deep-dives
- Metrics/outcomes essays
- Writing explaining worldview/approach

**Example (MarkPoint Startup):**

```
Learn more:
- Essay: "Building MarkPoint in Public"
- Project: Technical architecture deep-dive
- Metrics: Traction and growth
```

#### Cross-Linking Rules

**Rule 1: Links Feel Like References, Not Upsells**

- Copy: "Read more about this approach →"
- NOT: "Buy my course now! →"

**Rule 2: Commerce Links to Proof, Not Hype**

- Product pages reference teaching experience essays
- Product pages show quantified outcomes
- NO urgency, scarcity, or pressure

**Rule 3: Bidirectional Where Appropriate**

- Essay mentions MarkPoint → links to startup page
- Startup page → links back to essay

**Rule 4: Max 3-5 Related Links Per Page**

- Prevent link spam
- Curate intentionally

#### Implementation Checklist

- [ ] Add related content field to models:

  ```prisma
  model Post {
    relatedProjects  Project[] // Many-to-many via junction
    relatedStartups  Startup[]
    relatedProducts  Product[]
  }

  model Project {
    relatedPosts    Post[]
    relatedProjects Project[] // Self-referential
  }
  ```

- [ ] Create related content component:
  ```typescript
  // components/RelatedContent.tsx
  export function RelatedContent({ items }: { items: RelatedItem[] }) {
    return (
      <section>
        <h2>Related</h2>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <a href={item.url}>{item.title}</a>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  ```
- [ ] Implement admin interface for managing related content
- [ ] Add related content to page templates
- [ ] Document linking patterns in `docs/cross-linking-strategy.md`

#### Testing Requirements

- [ ] Every major page has related links
- [ ] Links feel like references, not upsells
- [ ] Commerce pages link to proof
- [ ] Bidirectional links work
- [ ] Maximum 3-5 related items per page

---

### Story 1.9: Copy System & Tone Rules (Employer-Safe Voice)

**Priority:** Medium
**Complexity:** Low
**Estimated Time:** 3-4 hours

#### User Story

As a content writer,
I want clear tone guidelines and copy standards,
So that all writing feels calm, confident, and employer-safe.

#### Acceptance Criteria

**Given** tone rules are documented
**When** writing any copy
**Then** it feels factual and grounded
**And** no buzzword inflation appears
**And** claims are backed by evidence
**And** the voice reads like Apple/Stripe internal docs

**Given** microcopy standards exist
**When** writing button text or CTAs
**Then** verbs are used ("View work", not "Get started")
**And** no "creator funnel" language appears

#### Tone Requirements

**Factual, Grounded:**

- YES: "Taught 500+ students to Band 6 in HSC English"
- NO: "Helped thousands of students achieve their dreams"

**No Buzzword Inflation:**

- YES: "Built MarkPoint, a tool for X"
- NO: "Revolutionizing the Y space with cutting-edge Z"

**No "I'm Passionate About...":**

- YES: "I teach because it works. Results speak."
- NO: "I'm passionate about empowering students to unlock their potential"

**No Hype on Resources:**

- YES: "HSC Essay Guide built from 5 years of tutoring experience"
- NO: "The ULTIMATE guide to CRUSHING the HSC!"

**Clear Claims Backed by Evidence:**

- YES: "500+ students taught, 90% achieved Band 5 or 6"
- NO: "I'm one of the best tutors"

#### Microcopy Standards

**Buttons (Use Verbs):**

- ✅ "View Work"
- ✅ "Read Writing"
- ✅ "Explore Resources"
- ✅ "See MarkPoint"
- ❌ "Get Started"
- ❌ "Join Now"
- ❌ "Learn More" (vague)

**Links:**

- ✅ "Read the full case study →"
- ✅ "See technical details →"
- ❌ "Click here"
- ❌ "Find out more"

**Product CTAs:**

- ✅ "Download Guide"
- ✅ "Access Course"
- ✅ "View Sample"
- ❌ "Get Instant Access!"
- ❌ "Start Your Journey"

**Navigation:**

- ✅ About, Work, Writing, Startups, Resources, Contact
- ❌ About Me, My Work, Blog, Portfolio

#### Copy Examples

**Homepage Hero:**

```
Nathanael / Riqle
Student → Tutor → Builder → Founder

Built MarkPoint (startup with [X] users)
Taught 500+ students to Band 6 in HSC English
Ships production code daily

[View Work] [Read Writing]
```

**About Page Opening:**

```
I went from failing high school to teaching it.
Then I built software. Then I started a company.

This site is proof, not performance.
```

**Resources Page Intro:**

```
Resources built from real tutoring experience.

No urgency. No scarcity. Just tools that work.
```

#### Implementation Checklist

- [ ] Create tone guide document:

  ```markdown
  # Tone Guide

  ## Voice Principles

  - Factual, grounded
  - Evidence-backed claims
  - No buzzwords
  - No hype

  ## Vocabulary

  **Use:** Built, taught, shipped, designed, operated
  **Avoid:** Revolutionary, cutting-edge, game-changing, passionate

  ## Button Copy

  **Pattern:** [Verb] [Noun]
  **Examples:** View Work, Read Writing, Download Guide
  **Avoid:** Get Started, Learn More, Join Now
  ```

- [ ] Create microcopy component library:
  ```typescript
  // lib/copy.ts
  export const COPY = {
    cta: {
      viewWork: 'View Work',
      readWriting: 'Read Writing',
      exploreResources: 'Explore Resources',
      downloadGuide: 'Download Guide',
    },
    nav: {
      about: 'About',
      work: 'Work',
      writing: 'Writing',
      startups: 'Startups',
      resources: 'Resources',
      contact: 'Contact',
    },
  } as const;
  ```
- [ ] Review all existing copy against tone guide
- [ ] Create copy checklist for new pages
- [ ] Document in `docs/tone-guide.md`

#### Testing Requirements

- [ ] All copy reads calm and factual
- [ ] No buzzwords or hype language
- [ ] Button text uses verbs
- [ ] Claims backed by evidence
- [ ] Tone guide documented and approved

---

### Story 1.10: SEO and Discoverability Baseline

**Priority:** Medium
**Complexity:** Medium
**Estimated Time:** 4-6 hours

#### User Story

As a site operator,
I want professional SEO without becoming a content farm,
So that the site is discoverable but maintains integrity.

#### Acceptance Criteria

**Given** SEO basics are implemented
**When** sharing any page
**Then** Open Graph previews render correctly
**And** metadata is unique per page
**And** sitemap updates automatically

**Given** structured data exists
**When** search engines crawl pages
**Then** Person, Article, and Product schemas are present where appropriate
**And** no duplicate content issues exist

#### SEO Requirements

**Metadata Templates Per Content Type:**

**Homepage:**

```html
<title>Nathanael | Builder, Tutor, Founder</title>
<meta
  name="description"
  content="Student → Tutor → Builder → Founder. Built MarkPoint, taught 500+ students, ships production code."
/>
<link rel="canonical" href="https://riqle.com/" />
```

**Work Page:**

```html
<title>Work | Nathanael</title>
<meta
  name="description"
  content="Projects, startups, and proof of execution. From MarkPoint to client work."
/>
<link rel="canonical" href="https://riqle.com/work" />
```

**Project Page (Dynamic):**

```html
<title>{projectTitle} | Nathanael</title>
<meta name="description" content="{projectExcerpt}" />
<link rel="canonical" href="https://riqle.com/work/{slug}" />
```

**Open Graph Images:**

- Simple, typographic
- 1200x630px (standard OG size)
- Template: Site name + page title + subtle branding

**Sitemap Generation:**

- Dynamic, auto-updates when content published
- Includes: all public pages, published posts, projects, startups, resources
- Excludes: admin pages, drafts, auth pages

**robots.txt:**

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /account/
Disallow: /api/

Sitemap: https://riqle.com/sitemap.xml
```

**Structured Data:**

**Person Schema (Homepage):**

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nathanael",
  "url": "https://riqle.com",
  "sameAs": ["https://github.com/nathanael", "https://linkedin.com/in/nathanael"],
  "jobTitle": "Founder",
  "worksFor": {
    "@type": "Organization",
    "name": "MarkPoint"
  }
}
```

**Article Schema (Posts):**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{postTitle}",
  "author": {
    "@type": "Person",
    "name": "Nathanael"
  },
  "datePublished": "{publishedAt}",
  "url": "https://riqle.com/writing/{slug}"
}
```

**Product Schema (Resources - Optional):**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{productName}",
  "description": "{productDescription}",
  "offers": {
    "@type": "Offer",
    "price": "{price}",
    "priceCurrency": "USD"
  }
}
```

#### Implementation Checklist

- [ ] Create metadata component:
  ```typescript
  // components/Metadata.tsx
  export function generateMetadata({ title, description, image, type = 'website' }) {
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [{ url: image || '/og-default.png' }],
        type,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image || '/og-default.png'],
      },
    };
  }
  ```
- [ ] Implement metadata for all page types
- [ ] Create OG image templates (use @vercel/og or similar)
- [ ] Implement dynamic sitemap:

  ```typescript
  // app/sitemap.ts
  export default async function sitemap() {
    const posts = await db.post.findMany({ where: { status: 'published' } });
    const projects = await db.project.findMany({ where: { status: 'published' } });

    return [
      { url: 'https://riqle.com', priority: 1.0 },
      { url: 'https://riqle.com/about', priority: 0.8 },
      { url: 'https://riqle.com/work', priority: 0.8 },
      ...posts.map((post) => ({
        url: `https://riqle.com/writing/${post.slug}`,
        lastModified: post.updatedAt,
        priority: 0.6,
      })),
      // ... projects, startups, resources
    ];
  }
  ```

- [ ] Create robots.txt
- [ ] Add structured data to appropriate pages
- [ ] Test with Google Rich Results Test
- [ ] Document in `docs/seo-baseline.md`

#### Testing Requirements

- [ ] All pages have unique titles/descriptions
- [ ] OG previews render correctly on social media
- [ ] Sitemap includes all public content
- [ ] robots.txt configured correctly
- [ ] Structured data validates
- [ ] No duplicate content issues

---

### Story 1.11: Accessibility and Usability Constraints

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a site builder,
I want accessibility baked in from the start,
So that the site feels premium through professionalism and respect for users.

#### Acceptance Criteria

**Given** accessibility standards are implemented
**When** using keyboard only
**Then** all interactive elements are reachable and usable
**And** focus styles are visible
**And** tab order is logical

**Given** motion preferences are respected
**When** a user has `prefers-reduced-motion` enabled
**Then** animations are disabled or reduced
**And** the site remains functional

**Given** color contrast is tested
**When** reviewing all text
**Then** WCAG AA standards are met
**And** text is readable on all backgrounds

#### Accessibility Requirements

**Keyboard Navigation:**

- Tab through all interactive elements
- Enter/Space to activate buttons/links
- Escape to close modals/menus
- Arrow keys for dropdown/menu navigation (if applicable)

**Focus Styles:**

```css
/* Visible focus indicators */
*:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Never remove outlines globally */
/* NEVER: *:focus { outline: none; } */
```

**Semantic HTML:**

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Post Title</h1>
    <p>Content...</p>
  </article>
</main>
```

**ARIA Labels:**

```html
<!-- Skip link for keyboard users -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Icon buttons need labels -->
<button aria-label="Open menu">
  <MenuIcon />
</button>

<!-- Images need alt text -->
<img src="/project.png" alt="MarkPoint dashboard showing analytics" />
```

**Color Contrast:**

- Text: Minimum 4.5:1 (WCAG AA)
- Large text: Minimum 3:1
- Interactive elements: Minimum 3:1

**Motion Preferences:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Text Size:**

- Base: 16px minimum (1rem)
- Headings: Scalable with rem/em
- Allow browser zoom up to 200%
- Max line length: 75ch for readability

#### Implementation Checklist

- [ ] Add skip link at top of every page:
  ```html
  <a href="#main-content" class="sr-only focus:not-sr-only"> Skip to main content </a>
  ```
- [ ] Use semantic HTML everywhere
- [ ] Add ARIA labels to icon buttons and interactive elements
- [ ] Implement visible focus styles
- [ ] Test keyboard navigation on all pages
- [ ] Add `prefers-reduced-motion` CSS
- [ ] Test color contrast with tool (e.g., axe DevTools)
- [ ] Ensure all images have alt text
- [ ] Test with screen reader (macOS VoiceOver or NVDA)
- [ ] Document in `docs/accessibility-standards.md`

#### Testing Requirements

- [ ] All pages navigable with keyboard only
- [ ] Focus styles visible on all interactive elements
- [ ] Screen reader can read all content
- [ ] Color contrast meets WCAG AA
- [ ] Motion respects user preferences
- [ ] Text remains readable at 200% zoom
- [ ] All images have meaningful alt text

---

### Story 1.12: "Do Not Build" List (Scope Discipline)

**Priority:** Medium
**Complexity:** Low
**Estimated Time:** 1-2 hours

#### User Story

As a product owner,
I want explicit guardrails on what NOT to build,
So that the site stays employer-safe and doesn't drift into creator funnel patterns.

#### Acceptance Criteria

**Given** the "do not build" list is documented
**When** planning new features
**Then** all banned patterns are avoided
**And** the site remains calm and professional
**And** commerce stays contained

**Given** someone suggests a new feature
**When** reviewing against the list
**Then** banned features are rejected immediately
**And** the rationale is clear

#### Explicit Bans

**Popups / Modals:**

- ❌ Email capture popups
- ❌ "Subscribe to newsletter" overlays
- ❌ Exit-intent modals
- ✅ Exception: Necessary modals (login, checkout) are fine

**Urgency / Scarcity:**

- ❌ Countdown timers ("Offer ends in X hours!")
- ❌ "Only 3 spots left!"
- ❌ "Limited time only"
- ✅ Commerce exists, but is calm and factual

**Intrusive Banners:**

- ❌ Cookie consent banner (unless legally required)
- ❌ Sticky "Subscribe" banners
- ❌ Notification prompts
- ✅ Exception: Legally required notices (EU GDPR, etc.)

**Auto-Playing Media:**

- ❌ Auto-play video
- ❌ Background music
- ❌ Audio without user interaction

**Scroll Hijacking:**

- ❌ Scroll-jacking (overriding native scroll)
- ❌ Parallax that makes users dizzy
- ❌ Horizontal scroll for primary content
- ✅ Smooth scroll is fine if respectful

**Endless Carousels:**

- ❌ Auto-rotating carousels
- ❌ Infinite scrolling that prevents footer access
- ✅ Manual carousels with clear controls are acceptable

**Heavy Animation as Identity:**

- ❌ Animations that delay content visibility
- ❌ Loading animations longer than 300ms
- ❌ Gratuitous page transitions
- ✅ Subtle, purposeful micro-interactions are fine

**Creator Funnel Patterns:**

- ❌ "Join my community"
- ❌ "Subscribe for exclusive content"
- ❌ "Download my free guide" (as lead magnet)
- ✅ Resources exist as products, not lead magnets

**Dark Patterns:**

- ❌ Pre-checked checkboxes
- ❌ Confusing unsubscribe flows
- ❌ Hidden costs
- ❌ Trick questions
- ✅ Everything is transparent and honest

#### Allowed (With Constraints)

**Email Collection (Minimal):**

- ✅ Optional newsletter signup (if you want)
- ✅ Contact form for inquiries
- ❌ Forced email gates
- ❌ Exit popups

**Analytics (Privacy-First):**

- ✅ Plausible / Fathom (privacy-focused)
- ✅ Minimal, intentional tracking
- ❌ Surveillance-level analytics
- ❌ Tracking without disclosure

**Social Proof (Factual Only):**

- ✅ "Taught 500+ students"
- ✅ Testimonials (if genuine)
- ❌ Fake testimonials
- ❌ "As seen on..." badges (unless true)

#### Implementation Checklist

- [ ] Document "do not build" list in `docs/banned-patterns.md`
- [ ] Share with any designers/developers
- [ ] Add to design review checklist
- [ ] Create visual examples of banned patterns
- [ ] Add to project README as principles

**Example Document Structure:**

```markdown
# Do Not Build: Banned Patterns

## Principle

This site is employer-safe. No dark patterns, no creator funnels, no hype.

## Banned Patterns

### Popups

❌ Email capture popups
❌ Exit-intent modals
✅ Exception: Login, checkout (necessary)

### Urgency/Scarcity

❌ Countdown timers
❌ "Only X left!"
✅ Commerce is calm and factual

[... continue for all categories]

## Why These Are Banned

- Employer perception: These patterns signal "marketer" not "builder"
- Trust erosion: Dark patterns reduce credibility
- User respect: We respect attention and agency
```

#### Testing Requirements

- [ ] Document created and approved
- [ ] All banned patterns listed with rationale
- [ ] Design checklist includes ban review
- [ ] Team understands and agrees to guardrails

---

## Epic Completion Criteria

Epic 1 is considered **COMPLETE** when:

✅ Sitemap finalized with job-to-be-done for each page
✅ Employer skim path documented and optimized
✅ Progressive disclosure rules defined and documented
✅ Navigation implemented (boring, predictable, always visible)
✅ URL strategy established and enforced
✅ Content taxonomy defined (no conceptual mess)
✅ Feature/curation rules documented
✅ Cross-linking strategy implemented
✅ Tone guide and microcopy standards created
✅ SEO baseline implemented (metadata, sitemap, structured data)
✅ Accessibility standards enforced (keyboard nav, WCAG AA, semantic HTML)
✅ "Do not build" list documented and approved

**Deliverables:**

1. `docs/sitemap.md` - Complete site structure
2. `docs/employer-skim-path.md` - 30-45s scan optimization
3. `docs/progressive-disclosure-rules.md` - Content reveal strategy
4. `docs/navigation-spec.md` - Nav implementation details
5. `docs/url-strategy.md` - URL patterns and slug policy
6. `docs/content-taxonomy.md` - Content categorization rules
7. `docs/curation-rules.md` - Feature selection criteria
8. `docs/cross-linking-strategy.md` - Related content patterns
9. `docs/tone-guide.md` - Voice and copy standards
10. `docs/seo-baseline.md` - SEO implementation guide
11. `docs/accessibility-standards.md` - A11y requirements
12. `docs/banned-patterns.md` - "Do not build" list

**This foundation ensures the site architecture is coherent, navigable, and employer-optimized from day one.**
