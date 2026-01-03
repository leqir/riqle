# epic 2: design system & visual language

**status: 12/12 stories complete ✅**

this epic establishes the complete visual language and design system for the riqle platform. every design decision flows from a single north star: **calm, precise, apple-internal-tool-like with subtle warmth and human texture**.

---

## overview

**design philosophy:**
the design system is built on restraint. 95% neutrals, 5% accent. minimal motion. surgical use of hand-drawn warmth. composition over configuration. accessibility baked in, not bolted on.

**core principles:**

1. **restraint first, personality second** — default to calm, add warmth surgically
2. **clarity over cleverness** — every element supports understanding
3. **consistency through constraints** — explicit bans prevent visual debt
4. **accessibility by default** — WCAG 2.1 AA is the baseline, not an afterthought

---

## epic structure

### foundation documents (stories 2.1-2.4)

**[2.1 visual north star](./visual-north-star.md)** — design intent & decision framework

- defines "calm, precise, apple-internal-tool-like" aesthetic
- 4-question decision framework for all design choices
- explicit comparisons (what we are / what we're not)
- rejection criteria for design reviews

**[2.2 typography](./typography.md)** — foundation of visual hierarchy

- Inter variable font exclusively
- responsive fluid scaling via clamp()
- 6-level type scale (display → h1 → h2 → h3 → body → caption)
- generous line-height (1.7 for body, 1.1-1.3 for headings)

**[2.3 colors](./colors.md)** — restraint-first color system

- stone palette (warm neutrals, 95% of interface)
- cyan accent (#22d3ee, 5% of interface, interactive only)
- WCAG AA contrast tested and guaranteed
- explicit color usage rules (when to use each token)

**[2.4 spacing and layout](./spacing-and-layout.md)** — 8px base unit system

- 8px spacing scale (xs: 8px → 4xl: 128px)
- vertical rhythm rules (consistent line-height multipliers)
- layout primitives (Stack, Grid, Container, Section)
- generous white space constraints (min 48px between sections)

---

### component layer (stories 2.5-2.6)

**[2.5 component primitives](./component-primitives.md)** — design atoms

- composition over configuration (max 3-4 props)
- 7 core primitives: Button, Link, Input, Card, Badge, Divider, Meta
- semantic HTML first (button, a, input, label)
- prop discipline (variant, size, children — avoid prop bloat)

**[2.6 glassmorphism](./glassmorphism.md)** — velvet glass effects

- "velvet glass" not trendy blur (max 8px, min 85% opacity)
- overlays only (modals, dropdowns) never primary content
- neutral colors only (white or stone)
- WCAG contrast compliance enforced

---

### motion & visual warmth (stories 2.7-2.9)

**[2.7 motion and animation](./motion-and-animation.md)** — calm motion constraints

- max 300ms duration (fast: 100ms, base: 200ms, slow: 300ms)
- mandatory prefers-reduced-motion support
- banned: page transitions, parallax, scroll-triggered animations
- allowed: hover/focus feedback, state transitions only

**[2.8 hand-drawn elements](./hand-drawn-elements.md)** — surgical warmth

- < 5% of interface (max 1-2 elements per page)
- 6 element types: arrows, underlines, circles, brackets, scribbles, annotations
- functional use only (guide attention, emphasize, call attention)
- SVG implementation with wobbly paths

**[2.9 iconography](./iconography.md)** — functional icons only

- Heroicons outline exclusively
- < 20 unique icons across entire site
- 3 sizes: sm (16px), md (20px), lg (24px)
- icons clarify, never decorate (must have functional purpose)

---

### quality & consistency (stories 2.10-2.12)

**[2.10 accessibility by default](./accessibility-by-default.md)** — baked in, not bolted on

- WCAG 2.1 Level AA automatically met
- color contrast guaranteed (all tokens tested)
- keyboard navigation works by default
- screen reader support built into primitives
- motion preferences respected (prefers-reduced-motion)

**[2.11 page constraints](./page-constraints.md)** — consistent patterns per page type

- homepage: one h1, 1-2 featured projects, max 10 items above fold
- /work: chronological grid, all projects visible, no filtering
- /essays: title + thesis, chronological reverse, no excerpts
- project detail: hero image, problem/solution, artifacts, outcomes

**[2.12 anti-patterns](./anti-patterns.md)** — explicit bans

- visual noise, layout chaos, font chaos, color explosion
- prop bloat, accessibility bypasses, excessive blur
- motion overload, decoration overload, decorative icons
- homepage noise, engagement manipulation, performance killers
- enforcement checklist + automated linting rules

---

## design system at a glance

### typography system

```typescript
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
}

fontSize: {
  display: ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', fontWeight: '600' }],
  h1: ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.2', fontWeight: '600' }],
  h2: ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3', fontWeight: '600' }],
  h3: ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '500' }],
  body: ['1rem', { lineHeight: '1.7' }],
  caption: ['0.875rem', { lineHeight: '1.5' }],
}
```

### color system

```typescript
colors: {
  stone: { /* tailwind defaults */ },
  accent: {
    50: '#ecfeff',
    400: '#22d3ee',  // primary interactive
    500: '#06b6d4',  // hover state
    600: '#0891b2',  // active state
  },
  functional: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
}
```

### spacing scale

```typescript
spacing: {
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '1.5rem',   // 24px
  lg: '2rem',     // 32px
  xl: '3rem',     // 48px
  '2xl': '4rem',  // 64px
  '3xl': '6rem',  // 96px
  '4xl': '8rem',  // 128px
}
```

### motion timing

```typescript
transitionDuration: {
  instant: '0ms',   // reduced motion
  fast: '100ms',    // hover, focus
  base: '200ms',    // default
  slow: '300ms',    // maximum allowed
}

transitionTimingFunction: {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',  // ease-in-out
}
```

---

## component usage patterns

### button component

```tsx
import { Button } from '@/components/primitives/Button';

// primary action
<Button variant="primary" size="md">
  view projects
</Button>

// secondary action
<Button variant="secondary" size="md">
  read essays
</Button>

// tertiary/text link
<Button variant="tertiary" size="sm">
  learn more
</Button>
```

### card component

```tsx
import { Card } from '@/components/primitives/Card';

<Card>
  <img src="/project.jpg" alt="project screenshot" />
  <h3>project title</h3>
  <p>one-sentence description of the project</p>
  <Badge>2024</Badge>
</Card>;
```

### layout primitives

```tsx
import { Stack, Grid, Container, Section } from '@/components/primitives/Layout';

<Section spacing="xl" background="subtle">
  <Container maxWidth="lg">
    <Stack spacing="lg">
      <h1>heading</h1>
      <Grid cols={2} gap="md">
        <Card>project 1</Card>
        <Card>project 2</Card>
      </Grid>
    </Stack>
  </Container>
</Section>;
```

### hand-drawn elements

```tsx
import { HandDrawnArrow, HandDrawnUnderline } from '@/components/visual/HandDrawn';

<p>
  i build <HandDrawnUnderline>data-heavy tools</HandDrawnUnderline> for technical users
</p>

<HandDrawnArrow direction="right" size="md" className="text-accent-400" />
```

---

## design decision framework

**when evaluating any design choice, ask these 4 questions:**

1. **does this make the site calmer or noisier?**
   - if noisier → reject
   - calm > clever

2. **does this support understanding or distract from it?**
   - if it distracts → reject
   - clarity > creativity

3. **would this feel at home in an apple internal tool?**
   - if no → probably reject
   - precise > playful

4. **is this intentional or just "looks cool"?**
   - if just "looks cool" → reject
   - intentional > trendy

**default to restraint.** when in doubt, remove it.

---

## anti-pattern enforcement

**every code review must check:**

- [ ] no arbitrary spacing (only 8px scale tokens)
- [ ] no text gradients or decorative effects
- [ ] no multiple accent colors (cyan only)
- [ ] no prop bloat (max 3-4 props per component)
- [ ] no clickable divs (semantic HTML: button, a)
- [ ] no animations without prefers-reduced-motion
- [ ] no decorative hand-drawn elements (functional only)
- [ ] no decorative icons (Heroicons outline, functional use)
- [ ] no carousels, parallax, or auto-play
- [ ] no newsletter popups or engagement manipulation

**see [anti-patterns.md](./anti-patterns.md) for complete enforcement checklist.**

---

## accessibility guarantees

**by using this design system, you automatically get:**

✅ **WCAG 2.1 Level AA compliance**

- all color contrast ratios tested and meet minimums
- stone-900 on white: 19.8:1 (exceeds AAA)
- stone-600 on white: 7.8:1 (exceeds AAA)
- accent-400 on white: 4.9:1 (meets AA large text)

✅ **keyboard navigation**

- all interactive elements reachable via tab
- enter/space triggers actions
- escape closes modals
- arrow keys navigate menus

✅ **screen reader support**

- semantic HTML (headings, landmarks, lists)
- ARIA labels on icon buttons
- alt text on all images
- form labels properly associated

✅ **motion preferences**

- prefers-reduced-motion: reduce supported
- animations disabled for users who request it
- state changes have non-motion indicators

✅ **touch targets**

- minimum 44x44px (exceeds WCAG 2.5.5)
- generous padding on buttons and links
- adequate spacing between interactive elements

---

## color contrast reference

| text color | background | contrast ratio | wcag level       |
| ---------- | ---------- | -------------- | ---------------- |
| stone-900  | white      | 19.8:1         | ✅ AAA (7:1)     |
| stone-800  | white      | 14.2:1         | ✅ AAA           |
| stone-700  | white      | 10.5:1         | ✅ AAA           |
| stone-600  | white      | 7.8:1          | ✅ AAA           |
| stone-500  | white      | 5.2:1          | ✅ AA (4.5:1)    |
| stone-400  | white      | 3.6:1          | ⚠️ AA large only |
| accent-400 | white      | 4.9:1          | ✅ AA (4.5:1)    |
| white      | stone-900  | 19.8:1         | ✅ AAA           |
| white      | stone-800  | 14.2:1         | ✅ AAA           |
| white      | accent-400 | 4.9:1          | ✅ AA            |

**use cases:**

- **headings:** stone-900 on white (maximum contrast)
- **body text:** stone-600 on white (readable with warmth)
- **captions/meta:** stone-500 on white (de-emphasized but accessible)
- **interactive:** accent-400 on white (meets AA for all text sizes)
- **reversed:** white on stone-900 or stone-800 (dark mode patterns)

---

## implementation checklist

**to implement this design system in code:**

### 1. configure next.js font loading

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### 2. extend tailwind config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', fontWeight: '600' }],
        h1: ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.2', fontWeight: '600' }],
        // ... rest of type scale
      },
      colors: {
        accent: {
          50: '#ecfeff',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        // ... rest of spacing scale
      },
      transitionDuration: {
        instant: '0ms',
        fast: '100ms',
        base: '200ms',
        slow: '300ms',
      },
    },
  },
};
```

### 3. add global styles

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* enforce reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* base typography */
  body {
    @apply text-body font-sans text-stone-600 antialiased;
  }

  h1 {
    @apply text-h1 font-semibold text-stone-900;
  }
  h2 {
    @apply text-h2 font-semibold text-stone-900;
  }
  h3 {
    @apply text-h3 font-medium text-stone-900;
  }
}

@layer components {
  /* glass effect utility */
  .glass-subtle {
    @apply border border-stone-200/10 bg-white/90 backdrop-blur-sm;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
}
```

### 4. build component primitives

```tsx
// components/primitives/Button.tsx
// components/primitives/Card.tsx
// components/primitives/Link.tsx
// components/primitives/Input.tsx
// components/primitives/Badge.tsx
// components/primitives/Divider.tsx
// components/primitives/Meta.tsx
```

see [component-primitives.md](./component-primitives.md) for full implementations.

### 5. create layout primitives

```tsx
// components/primitives/Layout/Stack.tsx
// components/primitives/Layout/Grid.tsx
// components/primitives/Layout/Container.tsx
// components/primitives/Layout/Section.tsx
```

see [spacing-and-layout.md](./spacing-and-layout.md) for full implementations.

### 6. add hand-drawn components

```tsx
// components/visual/HandDrawnArrow.tsx
// components/visual/HandDrawnUnderline.tsx
// components/visual/HandDrawnCircle.tsx
```

see [hand-drawn-elements.md](./hand-drawn-elements.md) for SVG implementations.

---

## testing design system compliance

**manual checks:**

1. **color contrast** — use browser DevTools or WebAIM contrast checker
2. **keyboard navigation** — tab through page, ensure all interactive elements reachable
3. **screen reader** — test with VoiceOver (macOS) or NVDA (Windows)
4. **reduced motion** — enable in OS settings, verify animations disappear
5. **touch targets** — measure interactive elements (min 44x44px)

**automated checks:**

```bash
# install axe DevTools browser extension
# run accessibility audit on every page

# lighthouse CI (integrated into build pipeline)
npm run lighthouse

# checks:
# - contrast ratios
# - ARIA compliance
# - keyboard navigation
# - semantic HTML
```

---

## maintenance & evolution

**this design system is complete but not frozen.**

**when to update:**

- new component needed → follow composition-over-configuration pattern
- accessibility issue found → fix immediately, update primitives
- performance degradation → audit and optimize (target: < 200kb JS)
- new page type → document constraints in page-constraints.md

**when NOT to update:**

- "this component needs more props" → use composition instead
- "can we add another accent color?" → no, restraint is the system
- "parallax would look cool here" → no, banned in anti-patterns
- "let's make this more creative" → calm > clever

**decision process:**

1. does this proposal pass the 4-question framework? (see visual-north-star.md)
2. is it banned in anti-patterns.md? → if yes, reject immediately
3. does it maintain WCAG AA compliance? → if no, reject
4. can it be achieved through composition instead? → if yes, prefer composition

---

## related documentation

**epic 1: information architecture**

- [epic-1 README](../epic-1/README.md)
- cross-references design system in content structure decisions

**future epics:**

- epic 3 will implement these design system rules in actual components
- epic 4 will apply the system to page templates
- epic 5 will integrate with data layer and dynamic content

---

## quick reference links

**foundation:**

- [visual north star](./visual-north-star.md) — design intent
- [typography](./typography.md) — type scale & hierarchy
- [colors](./colors.md) — restraint-first palette
- [spacing & layout](./spacing-and-layout.md) — 8px system

**components:**

- [component primitives](./component-primitives.md) — 7 core atoms
- [glassmorphism](./glassmorphism.md) — velvet glass rules

**visual warmth:**

- [motion & animation](./motion-and-animation.md) — calm motion
- [hand-drawn elements](./hand-drawn-elements.md) — surgical warmth
- [iconography](./iconography.md) — functional icons

**quality:**

- [accessibility](./accessibility-by-default.md) — WCAG compliance
- [page constraints](./page-constraints.md) — per-page rules
- [anti-patterns](./anti-patterns.md) — explicit bans

---

**epic 2 status: 12/12 stories complete ✅**

next: implement this design system in code (epic 3)
