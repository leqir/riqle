# riqle atomic design system

> **philosophy:** one change propagates everywhere. heavily modular. korean study room aesthetic baked in.
> **principle:** atoms → molecules → organisms → templates → pages

---

## component hierarchy

### atoms (basic building blocks)

**typography:**

- `<ChalkText>` - hand-drawn font for headings
- `<BodyText>` - apple sf for body content
- `<Micro>` - small annotations, timestamps

**colors:**

- `chalk-white` - primary text
- `chalk-charcoal` - background (dark mode)
- `neon-pink` (#ff2d6a) - urgency, warnings
- `neon-cyan` (#00e5ff) - focus, links
- `neon-purple` (#a855f7) - creativity, ai
- `neon-green` (#4ade80) - success

**buttons:**

- `<ChalkButton>` - hand-drawn border, neon glow on hover
- `<LinkButton>` - minimal link with chalk underline

**inputs:**

- `<ChalkInput>` - text field with chalk styling
- `<ChalkTextarea>` - larger text area
- `<ChalkCheckbox>` - hand-drawn box with tick

**icons (hand-drawn):**

- `<HandDrawnArrowRight>` - wobbly arrow
- `<HandDrawnCheck>` - sketchy checkmark
- `<HandDrawnX>` - crossed lines
- `<HandDrawnPlus>` - wobbly plus
- `<HandDrawnPencil>` - mechanical pencil
- `<HandDrawnCoffee>` - cup with steam
- `<HandDrawnStar>` - achievement, 5-point wobbly
- `<HandDrawnLoader>` - spinning chalk circle

**decorations:**

- `<DeskLampGlow>` - warm vignette effect
- `<CoffeeRing>` - faded circular stain
- `<PencilSketch>` - rotated mechanical pencil
- `<EraserCrumb>` - scattered eraser bits
- `<KoreanAnnotation>` - hangul text (집중, 노력, etc)
- `<ChalkDust>` - particle system

---

### molecules (simple combinations)

**form fields:**

- `<ChalkFormField>` - label + input + error message
- `<ChalkSelect>` - dropdown with chalk styling

**cards:**

- `<ChalkCard>` - base card with imperfections (torn corner, tape, smudge)
- `<CardHeader>` - title + metadata
- `<CardFooter>` - actions

**navigation items:**

- `<NavLink>` - chalk underline on active
- `<NavButton>` - hamburger menu toggle

**content blocks:**

- `<QuoteBlock>` - hand-drawn quotation marks
- `<CodeBlock>` - chalk-bordered code
- `<ImageCaption>` - image + chalk caption

**interactive:**

- `<ChalkToggle>` - on/off switch, chalk aesthetic
- `<ScrollProgress>` - page numbers or tick marks

---

### organisms (complex ui sections)

**navigation:**

- `<SiteHeader>` - logo + nav links + mobile menu
- `<SiteFooter>` - links + metadata + korean timestamp

**hero sections:**

- `<HomeHero>` - name + positioning + proof anchors + ctas
- `<PageHero>` - page title + subtitle + context

**content displays:**

- `<ProjectGrid>` - featured projects with cards
- `<EssayList>` - writing index with excerpts
- `<StartupShowcase>` - startup details with metrics
- `<ProductCatalog>` - resource cards with pricing

**interactive components:**

- `<RelatedContent>` - cross-linked items
- `<TableOfContents>` - essay navigation
- `<ShareButtons>` - screenshot-optimized sharing

---

### templates (page layouts)

**layouts:**

- `<BaseLayout>` - header + main + footer + background effects
- `<ContentLayout>` - single column, reading-optimized
- `<GridLayout>` - multi-column for catalogs

**page-specific templates:**

- `<HomeTemplate>` - hero + featured work + featured writing + subtle resources
- `<ContentIndexTemplate>` - title + filters + grid/list
- `<ContentDetailTemplate>` - breadcrumb + content + related

---

### pages (actual implementations)

**static pages:**

- `/` - home (uses `<HomeTemplate>`)
- `/about` - about (uses `<ContentLayout>`)
- `/work` - work index (uses `<ContentIndexTemplate>`)
- `/writing` - writing index (uses `<ContentIndexTemplate>`)
- `/startups` - startups index (uses `<ContentIndexTemplate>`)
- `/resources` - resources catalog (uses `<ContentIndexTemplate>`)
- `/contact` - contact (uses `<ContentLayout>`)

**dynamic pages:**

- `/writing/[slug]` - essay detail (uses `<ContentDetailTemplate>`)
- `/work/[slug]` - project detail (uses `<ContentDetailTemplate>`)
- `/startups/[slug]` - startup detail (uses `<ContentDetailTemplate>`)
- `/resources/[slug]` - product detail (uses `<ContentDetailTemplate>`)

---

## design tokens (shared across all components)

```typescript
// lib/design-tokens.ts

export const COLORS = {
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
} as const;

export const SPACING = {
  xs: '8px',
  sm: '12px',
  md: '24px',
  lg: '32px',
  xl: '48px',
} as const;

export const TYPOGRAPHY = {
  fonts: {
    chalk: '"Nanum Pen Script", "Comic Sans MS", cursive',
    body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  },
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '20px',
    xl: '28px',
    xxl: '40px',
  },
} as const;

export const ANIMATION = {
  fast: '150ms',
  base: '400ms',
  slow: '800ms',
  contemplative: '1200ms',
} as const;

export const OPACITY = {
  decoration: 0.25,
  korean: 0.3,
  disabled: 0.5,
  hover: 0.4,
  smudge: 0.15,
} as const;
```

---

## component architecture rules

### 1. single source of truth

- all buttons use `<ChalkButton>` or `<LinkButton>`
- all headings use `<ChalkText>` with variant prop
- change one atom → all instances update

### 2. composition over configuration

```tsx
// Good: Composable
<ChalkCard>
  <CardHeader title="project name" />
  <p>description</p>
  <CardFooter>
    <ChalkButton>view project</ChalkButton>
  </CardFooter>
</ChalkCard>

// Avoid: Too many props
<ChalkCard
  title="project name"
  description="..."
  buttonText="view project"
  buttonHref="/work/project"
/>
```

### 3. design tokens everywhere

```tsx
// Good: Uses tokens
<div style={{ padding: SPACING.md, color: COLORS.neon.cyan }}>

// Avoid: Magic numbers
<div style={{ padding: '24px', color: '#00e5ff' }}>
```

### 4. korean aesthetic baked in

- every organism includes subtle decorations
- every page has desk objects, optional korean annotations
- tone is embedded in microcopy

### 5. accessibility first

- all atoms have proper ARIA labels
- keyboard navigation built-in
- color contrast meets WCAG AA
- focus styles visible

---

## file structure

```
src/
├── components/
│   ├── atoms/
│   │   ├── typography/
│   │   │   ├── ChalkText.tsx
│   │   │   ├── BodyText.tsx
│   │   │   └── Micro.tsx
│   │   ├── buttons/
│   │   │   ├── ChalkButton.tsx
│   │   │   └── LinkButton.tsx
│   │   ├── inputs/
│   │   │   ├── ChalkInput.tsx
│   │   │   ├── ChalkTextarea.tsx
│   │   │   └── ChalkCheckbox.tsx
│   │   ├── icons/
│   │   │   ├── HandDrawnArrowRight.tsx
│   │   │   ├── HandDrawnCheck.tsx
│   │   │   ├── HandDrawnPencil.tsx
│   │   │   └── ... (all hand-drawn icons)
│   │   └── decorations/
│   │       ├── DeskLampGlow.tsx
│   │       ├── CoffeeRing.tsx
│   │       ├── PencilSketch.tsx
│   │       ├── KoreanAnnotation.tsx
│   │       └── ChalkDust.tsx
│   ├── molecules/
│   │   ├── ChalkCard.tsx
│   │   ├── ChalkFormField.tsx
│   │   ├── NavLink.tsx
│   │   ├── QuoteBlock.tsx
│   │   ├── CodeBlock.tsx
│   │   └── ChalkToggle.tsx
│   ├── organisms/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── HomeHero.tsx
│   │   ├── PageHero.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── EssayList.tsx
│   │   ├── StartupShowcase.tsx
│   │   ├── ProductCatalog.tsx
│   │   └── RelatedContent.tsx
│   ├── templates/
│   │   ├── BaseLayout.tsx
│   │   ├── ContentLayout.tsx
│   │   ├── GridLayout.tsx
│   │   ├── HomeTemplate.tsx
│   │   ├── ContentIndexTemplate.tsx
│   │   └── ContentDetailTemplate.tsx
│   └── pages/
│       └── (Next.js app directory handles this)
├── lib/
│   ├── design-tokens.ts
│   ├── typography.ts
│   └── animations.ts
└── styles/
    └── globals.css
```

---

## example: building a new page

```tsx
// app/work/page.tsx
import { ContentIndexTemplate } from '@/components/templates/ContentIndexTemplate';
import { ProjectGrid } from '@/components/organisms/ProjectGrid';
import { db } from '@/lib/db';

export default async function WorkPage() {
  const featuredProjects = await db.project.findMany({
    where: { featured: true, status: 'published' },
    orderBy: { order: 'asc' },
    take: 5,
  });

  return (
    <ContentIndexTemplate title="work" subtitle="things built. outcomes measured. proof shown.">
      <ProjectGrid projects={featuredProjects} />
    </ContentIndexTemplate>
  );
}
```

**what happens:**

- `<ContentIndexTemplate>` uses `<BaseLayout>` (header + footer)
- `<BaseLayout>` includes `<DeskLampGlow>` and `<KoreanAnnotation>`
- `<ProjectGrid>` maps projects to `<ChalkCard>` components
- `<ChalkCard>` has random imperfections (torn corner, tape, smudge)
- all typography uses `<ChalkText>` or `<BodyText>` atoms
- all buttons use `<ChalkButton>` atom

**change propagation:**

- edit `<ChalkButton>` border radius → all buttons update
- edit `<ChalkCard>` shadow → all cards update
- edit `COLORS.neon.cyan` → all cyan accents update

---

## korean aesthetic integration

### every organism includes:

- subtle desk objects (pencil sketch, coffee ring)
- optional korean annotations (집중, 노력, 진실, 꿈)
- desk lamp glow effect
- hand-drawn borders/dividers

### example organism with korean aesthetic:

```tsx
// components/organisms/ProjectGrid.tsx
import { ChalkCard } from '@/components/molecules/ChalkCard';
import { PencilSketch } from '@/components/atoms/decorations/PencilSketch';
import { KoreanAnnotation } from '@/components/atoms/decorations/KoreanAnnotation';

export function ProjectGrid({ projects }) {
  return (
    <section className="relative">
      {/* Korean annotation */}
      <KoreanAnnotation text="노력" translation="effort" />

      {/* Desk object decoration */}
      <PencilSketch className="absolute right-8 top-4 rotate-[-12deg]" />

      {/* Grid of project cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ChalkCard key={project.id} variant="torn-corner">
            <h3>{project.title}</h3>
            <p>{project.excerpt}</p>
            <ChalkButton href={`/work/${project.slug}`}>view project</ChalkButton>
          </ChalkCard>
        ))}
      </div>
    </section>
  );
}
```

---

## testing strategy

### atom testing:

- visual regression tests (storybook snapshots)
- accessibility tests (axe-core)
- keyboard navigation tests

### molecule testing:

- composition tests (do atoms combine correctly?)
- interaction tests (hover, focus, active states)

### organism testing:

- integration tests (data flow, api calls)
- responsive tests (mobile, tablet, desktop)

### template testing:

- layout tests (does content fit correctly?)
- progressive disclosure tests (scroll behavior)

### page testing:

- end-to-end tests (full user journeys)
- performance tests (load times, core web vitals)

---

## modular benefits

### 1. consistency

- all buttons look/behave the same
- all cards have same imperfections randomization logic
- all typography respects korean aesthetic

### 2. maintainability

- fix a bug in `<ChalkButton>` → all buttons fixed
- improve `<ChalkCard>` hover effect → all cards improved

### 3. scalability

- new page? use existing organisms
- new section? compose from molecules
- new feature? add atoms, compose up

### 4. testability

- test atoms in isolation
- test molecules with mocked atoms
- test organisms with mocked data

### 5. collaboration

- designers work on atoms/molecules
- developers compose organisms/templates
- content team focuses on pages

---

**last updated:** january 3, 2026
**status:** architecture defined. ready for component implementation.
**principle:** heavily modular. one change propagates everywhere. korean aesthetic baked in.
