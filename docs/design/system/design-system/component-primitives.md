# component primitives: design atoms that compose

> **principle:** simple, accessible primitives that do one thing well — complexity emerges through composition, not configuration.

**last updated:** january 3, 2026
**status:** complete
**story:** 2.5 - build component primitives (design atoms)

---

## primitives philosophy

### the problem

most design systems create "kitchen sink" components:

- buttons with 20 variants and prop combinations
- cards with infinite layout options
- components that try to handle every use case
- accessibility bolted on as afterthought
- inconsistent API patterns across components

this creates **maintenance burden** and **decision fatigue** — which variant should I use?

### the solution

**simple, composable primitives:**

- each component does one thing well
- limited variants (3 max per component)
- accessibility built in, not optional
- consistent API patterns
- compose small primitives into complex UI

### design principle

**composition over configuration** — build complex UI from simple, predictable primitives rather than configuring complex components.

```tsx
// ✅ composition: simple primitives combined
<Card>
  <Stack gap="md">
    <Heading level="h3">project title</Heading>
    <p className="text-stone-600">description</p>
    <Link href="/work/project">view project</Link>
  </Stack>
</Card>

// ❌ configuration: complex component with props
<ProjectCard
  title="project title"
  description="description"
  linkText="view project"
  linkHref="/work/project"
  variant="featured"
  size="large"
  showMeta={true}
  metaPosition="bottom"
/>
```

---

## primitive components

### 1. Button

**purpose:** trigger actions, submit forms, open modals

#### variants

```tsx
// components/primitives/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'font-medium rounded-lg transition-colors focus:ring-2 focus:ring-accent-400 focus:ring-offset-2';

  const variantStyles = {
    primary:
      'bg-white text-accent-400 border border-accent-400 hover:bg-accent-50 disabled:bg-stone-100 disabled:text-stone-400 disabled:border-stone-200',
    secondary:
      'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 disabled:bg-stone-100 disabled:text-stone-400',
    tertiary: 'bg-transparent text-accent-400 hover:text-accent-500 disabled:text-stone-400',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </button>
  );
}
```

#### usage guidelines

| variant   | usage                 | example                         |
| --------- | --------------------- | ------------------------------- |
| primary   | main action on page   | "send message", "view projects" |
| secondary | secondary actions     | "cancel", "learn more"          |
| tertiary  | de-emphasized actions | "skip", inline text actions     |

#### interactive states

- **default:** border visible, text clear
- **hover:** subtle background change (accent-50 for primary)
- **focus:** 2px accent ring with offset
- **active:** slightly darker background
- **disabled:** gray colors, cursor not-allowed

---

### 2. Link

**purpose:** navigate between pages or sections

#### variants

```tsx
// components/primitives/Link.tsx
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  variant?: 'inline' | 'standalone';
  external?: boolean;
  children: React.ReactNode;
}

export function Link({ href, variant = 'inline', external = false, children }: LinkProps) {
  const baseStyles =
    'transition-colors focus:ring-2 focus:ring-accent-400 focus:ring-offset-1 rounded';

  const variantStyles = {
    inline: 'text-accent-400 hover:text-accent-500 underline underline-offset-2',
    standalone:
      'text-stone-700 hover:text-accent-400 no-underline hover:underline underline-offset-4',
  };

  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <NextLink href={href} className={`${baseStyles} ${variantStyles[variant]}`} {...externalProps}>
      {children}
      {external && (
        <span className="ml-1 text-xs" aria-label="opens in new tab">
          ↗
        </span>
      )}
    </NextLink>
  );
}
```

#### usage guidelines

| variant    | usage                        | example                                  |
| ---------- | ---------------------------- | ---------------------------------------- |
| inline     | links within body text       | "read more about [design systems](link)" |
| standalone | navigation links, card links | "view all projects"                      |

#### accessibility

- underline for visibility (not color alone)
- external link icon (↗) with aria-label
- focus ring for keyboard navigation
- clear hover state

---

### 3. Input

**purpose:** text input, email, textarea

#### variants

```tsx
// components/primitives/Input.tsx
interface InputProps {
  type?: 'text' | 'email' | 'textarea';
  label: string;
  id: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function Input({
  type = 'text',
  label,
  id,
  placeholder,
  error,
  required = false,
  value,
  onChange,
}: InputProps) {
  const baseStyles =
    'w-full px-4 py-2.5 text-base text-stone-800 bg-white border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent';

  const stateStyles = error
    ? 'border-error-600 focus:ring-error-600'
    : 'border-stone-200 hover:border-stone-300';

  const InputElement = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-stone-700">
        {label}
        {required && <span className="text-error-600 ml-1">*</span>}
      </label>

      <InputElement
        id={id}
        type={type === 'textarea' ? undefined : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={type === 'textarea' ? 4 : undefined}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${baseStyles} ${stateStyles}`}
      />

      {error && (
        <p id={`${id}-error`} className="text-error-700 text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
```

#### interactive states

- **default:** light border (stone-200)
- **hover:** slightly darker border (stone-300)
- **focus:** accent ring, border transparent
- **error:** red border and error message
- **disabled:** gray background, not-allowed cursor

---

### 4. Card

**purpose:** group related content

#### variant

```tsx
// components/primitives/Card.tsx
interface CardProps {
  padding?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
  href?: string;
  children: React.ReactNode;
}

export function Card({ padding = 'md', clickable = false, href, children }: CardProps) {
  const baseStyles = 'bg-white border border-stone-200 rounded-lg transition-all';

  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const interactiveStyles =
    clickable || href ? 'hover:border-stone-300 hover:shadow-sm cursor-pointer' : '';

  const classes = `${baseStyles} ${paddingStyles[padding]} ${interactiveStyles}`;

  if (href) {
    return (
      <Link href={href} variant="standalone" className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
```

#### usage

```tsx
// ✅ static card
<Card padding="md">
  <Stack gap="sm">
    <Heading level="h3">project title</Heading>
    <p>project description</p>
  </Stack>
</Card>

// ✅ clickable card (entire card is link)
<Card padding="md" href="/work/project">
  <Stack gap="sm">
    <Heading level="h3">project title</Heading>
    <p>click anywhere on card to navigate</p>
  </Stack>
</Card>
```

---

### 5. Badge

**purpose:** labels, tags, status indicators

#### variants

```tsx
// components/primitives/Badge.tsx
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full';

  const variantStyles = {
    default: 'bg-stone-100 text-stone-700',
    success: 'bg-success-100 text-success-700',
    warning: 'bg-warning-100 text-warning-700',
    error: 'bg-error-100 text-error-700',
  };

  return <span className={`${baseStyles} ${variantStyles[variant]}`}>{children}</span>;
}
```

#### usage guidelines

| variant | usage            | example                       |
| ------- | ---------------- | ----------------------------- |
| default | tags, categories | "react", "typescript", "2024" |
| success | positive status  | "published", "active"         |
| warning | caution status   | "draft", "pending review"     |
| error   | negative status  | "archived", "deprecated"      |

---

### 6. Divider

**purpose:** visual separation between sections

#### variant

```tsx
// components/primitives/Divider.tsx
interface DividerProps {
  spacing?: 'sm' | 'md' | 'lg';
}

export function Divider({ spacing = 'md' }: DividerProps) {
  const spacingStyles = {
    sm: 'my-6', // 24px
    md: 'my-8', // 32px
    lg: 'my-12', // 48px
  };

  return <hr className={`border-stone-200 ${spacingStyles[spacing]}`} />;
}
```

#### usage

```tsx
// ✅ separate content sections
<Stack gap="lg">
  <section>
    <Heading level="h2">section 1</Heading>
    <p>content</p>
  </section>

  <Divider spacing="lg" />

  <section>
    <Heading level="h2">section 2</Heading>
    <p>content</p>
  </section>
</Stack>
```

---

### 7. Meta (metadata text)

**purpose:** secondary information (dates, tags, authors)

```tsx
// components/primitives/Meta.tsx
interface MetaProps {
  children: React.ReactNode;
  className?: string;
}

export function Meta({ children, className = '' }: MetaProps) {
  return <span className={`text-sm text-stone-500 ${className}`}>{children}</span>;
}
```

#### usage

```tsx
<Card>
  <Stack gap="sm">
    <Heading level="h3">essay title</Heading>
    <Meta>january 3, 2026 · 8 min read</Meta>
    <p>essay excerpt...</p>
  </Stack>
</Card>
```

---

## interactive states

all interactive primitives must have clear states:

### focus state

**all interactive elements must have visible focus indicators.**

```tsx
// ✅ visible focus ring
<button className="focus:ring-2 focus:ring-accent-400 focus:ring-offset-2">
  click me
</button>

// ❌ no focus indicator (accessibility violation)
<button className="outline-none">
  click me
</button>
```

**requirements:**

- 2px ring with accent-400 color
- 2px offset from element
- visible against all backgrounds
- never use `outline-none` without custom focus styles

---

### hover state

**hover should provide subtle feedback, not dramatic change.**

```tsx
// ✅ subtle hover
<button className="border-stone-200 hover:border-stone-300">
  subtle border change
</button>

// ❌ dramatic hover
<button className="bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500">
  too dramatic, violates visual north star
</button>
```

---

### active state

**active (pressed) state should be slightly darker than hover.**

```tsx
// ✅ clear progression
<button className="bg-white hover:bg-stone-50 active:bg-stone-100">default → hover → active</button>
```

---

### disabled state

**disabled elements should be visually de-emphasized.**

```tsx
// ✅ clear disabled state
<button disabled className="cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400">
  disabled button
</button>
```

**requirements:**

- gray colors (stone-100 background, stone-400 text)
- cursor: not-allowed
- no hover state when disabled
- `disabled` attribute (not just visual)

---

## composition patterns

### pattern 1: card with content

```tsx
<Card padding="md">
  <Stack gap="md">
    <Heading level="h3">project title</Heading>
    <Meta>2024 · web app</Meta>
    <p className="text-stone-600">brief description of the project</p>
    <div className="flex gap-2">
      <Badge>react</Badge>
      <Badge>typescript</Badge>
    </div>
    <Link href="/work/project" variant="standalone">
      view project →
    </Link>
  </Stack>
</Card>
```

---

### pattern 2: form with inputs

```tsx
<form onSubmit={handleSubmit}>
  <Stack gap="lg">
    <Heading level="h2">contact</Heading>

    <Input type="text" label="name" id="name" placeholder="your name" required />

    <Input
      type="email"
      label="email"
      id="email"
      placeholder="you@company.com"
      required
      error={errors.email}
    />

    <Input
      type="textarea"
      label="message"
      id="message"
      placeholder="tell me about your project"
      required
    />

    <div className="flex gap-4">
      <Button type="submit" variant="primary">
        send message
      </Button>
      <Button type="button" variant="secondary" onClick={handleCancel}>
        cancel
      </Button>
    </div>
  </Stack>
</form>
```

---

### pattern 3: list with badges

```tsx
<Stack gap="lg">
  <Heading level="h2">skills</Heading>
  <div className="flex flex-wrap gap-2">
    <Badge>react</Badge>
    <Badge>typescript</Badge>
    <Badge>next.js</Badge>
    <Badge>tailwind css</Badge>
    <Badge>node.js</Badge>
    <Badge>postgresql</Badge>
  </div>
</Stack>
```

---

## accessibility requirements

### keyboard navigation

**all interactive primitives must be keyboard-accessible.**

| component        | keyboard behavior            |
| ---------------- | ---------------------------- |
| Button           | Enter/Space to activate      |
| Link             | Enter to navigate            |
| Input            | Tab to focus, type to input  |
| Card (clickable) | Enter/Space if href provided |

```tsx
// ✅ keyboard-accessible button
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  accessible
</button>
```

---

### screen reader support

**all primitives must have proper ARIA labels.**

```tsx
// ✅ proper labeling
<Input
  label="email address"
  id="email"
  type="email"
  required
  aria-describedby="email-help"
/>
<p id="email-help" className="text-sm text-stone-500">
  we'll never share your email
</p>

// ✅ error state
<Input
  label="email"
  id="email"
  error="email required"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" role="alert">
  email required. format: name@company.com
</p>
```

---

### color contrast

**all text/background combinations must meet WCAG AA (4.5:1).**

| primitive                              | contrast | wcag   |
| -------------------------------------- | -------- | ------ |
| Button primary (accent-400 on white)   | 4.9:1    | ✅ AA  |
| Button secondary (stone-700 on white)  | 11.4:1   | ✅ AAA |
| Input text (stone-800 on white)        | 15.2:1   | ✅ AAA |
| Badge default (stone-700 on stone-100) | 8.2:1    | ✅ AAA |
| Meta text (stone-500 on white)         | 4.6:1    | ✅ AA  |

---

## component API consistency

all primitives follow consistent patterns:

### variant prop

**limited variants (3 max), string literals**

```tsx
// ✅ consistent variant API
<Button variant="primary" />
<Link variant="inline" />
<Badge variant="success" />
```

---

### size prop

**consistent sizing: sm, md, lg**

```tsx
// ✅ consistent sizing
<Button size="md" />
<Input size="md" />
<Card padding="md" />
```

---

### children prop

**content passed as children, not props**

```tsx
// ✅ children for content
<Button>click me</Button>
<Heading>title</Heading>
<Card>
  <p>card content</p>
</Card>

// ❌ props for content
<Button text="click me" />
<Heading title="title" />
```

---

### className prop (optional)

**allow className for one-off customization**

```tsx
// ✅ optional className for extension
<Button className="w-full">
  full-width button
</Button>

<Meta className="uppercase tracking-wide">
  styled metadata
</Meta>
```

---

## testing primitives

### visual regression testing

```tsx
// button.test.tsx
describe('Button', () => {
  it('renders all variants', () => {
    render(
      <>
        <Button variant="primary">primary</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="tertiary">tertiary</Button>
      </>
    );
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('shows disabled state', () => {
    render(<Button disabled>disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('handles click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

### accessibility testing

```tsx
// input.test.tsx
describe('Input accessibility', () => {
  it('associates label with input', () => {
    render(<Input label="email" id="email" />);
    const input = screen.getByLabelText('email');
    expect(input).toBeInTheDocument();
  });

  it('shows error with aria-invalid', () => {
    render(<Input label="email" id="email" error="required" />);
    const input = screen.getByLabelText('email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('required');
  });

  it('has keyboard navigation', () => {
    render(<Input label="name" id="name" />);
    const input = screen.getByLabelText('name');
    input.focus();
    expect(input).toHaveFocus();
  });
});
```

---

## anti-patterns (banned)

### ❌ too many variants

```tsx
// ❌ DO NOT: excessive variants
<Button
  variant="primary" | "secondary" | "tertiary" | "danger" | "success" | "info" | "warning" | "ghost" | "outline" | "link"
>
  which one to use?
</Button>

// ✅ DO: limited variants (3 max)
<Button variant="primary" | "secondary" | "tertiary">
  clear choice
</Button>
```

---

### ❌ complex prop APIs

```tsx
// ❌ DO NOT: configuration hell
<Card
  variant="featured"
  size="large"
  showMeta={true}
  metaPosition="bottom"
  imagePosition="top"
  imageFit="cover"
  borderRadius="lg"
  shadow="md"
>
  too many options
</Card>

// ✅ DO: simple primitive + composition
<Card padding="lg">
  <Stack gap="md">
    {/* compose your own layout */}
  </Stack>
</Card>
```

---

### ❌ no accessibility

```tsx
// ❌ DO NOT: no focus styles
<button className="outline-none">
  invisible to keyboard users
</button>

// ❌ DO NOT: no label association
<div>
  <span>Email</span>
  <input type="email" />
</div>

// ✅ DO: accessible by default
<Input label="email" id="email" type="email" />
```

---

### ❌ inconsistent APIs

```tsx
// ❌ DO NOT: different prop names for same concept
<Button size="md" />
<Input inputSize="medium" />
<Card cardPadding="lg" />

// ✅ DO: consistent naming
<Button size="md" />
<Input size="md" />
<Card padding="md" />
```

---

### ❌ styling via props

```tsx
// ❌ DO NOT: inline style props
<Button
  backgroundColor="#ff0000"
  padding="20px"
  fontSize="16px"
>
  breaks design system
</Button>

// ✅ DO: variants or className
<Button variant="primary" className="w-full">
  uses design tokens
</Button>
```

---

## alignment with visual north star

component primitives support the visual north star principles:

**visual north star: restraint and discipline**
→ **primitives: limited variants (3 max), consistent API**
✅ constraints enable focus

**visual north star: accessible by default**
→ **primitives: focus rings, ARIA labels, keyboard navigation**
✅ accessibility baked in, not bolted on

**visual north star: composition over configuration**
→ **primitives: simple atoms that compose**
✅ complexity through composition, not props

**visual north star: precise and intentional**
→ **primitives: one clear purpose per component**
✅ every primitive has justified existence

**visual north star: apple internal tool aesthetic**
→ **primitives: subtle interactions, clear states**
✅ functional clarity, not decoration

---

## measuring success

component primitives are successful when:

### qualitative measures

- [ ] developers can build complex UI without custom components
- [ ] no prop confusion ("which variant should I use?")
- [ ] all primitives have clear, single purpose
- [ ] accessibility works without extra effort
- [ ] consistent API patterns across all primitives

### quantitative measures

- [ ] ≤ 3 variants per primitive
- [ ] 100% keyboard accessibility
- [ ] 100% WCAG AA contrast compliance
- [ ] 0 focus states removed (`outline-none` without replacement)
- [ ] consistent prop naming (size, variant, children)

---

**last updated:** january 3, 2026
**status:** complete
**principle:** simple, accessible primitives that do one thing well — complexity emerges through composition.
