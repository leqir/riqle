# hand-drawn visual language: surgical use, not decoration

> **principle:** hand-drawn elements add warmth and humanity — used surgically to guide attention, never as decoration.

**last updated:** january 3, 2026
**status:** complete
**story:** 2.8 - create hand-drawn visual language (surgical use)

---

## hand-drawn philosophy

### the problem

most portfolio sites are either:

- completely sterile (no personality, corporate feel)
- over-decorated (illustrations everywhere, childish feel)
- trendy (using hand-drawn elements as decoration, not function)

this creates **personality mismatch** — either too cold or too playful for a professional portfolio.

### the solution

**surgical hand-drawn elements:**

- used sparingly (< 5% of interface)
- functional purpose (guide attention, emphasize, annotate)
- subtle, not loud (single-color, simple strokes)
- professional, not whimsical
- hand-crafted feel, not clip-art

### user feeling

when employer encounters hand-drawn elements, they should:

- **feel warmth** — human touch, not corporate sterile
- **notice emphasis** — hand-drawn arrows/underlines guide attention
- **trust authenticity** — imperfections signal genuine craft
- **stay focused** — decoration never distracts from content

they should NOT:

- feel the site is childish or unprofessional
- see hand-drawn elements everywhere (visual clutter)
- notice decoration over content

---

## "surgical use" principle

### what "surgical" means

**use hand-drawn elements only when they serve a specific purpose.**

approved purposes:

1. **directional** — arrows, underlines, circles that guide attention
2. **emphasis** — highlighting key information
3. **annotation** — marginal notes, callouts
4. **separation** — subtle dividers, brackets
5. **decoration (very sparingly)** — accent on hero section only

banned purposes:

- filling white space
- making page "more interesting"
- following design trends
- decoration for decoration's sake

---

## hand-drawn element types

### 1. arrows (guide attention)

**purpose:** direct eye to important content or next action

```tsx
// components/hand-drawn/Arrow.tsx
interface ArrowProps {
  direction?: 'right' | 'down' | 'up' | 'left';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HandDrawnArrow({ direction = 'right', size = 'md', className = '' }: ArrowProps) {
  const sizeMap = {
    sm: 'w-12 h-8',
    md: 'w-16 h-10',
    lg: 'w-20 h-12',
  };

  // SVG path for hand-drawn arrow (slightly imperfect)
  return (
    <svg
      viewBox="0 0 40 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${sizeMap[size]} ${className}`}
      style={{ transform: directionRotation[direction] }}
    >
      {/* slightly wobbly line */}
      <path d="M 2 12 Q 10 11, 20 12 T 35 12" />
      {/* arrow head */}
      <path d="M 30 7 L 38 12 L 30 17" />
    </svg>
  );
}
```

**usage:**

```tsx
// ✅ correct: arrow pointing to CTA
<div className="flex items-center gap-4">
  <HandDrawnArrow direction="right" className="text-accent-400" />
  <Button variant="primary">view projects</Button>
</div>

// ❌ incorrect: arrows everywhere
<div className="flex flex-col gap-2">
  <HandDrawnArrow />
  <p>paragraph 1</p>
  <HandDrawnArrow />
  <p>paragraph 2</p>
  <HandDrawnArrow />
  <p>paragraph 3</p>
</div>
```

---

### 2. underlines (emphasize text)

**purpose:** highlight key phrases or calls-to-action

```tsx
// components/hand-drawn/Underline.tsx
interface UnderlineProps {
  children: React.ReactNode;
  color?: 'accent' | 'subtle';
}

export function HandDrawnUnderline({ children, color = 'accent' }: UnderlineProps) {
  const colorMap = {
    accent: 'text-accent-400',
    subtle: 'text-stone-300',
  };

  return (
    <span className="relative inline-block">
      {children}
      <svg
        viewBox="0 0 100 6"
        className={`absolute -bottom-1 left-0 w-full ${colorMap[color]}`}
        preserveAspectRatio="none"
      >
        {/* hand-drawn wobbly underline */}
        <path
          d="M 0 3 Q 25 2, 50 3 T 100 3"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
```

**usage:**

```tsx
// ✅ correct: emphasize key phrase
<p className="text-h3">
  i build <HandDrawnUnderline>data-heavy tools</HandDrawnUnderline> for technical users
</p>

// ❌ incorrect: underline every word
<p>
  <HandDrawnUnderline>i</HandDrawnUnderline> <HandDrawnUnderline>build</HandDrawnUnderline> <HandDrawnUnderline>tools</HandDrawnUnderline>
</p>
```

---

### 3. circles/highlights (call attention)

**purpose:** circle or highlight important numbers, badges, or small elements

```tsx
// components/hand-drawn/Circle.tsx
export function HandDrawnCircle({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex items-center justify-center">
      {children}
      <svg
        viewBox="0 0 60 60"
        className="text-accent-400 pointer-events-none absolute inset-0 h-full w-full"
      >
        {/* imperfect circle */}
        <ellipse
          cx="30"
          cy="30"
          rx="28"
          ry="27"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          transform="rotate(-5 30 30)"
        />
      </svg>
    </span>
  );
}
```

**usage:**

```tsx
// ✅ correct: circle key metric
<div className="text-center">
  <HandDrawnCircle>
    <span className="text-display font-semibold text-stone-900">8 years</span>
  </HandDrawnCircle>
  <p className="text-meta text-stone-500">building software</p>
</div>

// ❌ incorrect: circle every badge
<div className="flex gap-2">
  <HandDrawnCircle><Badge>react</Badge></HandDrawnCircle>
  <HandDrawnCircle><Badge>typescript</Badge></HandDrawnCircle>
  <HandDrawnCircle><Badge>node</Badge></HandDrawnCircle>
</div>
```

---

### 4. brackets (group content)

**purpose:** visually group related items with hand-drawn brackets

```tsx
// components/hand-drawn/Bracket.tsx
export function HandDrawnBracket({
  side = 'left',
  children,
}: {
  side?: 'left' | 'right';
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 8 100"
        className={`absolute top-0 ${side === 'left' ? 'left-0 -ml-4' : 'right-0 -mr-4'} h-full w-4 text-stone-300`}
        preserveAspectRatio="none"
      >
        <path
          d={side === 'left' ? 'M 6 0 Q 2 50, 6 100' : 'M 2 0 Q 6 50, 2 100'}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div className="pl-6">{children}</div>
    </div>
  );
}
```

**usage:**

```tsx
// ✅ correct: bracket related list
<HandDrawnBracket side="left">
  <ul className="space-y-2">
    <li>core skill 1</li>
    <li>core skill 2</li>
    <li>core skill 3</li>
  </ul>
</HandDrawnBracket>

// ❌ incorrect: bracket single item
<HandDrawnBracket>
  <p>single paragraph</p>
</HandDrawnBracket>
```

---

### 5. scribbles/crosses (strikethrough, corrections)

**purpose:** show before/after, corrections, or "old way vs new way"

```tsx
// components/hand-drawn/Scribble.tsx
export function HandDrawnScribble({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block opacity-50">
      {children}
      <svg
        viewBox="0 0 100 8"
        className="text-error-600 absolute left-0 top-1/2 w-full -translate-y-1/2"
        preserveAspectRatio="none"
      >
        {/* scribbled strikethrough */}
        <path
          d="M 0 3 L 20 5 L 40 2 L 60 6 L 80 3 L 100 4"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M 0 5 L 25 2 L 50 6 L 75 3 L 100 5"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </span>
  );
}
```

**usage:**

```tsx
// ✅ correct: show evolution of thinking
<p>
  <HandDrawnScribble>old approach: build everything from scratch</HandDrawnScribble>
  <br />
  new approach: compose existing tools
</p>

// ❌ incorrect: scribble for emphasis
<p>
  this is <HandDrawnScribble>really important</HandDrawnScribble>
</p>
```

---

### 6. marginal annotations (notes, labels)

**purpose:** add marginal notes or labels (sparingly)

```tsx
// components/hand-drawn/Annotation.tsx
export function HandDrawnAnnotation({
  text,
  position = 'right',
}: {
  text: string;
  position?: 'left' | 'right';
}) {
  return (
    <span
      className={`absolute top-1/2 -translate-y-1/2 ${position === 'left' ? '-left-32' : '-right-32'} font-handwriting rotate-[-3deg] text-xs text-stone-500`}
    >
      {text}
    </span>
  );
}
```

**usage:**

```tsx
// ✅ correct: annotate key section
<div className="relative">
  <HandDrawnAnnotation text="this is key →" position="left" />
  <Card>important content</Card>
</div>

// ❌ incorrect: annotate every paragraph
<div className="space-y-4">
  <div className="relative">
    <HandDrawnAnnotation text="note 1" />
    <p>paragraph</p>
  </div>
  <div className="relative">
    <HandDrawnAnnotation text="note 2" />
    <p>paragraph</p>
  </div>
</div>
```

---

## hand-drawn style rules

### rule 1: subtle imperfection

**hand-drawn elements should feel hand-crafted, not perfect.**

```tsx
// ✅ correct: slightly wobbly line
<path d="M 0 10 Q 25 9, 50 10 T 100 10" />

// ❌ incorrect: perfectly straight line
<path d="M 0 10 L 100 10" />
```

characteristics of good hand-drawn elements:

- slight wobble in lines
- imperfect circles (ellipses)
- varying stroke width (subtle)
- hand-drawn, not computer-generated feel

---

### rule 2: single color only

**hand-drawn elements use one color — accent or subtle gray.**

```tsx
// ✅ correct: single color (accent)
<HandDrawnArrow className="text-accent-400" />

// ✅ correct: single color (subtle)
<HandDrawnUnderline color="subtle" />

// ❌ incorrect: multi-color
<svg>
  <path stroke="#ff0000" />
  <path stroke="#00ff00" />
  <path stroke="#0000ff" />
</svg>
```

---

### rule 3: consistent stroke width

**all hand-drawn elements use 1.5-2px stroke width.**

```tsx
// ✅ correct: consistent stroke
<path stroke="currentColor" strokeWidth="1.5" />

// ❌ incorrect: varying stroke
<path stroke="currentColor" strokeWidth="0.5" />
<path stroke="currentColor" strokeWidth="4" />
```

---

### rule 4: SVG-based (scalable)

**all hand-drawn elements are SVG — never raster images.**

```tsx
// ✅ correct: SVG component
export function HandDrawnArrow() {
  return <svg>...</svg>;
}

// ❌ incorrect: PNG image
<img src="/arrow-hand-drawn.png" alt="arrow" />;
```

---

### rule 5: currentColor for inheritance

**use `currentColor` so elements inherit text color.**

```tsx
// ✅ correct: inherits color
<svg stroke="currentColor" className="text-accent-400">
  <path d="..." />
</svg>

// ❌ incorrect: hard-coded color
<svg stroke="#22d3ee">
  <path d="..." />
</svg>
```

---

## usage patterns

### hero section accent

```tsx
// ✅ acceptable: single hand-drawn element in hero
<section className="py-32">
  <Container>
    <Stack gap="lg">
      <div className="flex items-baseline gap-4">
        <h1 className="text-display">nathanael</h1>
        <HandDrawnArrow direction="down" className="text-accent-400" />
      </div>
      <p className="text-h3 text-stone-600">
        i build <HandDrawnUnderline>data-heavy tools</HandDrawnUnderline> for technical users
      </p>
    </Stack>
  </Container>
</section>
```

---

### emphasize key metric

```tsx
// ✅ acceptable: circle one key number
<div className="grid grid-cols-3 gap-8">
  <div>
    <HandDrawnCircle>
      <span className="text-display">8</span>
    </HandDrawnCircle>
    <p className="text-meta">years experience</p>
  </div>
  <div>
    <span className="text-display">15</span>
    <p className="text-meta">projects shipped</p>
  </div>
  <div>
    <span className="text-display">3</span>
    <p className="text-meta">startups founded</p>
  </div>
</div>
```

---

### guide to next action

```tsx
// ✅ acceptable: arrow pointing to CTA
<section>
  <Stack gap="xl">
    <p>ready to work together?</p>
    <div className="flex items-center gap-4">
      <HandDrawnArrow direction="right" className="text-accent-400" />
      <Button href="/contact">send message</Button>
    </div>
  </Stack>
</section>
```

---

### bracket related items

```tsx
// ✅ acceptable: bracket list of core skills
<section>
  <Heading level="h2">core skills</Heading>
  <HandDrawnBracket side="left">
    <ul className="space-y-2">
      <li>react / typescript / next.js</li>
      <li>node.js / postgresql</li>
      <li>system design / architecture</li>
    </ul>
  </HandDrawnBracket>
</section>
```

---

## anti-patterns (banned)

### ❌ hand-drawn everywhere

```tsx
// ❌ DO NOT: hand-drawn on every element
<div className="space-y-4">
  <HandDrawnArrow />
  <Card>
    <HandDrawnUnderline>project 1</HandDrawnUnderline>
  </Card>
  <HandDrawnArrow />
  <Card>
    <HandDrawnCircle>project 2</HandDrawnCircle>
  </Card>
  <HandDrawnArrow />
  <Card>
    <HandDrawnUnderline>project 3</HandDrawnUnderline>
  </Card>
</div>

// ✅ DO: hand-drawn sparingly (< 5% of interface)
<div className="space-y-4">
  <Card>project 1</Card>
  <Card>project 2</Card>
  <Card>project 3</Card>
</div>
```

---

### ❌ decorative illustrations

```tsx
// ❌ DO NOT: decorative illustrations
<div>
  <img src="/hand-drawn-rocket.svg" alt="decorative rocket" />
  <h2>projects</h2>
</div>

// ✅ DO: functional hand-drawn elements only
<div>
  <h2>projects</h2>
  <HandDrawnArrow direction="down" className="text-subtle" />
</div>
```

---

### ❌ multi-color hand-drawn

```tsx
// ❌ DO NOT: colorful hand-drawn elements
<svg>
  <path stroke="#ff0000" d="..." />
  <path stroke="#00ff00" d="..." />
  <path stroke="#0000ff" d="..." />
</svg>

// ✅ DO: single color
<svg stroke="currentColor" className="text-accent-400">
  <path d="..." />
</svg>
```

---

### ❌ perfect geometric shapes

```tsx
// ❌ DO NOT: perfect circles/lines
<svg>
  <circle cx="50" cy="50" r="40" />
  <line x1="0" y1="50" x2="100" y2="50" />
</svg>

// ✅ DO: imperfect, hand-drawn
<svg>
  <ellipse cx="50" cy="50" rx="40" ry="38" transform="rotate(-3 50 50)" />
  <path d="M 0 50 Q 25 49, 50 50 T 100 50" />
</svg>
```

---

### ❌ raster images

```tsx
// ❌ DO NOT: PNG/JPG hand-drawn elements
<img src="/arrow.png" alt="arrow" />

// ✅ DO: SVG components
<HandDrawnArrow />
```

---

## handwriting font (annotations only)

### when to use handwriting

**only for marginal annotations — never for body text or headings.**

```tsx
// ✅ correct: annotation text
<span className="font-handwriting text-xs text-stone-500">
  note: this is key
</span>

// ❌ incorrect: handwriting for headings
<h1 className="font-handwriting text-display">
  projects
</h1>
```

---

### font selection

```typescript
// app/layout.tsx
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
  weight: ['400', '500'],
});

// tailwind.config.ts
fontFamily: {
  handwriting: ['var(--font-handwriting)', 'cursive'],
}
```

---

## accessibility requirements

### decorative vs functional

**decorative hand-drawn elements must have `aria-hidden="true"`.**

```tsx
// ✅ correct: decorative arrow (aria-hidden)
<div className="flex items-center gap-4">
  <svg aria-hidden="true" className="text-accent-400">
    <HandDrawnArrow />
  </svg>
  <Button>click here</Button>
</div>

// ✅ correct: functional arrow (alt text)
<div>
  <HandDrawnArrow aria-label="points to call-to-action button" />
  <Button>click here</Button>
</div>
```

---

### color contrast

**hand-drawn elements must meet WCAG contrast if functional.**

```tsx
// ✅ correct: high contrast
<HandDrawnArrow className="text-accent-400" />;
{
  /* accent-400 on white = 4.9:1 (passes AA) */
}

// ❌ incorrect: low contrast
<HandDrawnArrow className="text-stone-300" />;
{
  /* stone-300 on white = 2.1:1 (fails AA) */
}
```

---

### focus indicators

**interactive hand-drawn elements must have focus states.**

```tsx
// ✅ correct: focusable with ring
<button className="focus:ring-accent-400 focus:ring-2">
  <HandDrawnArrow />
  <span>next</span>
</button>
```

---

## testing checklist

before shipping hand-drawn elements:

- [ ] hand-drawn elements used < 5% of interface
- [ ] all elements have functional purpose (not decorative)
- [ ] single color only (accent or subtle gray)
- [ ] SVG-based (no raster images)
- [ ] subtle imperfection (wobbly lines, not perfect)
- [ ] consistent stroke width (1.5-2px)
- [ ] `currentColor` for color inheritance
- [ ] decorative elements have `aria-hidden="true"`
- [ ] functional elements meet WCAG AA contrast
- [ ] handwriting font only for annotations (not body/headings)

---

## alignment with visual north star

hand-drawn elements support the visual north star principles:

**visual north star: human through imperfection**
→ **hand-drawn: subtle imperfection, hand-crafted feel**
✅ warmth without sacrificing professionalism

**visual north star: restraint and discipline**
→ **hand-drawn: surgical use (< 5% of interface)**
✅ used sparingly for emphasis, not decoration

**visual north star: precise and intentional**
→ **hand-drawn: functional purpose only**
✅ every element justifies its existence

**visual north star: serious but not corporate**
→ **hand-drawn: warmth without whimsy**
✅ human touch without childish feel

**visual north star: accessible by default**
→ **hand-drawn: WCAG contrast, aria-hidden, focus states**
✅ accessibility baked in

---

## measuring success

hand-drawn elements are successful when:

### qualitative measures

- [ ] employers feel warmth, not sterility
- [ ] elements guide attention without distraction
- [ ] site feels professional, not childish
- [ ] hand-drawn elements noticed but not distracting
- [ ] imperfections feel intentional, not sloppy

### quantitative measures

- [ ] hand-drawn elements < 5% of interface
- [ ] 100% SVG-based (no raster images)
- [ ] single color usage (accent or subtle gray)
- [ ] stroke width consistent (1.5-2px)
- [ ] WCAG AA contrast on functional elements
- [ ] 100% decorative elements have `aria-hidden="true"`

---

**last updated:** january 3, 2026
**status:** complete
**principle:** hand-drawn elements add warmth and humanity — used surgically to guide attention, never as decoration.
