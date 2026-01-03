# iconography: functional symbols, not decoration

> **principle:** icons clarify meaning and guide action — never used as decoration or to fill space.

**last updated:** january 3, 2026
**status:** complete
**story:** 2.9 - define iconography and visual symbols

---

## icon philosophy

### the problem

most portfolio sites misuse icons:

- icons used as decoration (filling white space)
- inconsistent icon styles (mixing solid, outline, duotone)
- icons without labels (accessibility barrier)
- too many icons (visual noise)
- custom icons that look amateur

this creates **confusion** and **accessibility issues** — icons should clarify, not complicate.

### the solution

**functional iconography:**

- icons used only when they clarify meaning or indicate action
- consistent icon library (Heroicons outline style)
- icons always paired with labels (or aria-label)
- limited icon set (< 20 unique icons across site)
- professional, recognizable symbols

### user feeling

when employer encounters icons, they should:

- **understand faster** — icons clarify meaning at a glance
- **know what's clickable** — icons signal interactive elements
- **feel confident** — recognizable symbols, not custom mysteries
- **access easily** — screen readers understand icon meaning

they should NOT:

- see icons as decoration
- guess what custom icons mean
- encounter icons without context
- struggle to use interface with screen reader

---

## icon library strategy

### recommended library: Heroicons

**use Heroicons (outline style) for all functional icons.**

```bash
npm install @heroicons/react
```

**rationale:**

- high-quality, professional design
- consistent 24x24 viewBox
- outline style matches visual north star (restrained)
- accessible by default (proper SVG structure)
- maintained by Tailwind Labs
- free and MIT licensed

```tsx
// ✅ correct: Heroicons outline
import { ArrowRightIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

<button>
  <span>next</span>
  <ArrowRightIcon className="h-5 w-5" />
</button>;
```

---

### icon styles

**use outline icons only — no solid, no duotone, no custom styles.**

```tsx
// ✅ correct: outline icons
import { HomeIcon } from '@heroicons/react/24/outline';

// ❌ incorrect: solid icons
import { HomeIcon } from '@heroicons/react/24/solid';

// ❌ incorrect: mixing styles
import { HomeIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
```

**rationale:** consistent visual weight and style across all icons.

---

## icon sizing

### size scale

**icons come in 3 standard sizes aligned with text.**

```typescript
// lib/design-tokens.ts
export const iconSizes = {
  sm: 'w-4 h-4', // 16px - inline with body text
  md: 'w-5 h-5', // 20px - inline with larger text, buttons
  lg: 'w-6 h-6', // 24px - standalone, headings
} as const;
```

### sizing guidelines

| size      | usage                        | example                         |
| --------- | ---------------------------- | ------------------------------- |
| sm (16px) | inline with body text        | "read more →" with arrow icon   |
| md (20px) | buttons, navigation          | button icon, nav item icon      |
| lg (24px) | section headings, standalone | feature icon, large button icon |

```tsx
// ✅ correct: icon sized to match text
<button className="flex items-center gap-2 text-base">
  <span>send message</span>
  <PaperAirplaneIcon className="w-5 h-5" />  {/* md: matches text-base */}
</button>

// ✅ correct: inline icon
<p className="flex items-center gap-2 text-body">
  <CheckIcon className="w-4 h-4 text-success-700" />  {/* sm: matches body text */}
  <span>message sent successfully</span>
</p>
```

---

## icon colors

### color inheritance

**icons inherit text color using `currentColor`.**

```tsx
// ✅ correct: icon inherits text color
<button className="text-accent-400 hover:text-accent-500">
  <ArrowRightIcon className="w-5 h-5" />
  {/* icon automatically matches text color */}
</button>

// ❌ incorrect: hard-coded icon color
<button className="text-accent-400">
  <ArrowRightIcon className="w-5 h-5 text-stone-900" />
  {/* icon doesn't match button text color */}
</button>
```

---

### functional color usage

**use color to signal icon meaning (success, warning, error).**

```tsx
// ✅ correct: green checkmark for success
<div className="flex items-center gap-2">
  <CheckIcon className="w-5 h-5 text-success-700" />
  <span className="text-success-700">published successfully</span>
</div>

// ✅ correct: red X for error
<div className="flex items-center gap-2">
  <XMarkIcon className="w-5 h-5 text-error-700" />
  <span className="text-error-700">upload failed</span>
</div>
```

---

## icon accessibility

### always provide labels

**icons must have text labels or aria-label.**

```tsx
// ✅ correct: icon with visible label
<button className="flex items-center gap-2">
  <PlusIcon className="w-5 h-5" />
  <span>add project</span>
</button>

// ✅ correct: icon with aria-label (when no visible text)
<button aria-label="close modal">
  <XMarkIcon className="w-5 h-5" />
</button>

// ❌ incorrect: icon without label
<button>
  <PlusIcon className="w-5 h-5" />
</button>
```

---

### decorative vs functional

**decorative icons use `aria-hidden="true"`, functional icons need labels.**

```tsx
// ✅ correct: decorative icon (text already provides meaning)
<a href="/work" className="flex items-center gap-2">
  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
  <span>view projects</span>
</a>

// ✅ correct: functional icon (icon is the only indicator)
<button aria-label="close">
  <XMarkIcon className="w-5 h-5" />
</button>
```

---

### screen reader support

**use semantic HTML and ARIA for icon-only buttons.**

```tsx
// ✅ correct: icon button with aria-label
<button
  onClick={handleDelete}
  aria-label="delete project"
  className="p-2 rounded hover:bg-stone-50"
>
  <TrashIcon className="w-5 h-5 text-stone-600" />
</button>

// ✅ correct: icon with sr-only text
<button className="flex items-center gap-2">
  <TrashIcon className="w-5 h-5" />
  <span className="sr-only">delete project</span>
</button>
```

---

## core icon set

### limit to essential icons

**use < 20 unique icons across the entire site.**

recommended core set for riqle:

#### navigation & actions

- `ArrowRightIcon` - forward navigation, CTAs
- `ArrowLeftIcon` - back navigation
- `HomeIcon` - home/dashboard
- `XMarkIcon` - close, dismiss, remove
- `PlusIcon` - add, create
- `PencilIcon` - edit
- `TrashIcon` - delete

#### status & feedback

- `CheckIcon` - success, completed
- `ExclamationTriangleIcon` - warning, caution
- `XCircleIcon` - error, failed
- `InformationCircleIcon` - info, help

#### content

- `DocumentTextIcon` - essays, writing
- `CodeBracketIcon` - code, projects
- `RocketLaunchIcon` - startups
- `BookmarkIcon` - saved, featured
- `TagIcon` - tags, categories

#### social & contact

- `EnvelopeIcon` - email, contact
- `LinkIcon` - external link

**rationale:** limited set = consistency + familiarity.

---

## icon usage patterns

### button icons

```tsx
// ✅ primary action with icon
<Button variant="primary" className="flex items-center gap-2">
  <span>send message</span>
  <PaperAirplaneIcon className="w-5 h-5" />
</Button>

// ✅ icon button (icon only)
<button
  aria-label="settings"
  className="p-2 rounded hover:bg-stone-50"
>
  <Cog6ToothIcon className="w-5 h-5" />
</button>
```

---

### navigation icons

```tsx
<nav className="flex gap-6">
  <Link href="/work" className="hover:text-accent-400 flex items-center gap-2 text-stone-700">
    <CodeBracketIcon className="h-5 w-5" aria-hidden="true" />
    <span>work</span>
  </Link>
  <Link href="/writing" className="hover:text-accent-400 flex items-center gap-2 text-stone-700">
    <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
    <span>writing</span>
  </Link>
</nav>
```

---

### status messages

```tsx
// success
<div className="flex items-center gap-2 p-4 bg-success-100 border border-success-600 rounded">
  <CheckIcon className="w-5 h-5 text-success-700" />
  <span className="text-success-700">project published successfully</span>
</div>

// error
<div className="flex items-center gap-2 p-4 bg-error-100 border border-error-600 rounded">
  <XCircleIcon className="w-5 h-5 text-error-700" />
  <span className="text-error-700">upload failed. please try again.</span>
</div>

// warning
<div className="flex items-center gap-2 p-4 bg-warning-100 border border-warning-600 rounded">
  <ExclamationTriangleIcon className="w-5 h-5 text-warning-700" />
  <span className="text-warning-700">unsaved changes</span>
</div>
```

---

### inline icons

```tsx
<p className="flex items-center gap-2 text-body text-stone-600">
  <CheckIcon className="w-4 h-4 text-success-700" />
  <span>all tests passing</span>
</p>

<a href="/work/project" className="inline-flex items-center gap-1 text-accent-400 hover:text-accent-500">
  <span>view project</span>
  <ArrowRightIcon className="w-4 h-4" />
</a>
```

---

### feature icons (sparingly)

```tsx
// ✅ acceptable: feature section with icon
<div className="flex items-start gap-4">
  <div className="p-3 bg-stone-100 rounded-lg">
    <RocketLaunchIcon className="w-6 h-6 text-stone-700" />
  </div>
  <div>
    <Heading level="h3">fast iteration</Heading>
    <p className="text-stone-600">ship features quickly without sacrificing quality</p>
  </div>
</div>

// ❌ incorrect: decorative icons everywhere
<Card>
  <Cog6ToothIcon className="w-20 h-20 text-stone-200" />
  <Heading>settings</Heading>
</Card>
```

---

## custom icons

### when to create custom icons

**only create custom icons when:**

1. no suitable Heroicon exists
2. icon represents unique brand/product concept
3. icon is critical for comprehension

**never create custom icons for:**

- common actions (use Heroicons)
- decoration
- "uniqueness" for its own sake

---

### custom icon requirements

if you must create custom icons:

```tsx
// components/icons/CustomIcon.tsx
export function CustomIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24" // standard viewBox
      fill="none"
      stroke="currentColor" // inherit color
      strokeWidth="1.5" // match Heroicons
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true" // if decorative
    >
      <path d="..." />
    </svg>
  );
}
```

**requirements:**

- 24x24 viewBox (consistent with Heroicons)
- `currentColor` for stroke/fill
- 1.5px stroke width (matches Heroicons outline)
- round line caps and joins
- clean, simple paths (no complex gradients or effects)

---

## icon components

### Icon wrapper component

```tsx
// components/primitives/Icon.tsx
import { ComponentType } from 'react';

interface IconProps {
  icon: ComponentType<{ className?: string }>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-hidden'?: boolean;
  'aria-label'?: string;
}

export function Icon({
  icon: IconComponent,
  size = 'md',
  className = '',
  ...ariaProps
}: IconProps) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return <IconComponent className={`${sizeMap[size]} ${className}`} {...ariaProps} />;
}
```

**usage:**

```tsx
import { ArrowRightIcon } from '@heroicons/react/24/outline';

<Icon icon={ArrowRightIcon} size="md" aria-hidden="true" />;
```

---

### IconButton component

```tsx
// components/primitives/IconButton.tsx
import { ComponentType } from 'react';

interface IconButtonProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

export function IconButton({
  icon: IconComponent,
  label,
  onClick,
  variant = 'default',
}: IconButtonProps) {
  const variantStyles = {
    default: 'text-stone-600 hover:bg-stone-50',
    danger: 'text-error-600 hover:bg-error-50',
  };

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`rounded p-2 transition-colors ${variantStyles[variant]}`}
    >
      <IconComponent className="h-5 w-5" />
    </button>
  );
}
```

**usage:**

```tsx
<IconButton icon={TrashIcon} label="delete project" onClick={handleDelete} variant="danger" />
```

---

## anti-patterns (banned)

### ❌ icons as decoration

```tsx
// ❌ DO NOT: large decorative icons
<div className="text-center">
  <Cog6ToothIcon className="w-32 h-32 text-stone-200" />
  <Heading>settings</Heading>
</div>

// ✅ DO: functional icon
<button className="flex items-center gap-2">
  <Cog6ToothIcon className="w-5 h-5" />
  <span>settings</span>
</button>
```

---

### ❌ mixing icon styles

```tsx
// ❌ DO NOT: mixing solid and outline
import { HomeIcon } from '@heroicons/react/24/solid';
import { UserIcon } from '@heroicons/react/24/outline';

// ✅ DO: consistent outline style
import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';
```

---

### ❌ icons without labels

```tsx
// ❌ DO NOT: icon button without label
<button>
  <TrashIcon className="w-5 h-5" />
</button>

// ✅ DO: icon button with aria-label
<button aria-label="delete project">
  <TrashIcon className="w-5 h-5" />
</button>
```

---

### ❌ hard-coded icon colors

```tsx
// ❌ DO NOT: hard-coded colors
<button className="text-accent-400">
  <ArrowRightIcon className="w-5 h-5 text-stone-900" />
  next
</button>

// ✅ DO: inherit text color
<button className="text-accent-400 hover:text-accent-500">
  <ArrowRightIcon className="w-5 h-5" />
  next
</button>
```

---

### ❌ too many unique icons

```tsx
// ❌ DO NOT: 50+ different icons across site
// creates visual inconsistency and confusion

// ✅ DO: < 20 core icons used consistently
// familiarity and recognition
```

---

### ❌ custom icons for common actions

```tsx
// ❌ DO NOT: custom icon for "close"
export function CustomCloseIcon() {
  return <svg>/* custom close icon */</svg>;
}

// ✅ DO: use Heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';
```

---

## testing checklist

before shipping icons:

- [ ] all icons from Heroicons outline library (or justified custom)
- [ ] consistent icon style (outline only, no solid)
- [ ] icons sized appropriately (sm: 16px, md: 20px, lg: 24px)
- [ ] icons inherit text color (`currentColor`)
- [ ] all icons have labels or aria-label
- [ ] decorative icons have `aria-hidden="true"`
- [ ] icon-only buttons have clear focus states
- [ ] < 20 unique icons across entire site
- [ ] no large decorative icons
- [ ] screen reader can understand all icon meanings

---

## alignment with visual north star

iconography supports the visual north star principles:

**visual north star: restraint and discipline**
→ **iconography: < 20 core icons, outline style only**
✅ limited, consistent icon set

**visual north star: functional clarity**
→ **iconography: icons clarify meaning, never decoration**
✅ every icon has purpose

**visual north star: accessible by default**
→ **iconography: aria-labels, text labels, semantic HTML**
✅ screen reader friendly

**visual north star: precise and intentional**
→ **iconography: specific sizes, consistent style**
✅ measured, not arbitrary

**visual north star: apple internal tool aesthetic**
→ **iconography: simple, outline icons (not decorative illustrations)**
✅ functional, not flashy

---

## measuring success

iconography is successful when:

### qualitative measures

- [ ] icons clarify meaning without explanation
- [ ] employers recognize all icons immediately
- [ ] screen reader users understand icon meanings
- [ ] icons feel cohesive and professional
- [ ] no confusion about icon meanings

### quantitative measures

- [ ] < 20 unique icons across site
- [ ] 100% Heroicons outline (or justified custom with same style)
- [ ] 100% icons have labels or aria-label
- [ ] 100% decorative icons have `aria-hidden="true"`
- [ ] consistent sizing (sm: 16px, md: 20px, lg: 24px)
- [ ] 0 hard-coded icon colors (all use `currentColor`)

---

**last updated:** january 3, 2026
**status:** complete
**principle:** icons clarify meaning and guide action — never used as decoration or to fill space.
