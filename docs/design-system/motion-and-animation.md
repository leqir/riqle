# motion and animation: calm, purposeful, respectful

> **principle:** motion guides attention and provides feedback — never decorates, never distracts, never forces itself on users.

**last updated:** january 3, 2026
**status:** complete
**story:** 2.7 - implement motion and animation constraints

---

## motion philosophy

### the problem

most portfolio sites use motion to grab attention:

- dramatic page transitions
- parallax scroll effects
- auto-playing animations on load
- elements flying in from all directions
- long, theatrical animations (1000ms+)
- no respect for reduced motion preferences

this creates **cognitive overload** and **accessibility barriers** — the opposite of calm comprehension.

### the solution

**calm, purposeful motion:**

- subtle transitions (50-300ms max)
- animations only on user interaction (hover, focus, click)
- no auto-play or forced motion
- mandatory `prefers-reduced-motion` support
- performance-first (60fps, transform/opacity only)
- functional purpose (feedback, guidance), not decoration

### user feeling

when employer interacts with the interface, they should:

- **feel responsiveness** — interface reacts to their actions
- **understand state changes** — transitions clarify what changed
- **stay in control** — no forced or unexpected motion

they should NOT:

- feel overwhelmed by dramatic animations
- lose track of content during transitions
- experience motion sickness or discomfort
- wait for animations to finish before continuing

---

## animation duration scale

### duration rules

**all animations must be fast — 300ms maximum.**

```typescript
// tailwind.config.ts - duration tokens
transitionDuration: {
  instant: '0ms',     // no animation (prefers-reduced-motion)
  fast: '100ms',      // micro-interactions (hover, focus)
  base: '200ms',      // default transitions (color, opacity)
  slow: '300ms',      // maximum duration (layout changes)
  // no 500ms+
}
```

### duration guidelines

| duration      | usage                | example                            |
| ------------- | -------------------- | ---------------------------------- |
| instant (0ms) | reduced motion mode  | all animations disabled            |
| fast (100ms)  | micro-interactions   | button hover, link color change    |
| base (200ms)  | standard transitions | dropdown open, tooltip fade        |
| slow (300ms)  | complex changes      | modal open, tab switch, glass blur |

```tsx
// ✅ correct: fast transitions
<button className="transition-colors duration-fast hover:bg-stone-50">
  {/* 100ms color transition */}
</button>

// ❌ incorrect: slow transitions
<button className="transition-all duration-1000 hover:scale-110">
  {/* 1000ms dramatic animation — too slow, too dramatic */}
</button>
```

---

## easing functions

### easing rules

**use appropriate easing for enter/exit animations.**

```typescript
// tailwind.config.ts - easing tokens
transitionTimingFunction: {
  'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',    // default: smooth deceleration
  'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',        // exit: smooth acceleration
  'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',  // reversible: smooth both ends
}
```

### easing guidelines

| easing      | usage             | example                             |
| ----------- | ----------------- | ----------------------------------- |
| ease-out    | elements entering | dropdown opening, tooltip appearing |
| ease-in     | elements exiting  | modal closing, tooltip disappearing |
| ease-in-out | reversible states | hover effects, focus rings          |

```tsx
// ✅ correct: ease-out for entering element
<div className="transition-opacity duration-base ease-out opacity-0 group-hover:opacity-100">
  tooltip fades in smoothly
</div>

// ✅ correct: ease-in for exiting element
<div className="transition-opacity duration-base ease-in opacity-100 group-hover:opacity-0">
  tooltip fades out smoothly
</div>
```

---

## allowed animations

### hover states

**subtle visual feedback on hover — color, opacity, scale (subtle).**

```tsx
// ✅ correct: subtle hover
<button className="
  text-stone-700
  hover:text-accent-400
  transition-colors duration-fast
">
  color change on hover
</button>

<div className="
  border border-stone-200
  hover:border-stone-300
  transition-colors duration-fast
">
  border color change
</div>

// ✅ acceptable: very subtle scale
<button className="
  hover:scale-[1.02]
  transition-transform duration-fast
">
  barely perceptible scale (2%)
</button>

// ❌ incorrect: dramatic hover
<button className="
  hover:scale-125
  hover:rotate-12
  transition-all duration-500
">
  too dramatic, too slow
</button>
```

---

### focus states

**always animate focus rings — helps keyboard users track focus.**

```tsx
// ✅ correct: animated focus ring
<button className="
  focus:ring-2 focus:ring-accent-400 focus:ring-offset-2
  transition-all duration-fast
">
  focus ring fades in quickly (100ms)
</button>

// ❌ incorrect: no transition on focus
<button className="focus:ring-2 focus:ring-accent-400">
  focus ring appears abruptly (jarring)
</button>
```

---

### state transitions

**smooth transitions when component state changes.**

```tsx
// ✅ correct: smooth tab switch
<div className={`
  transition-opacity duration-base
  ${isActive ? 'opacity-100' : 'opacity-0'}
`}>
  tab content fades in/out
</div>

// ✅ correct: dropdown open/close
<div className={`
  transition-all duration-base ease-out
  origin-top
  ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95'}
`}>
  dropdown scales from top
</div>
```

---

### loading states

**subtle spinners or skeleton screens — no bouncing, no pulsing.**

```tsx
// ✅ correct: simple spinner
<div className="
  border-2 border-stone-200 border-t-accent-400
  rounded-full w-6 h-6
  animate-spin
">
  {/* simple rotation, no dramatic effect */}
</div>

// ✅ correct: skeleton screen (static, no pulse)
<div className="space-y-4">
  <div className="h-4 bg-stone-200 rounded w-3/4" />
  <div className="h-4 bg-stone-200 rounded w-1/2" />
</div>

// ❌ incorrect: dramatic loading
<div className="animate-bounce animate-pulse scale-150">
  loading...
</div>
```

---

## banned animations

### ❌ page transitions

**no dramatic page transitions — content loads instantly.**

```tsx
// ❌ DO NOT: framer motion page transitions
<motion.div
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 100 }}
  transition={{ duration: 0.5 }}
>
  page content
</motion.div>

// ✅ DO: instant page load
<div>
  page content (no transition)
</div>
```

**rationale:** page transitions delay content visibility and violate "employer comprehension in 45 seconds" goal.

---

### ❌ load animations

**no animations on page load — content appears immediately.**

```tsx
// ❌ DO NOT: staggered fade-in on load
<div className="animate-fade-in-up animation-delay-100">
  <h1>content</h1>
</div>

// ✅ DO: instant render
<div>
  <h1>content</h1>
</div>
```

**rationale:** load animations waste time and feel theatrical.

---

### ❌ parallax scroll

**no parallax effects — content scrolls naturally.**

```tsx
// ❌ DO NOT: parallax layers
<div style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
  background moves slower than foreground
</div>

// ✅ DO: natural scroll
<div>
  content scrolls normally
</div>
```

**rationale:** parallax can cause motion sickness and feels gimmicky.

---

### ❌ scroll hijacking

**no scroll manipulation — user controls scroll speed and position.**

```tsx
// ❌ DO NOT: smooth scroll override
document.addEventListener('wheel', (e) => {
  e.preventDefault();
  // custom scroll logic
});

// ✅ DO: native scroll
{
  /* browser handles scroll naturally */
}
```

**rationale:** hijacking scroll frustrates users and breaks accessibility.

---

### ❌ auto-play

**no auto-playing animations, videos, or carousels.**

```tsx
// ❌ DO NOT: auto-playing carousel
<Carousel autoPlay interval={3000}>
  <Slide>1</Slide>
  <Slide>2</Slide>
</Carousel>

// ✅ DO: user-controlled carousel
<Carousel>
  <Slide>1</Slide>
  <Slide>2</Slide>
</Carousel>
{/* user clicks next/prev buttons */}
```

**rationale:** auto-play distracts and removes user control.

---

### ❌ entrance animations

**no elements flying in, sliding in, or fading in on scroll.**

```tsx
// ❌ DO NOT: scroll-triggered animations
<div className={`
  transition-all duration-500
  ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
`}>
  content animates when scrolled into view
</div>

// ✅ DO: static content
<div>
  content visible immediately
</div>
```

**rationale:** entrance animations delay comprehension and feel decorative.

---

## prefers-reduced-motion

### mandatory support

**all animations MUST respect `prefers-reduced-motion: reduce`.**

this is not optional — it's an accessibility requirement.

```css
/* ✅ correct: disable all animations if reduced motion preferred */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

### tailwind implementation

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: '200ms',
        0: '0ms', // for reduced motion
      },
    },
  },
  plugins: [
    // respect prefers-reduced-motion globally
    function ({ addVariant }) {
      addVariant('motion-safe', '@media (prefers-reduced-motion: no-preference)');
      addVariant('motion-reduce', '@media (prefers-reduced-motion: reduce)');
    },
  ],
};
```

---

### component-level support

```tsx
// ✅ correct: animation only if motion safe
<button className="
  motion-safe:transition-colors motion-safe:duration-fast
  hover:text-accent-400
">
  color change only if motion preference allows
</button>

// ✅ correct: disable spinner rotation if reduced motion
<div className="
  border-2 border-stone-200 border-t-accent-400 rounded-full
  motion-safe:animate-spin
">
  spinner rotates only if motion safe
</div>
```

---

### testing reduced motion

**test all animations with reduced motion enabled.**

```bash
# macOS: System Preferences → Accessibility → Display → Reduce Motion
# Windows: Settings → Ease of Access → Display → Show animations
# Firefox DevTools: Command Menu → "Emulate prefers-reduced-motion: reduce"
# Chrome DevTools: Command Menu → "Emulate CSS prefers-reduced-motion: reduce"
```

---

## performance optimization

### transform and opacity only

**animate only `transform` and `opacity` for 60fps performance.**

```tsx
// ✅ correct: transform/opacity (GPU accelerated)
<div className="
  transition-opacity duration-base
  hover:opacity-80
">
  opacity change (60fps)
</div>

<div className="
  transition-transform duration-base
  hover:scale-105
">
  scale change (60fps)
</div>

// ❌ incorrect: layout properties (causes reflow)
<div className="
  transition-all duration-base
  hover:w-80 hover:h-80 hover:p-8
">
  width/height/padding changes (janky, 30fps)
</div>
```

---

### will-change sparingly

**use `will-change` only for elements that will definitely animate.**

```tsx
// ✅ correct: will-change on hover target
<button className="
  hover:will-change-transform
  transition-transform duration-fast
  hover:scale-102
">
  will-change applied on hover
</button>

// ❌ incorrect: will-change everywhere
<div className="will-change-transform will-change-opacity will-change-contents">
  excessive will-change kills performance
</div>
```

---

### avoid animating many elements

**limit simultaneous animations to < 10 elements.**

```tsx
// ❌ DO NOT: animate 100+ cards simultaneously
<div className="grid grid-cols-3 gap-6">
  {projects.map((p, i) => (
    <div
      key={p.id}
      className="transition-all duration-500"
      style={{ animationDelay: `${i * 50}ms` }}
    >
      staggered animation on 100 cards = performance nightmare
    </div>
  ))}
</div>

// ✅ DO: static cards, animate on hover individually
<div className="grid grid-cols-3 gap-6">
  {projects.map((p) => (
    <Card
      key={p.id}
      className="transition-colors duration-fast hover:border-stone-300"
    >
      only the hovered card animates
    </Card>
  ))}
</div>
```

---

## transition utilities

### base transition classes

```tsx
// lib/design-tokens.ts
export const transitions = {
  // base transitions
  colors: 'transition-colors duration-fast ease-in-out',
  opacity: 'transition-opacity duration-base ease-out',
  transform: 'transition-transform duration-fast ease-in-out',
  all: 'transition-all duration-base ease-out',

  // specific use cases
  hover: 'transition-colors duration-fast ease-in-out',
  focus: 'transition-all duration-fast ease-in-out',
  dropdown: 'transition-all duration-base ease-out origin-top',
  modal: 'transition-opacity duration-base ease-out',
} as const;
```

---

### usage in components

```tsx
import { transitions } from '@/lib/design-tokens';

// button hover
<button className={`${transitions.hover} hover:text-accent-400`}>
  click me
</button>

// dropdown open
<div className={`
  ${transitions.dropdown}
  ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95'}
`}>
  dropdown content
</div>

// modal fade
<div className={`
  ${transitions.modal}
  ${isOpen ? 'opacity-100' : 'opacity-0'}
`}>
  modal backdrop
</div>
```

---

## animation examples

### button hover

```tsx
<button className="border-accent-400 text-accent-400 duration-fast hover:bg-accent-50 focus:ring-accent-400 rounded-lg border bg-white px-4 py-2 transition-colors focus:ring-2 focus:ring-offset-2">
  hover me
</button>
```

---

### link underline

```tsx
<a
  href="/work"
  className="text-accent-400 hover:decoration-accent-400 duration-fast underline decoration-transparent underline-offset-2 transition-all"
>
  hover to see underline animate
</a>
```

---

### card hover

```tsx
<div className="duration-fast rounded-lg border border-stone-200 p-6 transition-all hover:border-stone-300 hover:shadow-sm">
  card content
</div>
```

---

### tab switch

```tsx
export function Tabs({ tabs, activeTab, setActiveTab }: TabsProps) {
  return (
    <div>
      <div className="flex gap-4 border-b border-stone-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`duration-fast px-1 pb-2 transition-all ${
              activeTab === tab.id
                ? 'text-accent-400 border-accent-400 border-b-2'
                : 'text-stone-600 hover:text-stone-900'
            } `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`duration-base pt-6 transition-opacity ${activeTab === tab.id ? 'opacity-100' : 'hidden opacity-0'} `}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

---

### dropdown menu

```tsx
export function Dropdown({ isOpen }: DropdownProps) {
  return (
    <div
      className={`duration-base absolute right-0 top-full mt-2 min-w-[200px] origin-top rounded-lg border border-stone-200 bg-white p-2 shadow-lg transition-all ease-out ${
        isOpen ? 'scale-y-100 opacity-100' : 'pointer-events-none scale-y-95 opacity-0'
      } `}
    >
      menu items
    </div>
  );
}
```

---

### tooltip

```tsx
<div className="group relative">
  <button>hover me</button>
  <div className="duration-base pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-700 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
    tooltip text
  </div>
</div>
```

---

### modal

```tsx
export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* backdrop */}
      <div
        className="duration-base fixed inset-0 z-40 bg-stone-900/20 opacity-100 transition-opacity"
        onClick={onClose}
      />

      {/* modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="duration-base w-full max-w-2xl scale-100 rounded-lg border border-stone-200 bg-white p-8 opacity-100 shadow-xl transition-all ease-out">
          {children}
        </div>
      </div>
    </>
  );
}
```

---

## testing checklist

before shipping animations:

- [ ] all animations ≤ 300ms duration
- [ ] no page transitions
- [ ] no load animations
- [ ] no parallax effects
- [ ] no scroll hijacking
- [ ] no auto-play
- [ ] `prefers-reduced-motion` respected (all animations disabled)
- [ ] only `transform` and `opacity` animated (no layout properties)
- [ ] 60fps on mobile (test on real devices)
- [ ] < 10 elements animating simultaneously
- [ ] focus states have transitions
- [ ] appropriate easing (ease-out for enter, ease-in for exit)

---

## anti-patterns (banned)

### ❌ dramatic page transitions

```tsx
// ❌ DO NOT
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  page content
</motion.div>

// ✅ DO
<div>page content (instant)</div>
```

---

### ❌ slow transitions

```tsx
// ❌ DO NOT: 1000ms transitions
<div className="transition-all duration-1000">
  too slow
</div>

// ✅ DO: fast transitions
<div className="transition-colors duration-fast">
  100ms max
</div>
```

---

### ❌ animating layout properties

```tsx
// ❌ DO NOT: animate width/height
<div className="transition-all hover:w-80 hover:h-80">
  causes reflow (janky)
</div>

// ✅ DO: animate transform/opacity
<div className="transition-transform hover:scale-105">
  GPU accelerated (smooth)
</div>
```

---

### ❌ no reduced motion support

```tsx
// ❌ DO NOT: ignore prefers-reduced-motion
<div className="animate-spin">
  forces motion on users who requested none
</div>

// ✅ DO: respect user preference
<div className="motion-safe:animate-spin">
  only animates if motion preference allows
</div>
```

---

### ❌ staggered load animations

```tsx
// ❌ DO NOT: staggered entrance
{
  items.map((item, i) => (
    <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
      {item.title}
    </div>
  ));
}

// ✅ DO: instant render
{
  items.map((item) => <div key={item.id}>{item.title}</div>);
}
```

---

## alignment with visual north star

motion constraints support the visual north star principles:

**visual north star: calm in first 30 seconds**
→ **motion: no load animations, instant page render**
✅ content appears immediately, no theatrical delays

**visual north star: restraint and discipline**
→ **motion: 300ms max duration, hover/focus only**
✅ motion used sparingly, purposefully

**visual north star: accessible by default**
→ **motion: mandatory prefers-reduced-motion support**
✅ respects user preferences and needs

**visual north star: precise and intentional**
→ **motion: specific durations, appropriate easing**
✅ every animation has justified purpose

**visual north star: apple internal tool aesthetic**
→ **motion: subtle, functional, never dramatic**
✅ matches apple's restrained motion language

---

## measuring success

motion system is successful when:

### qualitative measures

- [ ] employers don't consciously notice animations
- [ ] motion feels responsive, not slow
- [ ] no complaints about motion sickness or distractions
- [ ] reduced motion mode works perfectly
- [ ] animations feel purposeful, not decorative

### quantitative measures

- [ ] 100% animations ≤ 300ms duration
- [ ] 0 page transitions
- [ ] 0 load animations
- [ ] 0 auto-play features
- [ ] 100% `prefers-reduced-motion` compliance
- [ ] 60fps on all animations (test on mobile)
- [ ] only `transform` and `opacity` animated (no layout properties)

---

**last updated:** january 3, 2026
**status:** complete
**principle:** motion guides attention and provides feedback — never decorates, never distracts, never forces itself on users.
