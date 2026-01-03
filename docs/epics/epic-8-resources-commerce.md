# EPIC 8 — Resources & Educational Commerce (Trust-First Monetization)

**Epic ID:** 8
**Epic Name:** Resources & Educational Commerce (Trust-First Monetization)
**Status:** Ready for Implementation
**Dependencies:** Epic 0 (Infrastructure), Epic 1 (Information Architecture), Epic 2 (Design System)
**Total Stories:** 12

---

## Epic Overview

### Purpose

Present educational resources (HSC English materials, courses, guides) as a natural extension of lived experience, not as a sales funnel or creator economy play.

**This is professional commerce, not marketing.**

### User Outcome

This epic ensures:

- Commerce increases trust instead of undermining it
- Employers read sales as proof of responsibility
- Students feel safe, informed, and unpressured

### Core Questions Answered

**Three different audiences reach three different conclusions:**

**Employers:** "This person has sold real things responsibly."
**Students/customers:** "This is credible, clear, and safe to buy."
**You (operator):** "I'm selling without compromising integrity."

**If commerce introduces tension, this epic has failed.**

---

## Architecture Decisions

### Page Structure

```
/resources              # Resources listing page (educational products)
/resources/[slug]       # Individual resource detail/purchase pages
/api/checkout          # Stripe checkout creation
/api/webhooks/stripe   # Stripe webhook handler for fulfillment
```

### Component Hierarchy

```
ResourcesPage
├── ResourcesIntro (philosophy paragraph)
└── ResourceList (clean list, no grids)
    └── ResourceCard[] (title, description, audience, format, price, link)

ResourceDetailPage
├── WhatThisIs (description, scope, format)
├── WhoItsFor (target audience, non-audience)
├── WhatItCovers (bullet-level clarity)
├── HowItWasCreated (experience behind it, links to work)
├── WhatYouGet (files, access, delivery)
├── Pricing (simple, transparent)
└── PurchaseCTA (calm, neutral)
```

### Content Model (Prisma Schema Addition)

```prisma
// Add to existing schema in Epic 0

model Product {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String   // Short description

  // Positioning
  targetAudience String // "HSC English students preparing for exams"
  nonAudience    String // "This is not for university-level essays"

  // Content
  whatItIs       String @db.Text // Clear description, scope, format
  whatItCovers   String @db.Text // Bullet-level clarity
  howItWasCreated String @db.Text // Experience behind it

  // Delivery
  format         String // "PDF", "Course", "Bundle"
  whatYouGet     String @db.Text // Files, access, delivery method

  // Pricing
  priceInCents   Int
  currency       String @default("AUD")

  // Stripe integration
  stripeProductId String? @unique
  stripePriceId   String?

  // Files/content (for digital products)
  downloadUrls   String[] // Signed URLs for downloads

  // Cross-linking
  relatedPostSlugs    String[] // Related Writing
  relatedProjectSlugs String[] // Related Work

  // Metadata
  featured       Boolean  @default(false)
  displayOrder   Int      @default(0)
  published      Boolean  @default(false)

  // Timestamps
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  // Relations
  orders         OrderItem[]

  @@index([displayOrder])
  @@index([published])
}

// OrderItem links Orders to Products (many-to-many)
model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  quantity  Int     @default(1)
  priceAtPurchase Int // Price at time of purchase

  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])

  @@index([orderId])
  @@index([productId])
}
```

### Routing

```typescript
// app/resources/page.tsx - Resources listing
export default async function ResourcesPage() {
  const products = await db.product.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
  });
  return <ResourceList products={products} />;
}

// app/resources/[slug]/page.tsx - Resource detail
export default async function ResourcePage({ params }: { params: { slug: string } }) {
  const product = await db.product.findUnique({
    where: { slug: params.slug, published: true },
  });
  if (!product) notFound();
  return <ResourceDetail product={product} />;
}
```

### Design Constraints

- **Containment rule** (commerce never interrupts homepage/portfolio/writing)
- **Boring and safe** (no accent colors for CTAs, no animations, no glass effects)
- **Trust-first** (credibility precedes commerce, never reverse)
- **Calm evaluation** (no grids encouraging impulse, no featured inflation)
- **Transparent pricing** (simple, fair, no anchor tricks)

---

## Stories

### Story 8.1: Core Job-to-Be-Done

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As **an employer, student, and operator**,
I want **commerce that serves all three perspectives without tension**,
So that **employers see responsibility, students feel safe, and I maintain integrity**.

#### Acceptance Criteria

**Given** the Resources section exists
**When** all three audiences view it
**Then** employers can ignore commerce entirely without confusion
**And** students can evaluate products without feeling sold to
**And** you feel comfortable selling without compromising integrity

#### Three Audience Conclusions

1. **Employers:** "This person has sold real things responsibly"
2. **Students/customers:** "This is credible, clear, and safe to buy"
3. **You (operator):** "I'm selling without compromising integrity"

#### Implementation Checklist

- [ ] Define three-audience success criteria document

  ```markdown
  # Resources Section: Three-Audience Success Criteria

  ## Employer Perspective

  Success indicators:

  - Commerce feels like infrastructure, not identity
  - Resources demonstrate operational capability
  - Nothing feels like "creator economy"
  - Would happily show this page to hiring manager

  Failure indicators:

  - Page reads like a sales funnel
  - Commerce dominates site identity
  - Feels like distraction from professional work

  ## Student/Customer Perspective

  Success indicators:

  - Can evaluate products calmly and informed
  - No pressure tactics or urgency
  - Clear understanding of what they're buying
  - Feel safe purchasing

  Failure indicators:

  - Feel sold to or manipulated
  - Unclear about product value
  - Surprise after purchase
  - Suspicious of quality

  ## Operator Perspective

  Success indicators:

  - Comfortable discussing any product in interview
  - No integrity compromises
  - Refund requests rare and reasonable
  - Commerce reinforces credibility

  Failure indicators:

  - Defensive about pricing or value
  - Uncomfortable showing page to employers
  - High refund rate
  - Commerce undermines trust
  ```

- [ ] Create validation checklist for all three audiences
- [ ] Review resources section against all three perspectives
- [ ] Ensure no tension between audiences

#### Testing Requirements

- [ ] Employer test: Can employers ignore commerce without confusion?
- [ ] Student test: Do students feel safe evaluating products?
- [ ] Operator test: Are you comfortable selling without compromise?

---

### Story 8.2: Positioning of the Resources Section (Containment Rule)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **site visitor**,
I want **commerce to be contained and optional**,
So that **the site's primary identity (work, thinking, responsibility) remains intact**.

#### Acceptance Criteria

**Given** the site architecture
**When** navigating across pages
**Then** commerce feels optional
**And** the site's primary identity remains intact
**And** resources never interrupt reading or portfolio flows

#### Structural Rules

✅ Resources live on a separate page
✅ No product cards on the homepage
✅ No pricing surfaced outside the Resources section
✅ Resources never interrupt reading or portfolio flows

#### Framing Copy (Conceptual)

✅ "Resources created from real tutoring experience"
✅ "Designed to be practical, honest, and clear"

#### Explicit Bans

❌ "Buy now"
❌ "Limited time"
❌ "Best seller"
❌ "Transform your results"

#### Implementation Checklist

- [ ] Create containment rules document

  ```markdown
  # Commerce Containment Rules

  ## Structural Containment

  - [ ] Resources only accessible via `/resources` page
  - [ ] NO product cards on homepage
  - [ ] NO pricing anywhere except Resources section
  - [ ] NO commerce interruptions in reading/portfolio flows

  ## Homepage Treatment

  - [ ] Optional link to Resources in navigation
  - [ ] NO featured products
  - [ ] NO special callouts for new products

  ## Writing/Work/Startup Pages

  - [ ] May reference resources in context ("used in MarkPoint")
  - [ ] NEVER push products
  - [ ] Links are referential, not promotional

  ## Banned Language (Anywhere)

  - "Buy now"
  - "Limited time"
  - "Best seller"
  - "Transform your results"
  - "Don't miss out"
  - "Exclusive offer"

  ## Allowed Language

  - "Resources"
  - "Created from real tutoring experience"
  - "Practical, honest, clear"
  - "Purchase" (neutral)
  - "Get access" (neutral)
  ```

- [ ] Review homepage (ensure no product cards)
- [ ] Review navigation (Resources link present but not prominent)
- [ ] Review all pages for commerce leakage
- [ ] Remove any banned language

#### Testing Requirements

- [ ] Containment test: Can you navigate site without seeing commerce?
- [ ] Identity test: Does site feel like "work/thinking" or "store"?
- [ ] Interruption test: Are there any commerce interruptions?

---

### Story 8.3: What Qualifies as a Resource (Inclusion Rules)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **content curator**,
I want **strict inclusion standards for resources**,
So that **trust is protected and every product is defensible**.

#### Acceptance Criteria

**Given** a potential resource for inclusion
**When** evaluating against standards
**Then** every resource is defensible in an interview
**And** nothing exists purely for revenue padding
**And** if you wouldn't recommend it without being paid, it doesn't belong

#### Included

✅ HSC English study resources
✅ Marking guides
✅ Essay frameworks
✅ Practice materials
✅ Courses built from real teaching experience

#### Excluded

❌ Generic productivity content
❌ Low-effort PDFs
❌ Anything you wouldn't personally stand behind in a conversation

**Rule:** If you wouldn't recommend it without being paid, it doesn't belong.

#### Implementation Checklist

- [ ] Create resource inclusion standards document

  ```markdown
  # Resource Inclusion Standards

  ## Included Categories

  1. **HSC English study resources**
     - Marking guides based on real HSC criteria
     - Essay frameworks tested with 500+ students
     - Practice materials aligned with exam format

  2. **Courses built from real teaching experience**
     - Curriculum reflects what actually worked
     - Based on tutoring 500+ students to Band 6
     - No generic templates

  ## Explicit Exclusions

  - Generic productivity content
  - Low-effort PDFs without substance
  - Anything you wouldn't recommend to family
  - Products created purely for revenue
  - Generic templates from other sources

  ## Inclusion Checklist

  For each potential resource, ask:

  - [ ] Have I personally used this approach successfully?
  - [ ] Would I recommend this without being paid?
  - [ ] Can I defend the quality and value in an interview?
  - [ ] Is this based on real teaching experience?
  - [ ] Would I be comfortable if an employer saw this?

  ## Quality Bar

  - Must be based on real experience (500+ students tutored)
  - Must solve specific HSC English problems
  - Must reflect current standards (not outdated)
  - Must be defensible in detail
  ```

- [ ] Review existing resources against criteria
- [ ] Create content review process
- [ ] Document why each included resource qualifies

#### Testing Requirements

- [ ] Inclusion test: Does each resource meet standards?
- [ ] Defensibility test: Can you defend quality in interview?
- [ ] Recommendation test: Would you recommend without payment?

---

### Story 8.4: Resource Catalogue Structure (Macro)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a **student evaluating resources**,
I want **calm, informed evaluation without pressure**,
So that **I can understand what's offered quickly and make an informed decision**.

#### Acceptance Criteria

**Given** the Resources page is loaded
**When** a student views it
**Then** they can understand what's offered in under a minute
**And** employers don't feel like they've entered a sales page
**And** there are no grids encouraging impulse buying

#### Recommended Layout

- Intro paragraph explaining philosophy
- Clean list of resources
- Each resource presented with:
  - Title
  - Short description
  - Intended audience
  - Format (PDF, course, bundle)
  - Price (clear, upfront)
  - Link to detail page

#### Rules

❌ No grids that encourage impulse buying
❌ No visual overload
❌ No "featured" inflation

#### Implementation Checklist

- [ ] Create ResourceList component

  ```tsx
  // components/resources/ResourceList.tsx
  import Link from 'next/link';

  type Product = {
    slug: string;
    title: string;
    description: string;
    targetAudience: string;
    format: string;
    priceInCents: number;
    currency: string;
  };

  export function ResourceList({ products }: { products: Product[] }) {
    return (
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
        {/* Intro */}
        <div className="space-y-4">
          <h1 className="text-h1 font-semibold text-stone-900">Resources</h1>
          <p className="text-body max-w-2xl text-stone-600">
            Educational resources created from real tutoring experience—designed to be practical,
            honest, and clear.
          </p>
        </div>

        {/* Resource list */}
        <div className="space-y-8">
          {products.map((product) => (
            <ResourceCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    );
  }
  ```

- [ ] Create ResourceCard component

  ```tsx
  // components/resources/ResourceCard.tsx
  export function ResourceCard({ product }: { product: Product }) {
    const price = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: product.currency,
    }).format(product.priceInCents / 100);

    return (
      <Link
        href={`/resources/${product.slug}`}
        className="block space-y-3 rounded-lg border border-stone-200 p-6 transition-colors hover:border-stone-300"
      >
        {/* Title & Format */}
        <div className="flex items-center justify-between">
          <h2 className="text-h3 font-semibold text-stone-900">{product.title}</h2>
          <span className="text-meta text-stone-500">{product.format}</span>
        </div>

        {/* Description */}
        <p className="text-body text-stone-700">{product.description}</p>

        {/* Audience & Price */}
        <div className="text-meta flex flex-col gap-2 text-stone-600 sm:flex-row sm:items-center sm:gap-4">
          <span>For: {product.targetAudience}</span>
          <span className="hidden text-stone-400 sm:inline">•</span>
          <span className="font-medium text-stone-900">{price}</span>
        </div>
      </Link>
    );
  }
  ```

- [ ] Implement resource listing (clean list, not grid)
- [ ] Add intro paragraph with philosophy
- [ ] Ensure no visual overload
- [ ] Remove any "featured" or "best seller" indicators

#### Testing Requirements

- [ ] Speed test: Can students understand offerings in <1 minute?
- [ ] Sales page test: Do employers feel like they entered a sales page?
- [ ] Impulse test: Are there any grid patterns encouraging impulse buying?

---

### Story 8.5: Individual Resource Page Structure

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 6-8 hours

#### User Story

As a **student considering a purchase**,
I want **complete information to make an informed decision**,
So that **I know exactly what I'm buying with no surprises**.

#### Acceptance Criteria

**Given** a resource detail page
**When** a student reads it
**Then** they know exactly what they're buying
**And** there are no surprises after purchase
**And** all required sections are present

#### Required Sections

1. **What this is** (clear description, scope, format)
2. **Who it's for** (target audience, non-audience)
3. **What it covers** (bullet-level clarity)
4. **How it was created** (experience behind it, links to work)
5. **What you get** (files, access, delivery method)
6. **Pricing** (simple, transparent, no tricks)
7. **Purchase CTA** (calm, neutral language)

#### Explicit Bans

❌ Testimonials as persuasion tools
❌ Fake urgency
❌ Overlong sales copy

#### Implementation Checklist

- [ ] Create ResourceDetail component

  ```tsx
  // components/resources/ResourceDetail.tsx
  type Product = {
    title: string;
    whatItIs: string;
    targetAudience: string;
    nonAudience: string;
    whatItCovers: string;
    howItWasCreated: string;
    whatYouGet: string;
    format: string;
    priceInCents: number;
    currency: string;
  };

  export function ResourceDetail({ product }: { product: Product }) {
    const price = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: product.currency,
    }).format(product.priceInCents / 100);

    return (
      <div className="mx-auto max-w-3xl space-y-12 px-6 py-16">
        {/* Title */}
        <h1 className="text-h1 font-semibold text-stone-900">{product.title}</h1>

        {/* What this is */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">What this is</h2>
          <div className="prose prose-stone max-w-none">{product.whatItIs}</div>
        </section>

        {/* Who it's for */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Who it's for</h2>
          <div className="space-y-3">
            <p className="text-body text-stone-700">
              <strong>This is for:</strong> {product.targetAudience}
            </p>
            <p className="text-body text-stone-600">
              <strong>This is not for:</strong> {product.nonAudience}
            </p>
          </div>
        </section>

        {/* What it covers */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">What it covers</h2>
          <div className="prose prose-stone max-w-none">{product.whatItCovers}</div>
        </section>

        {/* How it was created */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">How it was created</h2>
          <div className="prose prose-stone max-w-none">{product.howItWasCreated}</div>
        </section>

        {/* What you get */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">What you get</h2>
          <div className="prose prose-stone max-w-none">{product.whatYouGet}</div>
        </section>

        {/* Pricing & Purchase */}
        <section className="space-y-6 border-t border-stone-200 pt-8">
          <div className="space-y-2">
            <div className="text-h2 font-semibold text-stone-900">{price}</div>
            <p className="text-meta text-stone-600">
              {product.format} • Immediate access after purchase
            </p>
          </div>

          <form action="/api/checkout" method="POST">
            <input type="hidden" name="productId" value={product.id} />
            <button
              type="submit"
              className="rounded-md bg-stone-900 px-6 py-3 font-medium text-white transition-colors hover:bg-stone-800"
            >
              Purchase
            </button>
          </form>
        </section>

        {/* Related content */}
        <ResourceRelatedContent productId={product.id} />
      </div>
    );
  }
  ```

- [ ] Implement all required sections
- [ ] Ensure clear non-audience statement ("This is not for...")
- [ ] Remove testimonials used as persuasion
- [ ] Remove any urgency language
- [ ] Keep copy concise (not overlong sales copy)

#### Testing Requirements

- [ ] Clarity test: Do students know exactly what they're buying?
- [ ] Surprise test: Are there any post-purchase surprises?
- [ ] Completeness test: Are all required sections present?

---

### Story 8.6: Pricing Philosophy (Signal, Not Optimization)

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **student and operator**,
I want **fair, defensible pricing**,
So that **students feel respected and I feel comfortable explaining rationale**.

#### Acceptance Criteria

**Given** product pricing is set
**When** evaluating it
**Then** you feel comfortable explaining pricing rationale
**And** refund requests are rare and reasonable
**And** pricing answers: "Is this reasonable given the effort and value?"

#### Rules

✅ Fair, defensible pricing
❌ No artificial discounting
❌ No "tier explosion"
❌ No "premium upsell ladder"

#### Pricing Should Answer

**"Is this reasonable given the effort and value?"**

#### Implementation Checklist

- [ ] Create pricing philosophy document

  ```markdown
  # Pricing Philosophy

  ## Core Principle

  Price communicates seriousness, not extraction.

  ## Pricing Questions

  For each product, answer:

  1. **Effort:** How much work went into creating this?
  2. **Value:** What problem does it solve for students?
  3. **Alternatives:** What do students currently pay for similar value?
  4. **Defensibility:** Can I explain this price in an interview?

  ## Good Pricing Examples

  - HSC Essay Marking Guide: $29 AUD
    - Rationale: 50+ hours creating framework, tested with 500+ students, saves 10+ hours of trial/error
    - Comparable: Private tutoring hour costs $80-120

  - Complete HSC English Course: $149 AUD
    - Rationale: 6 months of development, comprehensive curriculum, ongoing updates
    - Comparable: 2 tutoring sessions cost more, this provides full framework

  ## Bad Pricing Patterns

  - Artificial discounting: "$199 $49 TODAY ONLY!"
  - Tier explosion: Basic ($49), Pro ($99), Premium ($199), Elite ($399)
  - Upsell ladder: Constantly pushing to "upgrade"

  ## Pricing Rules

  - [ ] Set price once, keep it stable
  - [ ] No fake discounts or countdown timers
  - [ ] Maximum 2-3 products (avoid tier explosion)
  - [ ] Price reflects effort and value, not "what the market will bear"

  ## Refund Policy

  - 14-day refund window
  - No questions asked
  - Process refunds within 24 hours
  - Track refund rate (should be <5%)
  ```

- [ ] Set fair pricing for each product
- [ ] Document pricing rationale
- [ ] Remove any artificial discounting
- [ ] Avoid tier explosion (max 2-3 products)
- [ ] Create clear refund policy

#### Testing Requirements

- [ ] Defensibility test: Can you explain pricing rationale comfortably?
- [ ] Fairness test: Is pricing reasonable given effort/value?
- [ ] Refund test: Is refund rate <5%?

---

### Story 8.7: Relationship Between Resources and Proof

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **student evaluating credibility**,
I want **credibility to precede commerce**,
So that **sales feel earned, not pushy**.

#### Acceptance Criteria

**Given** resources and proof content exist
**When** evaluating the relationship
**Then** sales feel earned
**And** commerce never drives content direction
**And** resources are downstream of proof

#### Required Linking

Resource pages link to:

- Writing explaining pedagogy
- Work/startups demonstrating experience

Writing/work pages may reference resources, but never push them

#### Rules

✅ Resources are downstream of proof
❌ Never reverse this flow

#### Implementation Checklist

- [ ] Add relatedPostSlugs and relatedProjectSlugs to Product model (already in schema)
- [ ] Create ResourceRelatedContent component

  ```tsx
  // components/resources/ResourceRelatedContent.tsx
  export function ResourceRelatedContent({
    posts,
    projects,
  }: {
    posts?: Array<{ slug: string; title: string }>;
    projects?: Array<{ slug: string; title: string }>;
  }) {
    if (!posts?.length && !projects?.length) return null;

    return (
      <div className="space-y-4 border-t border-stone-200 pt-8">
        <h3 className="text-h3 font-semibold text-stone-900">Background</h3>

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
      </div>
    );
  }
  ```

- [ ] Link resources to writing/work demonstrating experience
- [ ] Review writing/work pages (ensure they don't push products)
- [ ] Ensure commerce is downstream of proof, never reversed

#### Testing Requirements

- [ ] Earned test: Do sales feel earned or pushy?
- [ ] Direction test: Does commerce drive content? (Should be no)
- [ ] Flow test: Is proof → commerce (not commerce → proof)?

---

### Story 8.8: UX Tone & Visual Constraints (Commerce-Specific)

**Priority:** High
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **student making a purchase**,
I want **buying to feel boring and safe**,
So that **I trust the transaction without feeling manipulated**.

#### Acceptance Criteria

**Given** the purchase flow
**When** students interact with it
**Then** checkout feels Stripe-native
**And** nothing feels manipulative
**And** buying feels boring and safe

#### Visual Rules

❌ No accent colors for CTAs
❌ No animation on purchase buttons
❌ No glass effects on pricing
✅ Typography consistent with rest of site

#### Interaction Rules

✅ One clear CTA per page
❌ No popups
❌ No interruptions

#### Implementation Checklist

- [ ] Create commerce UX guidelines

  ```markdown
  # Commerce UX Guidelines

  ## Visual Treatment

  - **CTAs:** Use stone-900 background (not accent color)
  - **Pricing:** Plain text, no special styling
  - **Buttons:** No animations, no hover effects beyond simple color change
  - **Typography:** Same font and sizing as rest of site

  ## Banned Patterns

  - Accent colors on purchase buttons (creates urgency)
  - Animated CTAs or pulsing buttons
  - Glass effects on pricing cards
  - Gradient backgrounds
  - Large, prominent "BUY NOW" buttons

  ## Allowed Patterns

  - Simple button: "Purchase" in stone-900
  - Clear pricing in body text size
  - Consistent typography throughout
  - Stripe-native checkout experience

  ## Interaction Rules

  - One CTA per page (no multiple competing CTAs)
  - No popups or modals pushing products
  - No exit-intent popups
  - No interruptions during reading
  ```

- [ ] Review all CTAs (use stone-900, no accent)
- [ ] Remove animations on purchase buttons
- [ ] Remove glass effects on pricing
- [ ] Ensure typography consistency
- [ ] Limit to one CTA per page

#### Testing Requirements

- [ ] Boring test: Does buying feel boring and safe?
- [ ] Manipulation test: Is anything manipulative?
- [ ] Stripe test: Does checkout feel Stripe-native?

---

### Story 8.9: Post-Purchase Experience (Trust Continuation)

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a **customer who just purchased**,
I want **immediate, clear access to what I bought**,
So that **I feel relief, not anxiety**.

#### Acceptance Criteria

**Given** a successful purchase
**When** the customer completes checkout
**Then** they feel relief, not anxiety
**And** support requests are minimal
**And** delivery reinforces professionalism

#### Required Flow

1. Immediate confirmation
2. Clear access instructions
3. Simple next steps
4. No marketing emails unless explicitly opted in

#### Tone

- Transactional
- Polite
- Clear

#### Implementation Checklist

- [ ] Create post-purchase email template

  ```markdown
  Subject: Your purchase: [Product Name]

  Hi,

  Thanks for purchasing [Product Name].

  **Access your files:**
  [Download Link 1]
  [Download Link 2]

  **What's included:**

  - [File 1 description]
  - [File 2 description]

  **Need help?**
  Reply to this email or contact [support email].

  **Refund policy:**
  14-day refund window, no questions asked. Just reply to this email.

  —
  Nathanael
  ```

- [ ] Implement Stripe webhook for fulfillment

  ```typescript
  // app/api/webhooks/stripe/route.ts
  import { headers } from 'next/headers';
  import Stripe from 'stripe';

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
      return new Response('Webhook signature verification failed', { status: 400 });
    }

    // Handle checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Create order and entitlement
      await createOrderAndEntitlement(session);

      // Send access email
      await sendAccessEmail(session);
    }

    return new Response('OK', { status: 200 });
  }
  ```

- [ ] Create order and entitlement on successful payment
- [ ] Send access email with download links
- [ ] Ensure no marketing emails (unless opted in)
- [ ] Create clear refund process

#### Testing Requirements

- [ ] Relief test: Do customers feel relief or anxiety?
- [ ] Clarity test: Are access instructions clear?
- [ ] Support test: Are support requests minimal?

---

### Story 8.10: Refunds & Support Philosophy

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **customer requesting support or refund**,
I want **clear, non-adversarial processes**,
So that **my trust in the purchase is maintained or restored**.

#### Acceptance Criteria

**Given** a customer requests support or refund
**When** they interact with the process
**Then** refunds don't feel adversarial
**And** support interactions increase trust
**And** the process is clear and reasonable

#### Refund Stance

✅ Clear refund policy
✅ Reasonable window
❌ No hostility or suspicion

#### Support Expectations

✅ Clear contact path
✅ Honest response times
✅ Manual intervention allowed

#### Implementation Checklist

- [ ] Create refund policy document

  ```markdown
  # Refund Policy

  ## 14-Day Refund Window

  If you're not satisfied with your purchase, request a refund within 14 days.

  ## Process

  1. Reply to your purchase confirmation email
  2. Or email [support email]
  3. Include your order number
  4. No explanation required

  ## Timeline

  - Refunds processed within 24 hours
  - Funds returned to original payment method
  - Expect 5-7 business days for funds to appear

  ## No Questions Asked

  We won't ask why you're requesting a refund.
  Your satisfaction matters more than the sale.
  ```

- [ ] Add refund policy to resource pages
- [ ] Create support email address
- [ ] Document response time expectations (24-48 hours)
- [ ] Create refund process workflow

  ```typescript
  // lib/refunds.ts
  export async function processRefund(orderId: string) {
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order || !order.stripePaymentIntentId) {
      throw new Error('Order not found or no payment intent');
    }

    // Refund via Stripe
    const refund = await stripe.refunds.create({
      payment_intent: order.stripePaymentIntentId,
    });

    // Update order status
    await db.order.update({
      where: { id: orderId },
      data: { status: 'refunded' },
    });

    // Revoke entitlements
    await db.entitlement.updateMany({
      where: { orderId },
      data: { active: false, revokedAt: new Date() },
    });

    return refund;
  }
  ```

#### Testing Requirements

- [ ] Adversarial test: Do refunds feel hostile?
- [ ] Trust test: Do support interactions increase trust?
- [ ] Clarity test: Is refund process clear?

---

### Story 8.11: Employer Perception Checks (Commerce Audit)

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **quality control mechanism**,
I want **to ensure commerce strengthens employability**,
So that **employers see responsibility, not distraction**.

#### Acceptance Criteria

**Given** the Resources section is complete
**When** employers view it
**Then** they think: "They've handled payments and delivery", "They understand responsibility", "They didn't turn this into a hustle"
**And** they do NOT think: "Are they a creator?", "Is this a distraction?", "Is this a funnel?"
**And** you would happily show this page to a hiring manager
**And** commerce feels like infrastructure, not identity

#### Employer Should Think

✅ "They've handled payments and delivery"
✅ "They understand responsibility"
✅ "They didn't turn this into a hustle"

#### Employer Should NOT Think

❌ "Are they a creator?"
❌ "Is this a distraction?"
❌ "Is this a funnel?"

#### Implementation Checklist

- [ ] Create employer perception checklist

  ```markdown
  # Employer Perception Audit

  ## Pre-launch Review

  - [ ] Would I happily show this page to a hiring manager?
  - [ ] Does commerce feel like infrastructure or identity?
  - [ ] Does anything trigger "creator economy" associations?
  - [ ] Does the page feel like a funnel or a library?

  ## Perception Tests

  Ask 3-5 people with hiring experience:

  1. "What do you think when you see this Resources section?"
  2. Expected: "handled payments", "responsible", "professional"
  3. Red flags: "creator", "distraction", "funnel"

  ## Signal Checks

  - [ ] Commerce is contained (not on homepage)
  - [ ] No hype language anywhere
  - [ ] Pricing is fair and transparent
  - [ ] Products are defensible (based on real experience)
  - [ ] Overall site identity is work/thinking, not selling
  ```

- [ ] Conduct pre-launch employer perception review
- [ ] Test with 3-5 people with hiring experience
- [ ] Remove anything triggering "creator" associations
- [ ] Ensure commerce feels like infrastructure

#### Testing Requirements

- [ ] Hiring manager test: Would you show this to hiring manager?
- [ ] Identity test: Does commerce feel like infrastructure or identity?
- [ ] Creator test: Is there any "creator economy" vibe?

---

### Story 8.12: Governance & Long-Term Discipline

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **portfolio maintainer**,
I want **clear governance to prevent commerce creep**,
So that **integrity is preserved over revenue optimization**.

#### Acceptance Criteria

**Given** the resources section is maintained over time
**When** governance rules are applied
**Then** resource catalogue stays small and high-quality
**And** integrity is preserved over revenue optimization
**And** products are retired when outdated

#### Governance Rules

- Limit number of resources
- Retire outdated products
- Review annually
- Do not add products just because demand exists

#### Implementation Checklist

- [ ] Create commerce governance document

  ```markdown
  # Commerce Governance

  ## Annual Review Process

  Run every 12 months:

  1. **Review all published products**
     - Is this still based on current best practices?
     - Would I still recommend this to a student today?
     - Does this maintain the quality bar?

  2. **Product limits**
     - Maximum 3-5 products total
     - Retire outdated products (set published: false)
     - Don't add products just because demand exists

  3. **Quality bar check**
     - Every product defensible in interview
     - Based on real experience (500+ students)
     - Reflects current standards
     - Fair, transparent pricing

  ## When to Add a Product

  Only add when:

  - [ ] You've created something genuinely useful
  - [ ] It's based on real teaching experience
  - [ ] You'd recommend it without being paid
  - [ ] It solves a specific problem
  - [ ] You can defend quality in detail

  ## When to Retire a Product

  Retire when:

  - Content becomes outdated
  - Quality bar no longer met
  - You wouldn't recommend to family
  - Better alternatives exist

  ## Integrity Over Revenue

  - Protect trust > optimize revenue
  - Small catalogue > large catalogue
  - Quality products > volume
  - Fair pricing > maximum pricing
  ```

- [ ] Set product limit (3-5 max)
- [ ] Create retirement process
- [ ] Set up annual review reminder
- [ ] Document integrity-first decision framework

#### Testing Requirements

- [ ] Limit test: Are there 3-5 products max?
- [ ] Quality test: Does each product meet current bar?
- [ ] Integrity test: Is integrity prioritized over revenue?

---

## Epic Completion Criteria

Epic 8 is considered complete when:

### Content & Structure

- [ ] All 12 stories implemented and tested
- [ ] Resources section feels professional, not sales-driven
- [ ] Commerce is contained (not on homepage/interrupting flows)
- [ ] Each resource has all required sections (What, Who, Covers, Created, Get, Price, CTA)
- [ ] Maximum 3-5 products in catalogue

### Trust & Credibility

- [ ] Every product is defensible in interview
- [ ] Pricing is fair, transparent, no tricks
- [ ] Credibility precedes commerce (proof → resources, not reversed)
- [ ] No testimonials as persuasion, no urgency, no hype

### UX & Visual

- [ ] Buying feels boring and safe (no accent CTAs, no animations, no glass effects)
- [ ] One clear CTA per page
- [ ] Checkout feels Stripe-native
- [ ] Typography consistent with rest of site

### Post-Purchase & Support

- [ ] Immediate confirmation and access
- [ ] Clear refund policy (14-day, no questions)
- [ ] Support interactions increase trust
- [ ] Refund rate <5%

### Employer Perception

- [ ] Would happily show to hiring manager
- [ ] Commerce feels like infrastructure, not identity
- [ ] No "creator economy" associations
- [ ] Employers see responsibility, not distraction

### Governance

- [ ] Product limit enforced (3-5 max)
- [ ] Annual review process documented
- [ ] Integrity prioritized over revenue
- [ ] Outdated products retired

---

## EPIC 8 Deliverables

By the end of EPIC 8, you have:

1. **A resources section that feels professional**
   Educational products presented as natural extension of experience

2. **Commerce that acts as credibility evidence**
   Employers see: "handled payments and delivery responsibly"

3. **Calm, transparent product pages**
   Students can evaluate without feeling sold to

4. **A monetization system that doesn't distort identity**
   Site remains about work/thinking, not selling

---

## Why EPIC 8 Matters

### Most people lose trust the moment they sell

Common failure patterns:

- Turn site into sales funnel
- Use hype and urgency tactics
- Price irresponsibly
- Create products without substance

### Done correctly, this epic ensures the opposite

**Selling becomes proof that you can be trusted with responsibility.**

When employers see:

- Fair, transparent pricing
- Products based on real experience
- Calm, professional presentation
- No hype or manipulation
- Clear refund policy and support

They conclude: **"This person handles responsibility professionally."**

And students conclude: **"This is credible, clear, and safe to buy."**

And you conclude: **"I'm selling without compromising integrity."**

**All three audiences win.**

---

**Epic Status:** Ready for Implementation
**Next Epic:** Epic 9 — Commerce & Payments (Infrastructure)
