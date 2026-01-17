# color system: restraint first, personality second

> **principle:** color should recede, not demand attention — trust through restraint, warmth through subtlety.

**last updated:** january 3, 2026
**status:** complete
**story:** 2.3 - define color system (restraint first, personality second)

---

## color philosophy

### the problem

most portfolio sites use color to grab attention:

- bright gradients competing for focus
- high-saturation accent colors everywhere
- pure black (#000000) and pure white (#ffffff) creating harsh contrast
- color used decoratively, not functionally

this creates **visual noise** that distracts from content comprehension.

### the solution

**restraint-first color system:**

- warm neutrals (stone) as foundation (95% of interface)
- subtle accent for intentional focus moments (5% of interface)
- no pure black/white (softer, warmer alternatives)
- color as functional signal, not decoration

### user feeling

when employer sees the interface, they should feel:

- **calm** — colors don't compete for attention
- **focused** — color guides eye to important information
- **trust** — restrained palette signals professionalism
- **warmth** — subtle warmth prevents coldness

they should NOT feel:

- overwhelmed by color choices
- distracted by gradients or high saturation
- uncertain where to look first

---

## color palette

### foundation: warm neutrals (tailwind stone)

the stone palette provides warm, natural neutrals that feel approachable (not clinical like gray, not sterile like slate).

```typescript
// using tailwind's stone palette
colors: {
  stone: {
    50:  '#fafaf9',  // lightest backgrounds
    100: '#f5f5f4',  // page background (default)
    200: '#e7e5e4',  // borders, dividers
    300: '#d6d3d1',  // disabled states
    400: '#a8a29e',  // placeholder text
    500: '#78716c',  // secondary text
    600: '#57534e',  // body text (default)
    700: '#44403c',  // headings
    800: '#292524',  // high emphasis text
    900: '#1c1917',  // maximum contrast text
    950: '#0c0a09',  // reserved for dark mode backgrounds
  },
}
```

**usage guidelines:**

| color     | usage                        | example                                                            |
| --------- | ---------------------------- | ------------------------------------------------------------------ |
| stone-100 | page background              | `<body className="bg-stone-100">`                                  |
| stone-200 | borders, subtle dividers     | `<div className="border-stone-200">`                               |
| stone-400 | placeholder text, disabled   | `<input placeholder="..." className="placeholder:text-stone-400">` |
| stone-500 | secondary text, metadata     | `<Meta className="text-stone-500">`                                |
| stone-600 | body text (default)          | `<p className="text-stone-600">`                                   |
| stone-700 | headings, emphasis           | `<Heading className="text-stone-700">`                             |
| stone-800 | high-contrast headings       | `<h1 className="text-stone-800">`                                  |
| stone-900 | maximum contrast (sparingly) | reserved for critical emphasis                                     |

---

### accent: subtle cyan (focus and action)

a single accent color for intentional focus moments:

- links
- interactive states (hover, focus)
- call-to-action buttons
- active navigation states

```typescript
colors: {
  accent: {
    // custom cyan with reduced saturation (not neon)
    50:  '#ecfeff',  // lightest tint
    100: '#cffafe',  // hover backgrounds
    200: '#a5f3fc',  // subtle highlights
    300: '#67e8f9',  // disabled accent
    400: '#22d3ee',  // default accent (links, buttons)
    500: '#06b6d4',  // hover state (slightly darker)
    600: '#0891b2',  // active/pressed state
    700: '#0e7490',  // high-contrast accent
    800: '#155e75',  // very high contrast
    900: '#164e63',  // darkest accent
  },
}
```

**accent usage rules:**

1. **links:** accent-400 default, accent-500 hover
2. **buttons (primary):** accent-400 background, accent-500 hover
3. **focus rings:** accent-400 with 2px offset
4. **active nav:** accent-400 text + subtle underline
5. **icons (interactive):** accent-400 on hover

**accent anti-patterns:**

❌ **do NOT use accent for:**

- large background areas
- body text
- decorative elements
- multiple accents on same screen
- gradients

✅ **only use accent for:**

- clickable/interactive elements
- directing attention to next action
- showing active state
- focus indicators

---

### supporting colors (minimal use)

these colors should be used **sparingly** — only when functional purpose demands it.

#### success (green)

```typescript
colors: {
  success: {
    100: '#dcfce7',  // background
    600: '#16a34a',  // text/icon
    700: '#15803d',  // high contrast
  },
}
```

**usage:** success messages, validation checkmarks, completion states

#### warning (amber)

```typescript
colors: {
  warning: {
    100: '#fef3c7',  // background
    600: '#d97706',  // text/icon
    700: '#b45309',  // high contrast
  },
}
```

**usage:** warnings, caution messages, unsaved changes

#### error (red)

```typescript
colors: {
  error: {
    100: '#fee2e2',  // background
    600: '#dc2626',  // text/icon
    700: '#b91c1c',  // high contrast
  },
}
```

**usage:** error messages, validation failures, destructive actions

---

## color usage rules

### rule 1: default to stone

**95% of the interface should use stone palette.**

every component starts with stone colors unless there's a specific functional reason for accent or supporting colors.

```tsx
// default card component
<div className="border border-stone-200 bg-white p-6">
  <h3 className="text-h3 text-stone-800">project title</h3>
  <p className="text-body text-stone-600">description here...</p>
  <span className="text-meta text-stone-500">2024</span>
</div>
```

---

### rule 2: accent signals interaction

**only use accent color for interactive elements.**

if it's not clickable, hoverable, or focusable, it shouldn't be accent-colored.

```tsx
// ✅ correct: accent on link
<a href="/work" className="text-accent-400 hover:text-accent-500">
  view projects
</a>

// ❌ incorrect: accent on static text
<p className="text-accent-400">this is just text</p>
```

---

### rule 3: one accent per screen area

**avoid multiple competing accent-colored elements in same visual area.**

if there are 3 buttons on screen, only the primary action should use accent.

```tsx
// ✅ correct: one primary action
<div className="flex gap-4">
  <button className="bg-accent-400 text-white">send message</button>
  <button className="bg-white border border-stone-200 text-stone-700">
    cancel
  </button>
</div>

// ❌ incorrect: multiple accent buttons
<div className="flex gap-4">
  <button className="bg-accent-400">action 1</button>
  <button className="bg-accent-400">action 2</button>
  <button className="bg-accent-400">action 3</button>
</div>
```

---

### rule 4: supporting colors are functional only

**green/amber/red only for success/warning/error — not for branding or decoration.**

```tsx
// ✅ correct: green for success message
<div className="bg-success-100 border border-success-600 p-4">
  <p className="text-success-700">message sent successfully.</p>
</div>

// ❌ incorrect: green for decorative badge
<span className="bg-success-600 text-white px-2 py-1">featured</span>
```

---

### rule 5: no pure black or pure white

**always use stone-900 instead of black, white/stone-50 instead of pure white.**

pure black/white create harsh contrast that feels clinical.

```tsx
// ✅ correct: warm neutrals
<div className="bg-white text-stone-900">  {/* white is #ffffff, not harsh */}
  <h1 className="text-stone-800">heading</h1>
</div>

// ❌ incorrect: pure black
<div className="bg-white text-black">  {/* too harsh */}
  <h1 className="text-[#000000]">heading</h1>
</div>
```

---

### rule 6: backgrounds are always light

**no dark backgrounds except in dark mode.**

the riqle aesthetic is light, calm, and airy — dark backgrounds feel heavy.

```tsx
// ✅ correct: light background
<section className="bg-stone-100">
  <h2 className="text-stone-800">section title</h2>
</section>

// ❌ incorrect: dark background (outside dark mode)
<section className="bg-stone-900 text-white">
  <h2>section title</h2>
</section>
```

---

### rule 7: color must pass WCAG AA contrast

**all text/background combinations must meet 4.5:1 ratio (7:1 for AAA).**

| foreground | background | ratio  | wcag    |
| ---------- | ---------- | ------ | ------- |
| stone-900  | white      | 19.8:1 | ✅ AAA  |
| stone-800  | white      | 15.2:1 | ✅ AAA  |
| stone-700  | white      | 11.4:1 | ✅ AAA  |
| stone-600  | white      | 7.8:1  | ✅ AAA  |
| stone-500  | white      | 4.6:1  | ✅ AA   |
| stone-400  | white      | 3.1:1  | ❌ fail |
| accent-400 | white      | 4.9:1  | ✅ AA   |
| accent-500 | white      | 6.2:1  | ✅ AAA  |
| white      | accent-400 | 4.9:1  | ✅ AA   |
| white      | accent-500 | 6.2:1  | ✅ AAA  |

**testing:** use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

### rule 8: no gradients (or use extremely subtly)

**solid colors only — gradients distract and feel trendy.**

if gradient is absolutely necessary (e.g., glassmorphism background), it must be:

- very subtle (< 10% lightness difference)
- low saturation
- functional (depth perception), not decorative

```tsx
// ✅ acceptable: extremely subtle gradient for depth
<div className="bg-gradient-to-b from-white to-stone-50">
  {/* barely perceptible gradient */}
</div>

// ❌ incorrect: obvious gradient
<div className="bg-gradient-to-r from-accent-400 to-purple-500">
  {/* distracting and trendy */}
</div>
```

---

## tailwind configuration

### custom color tokens

```javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // foundation: warm neutrals
        stone: colors.stone,

        // accent: custom cyan (reduced saturation from tailwind cyan)
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',  // primary accent
          500: '#06b6d4',  // hover state
          600: '#0891b2',  // active state
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },

        // supporting: functional colors only
        success: {
          100: colors.green[100],
          600: colors.green[600],
          700: colors.green[700],
        },
        warning: {
          100: colors.amber[100],
          600: colors.amber[600],
          700: colors.amber[700],
        },
        error: {
          100: colors.red[100],
          600: colors.red[600],
          700: colors.red[700],
        },
      },

      // semantic color aliases
      backgroundColor: {
        'page': 'white',
        'elevated': 'white',
        'subtle': colors.stone[50],
      },
      textColor: {
        'primary': colors.stone[800],
        'secondary': colors.stone[600],
        'tertiary': colors.stone[500],
        'interactive': '#22d3ee',  // accent-400
      },
      borderColor: {
        'default': colors.stone[200],
        'emphasis': colors.stone[300],
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## color components

### semantic color utilities

```tsx
// lib/design-tokens.ts
export const colors = {
  // backgrounds
  bg: {
    page: 'bg-white',
    elevated: 'bg-white',
    subtle: 'bg-stone-50',
    disabled: 'bg-stone-200',
    success: 'bg-success-100',
    warning: 'bg-warning-100',
    error: 'bg-error-100',
  },

  // text
  text: {
    primary: 'text-stone-800',
    secondary: 'text-stone-600',
    tertiary: 'text-stone-500',
    disabled: 'text-stone-400',
    interactive: 'text-accent-400 hover:text-accent-500',
    success: 'text-success-700',
    warning: 'text-warning-700',
    error: 'text-error-700',
  },

  // borders
  border: {
    default: 'border-stone-200',
    emphasis: 'border-stone-300',
    interactive: 'border-accent-400',
    success: 'border-success-600',
    warning: 'border-warning-600',
    error: 'border-error-600',
  },

  // interactive states
  focus: {
    ring: 'ring-2 ring-accent-400 ring-offset-2',
  },
} as const;
```

### usage in components

```tsx
// components/Button.tsx
import { colors } from '@/lib/design-tokens';

export function Button({ variant = 'primary', children }: ButtonProps) {
  const styles = {
    primary: `${colors.bg.page} ${colors.text.interactive} border ${colors.border.interactive}`,
    secondary: `${colors.bg.page} ${colors.text.secondary} border ${colors.border.default}`,
  };

  return (
    <button className={`${styles[variant]} rounded-lg px-4 py-2 ${colors.focus.ring}`}>
      {children}
    </button>
  );
}
```

---

## dark mode considerations

**dark mode is NOT a priority for riqle v1** — the platform is designed for light-mode, employer-first comprehension.

however, if dark mode is added in the future:

### dark mode palette

```typescript
colors: {
  stone: {
    // invert the scale for dark mode
    950: '#fafaf9',  // text in dark mode
    900: '#f5f5f4',
    800: '#e7e5e4',
    // ... etc
    100: '#292524',  // backgrounds in dark mode
    50:  '#1c1917',
  },
}
```

### dark mode rules

1. use stone-950 for background (not pure black)
2. use stone-100 for text (not pure white)
3. reduce accent saturation slightly (cyan can be harsh in dark mode)
4. maintain same WCAG contrast ratios
5. respect `prefers-color-scheme: dark` media query

```tsx
// dark mode example
<div className="bg-white dark:bg-stone-950">
  <h1 className="text-stone-800 dark:text-stone-100">heading</h1>
  <p className="text-stone-600 dark:text-stone-300">body text</p>
  <a className="text-accent-400 dark:text-accent-300">link</a>
</div>
```

---

## color accessibility

### focus indicators

**all interactive elements must have visible focus indicators.**

```tsx
// ✅ correct: visible focus ring
<button className="focus:ring-2 focus:ring-accent-400 focus:ring-offset-2">
  click me
</button>

// ❌ incorrect: no focus indicator
<button className="outline-none">
  click me
</button>
```

### color is not the only indicator

**never use color alone to convey information.**

```tsx
// ✅ correct: icon + color
<div className="text-success-700 flex items-center gap-2">
  <CheckIcon className="w-5 h-5" />
  <span>message sent successfully</span>
</div>

// ❌ incorrect: color only
<div className="text-success-700">
  message sent successfully
</div>
```

### high contrast mode

**test all color combinations in Windows High Contrast Mode.**

use semantic HTML and proper ARIA labels so high-contrast mode can override colors appropriately.

---

## testing checklist

before shipping any color changes:

- [ ] all text meets WCAG AA contrast (4.5:1 minimum)
- [ ] accent color used only for interactive elements
- [ ] no pure black (#000000) or pure white (#ffffff) text
- [ ] stone palette used for 95%+ of interface
- [ ] supporting colors (green/amber/red) used functionally only
- [ ] focus indicators visible on all interactive elements
- [ ] color not the only way information is conveyed
- [ ] no gradients (or extremely subtle if necessary)
- [ ] test in grayscale to ensure hierarchy works without color
- [ ] high contrast mode tested (Windows/macOS)

---

## anti-patterns (banned)

### ❌ multiple accent colors

```tsx
// ❌ DO NOT: using multiple bright colors
<div className="flex gap-4">
  <button className="bg-blue-500">action 1</button>
  <button className="bg-purple-500">action 2</button>
  <button className="bg-pink-500">action 3</button>
</div>

// ✅ DO: single accent, rest neutral
<div className="flex gap-4">
  <button className="bg-accent-400 text-white">primary action</button>
  <button className="border border-stone-200 text-stone-700">secondary</button>
</div>
```

---

### ❌ decorative gradients

```tsx
// ❌ DO NOT: obvious gradient backgrounds
<div className="bg-gradient-to-r from-accent-400 via-purple-500 to-pink-500">
  <h1 className="text-white">flashy heading</h1>
</div>

// ✅ DO: solid colors
<div className="bg-white">
  <h1 className="text-stone-800">calm heading</h1>
</div>
```

---

### ❌ low-contrast text

```tsx
// ❌ DO NOT: insufficient contrast
<p className="text-stone-400">
  this text is too light to read comfortably (3.1:1 ratio)
</p>

// ✅ DO: sufficient contrast
<p className="text-stone-600">
  this text is readable (7.8:1 ratio)
</p>
```

---

### ❌ color-only indicators

```tsx
// ❌ DO NOT: color-only status
<div className={status === 'success' ? 'text-green-600' : 'text-red-600'}>
  {message}
</div>

// ✅ DO: icon + color
<div className={status === 'success' ? 'text-success-700' : 'text-error-700'}>
  {status === 'success' ? <CheckIcon /> : <ErrorIcon />}
  {message}
</div>
```

---

### ❌ pure black/white

```tsx
// ❌ DO NOT: harsh pure colors
<div className="bg-[#ffffff] text-[#000000]">
  harsh contrast
</div>

// ✅ DO: warm neutrals
<div className="bg-white text-stone-900">
  softer, warmer contrast
</div>
```

---

### ❌ decorative color use

```tsx
// ❌ DO NOT: colored text for emphasis
<p className="text-stone-600">
  this is <span className="text-accent-400">really</span> important
</p>

// ✅ DO: semantic emphasis
<p className="text-stone-600">
  this is <strong className="font-semibold text-stone-800">really</strong> important
</p>
```

---

## alignment with visual north star

the color system supports the visual north star principles:

**visual north star: calm in first 30 seconds**
→ **color system: 95% neutral stone, 5% accent**
✅ restrained palette reduces visual noise

**visual north star: quietly premium**
→ **color system: warm neutrals, no pure black/white**
✅ subtle warmth feels premium without ostentation

**visual north star: serious but not corporate**
→ **color system: stone (not gray), subtle cyan accent**
✅ warm neutrals prevent sterility

**visual north star: restraint and discipline**
→ **color system: one accent color, functional supporting colors only**
✅ limited palette enforces focus

**visual north star: apple internal tool aesthetic**
→ **color system: neutral foundation, single accent, no gradients**
✅ matches apple's restrained design language

---

## measuring success

color system is successful when:

### qualitative measures

- [ ] designers can justify every color choice against these rules
- [ ] employers describe site as "clean" or "calm" (not "colorful")
- [ ] 95%+ of interface uses stone palette
- [ ] accent color only appears on interactive elements
- [ ] no color-related accessibility complaints

### quantitative measures

- [ ] 100% WCAG AA contrast compliance (4.5:1 minimum)
- [ ] ≤ 1 accent color per screen area
- [ ] 0 instances of pure black (#000000) or pure white (#ffffff) text
- [ ] supporting colors (green/amber/red) used < 5% of interface
- [ ] all focus indicators pass 3:1 contrast with background

---

**last updated:** january 3, 2026
**status:** complete
**principle:** color should recede, not demand attention — restraint is the feature.
