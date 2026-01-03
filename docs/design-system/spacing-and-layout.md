# spacing, rhythm and layout: breathing room builds trust

> **principle:** generous white space is not wasted space — it's clarity made visible.

**last updated:** january 3, 2026
**status:** complete
**story:** 2.4 - establish spacing, rhythm and layout system

---

## spacing philosophy

### the problem

most portfolio sites cram content to "show more":

- dense layouts with minimal spacing
- sections bleeding into each other
- inconsistent spacing (arbitrary values)
- text blocks without breathing room
- components packed tightly

this creates **cognitive overload** — the opposite of the 45-second comprehension goal.

### the solution

**generous spacing system:**

- consistent spacing scale (8px base unit)
- vertical rhythm that guides the eye
- section-level spacing that creates clear breaks
- component-level spacing that feels intentional
- responsive spacing that adapts to screen size

### user feeling

when employer sees the layout, they should feel:

- **calm** — not visually overwhelmed
- **focused** — clear visual hierarchy
- **confident** — easy to scan and understand
- **respected** — content given room to breathe

they should NOT feel:

- cramped or claustrophobic
- uncertain where one section ends and another begins
- overwhelmed by dense information
- rushed or pressured

---

## spacing scale

### 8px base unit system

all spacing uses multiples of 8px for visual consistency and easier implementation.

```typescript
// tailwind.config.ts - spacing tokens
spacing: {
  0: '0',
  1: '0.25rem',   // 4px  - tight (list items)
  2: '0.5rem',    // 8px  - xs (icon gaps)
  3: '0.75rem',   // 12px - sm (button padding)
  4: '1rem',      // 16px - md (component padding)
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px - lg (card padding)
  8: '2rem',      // 32px - xl (section spacing)
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px - 2xl (major sections)
  16: '4rem',     // 64px - 3xl (page sections)
  20: '5rem',     // 80px
  24: '6rem',     // 96px - 4xl (hero sections)
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  64: '16rem',    // 256px
}
```

### semantic spacing tokens

```typescript
// lib/design-tokens.ts
export const spacing = {
  // component-level spacing
  component: {
    xs: 'p-3', // 12px - tight padding (badges, pills)
    sm: 'p-4', // 16px - small components (buttons)
    md: 'p-6', // 24px - default component padding (cards)
    lg: 'p-8', // 32px - large components (modals)
    xl: 'p-12', // 48px - extra large (feature sections)
  },

  // vertical spacing between elements
  stack: {
    xs: 'space-y-2', // 8px  - tight lists
    sm: 'space-y-4', // 16px - form fields
    md: 'space-y-6', // 24px - content blocks
    lg: 'space-y-8', // 32px - major sections
    xl: 'space-y-12', // 48px - page sections
    '2xl': 'space-y-16', // 64px - distinct page areas
  },

  // section spacing
  section: {
    sm: 'py-12', // 48px  - minor sections
    md: 'py-16', // 64px  - standard sections
    lg: 'py-24', // 96px  - major sections
    xl: 'py-32', // 128px - hero sections
  },
} as const;
```

---

## vertical rhythm

### the rhythm rule

**vertical spacing should increase as you move down the hierarchy.**

- element spacing (within component): 8-16px
- component spacing (within section): 24-32px
- section spacing (within page): 48-96px
- page spacing (between major areas): 96-128px

this creates natural visual grouping and hierarchy.

```tsx
// ✅ correct: increasing rhythm
<section className="py-24">  {/* section spacing: 96px */}
  <div className="space-y-12">  {/* major blocks: 48px */}
    <div className="space-y-6">  {/* content blocks: 24px */}
      <Heading>title</Heading>
      <p className="mt-4">  {/* element spacing: 16px */}
        paragraph text
      </p>
    </div>
  </div>
</section>

// ❌ incorrect: inconsistent rhythm
<section className="py-4">  {/* too tight for section */}
  <div className="space-y-2">  {/* too tight for blocks */}
    <Heading>title</Heading>
    <p className="mt-8">  {/* arbitrary, breaks rhythm */}
      paragraph text
    </p>
  </div>
</section>
```

---

### vertical rhythm patterns

#### heading + paragraph

```tsx
<div className="space-y-4">
  <Heading level="h2">section title</Heading>
  <p className="text-body text-stone-600">paragraph directly following heading gets 16px spacing</p>
</div>
```

#### paragraph + paragraph

```tsx
<div className="space-y-6">
  <p className="text-body">first paragraph</p>
  <p className="text-body">second paragraph gets 24px spacing</p>
</div>
```

#### list items

```tsx
<ul className="space-y-3">
  <li>list item with 12px spacing</li>
  <li>tight enough to feel grouped</li>
  <li>loose enough to scan easily</li>
</ul>
```

#### cards in grid

```tsx
<div className="grid grid-cols-2 gap-8">
  <Card>project 1</Card>
  <Card>project 2 - 32px gap feels generous</Card>
</div>
```

---

## layout system

### container widths

**max-width constraints prevent line-length issues and maintain focus.**

```typescript
// tailwind.config.ts
maxWidth: {
  'prose': '65ch',      // optimal reading (45-75 characters)
  'content': '72rem',   // 1152px - main content area
  'wide': '90rem',      // 1440px - wide content (grids)
  'full': '100%',       // full-bleed sections
}
```

#### usage guidelines

```tsx
// ✅ text content: prose width
<div className="max-w-prose mx-auto">
  <article>
    <p>long-form text constrained to 65 characters for optimal readability</p>
  </article>
</div>

// ✅ standard layout: content width
<div className="max-w-content mx-auto px-6">
  <section>standard page content</section>
</div>

// ✅ grid layouts: wide width
<div className="max-w-wide mx-auto px-6">
  <div className="grid grid-cols-3 gap-8">
    <Card>project 1</Card>
    <Card>project 2</Card>
    <Card>project 3</Card>
  </div>
</div>

// ✅ hero sections: full-bleed
<section className="w-full bg-stone-50">
  <div className="max-w-content mx-auto px-6 py-24">
    <h1>hero content constrained inside full-bleed section</h1>
  </div>
</section>
```

---

### horizontal spacing (padding)

**consistent horizontal padding creates alignment and breathing room.**

```typescript
// page-level horizontal padding
const pagePadding = {
  mobile: 'px-4',   // 16px - tight on mobile
  tablet: 'px-6',   // 24px - medium on tablet
  desktop: 'px-8',  // 32px - generous on desktop
};

// responsive padding
<div className="px-4 md:px-6 lg:px-8">
  content with responsive horizontal padding
</div>
```

---

### grid system

**12-column grid for flexible layouts.**

```tsx
// components/layout/Grid.tsx
export function Grid({ cols = 1, gap = 'md', children }: GridProps) {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapMap = {
    sm: 'gap-4', // 16px
    md: 'gap-6', // 24px
    lg: 'gap-8', // 32px
    xl: 'gap-12', // 48px
  };

  return <div className={`grid ${colsMap[cols]} ${gapMap[gap]}`}>{children}</div>;
}
```

#### grid usage patterns

```tsx
// ✅ project cards: 3-column grid
<Grid cols={3} gap="lg">
  <ProjectCard project={project1} />
  <ProjectCard project={project2} />
  <ProjectCard project={project3} />
</Grid>

// ✅ two-column layout: 2-column grid
<Grid cols={2} gap="md">
  <div>left column</div>
  <div>right column</div>
</Grid>

// ✅ asymmetric grid: manual grid
<div className="grid grid-cols-12 gap-8">
  <div className="col-span-12 lg:col-span-8">
    {/* main content: 8 columns on desktop */}
  </div>
  <div className="col-span-12 lg:col-span-4">
    {/* sidebar: 4 columns on desktop */}
  </div>
</div>
```

---

### breakpoints

**mobile-first breakpoints aligned with common devices.**

```typescript
// tailwind.config.ts
screens: {
  sm: '640px',   // large mobile
  md: '768px',   // tablet
  lg: '1024px',  // laptop
  xl: '1280px',  // desktop
  '2xl': '1536px', // large desktop
}
```

#### responsive spacing strategy

```tsx
// scale spacing up as screen size increases
<section className="py-12 md:py-16 lg:py-24">
  <div className="space-y-6 md:space-y-8 lg:space-y-12">
    <Heading>responsive vertical rhythm</Heading>
    <p>spacing increases on larger screens</p>
  </div>
</section>
```

---

## layout primitives

### Stack (vertical spacing utility)

```tsx
// components/layout/Stack.tsx
interface StackProps {
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  children: React.ReactNode;
}

export function Stack({ gap = 'md', children }: StackProps) {
  const gapMap = {
    xs: 'space-y-2', // 8px
    sm: 'space-y-4', // 16px
    md: 'space-y-6', // 24px
    lg: 'space-y-8', // 32px
    xl: 'space-y-12', // 48px
    '2xl': 'space-y-16', // 64px
  };

  return <div className={gapMap[gap]}>{children}</div>;
}
```

#### Stack usage

```tsx
// ✅ vertical content flow
<Stack gap="lg">
  <Heading>projects</Heading>
  <p>featured work from the last 3 years</p>
  <Grid cols={3} gap="lg">
    <ProjectCard project={p1} />
    <ProjectCard project={p2} />
    <ProjectCard project={p3} />
  </Grid>
</Stack>
```

---

### Container (max-width + centering)

```tsx
// components/layout/Container.tsx
interface ContainerProps {
  size?: 'prose' | 'content' | 'wide' | 'full';
  padding?: boolean;
  children: React.ReactNode;
}

export function Container({ size = 'content', padding = true, children }: ContainerProps) {
  const sizeMap = {
    prose: 'max-w-prose',
    content: 'max-w-content',
    wide: 'max-w-wide',
    full: 'max-w-full',
  };

  const paddingClass = padding ? 'px-4 md:px-6 lg:px-8' : '';

  return <div className={`${sizeMap[size]} mx-auto ${paddingClass}`}>{children}</div>;
}
```

#### Container usage

```tsx
// ✅ standard page layout
<Container size="content">
  <Stack gap="xl">
    <Heading level="h1">about</Heading>
    <p>content constrained to readable width</p>
  </Stack>
</Container>

// ✅ full-bleed section with constrained content
<section className="w-full bg-stone-50 py-24">
  <Container size="wide">
    <Grid cols={3} gap="lg">
      <Card>feature 1</Card>
      <Card>feature 2</Card>
      <Card>feature 3</Card>
    </Grid>
  </Container>
</section>
```

---

### Section (semantic layout wrapper)

```tsx
// components/layout/Section.tsx
interface SectionProps {
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'subtle';
  children: React.ReactNode;
}

export function Section({ spacing = 'md', background = 'default', children }: SectionProps) {
  const spacingMap = {
    sm: 'py-12', // 48px
    md: 'py-16', // 64px
    lg: 'py-24', // 96px
    xl: 'py-32', // 128px
  };

  const bgMap = {
    default: 'bg-white',
    subtle: 'bg-stone-50',
  };

  return (
    <section className={`${spacingMap[spacing]} ${bgMap[background]}`}>
      <Container>{children}</Container>
    </section>
  );
}
```

#### Section usage

```tsx
// ✅ standard page sections
<>
  <Section spacing="xl" background="subtle">
    <Stack gap="lg">
      <Heading level="h1">hero section</Heading>
      <p>large vertical spacing (128px)</p>
    </Stack>
  </Section>

  <Section spacing="lg">
    <Stack gap="xl">
      <Heading level="h2">featured work</Heading>
      <Grid cols={3} gap="lg">
        <ProjectCard project={p1} />
        <ProjectCard project={p2} />
        <ProjectCard project={p3} />
      </Grid>
    </Stack>
  </Section>

  <Section spacing="md" background="subtle">
    <p>smaller section with subtle background</p>
  </Section>
</>
```

---

## spacing rules

### rule 1: use spacing scale only

**never use arbitrary spacing values — always use the spacing scale.**

```tsx
// ✅ correct: spacing scale
<div className="mt-8 mb-12">
  uses scale: 32px, 48px
</div>

// ❌ incorrect: arbitrary values
<div className="mt-[37px] mb-[52px]">
  arbitrary values break consistency
</div>
```

---

### rule 2: generous spacing by default

**when in doubt, use more spacing rather than less.**

the visual north star emphasizes "generous white space" — err on the side of breathing room.

```tsx
// ✅ correct: generous spacing
<Stack gap="lg">
  <Heading>title</Heading>
  <p>paragraph with 32px spacing feels calm</p>
</Stack>

// ❌ incorrect: cramped spacing
<Stack gap="xs">
  <Heading>title</Heading>
  <p>paragraph with 8px spacing feels rushed</p>
</Stack>
```

---

### rule 3: consistent rhythm within context

**all elements in the same context should use the same spacing.**

```tsx
// ✅ correct: consistent card grid
<Grid cols={3} gap="lg">
  <Card>all cards</Card>
  <Card>have same</Card>
  <Card>32px gap</Card>
</Grid>

// ❌ incorrect: inconsistent gaps
<div className="grid grid-cols-3">
  <div className="mr-4"><Card>16px gap</Card></div>
  <div className="mr-8"><Card>32px gap</Card></div>
  <div><Card>no gap</Card></div>
</div>
```

---

### rule 4: increase spacing as hierarchy increases

**section-level spacing > component spacing > element spacing.**

```tsx
// ✅ correct: increasing spacing
<section className="py-24">        {/* 96px - section */}
  <Stack gap="xl">                 {/* 48px - major blocks */}
    <div className="space-y-6">    {/* 24px - content blocks */}
      <Heading>title</Heading>
      <p className="mt-4">text</p>  {/* 16px - elements */}
    </div>
  </Stack>
</section>

// ❌ incorrect: inverted hierarchy
<section className="py-4">         {/* 16px - too tight */}
  <Stack gap="xs">                 {/* 8px - too tight */}
    <div className="space-y-12">   {/* 48px - too loose */}
      <Heading>title</Heading>
      <p className="mt-2">text</p>  {/* 8px - too tight */}
    </div>
  </Stack>
</section>
```

---

### rule 5: respect reading line length

**text content should never exceed 75 characters per line.**

```tsx
// ✅ correct: constrained line length
<Container size="prose">
  <p>
    text constrained to 65 characters per line for optimal readability
  </p>
</Container>

// ❌ incorrect: unconstrained text
<div className="w-full">
  <p>
    this text can stretch to 150+ characters on wide screens, making it very difficult to read and scan efficiently because the eye has to travel too far horizontally
  </p>
</div>
```

---

### rule 6: mobile spacing scales down

**reduce spacing on mobile to avoid excessive scrolling.**

```tsx
// ✅ correct: responsive spacing
<section className="py-12 md:py-16 lg:py-24">
  <Stack gap="md lg:gap-xl">
    <Heading>responsive rhythm</Heading>
    <p>48px mobile → 96px desktop</p>
  </Stack>
</section>

// ❌ incorrect: fixed large spacing
<section className="py-32">
  <Stack gap="2xl">
    <Heading>too much spacing on mobile</Heading>
    <p>forces excessive scrolling</p>
  </Stack>
</section>
```

---

### rule 7: use layout primitives

**prefer Stack, Grid, Container, Section over manual spacing classes.**

```tsx
// ✅ correct: layout primitives
<Section spacing="lg">
  <Stack gap="xl">
    <Heading>title</Heading>
    <Grid cols={3} gap="lg">
      <Card>1</Card>
      <Card>2</Card>
      <Card>3</Card>
    </Grid>
  </Stack>
</Section>

// ❌ incorrect: manual spacing classes
<div className="py-24">
  <div className="max-w-content mx-auto px-6">
    <div className="space-y-12">
      <h2>title</h2>
      <div className="grid grid-cols-3 gap-8">
        <Card>1</Card>
        <Card>2</Card>
        <Card>3</Card>
      </div>
    </div>
  </div>
</div>
```

---

### rule 8: negative margin is a code smell

**avoid negative margins — they often indicate layout problems.**

```tsx
// ✅ correct: proper spacing
<Stack gap="lg">
  <Heading>title</Heading>
  <p>no negative margins needed</p>
</Stack>

// ❌ incorrect: negative margin hack
<div>
  <Heading>title</Heading>
  <p className="-mt-4">
    negative margin to "fix" spacing
  </p>
</div>
```

---

## page layout patterns

### standard page layout

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <>
      {/* hero section */}
      <Section spacing="xl" background="subtle">
        <Stack gap="lg">
          <Heading level="h1">about</Heading>
          <p className="text-h3 text-stone-600">brief intro paragraph</p>
        </Stack>
      </Section>

      {/* content section */}
      <Section spacing="lg">
        <Container size="prose">
          <Stack gap="md">
            <p>long-form content constrained to prose width</p>
            <p>generous spacing between paragraphs</p>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
```

---

### index page layout (work, writing, etc.)

```tsx
// app/work/page.tsx
export default function WorkPage() {
  return (
    <>
      {/* page header */}
      <Section spacing="lg">
        <Stack gap="md">
          <Heading level="h1">work</Heading>
          <p className="text-body text-stone-600">selected projects from the last 3 years</p>
        </Stack>
      </Section>

      {/* featured projects */}
      <Section spacing="lg" background="subtle">
        <Stack gap="xl">
          <Heading level="h2">featured</Heading>
          <Grid cols={2} gap="lg">
            <ProjectCard project={featured1} />
            <ProjectCard project={featured2} />
          </Grid>
        </Stack>
      </Section>

      {/* all projects */}
      <Section spacing="lg">
        <Stack gap="xl">
          <Heading level="h2">all projects</Heading>
          <Grid cols={3} gap="lg">
            <ProjectCard project={p1} />
            <ProjectCard project={p2} />
            <ProjectCard project={p3} />
          </Grid>
        </Stack>
      </Section>
    </>
  );
}
```

---

### detail page layout (project, essay, etc.)

```tsx
// app/work/[slug]/page.tsx
export default function ProjectPage({ params }: { params: { slug: string } }) {
  return (
    <>
      {/* hero */}
      <Section spacing="xl">
        <Stack gap="lg">
          <Heading level="h1">{project.title}</Heading>
          <Meta>
            {project.year} · {project.role}
          </Meta>
          <p className="text-h3 text-stone-600">{project.summary}</p>
        </Stack>
      </Section>

      {/* content */}
      <Section spacing="lg">
        <Container size="prose">
          <Stack gap="xl">
            <div>
              <Heading level="h2">overview</Heading>
              <Stack gap="md">
                <p>{project.content}</p>
              </Stack>
            </div>

            <div>
              <Heading level="h2">outcome</Heading>
              <Stack gap="md">
                <p>{project.outcome}</p>
              </Stack>
            </div>
          </Stack>
        </Container>
      </Section>

      {/* related projects */}
      <Section spacing="lg" background="subtle">
        <Stack gap="xl">
          <Heading level="h2">related projects</Heading>
          <Grid cols={3} gap="lg">
            <ProjectCard project={related1} />
            <ProjectCard project={related2} />
            <ProjectCard project={related3} />
          </Grid>
        </Stack>
      </Section>
    </>
  );
}
```

---

## responsive spacing

### mobile-first strategy

**start with tight spacing, scale up for larger screens.**

```tsx
// ✅ correct: mobile-first responsive spacing
<section className="py-12 md:py-16 lg:py-24">
  {/* 48px → 64px → 96px */}
  <div className="space-y-6 md:space-y-8 lg:space-y-12">
    {/* 24px → 32px → 48px */}
    <Heading>responsive rhythm</Heading>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12">
      {/* 1 col → 2 cols → 3 cols, 24px → 32px → 48px gap */}
    </div>
  </div>
</section>
```

---

### breakpoint-specific spacing

```tsx
// mobile: tight spacing (limited screen space)
<div className="px-4 py-12">
  <Stack gap="md">
    <Heading>mobile layout</Heading>
    <p>moderate spacing</p>
  </Stack>
</div>

// tablet: medium spacing
<div className="md:px-6 md:py-16">
  <Stack gap="lg md:gap-xl">
    <Heading>tablet layout</Heading>
    <p>increased spacing</p>
  </Stack>
</div>

// desktop: generous spacing
<div className="lg:px-8 lg:py-24">
  <Stack gap="xl lg:gap-2xl">
    <Heading>desktop layout</Heading>
    <p>generous spacing</p>
  </Stack>
</div>
```

---

## anti-patterns (banned)

### ❌ arbitrary spacing values

```tsx
// ❌ DO NOT: arbitrary spacing
<div className="mt-[23px] mb-[47px]">
  breaks spacing scale
</div>

// ✅ DO: spacing scale
<div className="mt-6 mb-12">
  uses scale: 24px, 48px
</div>
```

---

### ❌ inconsistent spacing

```tsx
// ❌ DO NOT: inconsistent gaps
<div className="grid grid-cols-3">
  <div className="mr-4"><Card /></div>
  <div className="mr-8"><Card /></div>
  <div><Card /></div>
</div>

// ✅ DO: consistent gaps
<Grid cols={3} gap="lg">
  <Card />
  <Card />
  <Card />
</Grid>
```

---

### ❌ cramped layouts

```tsx
// ❌ DO NOT: cramped spacing
<div className="py-2">
  <div className="space-y-1">
    <Heading>title</Heading>
    <p>text too close to heading</p>
  </div>
</div>

// ✅ DO: generous spacing
<Section spacing="lg">
  <Stack gap="lg">
    <Heading>title</Heading>
    <p>text has breathing room</p>
  </Stack>
</Section>
```

---

### ❌ unconstrained line length

```tsx
// ❌ DO NOT: text across full width
<div className="w-full">
  <p>this text stretches across the entire screen width making it very difficult to read because the eye has to travel too far horizontally and loses its place when returning to the next line</p>
</div>

// ✅ DO: constrained line length
<Container size="prose">
  <p>text constrained to 65 characters for optimal readability</p>
</Container>
```

---

### ❌ negative margins

```tsx
// ❌ DO NOT: negative margin hacks
<div>
  <Heading>title</Heading>
  <p className="-mt-4">pulled up with negative margin</p>
</div>

// ✅ DO: proper spacing
<Stack gap="md">
  <Heading>title</Heading>
  <p>natural spacing without hacks</p>
</Stack>
```

---

### ❌ manual spacing everywhere

```tsx
// ❌ DO NOT: manual spacing classes
<div className="py-24">
  <div className="max-w-content mx-auto px-6">
    <div className="space-y-12">
      <h2>title</h2>
      <div className="grid grid-cols-3 gap-8">
        <Card>1</Card>
      </div>
    </div>
  </div>
</div>

// ✅ DO: layout primitives
<Section spacing="lg">
  <Stack gap="xl">
    <Heading>title</Heading>
    <Grid cols={3} gap="lg">
      <Card>1</Card>
    </Grid>
  </Stack>
</Section>
```

---

## alignment with visual north star

the spacing and layout system supports the visual north star principles:

**visual north star: calm in first 30 seconds**
→ **spacing system: generous white space, clear visual breaks**
✅ breathing room reduces cognitive load

**visual north star: restraint and discipline**
→ **spacing system: 8px base unit, consistent scale**
✅ systematic spacing enforces discipline

**visual north star: quietly premium**
→ **spacing system: generous spacing (not cramped)**
✅ breathing room feels premium

**visual north star: precise and intentional**
→ **spacing system: layout primitives, semantic tokens**
✅ every spacing value has purpose

**visual north star: apple internal tool aesthetic**
→ **spacing system: generous margins, consistent rhythm**
✅ matches apple's spacious design language

---

## testing checklist

before shipping spacing/layout changes:

- [ ] all spacing uses the spacing scale (no arbitrary values)
- [ ] vertical rhythm increases as hierarchy increases
- [ ] text content constrained to max 75 characters per line
- [ ] consistent spacing within same context (e.g., all cards in grid)
- [ ] generous spacing by default (not cramped)
- [ ] responsive spacing scales appropriately (mobile → desktop)
- [ ] layout primitives used (Stack, Grid, Container, Section)
- [ ] no negative margins
- [ ] section spacing clearly separates page areas
- [ ] mobile spacing prevents excessive scrolling

---

## measuring success

spacing and layout system is successful when:

### qualitative measures

- [ ] employers describe site as "clean" or "calm"
- [ ] designers can justify every spacing value against scale
- [ ] no arbitrary spacing values in codebase
- [ ] layout primitives used consistently across pages
- [ ] visual hierarchy obvious through spacing alone

### quantitative measures

- [ ] 100% spacing values from scale (0 arbitrary values)
- [ ] text line length ≤ 75 characters (prose width)
- [ ] section spacing ≥ 48px (minimum visual break)
- [ ] 0 negative margins in production code
- [ ] layout primitive usage > 80% (vs manual spacing)

---

**last updated:** january 3, 2026
**status:** complete
**principle:** generous white space is not wasted space — it's clarity made visible.
