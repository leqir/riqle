/**
 * Design Tokens - Riqle.com Atomic Design System
 *
 * Encodes design patterns and decisions as TypeScript constants.
 * Maintains Tailwind benefits while ensuring consistency.
 *
 * Philosophy:
 * - Minimalist, Apple-inspired aesthetic
 * - Stone color palette throughout
 * - Clean typography with generous spacing
 * - Calm, professional interactions
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Text colors - Stone palette
  text: {
    primary: 'text-stone-900',
    secondary: 'text-stone-700',
    tertiary: 'text-stone-600',
    muted: 'text-stone-500',
    light: 'text-stone-400',
  },

  // Border colors
  border: {
    default: 'border-stone-200',
    subtle: 'border-stone-200/60',
    hover: 'border-stone-300',
    emphasis: 'border-stone-900',
  },

  // Background colors
  bg: {
    white: 'bg-white',
    stone: {
      50: 'bg-stone-50',
      100: 'bg-stone-100',
    },
  },

  // Accent colors per section
  accent: {
    work: {
      text: 'text-blue-600',
      textHover: 'hover:text-blue-700',
      groupHoverText: 'group-hover:text-blue-600',
      bg: 'bg-blue-600',
      bgHover: 'hover:bg-blue-700',
      border: 'border-blue-600',
      borderHover: 'hover:border-blue-300',
      bgSubtle: 'bg-blue-50',
      bgSubtleHover: 'hover:bg-blue-50/80',
      shadow: 'shadow-blue-600/30',
    },
    writing: {
      text: 'text-indigo-600',
      textHover: 'hover:text-indigo-700',
      groupHoverText: 'group-hover:text-indigo-600',
      bg: 'bg-indigo-600',
      bgHover: 'hover:bg-indigo-700',
      border: 'border-indigo-600',
      borderHover: 'hover:border-indigo-300',
      bgSubtle: 'bg-indigo-50',
      bgSubtleHover: 'hover:bg-indigo-50/80',
      shadow: 'shadow-indigo-600/30',
    },
    resources: {
      text: 'text-purple-600',
      textHover: 'hover:text-purple-700',
      groupHoverText: 'group-hover:text-purple-600',
      bg: 'bg-purple-600',
      bgHover: 'hover:bg-purple-700',
      border: 'border-purple-600',
      borderHover: 'hover:border-purple-300',
      bgSubtle: 'bg-purple-50',
      bgSubtleHover: 'hover:bg-purple-50/80',
      shadow: 'shadow-purple-600/30',
    },
  },
} as const;

// ============================================================================
// TYPOGRAPHY SCALE
// ============================================================================

export const typography = {
  // Heading styles
  heading: {
    h1: 'text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight',
    h2: 'text-4xl font-bold tracking-tight',
    h3: 'text-3xl font-semibold tracking-tight',
    h4: 'text-2xl font-semibold',
    h5: 'text-xl font-semibold',
    h6: 'text-lg font-semibold',
  },

  // Page-specific responsive headings
  pageTitle: 'text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight',

  // Body text styles
  body: {
    xl: 'text-xl leading-relaxed',
    lg: 'text-lg leading-relaxed',
    base: 'text-base leading-relaxed',
    sm: 'text-sm',
    xs: 'text-xs',
  },

  // Font weights
  weight: {
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
} as const;

// ============================================================================
// SPACING SCALE
// ============================================================================

export const spacing = {
  // Section padding (responsive)
  section: {
    mobile: 'px-6 py-24',
    desktop: 'md:px-8 md:py-32',
    combined: 'px-6 py-24 md:px-8 md:py-32',
  },

  // Container max-widths
  container: {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-7xl',
  },

  // Card spacing
  card: {
    padding: 'p-8',
    paddingLarge: 'p-8 md:p-12',
    gap: 'space-y-6',
    marginBottom: 'mb-16',
  },

  // Common gaps
  gap: {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  },
} as const;

// ============================================================================
// EFFECTS & INTERACTIONS
// ============================================================================

export const effects = {
  // Card effects
  card: {
    base: 'rounded-2xl border border-stone-200 bg-white transition-all duration-200',
    hover: 'hover:border-stone-300 hover:shadow-lg',
    combined:
      'rounded-2xl border border-stone-200 bg-white transition-all duration-200 hover:border-stone-300 hover:shadow-lg',
  },

  // Glassmorphism (used sparingly)
  glass: {
    base: 'bg-white/60 backdrop-blur-xl',
    card: 'rounded-3xl border border-stone-200/60 bg-gradient-to-br from-white/90 to-stone-50/90 backdrop-blur-xl',
  },

  // Button effects
  button: {
    base: 'transition-all duration-200',
    hover: 'hover:shadow-lg',
    active: 'active:scale-95',
  },

  // Border radius
  radius: {
    sm: 'rounded-lg',
    md: 'rounded-2xl',
    lg: 'rounded-3xl',
    full: 'rounded-full',
  },

  // Shadows
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  },
} as const;

// ============================================================================
// TRANSITIONS & ANIMATIONS
// ============================================================================

export const transitions = {
  fast: 'duration-150',
  base: 'duration-200',
  slow: 'duration-300',

  // Common transition patterns
  all: 'transition-all',
  colors: 'transition-colors',
  transform: 'transition-transform',
  opacity: 'transition-opacity',
} as const;

// ============================================================================
// LAYOUT PATTERNS
// ============================================================================

export const layout = {
  // Flexbox patterns
  flex: {
    row: 'flex flex-row',
    col: 'flex flex-col',
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-start',
  },

  // Grid patterns
  grid: {
    cols2: 'grid grid-cols-2',
    cols3: 'grid grid-cols-3',
    responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get accent color classes based on section
 */
export function getAccentColors(section: 'work' | 'writing' | 'resources') {
  return colors.accent[section];
}

/**
 * Combine multiple class strings (simple version, no deduplication)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
