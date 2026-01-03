# Riqle - Planning Artifacts

This directory contains all planning and solutioning artifacts for the Riqle project following the BMM (BMAD Methodology Management) workflow.

## Directory Structure

```
{project-root}/
├── _bmad-output/planning-artifacts/
│   ├── README.md                          # This file
│   ├── bmm-workflow-status.yaml          # BMM workflow progress tracker
│   ├── product-brief-riqle-2026-01-03.md # Product strategy and vision
│   ├── ux-design-specification.md        # UX design principles and system
│   └── project-vision.md                 # Core project vision and goals
│
└── docs/
    ├── epics.md                          # Master epic list with FR coverage map
    └── epics/                            # Individual epic documentation
        ├── epic-0-infrastructure.md      # Database, backend, auth, commerce (20 stories)
        ├── epic-1-information-architecture.md  # Site structure, nav, content (12 stories)
        ├── epic-2-design-system.md       # Visual language & components (12 stories)
        ├── epic-3-homepage.md            # Identity compression engine (11 stories)
        ├── epic-4-about-narrative.md     # About page, trajectory, principles (12 stories)
        ├── epic-5-work-portfolio.md      # Work page, project pages, curation (12 stories)
        ├── epic-6-startups-showcase.md   # Startups, MarkPoint, founder proof (11 stories)
        ├── epic-7-writing-thinking.md    # Writing page, essays, judgment signal (12 stories)
        ├── epic-8-resources-commerce.md  # Resources, products, trust-first monetization (12 stories)
        ├── epic-9-payments-checkout.md   # Stripe, webhooks, entitlements, refunds (14 stories)
        └── ... (Epics 10-15)
```

## Epic Files

Each epic is documented in a separate markdown file in the `/docs/epics/` directory with comprehensive detail:

### Epic 0: Core Infrastructure, Backend & Data Foundation

**File:** `docs/epics/epic-0-infrastructure.md`
**Status:** ✅ Ready for Implementation
**Stories:** 20 stories (0.1 - 0.20)
**Covers:**

- Repository setup and engineering baseline
- Environment configuration (local, staging, production)
- Database schema and migrations
- API architecture (tRPC recommended)
- Authentication (NextAuth.js with magic links)
- Authorization and RBAC
- Secure file storage
- Stripe integration (checkout + webhooks)
- Background jobs and email delivery
- Observability (logging, errors, Sentry)
- Rate limiting and security
- Backups and CI/CD

### Epic 1: Information Architecture & System Design

**File:** `docs/epics/epic-1-information-architecture.md`
**Status:** ✅ Ready for Implementation (Requires Epic 0)
**Stories:** 12 stories (1.1 - 1.12)
**Covers:**

- Sitemap and page responsibilities
- Employer skim path (30-45 second optimization)
- Progressive disclosure rules
- Navigation model (boring by design)
- URL strategy (clean, stable, SEO-friendly)
- Content taxonomy (Writing, Projects, Startups, Resources)
- Content hierarchy and curation rules
- Cross-linking strategy
- Copy system and tone guide
- SEO baseline
- Accessibility standards (WCAG AA)
- "Do not build" guardrails

### Epic 2: Design System & Visual Language

**File:** `docs/epics/epic-2-design-system.md`
**Status:** ✅ Ready for Implementation (Requires Epic 0, 1)
**Stories:** 12 stories (2.1 - 2.12)
**Covers:**

- Visual north star ("quietly premium, calmly obsessive")
- Typography system (Inter variable, strict hierarchy)
- Color palette (stone neutrals, surgical accent use)
- Spacing and layout grid
- Component primitives (Button, Card, Input, etc.)
- Glassmorphism rules ("velvet glass" implementation)
- Motion and interaction design
- Hand-drawn elements (surgical, explanatory)
- Iconography system
- Responsive design patterns
- Accessibility compliance (WCAG AA)
- Anti-patterns and guardrails

### Epic 3: Homepage - Identity Compression Engine

**File:** `docs/epics/epic-3-homepage.md`
**Status:** ✅ Ready for Implementation (Requires Epic 0, 1, 2)
**Stories:** 11 stories (3.1 - 3.11)
**Covers:**

- Core job-to-be-done (5 employer questions answered in 30-45s)
- Above-fold structure and content hierarchy
- Visual tone (credibility zone)
- Proof anchors (selective evidence display)
- Direction & thinking (optional depth)
- Commerce containment (strict anti-persuasion rules)
- CTA strategy (routing, not conversion)
- Content prioritization logic
- Performance constraints (< 1s FMP, CLS = 0)
- Emotional validation checks
- Accessibility & usability

### Epic 4: About / Narrative / Trajectory

**File:** `docs/epics/epic-4-about-narrative.md`
**Status:** ✅ Ready for Implementation (Requires Epic 0, 1, 2)
**Stories:** 12 stories (4.1 - 4.12)
**Covers:**

- Core job-to-be-done (answering "Is this person coherent?")
- Narrative stance (calm, reflective, matter-of-fact)
- Structural outline (linear, scannable)
- Opening section ("Where I am now")
- Trajectory timeline (Student → Tutor → Builder → Founder)
- Lessons learned (credibility core)
- Handling sensitive pivots (neutralize skepticism)
- Current focus (directional clarity)
- Operating principles (3-5 lived-in principles)
- Visual treatment (text-first, essay-like)
- Skimmability & scan patterns
- Emotional validation checks

### Epic 5: Work & Portfolio (Proof of Execution)

**File:** `docs/epics/epic-5-work-portfolio.md`
**Status:** ✅ Ready for Implementation (Requires Epic 0, 1, 2)
**Stories:** 12 stories (5.1 - 5.12)
**Covers:**

- Core job-to-be-done (employer conclusion: "This person ships")
- Content model (inclusion standards for what qualifies as "work")
- Portfolio structure (curated list, 5-7 items max, best first)
- Individual project pages ("case-lite" format)
- Role clarity & ownership (precision over humility)
- Outcomes over outputs (impact, not artifacts)
- Visual restraint rules (avoid Dribbble/Behance energy)
- Project categorization & signaling (status tags)
- Cross-linking with writing & startups
- Ordering & curation governance (quarterly review)
- Employer scan patterns & UX validation
- Emotional validation checks

### Epic 6: Startups Showcase (Founder Proof, Not Hype)

**File:** `docs/epics/epic-6-startups-showcase.md`
**Status:** ✅ Ready for Implementation (Requires Epic 0, 1, 2)
**Stories:** 11 stories (6.1 - 6.11)
**Covers:**

- Core job-to-be-done (employer conclusion: "This person can take ownership end-to-end")
- Inclusion rules (what qualifies as a "startup")
- Startups page structure (1-3 ventures, professional record tone)
- Individual startup pages (ownership clarity, no vague "we" language)
- Framing paused/incomplete startups (credibility, not shame)
- Metrics & outcomes (meaningful data, no bragging)
- Visual design constraints (explain how, not sell why)
- Cross-linking with Work & Writing (coherent story)
- Handling MarkPoint specifically (operating company, not side hustle)
- Emotional validation checks
- Governance & curation rules (annual review)

### Epic 7: Writing & Thinking (Judgment as Signal)

**File:** `docs/epics/epic-7-writing-thinking.md`
**Status:** ✅ Ready for Implementation (Requires Epic 0, 1, 2)
**Stories:** 12 stories (7.1 - 7.12)
**Covers:**

- Core job-to-be-done (employer conclusion: "This person can reason clearly")
- Inclusion rules (what qualifies as "writing")
- Writing page structure (library, not blog)
- Individual essay page structure (clean top-to-bottom reading)
- Writing style constraints (plain language, concrete examples, no buzzwords)
- Length discipline (respect reader time, cut aggressively)
- Hand-drawn diagrams (max 1 per essay, clarify thinking)
- Cross-linking with Work & Startups (referential, not promotional)
- Publishing cadence & governance (event-driven, not scheduled)
- Drafting & editing workflow (frictionless but intentional)
- Emotional validation checks
- Curation & pruning over time (annual review)

### Epic 8: Resources & Educational Commerce (Trust-First Monetization)

**File:** `docs/epics/epic-8-resources-commerce.md`
**Status:** ✅ Ready for Implementation (Requires Epic 0, 1, 2)
**Stories:** 12 stories (8.1 - 8.12)
**Covers:**

- Core job-to-be-done (three audiences: employers, students, operator)
- Positioning/containment rule (commerce never interrupts)
- Inclusion rules (what qualifies as a resource)
- Resource catalogue structure (calm, informed evaluation)
- Individual resource page structure (informed consent)
- Pricing philosophy (fair, defensible, no tricks)
- Relationship between resources and proof (credibility precedes commerce)
- UX tone & visual constraints (boring and safe)
- Post-purchase experience (trust continuation)
- Refunds & support philosophy (non-adversarial)
- Employer perception checks (commerce strengthens employability)
- Governance & long-term discipline (prevent commerce creep)

### Epic 9: Payments, Checkout & Entitlements

**File:** `docs/epics/epic-9-payments-checkout.md`
**Status:** ✅ Ready for Implementation (Requires Epic 0, 8)
**Stories:** 14 stories (9.1 - 9.14)
**Covers:**

- Core job-to-be-done (customers buy without anxiety, automatic fulfillment)
- Checkout philosophy (boring is a feature, Stripe-native)
- Purchase flow (happy path with webhook-driven fulfillment)
- Stripe configuration & data ownership (database as source of truth)
- Idempotency & replay safety (duplicate webhooks handled correctly)
- Order model & lifecycle (explicit states, auditable transitions)
- Entitlements model (access control separate from payment)
- Secure delivery enforcement (private assets, signed URLs)
- Handling edge cases gracefully (delayed webhooks, email failures)
- Refund handling & entitlement revocation
- Email confirmations (transactional only, no marketing)
- Admin visibility & reconciliation tools
- Performance & reliability constraints
- Testing & validation (automated + manual)

### Epic 10-15: Pending Documentation

The remaining epics will follow the same detailed pattern:

- Epic 10: Customer Access & Delivery
- Epic 11: Admin Experience (Operator UX)
- Epic 12: Performance, Reliability & Trust
- Epic 13: Analytics & Insight (Minimal, Intentional)
- Epic 14: Security, Privacy & Professional Legitimacy
- Epic 15: Launch, Iteration & Long-Term Growth

## How to Use These Artifacts

### For Development

1. **Start with Epic 0** - Complete all infrastructure stories before building features
2. **Follow Epic Order** - Each epic builds on previous foundations
3. **Use Story Checklists** - Every story has implementation checklists with code examples
4. **Reference Tests** - Each story includes testing requirements for validation

### For Planning

1. **Review epics.md** - Master epic list with FR coverage
2. **Read individual epic files** - Detailed breakdown of each epic
3. **Check bmm-workflow-status.yaml** - Track overall BMM workflow progress
4. **Reference product-brief** - Understand product strategy and goals

### For Collaboration

1. **Epic files are the source of truth** - All requirements documented in detail
2. **Stories are implementation-ready** - Each has acceptance criteria, checklists, code examples
3. **Docs folder is generated** - Documentation is created during implementation

## Key Principles

### From Product Brief

- **Employer-first:** 30-45 second skim requirement
- **Commerce as evidence, not persuasion:** No urgency, scarcity, dark patterns
- **Professional legitimacy:** Site signals "serious operator" not "creator marketer"

### From UX Design

- **Calm → Clarity → Trust → Respect → Intrigue:** Emotional design sequence
- **Typography discipline = Thinking discipline:** 50% of UX is type
- **Glassmorphism:** "Velvet glass" (light blur, low opacity), NOT "liquid glass"
- **Hand-drawn elements:** Surgical use for explanation, never decoration
- **Progressive disclosure:** Message first, texture later

### From Architecture (Epic 0)

- **T3 Stack:** Next.js 14+, TypeScript, Prisma, tRPC, NextAuth, Stripe
- **Database as source of truth:** Postgres with migrations
- **Serverless-ready:** Connection pooling, stateless design
- **Idempotent operations:** Especially for payments and webhooks
- **Observability from day 1:** Sentry, structured logging, audit trails

## Epic Story Structure

Each story follows this format:

```markdown
### Story X.Y: Story Title

**Priority:** Critical/High/Medium/Low
**Complexity:** Low/Medium/High/Very High
**Estimated Time:** X-Y hours

#### User Story

As a [user type],
I want [capability],
So that [value/benefit].

#### Acceptance Criteria

**Given** [precondition]
**When** [action]
**Then** [expected outcome]
**And** [additional criteria]

#### Implementation Checklist

- [ ] Specific task 1
- [ ] Specific task 2 (with code example)
- [ ] Configuration step
- [ ] Testing step

#### Testing Requirements

- [ ] Test case 1
- [ ] Test case 2
- [ ] Integration test
- [ ] User acceptance test
```

## Status Tracking

### BMM Workflow Progress

Track via `bmm-workflow-status.yaml`:

- ✅ Phase 1: Analysis (Product Brief complete)
- ✅ Phase 2: Planning (UX Design complete, PRD deferred to epics)
- 🔄 Phase 3: Solutioning (Epics 0-9 complete, Epics 10-15 pending)
- ⏳ Phase 4: Implementation (Pending)

### Epic Documentation Progress

- ✅ Epic 0: Core Infrastructure (20 stories)
- ✅ Epic 1: Information Architecture (12 stories)
- ✅ Epic 2: Design System (12 stories)
- ✅ Epic 3: Homepage (11 stories)
- ✅ Epic 4: About / Narrative (12 stories)
- ✅ Epic 5: Work & Portfolio (12 stories)
- ✅ Epic 6: Startups Showcase (11 stories)
- ✅ Epic 7: Writing & Thinking (12 stories)
- ✅ Epic 8: Resources & Commerce (12 stories)
- ✅ Epic 9: Payments & Checkout (14 stories)
- ⏳ Epic 10-15: Pending user-provided breakdowns

### Epic Completion Criteria

Each epic file contains its own completion criteria at the end.

## Next Steps

1. **Complete Epic 10-15 Documentation** (pending user-provided breakdowns)
2. **Begin Epic 0 Implementation** (Infrastructure first - once ready)
3. **Track progress** in bmm-workflow-status.yaml
4. **Reference epic files** for implementation guidance
5. **Follow story checklists** with code examples and testing requirements

---

**Generated:** 2026-01-03
**Project:** Riqle (Personal Platform)
**Methodology:** BMM (BMAD Methodology Management)
**Workflow:** Epics & Stories Creation (Phase 3: Solutioning)
