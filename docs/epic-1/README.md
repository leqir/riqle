# Epic 1: Information Architecture

> **Status:** Documentation Complete (8/12 stories completed)
> **Updated:** January 3, 2026
> **Purpose:** Define the foundational structure, taxonomy, and user experience patterns for the riqle platform.

---

## Overview

This epic establishes the complete information architecture for riqle — the employer-first portfolio platform with Korean study room aesthetic. The goal is to create a system where an employer can understand who you are, see proof of your capabilities, and find next steps within 30-45 seconds.

**Core Principles:**

- Lowercase "riqle" branding throughout
- Korean aesthetic (chalk typography, hand-drawn icons, desk objects)
- Progressive disclosure (calm first, depth later)
- Employer-first (no overwhelm, clear proof)
- Manual curation over automation

---

## Documentation Index

### Foundation Documents

#### 1. [sitemap.md](./sitemap.md)

**Story:** 1.1 - Define sitemap with job-to-be-done
**Purpose:** Complete site structure with every page, URL pattern, and job-to-be-done definition
**Read first if:** You need to understand the overall site structure

**Key Sections:**

- Required pages (home, about, work, writing, startups, resources, contact)
- Navigation structure (desktop + mobile)
- URL patterns and slug policy
- Content taxonomy decision tree
- Design principles and Korean aesthetic integration

**Status:** ✅ Complete

---

#### 2. [atomic-design-system.md](./atomic-design-system.md)

**Purpose:** Component hierarchy and modular design system architecture
**Read first if:** You need to understand how components are organized

**Key Sections:**

- Atoms (typography, buttons, inputs, icons, decorations)
- Molecules (cards, form fields, navigation items)
- Organisms (header, footer, grids, showcases)
- Templates (layouts, page templates)
- Design tokens (colors, spacing, typography, animation)
- File structure and implementation examples

**Key Principle:** One change propagates everywhere (heavily modular)

**Status:** ✅ Complete

---

### User Experience Documents

#### 3. [employer-skim-path.md](./employer-skim-path.md)

**Story:** 1.2 - Design employer skim path
**Purpose:** 30-45 second comprehension strategy for employers
**Read first if:** You need to understand user journey and information hierarchy

**Key Sections:**

- Primary path: home → work → (writing or startups) → contact
- Homepage scroll layout (scroll 1: clarity, scroll 2: proof)
- Information density per screen (max 7-10 items)
- Timing breakdown (35-55 seconds total)
- F-pattern scan optimization
- Mobile adaptations

**Key Metric:** Can employer understand identity in 45 seconds or less

**Status:** ✅ Complete

---

#### 4. [progressive-disclosure-rules.md](./progressive-disclosure-rules.md)

**Story:** 1.3 - Define progressive disclosure rules
**Purpose:** Content reveal strategy to prevent cognitive overload
**Read first if:** You need to understand how much to show on each scroll depth

**Key Sections:**

- Scroll hierarchy (scroll 1: clarity, scroll 2: proof, scroll 3+: texture)
- Page-level progressive disclosure (every page type)
- Deep page structure (detail views)
- Interaction-based disclosure (click vs hover)
- Commerce containment rules (no urgency, no popups)
- Animation constraints (no load animations)
- Mobile progressive disclosure
- Banned patterns (comprehensive list)

**Key Rule:** Scroll 1 must have ≤ 10 items visible

**Status:** ✅ Complete

---

### Navigation & Structure

#### 5. [navigation-spec.md](./navigation-spec.md)

**Story:** 1.4 - Implement navigation model
**Purpose:** "Boring by design" navigation that's always visible and predictable
**Read first if:** You're implementing the header/navigation component

**Key Sections:**

- Desktop navigation (horizontal, always visible)
- Mobile navigation (hamburger menu)
- Visual treatment (default, hover, active, focus states)
- Keyboard navigation (tab order, skip links)
- Accessibility (WCAG AA compliance, ARIA labels)
- Korean aesthetic integration
- Component implementation (SiteHeader, NavLink)
- Banned patterns (no hiding on scroll, no mega menus)

**Key Principle:** Always visible. Always predictable. Always accessible.

**Status:** ✅ Complete

---

#### 6. [url-strategy.md](./url-strategy.md)

**Story:** 1.5 - Establish URL strategy and slug policy
**Purpose:** Human-readable, permanent, predictable URL structure
**Read first if:** You're implementing routing or creating content

**Key Sections:**

- URL structure patterns (static and dynamic)
- Slug naming rules (lowercase-hyphen-separated)
- Slug generation algorithm
- URL permanence policy (once published, never change)
- Canonical URL strategy
- Special cases (pagination, tags, dates)
- SEO implications (breadcrumbs, sitemap.xml)
- Next.js implementation
- URL normalization (trailing slashes, case sensitivity)

**Key Rule:** Once published, URLs are permanent (301 redirect if must change)

**Status:** ✅ Complete

---

### Content Organization

#### 7. [content-taxonomy.md](./content-taxonomy.md)

**Story:** 1.6 - Define content taxonomy and naming conventions
**Purpose:** Clear boundaries between content types with decision tree
**Read first if:** You're creating content or implementing content models

**Key Sections:**

- Four content types: writing, work, startups, resources
- Decision tree for categorization
- Database models for each type (Prisma schemas)
- Naming conventions (titles, slugs)
- Metadata structure (shared + type-specific fields)
- Tagging strategy (3-7 tags max)
- Content lifecycle (draft → published → archived)
- Featured content logic
- Content relationships (cross-linking)
- Edge cases (confidential work, series, duplicates)

**Key Principle:** One piece of content = one primary type

**Status:** ✅ Complete

---

#### 8. [content-hierarchy.md](./content-hierarchy.md)

**Story:** 1.7 - Create content hierarchy rules
**Purpose:** Featuring logic and ordering strategies (quality over quantity)
**Read first if:** You're implementing featured content or content ordering

**Key Sections:**

- Featuring philosophy (manual curation, not algorithms)
- Featuring limits per content type (homepage: 1-2 projects, 1 essay)
- Ordering strategies (homepage, index pages, archive pages)
- Related content logic (essays → projects → startups)
- Freshness vs evergreen balance
- Filtering and sorting (allowed filters, user-controlled sorting)
- Proof anchor logic (homepage)
- Content limits per page
- Admin UI requirements
- Implementation examples

**Key Rule:** Featured = what you'd show an employer in a 30-second pitch

**Status:** ✅ Complete

---

## Pending Documentation

### Story 1.8: Cross-linking System

**File:** `cross-linking-system.md` (to be created)
**Purpose:** Define how content pieces reference each other (essays ↔ projects ↔ startups)

### Story 1.9: Copy System & Tone Rules

**File:** `copy-tone-rules.md` (to be created)
**Purpose:** Writing style guide, microcopy patterns, voice and tone

### Story 1.10: SEO & Discoverability Baseline

**File:** `seo-strategy.md` (to be created)
**Purpose:** Meta tags, structured data, Open Graph, Twitter Cards

### Story 1.11: Accessibility & Usability Constraints

**File:** `accessibility-requirements.md` (to be created)
**Purpose:** WCAG compliance, keyboard navigation, screen reader support

### Story 1.12: "Do Not Build" List

**File:** `do-not-build.md` (to be created)
**Purpose:** Explicitly banned features and patterns

---

## Reading Order

### For Product/Strategy Understanding:

1. **sitemap.md** - Understand overall structure
2. **employer-skim-path.md** - Understand user journey
3. **progressive-disclosure-rules.md** - Understand content reveal strategy
4. **content-taxonomy.md** - Understand content types
5. **content-hierarchy.md** - Understand featuring logic

### For Design/Frontend Implementation:

1. **atomic-design-system.md** - Understand component hierarchy
2. **navigation-spec.md** - Implement navigation
3. **progressive-disclosure-rules.md** - Implement scroll hierarchy
4. **employer-skim-path.md** - Validate user experience

### For Backend/Data Implementation:

1. **content-taxonomy.md** - Implement database models
2. **content-hierarchy.md** - Implement queries and ordering
3. **url-strategy.md** - Implement routing and slugs

### For Content Creation:

1. **sitemap.md** - Understand where content lives
2. **content-taxonomy.md** - Understand content types
3. **url-strategy.md** - Create proper slugs
4. **content-hierarchy.md** - Understand featuring criteria

---

## Implementation Checklist

### Phase 1: Database Models

- [ ] Create Post model (writing)
- [ ] Create Project model (work)
- [ ] Create Startup model (startups)
- [ ] Create Resource model (resources)
- [ ] Add featured boolean to all models
- [ ] Add order field to Project model
- [ ] Add tags arrays to all models
- [ ] Run migrations

### Phase 2: Component Library (Atoms)

- [ ] ChalkText component
- [ ] BodyText component
- [ ] ChalkButton component
- [ ] LinkButton component
- [ ] Hand-drawn icon components
- [ ] Decoration components (DeskLampGlow, KoreanAnnotation, etc.)
- [ ] Design tokens file

### Phase 3: Navigation

- [ ] SiteHeader organism
- [ ] NavLink molecule
- [ ] Mobile menu with hamburger
- [ ] Skip-to-content link
- [ ] Keyboard navigation
- [ ] ARIA labels

### Phase 4: Page Templates

- [ ] BaseLayout template
- [ ] ContentLayout template
- [ ] HomeTemplate template
- [ ] ContentIndexTemplate template
- [ ] ContentDetailTemplate template

### Phase 5: Routes & Pages

- [ ] Homepage (/)
- [ ] About (/about)
- [ ] Work index (/work)
- [ ] Writing index (/writing)
- [ ] Startups index (/startups)
- [ ] Resources index (/resources)
- [ ] Contact (/contact)
- [ ] Dynamic routes ([slug] pages)

### Phase 6: Content Queries

- [ ] Featured content queries (homepage)
- [ ] Index page queries (work, writing, etc.)
- [ ] Related content queries
- [ ] Archive page queries with pagination
- [ ] Filter queries (tags, year)

### Phase 7: Admin UI

- [ ] Featured toggle
- [ ] Manual ordering interface
- [ ] Slug generation
- [ ] URL validation
- [ ] Bulk actions

### Phase 8: Testing & Validation

- [ ] Employer skim path (30-45 seconds)
- [ ] Progressive disclosure (scroll depth)
- [ ] Navigation (keyboard, mobile)
- [ ] URL permanence (redirects)
- [ ] Content hierarchy (featured limits)
- [ ] Accessibility (WCAG AA)
- [ ] Mobile responsiveness
- [ ] Korean aesthetic integration

---

## Key Metrics

**User Experience:**

- Employer comprehension time: **30-45 seconds** (target)
- Homepage items above fold: **≤ 10 items**
- Clicks to best proof: **≤ 3 clicks**

**Content Limits:**

- Homepage featured projects: **1-2 max**
- Homepage featured essays: **1 max**
- Work index featured: **5 max**
- Writing index featured: **3 max**

**Performance:**

- First Contentful Paint: **< 1.5s**
- Time to Interactive: **< 3.5s**
- Cumulative Layout Shift: **< 0.1**

---

## Design Tokens Reference

```typescript
// Quick reference - full definitions in atomic-design-system.md

COLORS = {
  chalk: {
    white: '#f5f5f0',
    charcoal: '#1a1a1a',
    cream: '#e8e8e0',
  },
  neon: {
    pink: '#ff2d6a',
    cyan: '#00e5ff',
    purple: '#a855f7',
    green: '#4ade80',
  },
};

SPACING = {
  xs: '8px',
  sm: '12px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

TYPOGRAPHY = {
  fonts: {
    chalk: 'Nanum Pen Script, cursive',
    body: 'SF Pro Text, sans-serif',
  },
  sizes: {
    xs: '12px',
    base: '16px',
    xl: '28px',
    xxl: '40px',
  },
};
```

---

## Korean Aesthetic Elements

**Typography:**

- Headings: Chalk font (hand-drawn, imperfect)
- Body: Apple SF (clean, readable)
- Always lowercase

**Colors:**

- Neon cyan: focus, calm action (#00e5ff)
- Neon pink: urgency, warnings (#ff2d6a)
- Neon purple: creativity, AI (#a855f7)
- Neon green: success, validation (#4ade80)

**Decorations:**

- Desk lamp glow (warm vignette)
- Mechanical pencil sketches
- Coffee cup rings
- Korean annotations: 집중 (focus), 노력 (effort), 진실 (truth), 꿈 (dream)
- Hand-drawn icons throughout
- Chalk dust particles (subtle)

**Tone:**

- Factual, not motivational
- Observational, not judgmental
- Lowercase, full stops
- Honest validation: "you earned this." not "great job!"

---

## Related Documentation

**Epic Definitions:**

- [Epic 1 Definition](../epics/epic-1-information-architecture.md) - High-level epic overview and stories

**Design Resources:**

- [Korean Aesthetic Reference](../../../markpoint/docs/ui/KOREAN-AESTHETIC-SCREEN-BY-SCREEN-IMPLEMENTATION.md) - Original markpoint aesthetic

**Implementation:**

- Database schema: `prisma/schema.prisma`
- Component library: `src/components/`
- Design tokens: `src/lib/design-tokens.ts`

---

## Contributing to This Epic

**When adding new documentation:**

1. Create file in `/docs/epic-1/`
2. Update this README with link and description
3. Follow existing document structure (philosophy → rules → examples → banned patterns)
4. Include Korean aesthetic notes in every document
5. Add to appropriate reading order section

**Document structure template:**

```markdown
# [Topic]: [Principle]

> **principle:** [one-line summary]
> **rule:** [key constraint]

## core philosophy

**the problem:** ...
**the solution:** ...
**user feeling:** ...

## [main sections]

...

## banned patterns

❌ Do NOT implement: ...

**last updated:** [date]
**status:** [status]
**principle:** [reiterate key principle]
```

---

**Maintained by:** riqle team
**Last reviewed:** January 3, 2026
**Next review:** As needed when implementing Epic 1
