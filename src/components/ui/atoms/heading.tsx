/**
 * Heading Atom - Typography Component for Headings
 *
 * Features:
 * - All heading levels (h1-h6) with semantic HTML
 * - Responsive clamp() sizing for h1-h3
 * - Consistent tracking-tight and stone-900 color
 * - Size prop for custom sizing (overrides level default)
 *
 * Design Philosophy:
 * - Clean typography hierarchy
 * - Responsive scaling with viewport
 * - Stone color palette (never pure black)
 * - Generous whitespace
 */

'use client';

import { type ReactNode, createElement } from 'react';
import { cn, colors, typography } from '../design-tokens';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'page';

interface HeadingProps {
  level: HeadingLevel;
  size?: HeadingSize;
  children: ReactNode;
  className?: string;
}

const sizeStyles: Record<HeadingSize, string> = {
  h1: typography.heading.h1,
  h2: typography.heading.h2,
  h3: typography.heading.h3,
  h4: typography.heading.h4,
  h5: typography.heading.h5,
  h6: typography.heading.h6,
  page: typography.pageTitle,
};

export function Heading({ level, size, children, className = '' }: HeadingProps) {
  // Use size if provided, otherwise use level as size
  const appliedSize = size || level;

  return createElement(
    level,
    {
      className: cn(
        // Base heading styles
        colors.text.primary,

        // Size-specific styles
        sizeStyles[appliedSize],

        // Custom className
        className
      ),
    },
    children
  );
}
