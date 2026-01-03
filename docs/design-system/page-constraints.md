# page-specific design constraints: clear patterns for every page type

> **principle:** each page type has specific purpose and constraints — consistency enables familiarity, constraints enable focus.

**last updated:** january 3, 2026
**status:** complete
**story:** 2.11 - document page-specific design constraints

---

## page constraint philosophy

### the problem

most portfolio sites lack consistency:

- every page uses different layout patterns
- no clear visual hierarchy across pages
- homepage overwhelming, other pages bare
- mixing visual styles across pages

this creates **cognitive load** — employers waste time adapting to each page's unique structure.

### the solution

**consistent page patterns with specific constraints:**

- each page type has defined purpose and structure
- layout templates reused across similar pages
- visual hierarchy consistent across all pages
- constraints matched to page goals

### employer benefit

when pages follow consistent patterns:

- **instant recognition** — know what to expect on each page
- **faster comprehension** — familiar structure reduces cognitive load
- **clear navigation** — understand where they are and where to go
- **focused content** — constraints prevent overwhelm

---

## universal page constraints

### constraints that apply to ALL pages:

#### 1. header (site navigation)

```tsx
<SiteHeader>
  {/* always present at top */}
  {/* sticky on scroll (with glass background) */}
  {/* navigation: logo + work/writing/about/contact */}
  {/* desktop: horizontal, mobile: hamburger */}
</SiteHeader>
```

**requirements:**

- visible on all pages
- sticky (stays at top on scroll)
- glass background on scroll
- same structure across all pages

---

#### 2. page structure

```tsx
<>
  <SiteHeader />
  <main>
    {/* page-specific content */}
    {/* always uses Container for max-width */}
    {/* always uses Section for vertical rhythm */}
  </main>
  <SiteFooter />
</>
```

**requirements:**

- semantic `<main>` tag
- Container for max-width control
- Section for consistent spacing
- Footer always at bottom

---

#### 3. spacing rhythm

**all pages follow vertical rhythm:**

- hero section: `py-24` (96px)
- major sections: `py-16` (64px)
- minor sections: `py-12` (48px)
- section breaks: `space-y-16` (64px)

---

#### 4. typography hierarchy

**all pages use same heading structure:**

- h1: page title (one per page)
- h2: section titles
- h3: subsection titles
- body: 16px minimum

---

## homepage constraints

### purpose

**introduce identity, show best proof, direct to next action — all in 30-45 seconds.**

### structure

```tsx
<>
  {/* hero section */}
  <Section spacing="xl" background="subtle">
    <Stack gap="lg">
      <h1 className="text-display">nathanael</h1>
      <p className="text-h3 text-stone-600">
        i build <HandDrawnUnderline>data-heavy tools</HandDrawnUnderline> for technical users
      </p>
      <div className="flex items-center gap-4">
        <HandDrawnArrow direction="right" />
        <Link href="/work" variant="standalone">
          view projects
        </Link>
      </div>
    </Stack>
  </Section>

  {/* featured work (1-2 projects max) */}
  <Section spacing="lg">
    <Stack gap="xl">
      <Heading level="h2">featured work</Heading>
      <Grid cols={2} gap="lg">
        <ProjectCard project={featured1} />
        <ProjectCard project={featured2} />
      </Grid>
      <Link href="/work">view all projects →</Link>
    </Stack>
  </Section>

  {/* featured writing (1 essay max) */}
  <Section spacing="lg" background="subtle">
    <Stack gap="xl">
      <Heading level="h2">recent writing</Heading>
      <EssayCard essay={featured} />
      <Link href="/writing">view all essays →</Link>
    </Stack>
  </Section>

  {/* about tease (optional) */}
  <Section spacing="md">
    <Stack gap="md">
      <p className="text-h3">...</p>
      <Link href="/about">more about me →</Link>
    </Stack>
  </Section>
</>
```

### constraints

- **hero section:**
  - one h1 (name)
  - one-sentence positioning statement
  - max one hand-drawn element (arrow or underline)
  - clear CTA to primary work

- **featured content:**
  - work: 1-2 projects max
  - writing: 1 essay max
  - no startups on homepage (too noisy)

- **total items above fold:**
  - ≤ 10 items visible (progressive disclosure rule)

- **no banned elements:**
  - no carousels
  - no auto-play
  - no parallax
  - no dramatic hero animations

---

## about page constraints

### purpose

**build trust through narrative — who you are, what you've done, what you value.**

### structure

```tsx
<>
  {/* hero intro */}
  <Section spacing="xl">
    <Container size="prose">
      <Stack gap="lg">
        <h1 className="text-display">about</h1>
        <p className="text-h3 text-stone-600">brief intro paragraph (2-3 sentences)</p>
      </Stack>
    </Container>
  </Section>

  {/* narrative content */}
  <Section spacing="lg">
    <Container size="prose">
      <Stack gap="xl">
        <div>
          <Heading level="h2">background</Heading>
          <Stack gap="md">
            <p>narrative paragraphs...</p>
            <p>focused on relevant experience...</p>
          </Stack>
        </div>

        <Divider spacing="lg" />

        <div>
          <Heading level="h2">approach</Heading>
          <Stack gap="md">
            <p>how you work...</p>
          </Stack>
        </div>

        <Divider spacing="lg" />

        <div>
          <Heading level="h2">now</Heading>
          <Stack gap="md">
            <p>current focus...</p>
          </Stack>
        </div>
      </Stack>
    </Container>
  </Section>

  {/* contact CTA */}
  <Section spacing="md" background="subtle">
    <Container size="content">
      <div className="flex items-center justify-between">
        <p className="text-h3">interested in working together?</p>
        <Button href="/contact" variant="primary">
          send message
        </Button>
      </div>
    </Container>
  </Section>
</>
```

### constraints

- **content width:**
  - prose max-width (65ch) for readability
  - narrative-focused, not list-focused

- **sections:**
  - 3-5 sections max
  - dividers between major sections
  - logical progression (past → present → future)

- **tone:**
  - first-person narrative
  - factual, not motivational
  - specific examples, not vague claims

- **visual elements:**
  - minimal hand-drawn elements
  - no decorative photos/illustrations
  - focus on text and structure

---

## work index page constraints

### purpose

**showcase projects, enable quick evaluation, guide to detail pages.**

### structure

```tsx
<>
  {/* page header */}
  <Section spacing="lg">
    <Stack gap="md">
      <h1 className="text-display">work</h1>
      <p className="text-body text-stone-600">projects from the last 3 years (most recent first)</p>
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
        {/* ... */}
      </Grid>
    </Stack>
  </Section>
</>
```

### constraints

- **grid layout:**
  - featured: 2 columns
  - all projects: 3 columns
  - mobile: 1 column

- **card content:**
  - project title
  - brief description (2-3 sentences max)
  - year + role
  - tags (3-5 max)
  - "view project →" link

- **ordering:**
  - featured first (manual selection)
  - then reverse chronological
  - no algorithmic ranking

- **filtering:**
  - no filters on index page (simplicity)
  - consider adding later if > 20 projects

---

## work detail page constraints

### purpose

**deep-dive into single project — context, approach, outcome, proof.**

### structure

```tsx
<>
  {/* project hero */}
  <Section spacing="xl">
    <Container size="content">
      <Stack gap="lg">
        <div className="flex items-baseline gap-4">
          <Heading level="h1">{project.title}</Heading>
          <Meta>
            {project.year} · {project.role}
          </Meta>
        </div>
        <p className="text-h3 text-stone-600">{project.summary}</p>
        {project.liveUrl && (
          <div>
            <Link href={project.liveUrl} external variant="standalone">
              visit live site ↗
            </Link>
          </div>
        )}
      </Stack>
    </Container>
  </Section>

  {/* project content */}
  <Section spacing="lg">
    <Container size="prose">
      <Stack gap="xl">
        <div>
          <Heading level="h2">context</Heading>
          <Stack gap="md">
            <p>what was the problem...</p>
          </Stack>
        </div>

        <div>
          <Heading level="h2">approach</Heading>
          <Stack gap="md">
            <p>how did you solve it...</p>
          </Stack>
        </div>

        <div>
          <Heading level="h2">outcome</Heading>
          <Stack gap="md">
            <p>what was the result...</p>
          </Stack>
        </div>
      </Stack>
    </Container>
  </Section>

  {/* related projects */}
  <Section spacing="lg" background="subtle">
    <Container size="wide">
      <Stack gap="xl">
        <Heading level="h2">related projects</Heading>
        <Grid cols={3} gap="lg">
          <ProjectCard project={related1} />
          <ProjectCard project={related2} />
          <ProjectCard project={related3} />
        </Grid>
      </Stack>
    </Container>
  </Section>
</>
```

### constraints

- **content structure:**
  - context → approach → outcome (logical flow)
  - prose width for readability
  - clear section breaks

- **proof elements:**
  - screenshots (if applicable)
  - metrics (if available)
  - testimonials (if available)
  - live links (if public)

- **related content:**
  - 3 related projects max
  - or related essays
  - at bottom of page

---

## writing index page constraints

### purpose

**showcase essays, enable topic discovery, guide to detail pages.**

### structure

```tsx
<>
  {/* page header */}
  <Section spacing="lg">
    <Stack gap="md">
      <h1 className="text-display">writing</h1>
      <p className="text-body text-stone-600">essays on software, product, and systems thinking</p>
    </Stack>
  </Section>

  {/* featured essays */}
  <Section spacing="lg" background="subtle">
    <Stack gap="xl">
      <Heading level="h2">featured</Heading>
      <Stack gap="lg">
        <EssayCard essay={featured1} featured />
      </Stack>
    </Stack>
  </Section>

  {/* all essays */}
  <Section spacing="lg">
    <Stack gap="xl">
      <Heading level="h2">all essays</Heading>
      <Stack gap="lg">
        <EssayCard essay={e1} />
        <EssayCard essay={e2} />
        {/* list, not grid (easier scanning) */}
      </Stack>
    </Stack>
  </Section>
</>
```

### constraints

- **layout:**
  - list layout (not grid) for essays
  - easier to scan titles/summaries

- **card content:**
  - essay title
  - summary (1-2 sentences)
  - date + read time
  - tags (3-5 max)
  - "read essay →" link

- **ordering:**
  - featured first
  - then reverse chronological
  - no algorithmic ranking

---

## writing detail page constraints

### purpose

**long-form content, optimized for reading.**

### structure

```tsx
<>
  {/* essay header */}
  <Section spacing="xl">
    <Container size="prose">
      <Stack gap="md">
        <Heading level="h1">{essay.title}</Heading>
        <Meta>
          {essay.date} · {essay.readTime} min read
        </Meta>
        <p className="text-h3 text-stone-600">{essay.summary}</p>
      </Stack>
    </Container>
  </Section>

  {/* essay content */}
  <Section spacing="lg">
    <Container size="prose">
      <article className="prose prose-stone max-w-none">
        {/* markdown content */}
        {essay.content}
      </article>
    </Container>
  </Section>

  {/* related content */}
  <Section spacing="lg" background="subtle">
    <Container size="wide">
      <Stack gap="xl">
        <Heading level="h2">related</Heading>
        <Grid cols={3} gap="lg">
          <ProjectCard project={relatedProject} />
          <EssayCard essay={relatedEssay} />
        </Grid>
      </Stack>
    </Container>
  </Section>
</>
```

### constraints

- **content width:**
  - prose max-width (65ch) for reading
  - never full-width text

- **typography:**
  - 16px body minimum
  - 1.7 line height
  - generous paragraph spacing

- **markdown styles:**
  - @tailwindcss/typography plugin
  - stone color scheme
  - no decorative blockquotes
  - code blocks: syntax highlighting

- **related content:**
  - related projects (if mentioned)
  - related essays (same topic)
  - 3 items max

---

## contact page constraints

### purpose

**make it easy to reach out, remove friction.**

### structure

```tsx
<>
  {/* contact intro */}
  <Section spacing="xl">
    <Container size="prose">
      <Stack gap="lg">
        <h1 className="text-display">contact</h1>
        <p className="text-h3 text-stone-600">interested in working together? send a message.</p>
      </Stack>
    </Container>
  </Section>

  {/* contact form */}
  <Section spacing="lg">
    <Container size="prose">
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          <Input type="text" label="name" id="name" required />
          <Input type="email" label="email" id="email" required />
          <Input type="textarea" label="message" id="message" required />
          <div className="flex gap-4">
            <Button type="submit" variant="primary">
              send message
            </Button>
          </div>
        </Stack>
      </form>
    </Container>
  </Section>
</>
```

### constraints

- **form fields:**
  - name, email, message (minimal)
  - no unnecessary fields
  - clear validation errors

- **submission:**
  - clear success message
  - clear error handling
  - no loading spinners (instant if possible)

- **alternative contact:**
  - email link visible
  - no phone number (async preferred)
  - no social links (focus on direct contact)

---

## 404 page constraints

### purpose

**acknowledge error, guide back to useful content.**

### structure

```tsx
<Section spacing="xl">
  <Container size="prose">
    <Stack gap="lg">
      <Heading level="h1">404</Heading>
      <p className="text-h3 text-stone-600">this page doesn't exist.</p>
      <div className="flex gap-4">
        <Link href="/" variant="standalone">
          back to home
        </Link>
        <Link href="/work" variant="standalone">
          view projects
        </Link>
      </div>
    </Stack>
  </Container>
</Section>
```

### constraints

- **tone:**
  - factual, not cute
  - no "oops!" or whimsical messaging

- **navigation:**
  - 2-3 helpful links
  - back to home
  - or to main sections

---

## responsive design constraints

### breakpoints

**all pages follow mobile-first responsive strategy.**

| breakpoint            | layout changes                      |
| --------------------- | ----------------------------------- |
| < 640px (mobile)      | 1 column, stacked, hamburger nav    |
| 640px-1024px (tablet) | 2 columns for grids                 |
| 1024px+ (desktop)     | 3 columns for grids, horizontal nav |

### mobile-specific constraints

- **spacing reduced:**
  - section padding: `py-12` (instead of `py-24`)
  - stack gap: `gap-md` (instead of `gap-xl`)

- **grid collapses:**
  - 3-col grid → 1 col
  - 2-col grid → 1 col

- **glass effects:**
  - disabled on mobile (performance)
  - solid backgrounds instead

---

## testing checklist

before shipping any page:

### structure

- [ ] follows page-specific structure template
- [ ] uses Container for max-width
- [ ] uses Section for vertical rhythm
- [ ] has one h1 tag
- [ ] heading hierarchy logical (h1 → h2 → h3)

### content

- [ ] follows content constraints (featured limits, etc.)
- [ ] no banned elements (carousels, auto-play, etc.)
- [ ] all copy follows tone rules
- [ ] all links have descriptive text

### accessibility

- [ ] keyboard navigation works
- [ ] screen reader can navigate
- [ ] color contrast passes AA
- [ ] focus indicators visible
- [ ] touch targets ≥ 44x44px

### responsive

- [ ] works on mobile (< 640px)
- [ ] works on tablet (640-1024px)
- [ ] works on desktop (1024px+)
- [ ] spacing scales appropriately
- [ ] grids collapse properly

---

## alignment with visual north star

page constraints support the visual north star principles:

**visual north star: calm in first 30 seconds**
→ **page constraints: featured limits, progressive disclosure**
✅ constraints prevent overwhelm

**visual north star: restraint and discipline**
→ **page constraints: specific limits per page type**
✅ constraints enable focus

**visual north star: consistency**
→ **page constraints: templates reused across similar pages**
✅ familiar patterns reduce cognitive load

**visual north star: employer-first**
→ **page constraints: purpose-driven structure**
✅ every page serves employer comprehension goal

---

## measuring success

page constraints are successful when:

### qualitative measures

- [ ] employers describe navigation as "easy"
- [ ] no confusion about page structure
- [ ] clear recognition of page types
- [ ] consistent experience across pages
- [ ] pages feel focused, not cluttered

### quantitative measures

- [ ] 100% pages follow template structure
- [ ] featured content within limits (work: 2, writing: 1)
- [ ] 100% pages have single h1
- [ ] heading hierarchy logical on all pages
- [ ] all pages meet responsive breakpoint requirements

---

**last updated:** january 3, 2026
**status:** complete
**principle:** each page type has specific purpose and constraints — consistency enables familiarity, constraints enable focus.
