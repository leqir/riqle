# Epic 2: Design System & Visual Language

**Status:** Ready for Implementation (Requires Epic 0, Epic 1)
**Priority:** Critical - Foundation for All UI
**Estimated Complexity:** Very High
**Dependencies:** Epic 0 (Infrastructure), Epic 1 (Information Architecture)

---

## Epic Overview

### Purpose

Translate "**quietly premium, calmly obsessive**" into enforceable design rules.

This epic ensures the site:

- Feels **calm** in the first 30 seconds
- Feels **premium** without being corporate
- Feels **human** without being informal
- Remains **visually disciplined** as features expand

**This is not decoration — it is credibility engineering.**

### User Outcome

When Epic 2 is complete, the system has:

- ✅ Visual north star defining all design decisions
- ✅ Typography system doing most of the work
- ✅ Color palette with restraint and warmth
- ✅ Spacing and rhythm creating calm
- ✅ Component primitives (design atoms)
- ✅ Glassmorphism rules (velvet glass, not liquid)
- ✅ Motion constraints (calm, not kinetic)
- ✅ Hand-drawn visual language (surgical use)
- ✅ Iconography guidelines (assist, not decorate)
- ✅ Accessibility baked into design
- ✅ Page-specific design constraints
- ✅ Anti-pattern list preventing visual noise

**Design becomes invisible — and invisibility is trust.**

### Functional Requirements Covered

From UX Design Specification:

- Design system: Tailwind CSS + Headless UI
- Typography: Modern neutral grotesk + softer secondary
- Color palette: Warm neutrals (off-white, cream, fog grey, stone)
- Glassmorphism: Velvet glass (light blur, low opacity)
- Hand-drawn icons: Thin-line SVG with imperfect geometry
- Animations: Slow, intentional (duration-300, ease-out)
- Progressive disclosure: Clarity → Proof → Texture

### Non-Functional Requirements Covered

- NFR13: WCAG AA accessibility compliance
- NFR1: Fast page loads (design supports performance)

---

## Architecture Decisions

### Tech Stack for Design System

**CSS Framework:** Tailwind CSS

- Utility-first approach
- Easy to enforce design tokens
- No runtime CSS-in-JS overhead
- Customizable design system

**Component Library:** Headless UI (Tailwind Labs)

- Unstyled, accessible primitives
- Full control over styling
- Keyboard navigation built-in
- ARIA attributes included

**Typography:** System font stack + web fonts

- Primary: Inter, Geist, or similar neutral grotesk
- Secondary: Optional softer font for metadata
- Variable fonts for performance

**Animation:** Tailwind transitions + Framer Motion (sparingly)

- CSS transitions for simple states
- Framer Motion for complex interactions only
- Always respect `prefers-reduced-motion`

### Design Tokens Strategy

All design decisions encoded in `tailwind.config.js`:

- Colors as named variables
- Spacing scale consistent
- Typography scale defined
- Animation durations fixed

This ensures:

- Consistency enforced automatically
- No arbitrary values in components
- Design system is code
- Changes propagate globally

---

## Stories

### Story 2.1: Define the Visual North Star (Design Intent, Not Aesthetics)

**Priority:** Critical (Must Do First)
**Complexity:** Medium
**Estimated Time:** 2-3 hours

#### User Story

As a designer,
I want a single emotional target for all design decisions,
So that every choice can be justified against a clear intent.

#### Acceptance Criteria

**Given** the design intent statement is defined
**When** making any design decision
**Then** it can be justified against the visual north star
**And** "looks cool" is never a valid reason
**And** all decisions align to the same emotional target

**Given** explicit positioning is documented
**When** reviewing designs
**Then** the site is clearly NOT: flashy, loud, trendy, or experimental for its own sake
**And** the site IS: calm, precise, Apple-internal-tool-like with subtle warmth

#### Design Intent Statement

> **A calm, precise, Apple-internal-tool-like interface with subtle warmth and human texture — serious, intentional, and quietly obsessive.**

#### Explicit Positioning

**What This Site IS:**

- Calm and unhurried
- Precise and intentional
- Quietly premium (not loud luxury)
- Human (through imperfection, not cuteness)
- Serious (but not corporate)
- Obsessive about detail

**What This Site Is NOT:**

- Flashy or attention-grabbing
- Loud or theatrical
- Trendy or following design fads
- Experimental for its own sake
- Corporate or sterile
- Playful or informal

**Inspiration References (Feeling, Not Copying):**

- **Apple internal tools:** Calm precision, restrained palette
- **Linear:** Typography-first, generous spacing
- **Stripe:** Professional clarity, micro-interactions
- **Paul Graham essays:** Text-first, minimal distraction

#### Implementation Checklist

- [ ] Document design intent in `docs/design-system/visual-north-star.md`:

  ```markdown
  # Visual North Star

  ## Design Intent

  A calm, precise, Apple-internal-tool-like interface with subtle warmth
  and human texture — serious, intentional, and quietly obsessive.

  ## Emotional Target

  - First 30 seconds: Calm
  - After engagement: Trust
  - Deep exploration: Respect

  ## Positioning

  ### IS

  - Calm, unhurried
  - Precise, intentional
  - Quietly premium
  - Human through imperfection
  - Serious but not corporate

  ### IS NOT

  - Flashy, loud
  - Trendy, experimental
  - Corporate, sterile
  - Playful, informal

  ## Decision Framework

  Before adding any design element, ask:

  1. Does this make the site calmer or noisier?
  2. Does this support understanding or distract from it?
  3. Would this feel at home in an Apple internal tool?
  4. Is this intentional or just "looks cool"?

  If the answer to any question is wrong, reject the design.
  ```

- [ ] Create design review checklist
- [ ] Share with all designers/developers
- [ ] Add to PR review process

#### Testing Requirements

- [ ] Design intent documented and approved
- [ ] Decision framework clear and usable
- [ ] Team understands and can apply criteria
- [ ] Example decisions reference the north star

---

### Story 2.2: Typography System (The Foundation of Trust)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 6-8 hours

#### User Story

As a designer,
I want typography to do most of the work,
So that visuals stay secondary and the site feels calm and authoritative.

#### Acceptance Criteria

**Given** the typography system is implemented
**When** viewing any page
**Then** text is readable and calm on all screen sizes
**And** headings feel authoritative, not dramatic
**And** writing pages feel like essays, not blogs

**Given** typographic hierarchy is defined
**When** building new pages
**Then** only defined text styles are used
**And** no arbitrary font sizes appear
**And** consistency is automatic

#### Typography Requirements

**Primary Font: Neutral Modern Grotesk**

- Options: Inter, Geist, Untitled Sans, or similar
- Characteristics: High legibility, neutral, modern
- Usage: All body text, headings, UI elements

**Secondary Font: Softer Tone (Optional)**

- Options: Inter (lighter weight), or complementary sans
- Usage: Metadata only (dates, tags, captions)
- Rule: Use sparingly, never for body text

**Font Loading Strategy:**

- Variable fonts for performance
- Subset to Latin characters only
- Font-display: swap (avoid FOUT)
- System font fallback

#### Typographic Hierarchy

**Display / Hero (Identity Statements):**

```
Font: Primary, Weight 600-700
Size: 48px-64px (mobile: 32px-40px)
Line Height: 1.1-1.2
Letter Spacing: -0.02em (tighter)
Usage: Homepage hero, page titles
```

**H1 (Section Headings):**

```
Font: Primary, Weight 600
Size: 32px-40px (mobile: 24px-28px)
Line Height: 1.3
Letter Spacing: -0.01em
Usage: Main page headings
```

**H2 (Subsection Headings):**

```
Font: Primary, Weight 600
Size: 24px-28px (mobile: 20px-24px)
Line Height: 1.4
Letter Spacing: Normal
Usage: Section divisions
```

**H3 (Component Headings):**

```
Font: Primary, Weight 500-600
Size: 18px-20px (mobile: 16px-18px)
Line Height: 1.5
Usage: Card titles, list headings
```

**Body Text:**

```
Font: Primary, Weight 400
Size: 16px-18px (never smaller than 16px)
Line Height: 1.6-1.7 (generous)
Letter Spacing: Normal
Max Width: 65-75ch (readable line length)
Usage: All reading content
```

**Meta Text (Dates, Tags, Captions):**

```
Font: Secondary (or Primary lighter weight)
Size: 14px-15px
Line Height: 1.5
Color: Muted (60-70% opacity)
Usage: Timestamps, tags, image captions
```

#### Typography Rules

1. **Generous Line Height**
   - Body text: 1.6-1.7 minimum
   - Headings: 1.1-1.4
   - Never tighter than necessary

2. **Clear Paragraph Spacing**
   - Margin between paragraphs: 1.5em
   - Avoid orphans/widows where possible

3. **Avoid Text Justification**
   - Always left-aligned (English)
   - Never fully justified (creates rivers)

4. **No Gradient Text**
   - Solid colors only
   - Avoid gradient fills on text

5. **No Outlined Text**
   - No text-stroke effects
   - Keep text legible

6. **Maximum 2 Font Families**
   - Primary for everything
   - Secondary for metadata only (optional)

#### Implementation Checklist

- [ ] Choose primary font (recommend: Inter or Geist)
- [ ] Configure Tailwind typography:
  ```javascript
  // tailwind.config.js
  module.exports = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter var', 'system-ui', 'sans-serif'],
          meta: ['Inter', 'system-ui', 'sans-serif'], // Optional
        },
        fontSize: {
          display: ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
          h1: ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
          h2: ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.4' }],
          h3: ['1.125rem', { lineHeight: '1.5' }],
          body: ['1rem', { lineHeight: '1.7' }],
          meta: ['0.875rem', { lineHeight: '1.5' }],
        },
        letterSpacing: {
          tighter: '-0.02em',
          tight: '-0.01em',
        },
      },
    },
  };
  ```
- [ ] Load font with next/font:

  ```typescript
  // app/layout.tsx
  import { Inter } from 'next/font/google';

  const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
  });

  export default function RootLayout({ children }) {
    return (
      <html lang="en" className={inter.variable}>
        <body className="font-sans">{children}</body>
      </html>
    );
  }
  ```

- [ ] Create typography component library:

  ```typescript
  // components/Typography.tsx
  export function Display({ children }: { children: React.ReactNode }) {
    return <h1 className="text-display font-semibold">{children}</h1>;
  }

  export function H1({ children }: { children: React.ReactNode }) {
    return <h1 className="text-h1 font-semibold">{children}</h1>;
  }

  export function Body({ children }: { children: React.ReactNode }) {
    return <p className="text-body max-w-prose">{children}</p>;
  }

  export function Meta({ children }: { children: React.ReactNode }) {
    return <span className="text-meta text-stone-600">{children}</span>;
  }
  ```

- [ ] Document typography system in `docs/design-system/typography.md`
- [ ] Create typography showcase page for reference

#### Testing Requirements

- [ ] All text sizes defined in Tailwind config
- [ ] No arbitrary font sizes in components
- [ ] Line heights are generous (1.6-1.7 for body)
- [ ] Text readable on all screen sizes
- [ ] Writing pages feel like essays
- [ ] Headings feel authoritative, not dramatic
- [ ] Typography hierarchy is clear

---

### Story 2.3: Color System (Restraint First, Personality Second)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-6 hours

#### User Story

As a designer,
I want a restrained color palette that avoids visual noise,
So that the site feels warm and professional without distraction.

#### Acceptance Criteria

**Given** the color system is defined
**When** viewing any page
**Then** pages feel breathable, not stark
**And** color supports hierarchy, not branding theatrics
**And** the site looks professional in 10 seconds

**Given** color rules are enforced
**When** building components
**Then** accent color is never used for body text
**And** no high-saturation colors appear
**And** pure white and pure black are avoided

#### Palette Principles

**Light-First Design:**

- Default theme is light
- Dark mode optional (but equally restrained)

**Neutral Base:**

- Off-white backgrounds (not pure white)
- Fog gray for subtle backgrounds
- Soft charcoal for text (not pure black)

**One Restrained Accent:**

- Used sparingly for interactive elements
- Never on large surfaces
- Muted, not vibrant

**Maximum 3-4 Core Colors:**

- Neutral grays (stone palette)
- Accent color (single hue)
- Optional: Semantic colors (success, error) for feedback only

#### Color Palette (Tailwind Stone + Accent)

**Neutral Palette (Tailwind Stone):**

```javascript
colors: {
  stone: {
    50: '#fafaf9',   // Off-white bg
    100: '#f5f5f4',  // Subtle bg
    200: '#e7e5e4',  // Borders
    300: '#d6d3d1',  // Dividers
    400: '#a8a29e',  // Muted text
    500: '#78716c',  // Secondary text
    600: '#57534e',  // Body text
    700: '#44403c',  // Headings
    800: '#292524',  // Dark headings
    900: '#1c1917',  // Near black
  }
}
```

**Accent Color (Subtle Blue or Warm Neutral):**

```javascript
colors: {
  accent: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // Primary accent
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  }
}
```

Alternative: Warm neutral accent (stone-700 with opacity variations)

#### Color Usage Rules

**Backgrounds:**

- Page: `stone-50` (off-white, not #fff)
- Subtle sections: `stone-100`
- Cards: `stone-50` with glass effect
- Never: Pure white (#ffffff)

**Text:**

- Body: `stone-700` (soft charcoal, not #000)
- Headings: `stone-800` or `stone-900`
- Muted/meta: `stone-500` or `stone-600`
- Never: Pure black (#000000)

**Interactive Elements:**

- Links: `accent-600` (hover: `accent-700`)
- Buttons: `stone-900` bg, white text (primary)
- Buttons secondary: `stone-200` bg, `stone-900` text
- Focus rings: `accent-500`

**Borders & Dividers:**

- Subtle: `stone-200`
- Emphasis: `stone-300`
- Never: High-contrast borders

**Accent Usage (Sparingly):**

- Links in body text
- Active navigation state
- Focus indicators
- Call-to-action buttons (used rarely)
- NOT: Headings, large surfaces, decorative use

#### Dark Mode (Optional, Future)

If implemented, must be equally restrained:

- Dark bg: `stone-900` or `stone-950` (not pure black)
- Text: `stone-200` or `stone-300` (not pure white)
- Accent: Slightly desaturated from light mode
- Glass effects: Lower opacity, subtler

#### Implementation Checklist

- [ ] Configure Tailwind colors:
  ```javascript
  // tailwind.config.js
  module.exports = {
    theme: {
      extend: {
        colors: {
          stone: colors.stone, // Use Tailwind's stone
          accent: {
            // Define custom accent or use blue-600
            DEFAULT: colors.blue[600],
            hover: colors.blue[700],
          },
        },
        backgroundColor: {
          page: colors.stone[50],
          subtle: colors.stone[100],
        },
        textColor: {
          body: colors.stone[700],
          heading: colors.stone[900],
          muted: colors.stone[500],
        },
      },
    },
  };
  ```
- [ ] Create color token constants:
  ```typescript
  // lib/design-tokens.ts
  export const colors = {
    bg: {
      page: 'bg-stone-50',
      subtle: 'bg-stone-100',
      card: 'bg-stone-50/80', // With glass
    },
    text: {
      body: 'text-stone-700',
      heading: 'text-stone-900',
      muted: 'text-stone-500',
    },
    border: {
      subtle: 'border-stone-200',
      emphasis: 'border-stone-300',
    },
    accent: {
      link: 'text-accent hover:text-accent-hover',
      button: 'bg-stone-900 text-white hover:bg-stone-800',
    },
  } as const;
  ```
- [ ] Avoid pure white/black:

  ```css
  /* Never use these */
  .bad {
    background: #fff; /* ❌ Use stone-50 */
    color: #000; /* ❌ Use stone-900 */
  }

  /* Use these instead */
  .good {
    background: theme('colors.stone.50'); /* ✅ */
    color: theme('colors.stone.900'); /* ✅ */
  }
  ```

- [ ] Create color showcase page
- [ ] Document in `docs/design-system/colors.md`

#### Testing Requirements

- [ ] No pure white (#fff) or pure black (#000) used
- [ ] Accent color used sparingly
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Pages feel breathable, not stark
- [ ] Color supports hierarchy clearly
- [ ] Site looks professional in 10-second view

---

### Story 2.4: Spacing, Rhythm & Layout System

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 4-6 hours

#### User Story

As a designer,
I want consistent spacing and predictable structure,
So that pages feel calm and balanced.

#### Acceptance Criteria

**Given** spacing system is defined
**When** building any page
**Then** consistent spacing scale is used
**And** vertical rhythm is maintained
**And** white space is intentional, not empty

**Given** layout constraints exist
**When** viewing on any screen size
**Then** pages feel balanced, not busy
**And** layouts don't collapse on large screens
**And** reading feels unhurried

#### Spacing Scale

Use Tailwind's default 4px base scale:

```
0.5 → 2px
1 → 4px
2 → 8px
3 → 12px
4 → 16px
6 → 24px
8 → 32px
12 → 48px
16 → 64px
20 → 80px
24 → 96px
32 → 128px
```

**Recommended Usage:**

- Component padding: `p-4` (16px) or `p-6` (24px)
- Section spacing: `space-y-12` (48px) or `space-y-16` (64px)
- Page padding: `px-6` mobile, `px-8` desktop
- Vertical rhythm: `space-y-4` for tight, `space-y-8` for generous

#### Layout Constraints

**Max-Width Content Containers:**

```typescript
// Recommended max-widths
const layouts = {
  prose: 'max-w-prose', // ~65ch, ideal for reading
  content: 'max-w-4xl', // 896px, general content
  wide: 'max-w-6xl', // 1152px, projects/work
  full: 'max-w-7xl', // 1280px, maximum width
};
```

**Left-Aligned Text:**

- No center-heavy layouts
- Text always starts from left (for English)
- Centered text only for special cases (hero statements)

**Consistent Vertical Rhythm:**

- Sections: 64-96px apart (`space-y-16` or `space-y-24`)
- Components: 32-48px apart (`space-y-8` or `space-y-12`)
- Paragraphs: 24px apart (`space-y-6`)

#### Layout Patterns

**Page Container:**

```tsx
<div className="bg-page min-h-screen">
  <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">{/* Content */}</div>
</div>
```

**Section Spacing:**

```tsx
<div className="space-y-16">
  <section>{/* Section 1 */}</section>
  <section>{/* Section 2 */}</section>
  <section>{/* Section 3 */}</section>
</div>
```

**Reading Content:**

```tsx
<article className="mx-auto max-w-prose space-y-6">
  <h1 className="text-h1">Title</h1>
  <p className="text-body">Paragraph 1</p>
  <p className="text-body">Paragraph 2</p>
</article>
```

#### Spacing Rules

1. **White Space is Intentional**
   - Generous padding around elements
   - Clear section breaks
   - Breathing room between components

2. **Avoid Dense Layouts**
   - No cramming content
   - Prefer vertical space over horizontal density
   - Single-column layouts preferred

3. **Avoid Pinterest-Style Masonry**
   - Use grids sparingly
   - Prefer linear, predictable layouts
   - No complex multi-column arrangements

4. **Responsive Spacing**
   - Mobile: Tighter spacing (`p-4`, `space-y-8`)
   - Desktop: Generous spacing (`p-6` or `p-8`, `space-y-12` or `space-y-16`)

#### Implementation Checklist

- [ ] Configure Tailwind spacing (use defaults)
- [ ] Create layout components:

  ```typescript
  // components/Layout.tsx
  export function PageContainer({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-page">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
          {children}
        </div>
      </div>
    );
  }

  export function ProseContainer({ children }: { children: React.ReactNode }) {
    return (
      <div className="max-w-prose mx-auto space-y-6">
        {children}
      </div>
    );
  }

  export function Section({ children }: { children: React.ReactNode }) {
    return <section className="space-y-8">{children}</section>;
  }
  ```

- [ ] Establish section spacing convention
- [ ] Document in `docs/design-system/spacing-layout.md`
- [ ] Create layout showcase page

#### Testing Requirements

- [ ] Consistent spacing scale used throughout
- [ ] Vertical rhythm maintained across pages
- [ ] Pages feel balanced, not busy
- [ ] Layouts work on all screen sizes
- [ ] Reading feels unhurried
- [ ] White space is intentional

---

### Story 2.5: Component Primitives (Design Atoms)

**Priority:** High
**Complexity:** High
**Estimated Time:** 8-10 hours

#### User Story

As a developer,
I want a small, disciplined set of reusable components,
So that new pages can be built quickly while maintaining consistency.

#### Acceptance Criteria

**Given** component primitives are built
**When** creating new pages
**Then** pages can be assembled from existing primitives
**And** no component exists "just in case"
**And** UI remains consistent across sections

**Given** component discipline is enforced
**When** reviewing components
**Then** every component has a single purpose
**And** components look good without animation
**And** fewer components exist (not more)

#### Core Primitives

**1. Text Blocks**

```typescript
// components/primitives/Text.tsx
export function Heading({ level = 1, children }: { level?: 1 | 2 | 3; children: React.ReactNode }) {
  const sizes = {
    1: 'text-h1',
    2: 'text-h2',
    3: 'text-h3',
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag className={`${sizes[level]} font-semibold`}>{children}</Tag>;
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-body max-w-prose">{children}</p>;
}

export function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-meta text-stone-500">{children}</span>;
}
```

**2. Links**

```typescript
// components/primitives/Link.tsx
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  );
}

export function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={`
        text-stone-700 hover:text-stone-900 transition-colors
        ${active ? 'font-semibold text-stone-900' : ''}
      `}
    >
      {children}
    </a>
  );
}
```

**3. Buttons**

```typescript
// components/primitives/Button.tsx
export function Button({
  variant = 'primary',
  children,
  ...props
}: {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants = {
    primary: 'bg-stone-900 text-white hover:bg-stone-800',
    secondary: 'bg-stone-200 text-stone-900 hover:bg-stone-300',
    ghost: 'text-stone-700 hover:text-stone-900 hover:bg-stone-100',
  };

  return (
    <button
      className={`
        px-4 py-2 rounded-md font-medium transition-colors
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        ${variants[variant]}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
```

**4. Cards (For Projects, Resources)**

```typescript
// components/primitives/Card.tsx
export function Card({
  glass = false,
  children,
}: {
  glass?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`
        rounded-lg border border-stone-200 p-6
        ${glass ? 'bg-stone-50/80 backdrop-blur-sm' : 'bg-stone-50'}
        hover:border-stone-300 transition-colors
      `}
    >
      {children}
    </div>
  );
}
```

**5. Dividers**

```typescript
// components/primitives/Divider.tsx
export function Divider() {
  return <hr className="border-t border-stone-200 my-8" />;
}
```

**6. Badges (Used Sparingly)**

```typescript
// components/primitives/Badge.tsx
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-stone-100 text-stone-700">
      {children}
    </span>
  );
}
```

#### Component Rules

1. **Fewer Components > More Components**
   - Start with 6-8 primitives
   - Add new components only when truly needed
   - Resist "might need later" components

2. **Single Purpose Per Component**
   - Card is for containment only
   - Button is for actions only
   - Link is for navigation only

3. **Must Look Good Without Animation**
   - Static appearance is primary
   - Animation is enhancement
   - Never rely on motion for clarity

4. **Composition Over Customization**
   - Prefer composing primitives
   - Avoid prop explosion
   - Keep components simple

#### Implementation Checklist

- [ ] Create `components/primitives/` directory
- [ ] Build Text components (Heading, Paragraph, Label)
- [ ] Build Link components (TextLink, NavLink)
- [ ] Build Button component (3 variants max)
- [ ] Build Card component (with optional glass)
- [ ] Build Divider component
- [ ] Build Badge component
- [ ] Create Storybook or showcase page
- [ ] Document in `docs/design-system/components.md`

#### Testing Requirements

- [ ] All primitives look good without animation
- [ ] Components work on all screen sizes
- [ ] Focus states visible for interactive elements
- [ ] Keyboard navigation works
- [ ] New pages can be built from primitives
- [ ] No component exists "just in case"

---

## Remaining Stories Summary

Due to length, I'll provide streamlined versions of Stories 2.6-2.12. Each follows the same pattern but with focused implementation guidance.

---

### Story 2.6: Glassmorphism Rules (Velvet Glass, Not Liquid Glass)

**Priority:** Medium
**Complexity:** Medium
**Estimated Time:** 3-4 hours

**Key Points:**

- Use glass for cards, resource previews, optional overlays only
- NEVER for navigation bars, hero sections, or text-heavy areas
- Low blur (backdrop-blur-sm), high translucency (bg-stone-50/80)
- Soft borders, neutral tones only
- First screen contains no glass

**Implementation:**

```css
/* Velvet glass effect */
.glass {
  background: rgba(250, 250, 249, 0.8); /* stone-50 with 80% opacity */
  backdrop-filter: blur(8px);
  border: 1px solid rgba(231, 229, 228, 0.5); /* stone-200 with 50% */
}
```

---

### Story 2.7: Motion & Animation Constraints

**Priority:** Medium
**Complexity:** Low
**Estimated Time:** 2-3 hours

**Key Points:**

- Subtle fades, slow transitions (duration-300)
- NEVER scroll hijacking, parallax theatrics, bounce effects
- Always respect `prefers-reduced-motion`
- Motion should calm, not excite

**Implementation:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### Story 2.8: Hand-Drawn / Lofi Visual Language (Surgical Use)

**Priority:** Low
**Complexity:** Medium
**Estimated Time:** 4-6 hours

**Key Points:**

- Use ONLY for diagrams, process flows, learning frameworks
- Thin line weight, imperfect geometry, single color (neutral)
- NEVER for navigation icons, decorative doodles, or branding
- Feel instructional, not playful

---

### Story 2.9: Iconography & Visual Symbols

**Priority:** Low
**Complexity:** Low
**Estimated Time:** 2-3 hours

**Key Points:**

- Icons assist, not decorate
- Simple geometric style, consistent stroke weight
- Never replace text labels
- Site works perfectly with icons removed

---

### Story 2.10: Accessibility & Inclusion Baked Into Design

**Priority:** High (Covered in Story 1.11)
**Complexity:** Low
**Estimated Time:** 2-3 hours

**Recap:**

- Adequate contrast (4.5:1)
- Visible focus states
- Keyboard navigable
- Motion reduction support

---

### Story 2.11: Page-Specific Design Constraints

**Priority:** Medium
**Complexity:** Low
**Estimated Time:** 2-3 hours

**Key Points:**

- Homepage: Clean, minimal, no glass above fold
- Writing: Text-first, no cards, wide margins
- Work/Startups: Card containment allowed, visuals secondary
- Resources: Professional, boring, no marketing patterns

---

### Story 2.12: Anti-Patterns (Explicit Bans)

**Priority:** High
**Complexity:** Low
**Estimated Time:** 1-2 hours

**Banned:**

- Dribbble-style hero animations
- Neon gradients
- Overlapping text
- Visual metaphors requiring explanation
- "Brand moments" that distract

**Document:** `docs/design-system/anti-patterns.md`

---

## Epic Completion Criteria

Epic 2 is considered **COMPLETE** when:

✅ Visual north star documented
✅ Typography system implemented (font, scale, hierarchy)
✅ Color palette defined (warm neutrals, restrained accent)
✅ Spacing and layout system enforced
✅ Component primitives built (6-8 core components)
✅ Glassmorphism rules documented ("velvet glass")
✅ Motion constraints enforced (`prefers-reduced-motion`)
✅ Hand-drawn visual language guidelines created
✅ Iconography standards defined
✅ Accessibility baked into all components
✅ Page-specific constraints documented
✅ Anti-pattern list finalized

**Deliverables:**

1. `docs/design-system/visual-north-star.md`
2. `docs/design-system/typography.md`
3. `docs/design-system/colors.md`
4. `docs/design-system/spacing-layout.md`
5. `docs/design-system/components.md`
6. `docs/design-system/glassmorphism.md`
7. `docs/design-system/motion.md`
8. `docs/design-system/hand-drawn.md`
9. `docs/design-system/icons.md`
10. `docs/design-system/accessibility.md`
11. `docs/design-system/page-constraints.md`
12. `docs/design-system/anti-patterns.md`

**Design becomes invisible — and invisibility is trust.**
