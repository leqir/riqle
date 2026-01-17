/**
 * Text Atom - Typography Component for Body Text
 *
 * Features:
 * - Multiple size variants (xs, sm, base, lg, xl)
 * - Color variants (primary, secondary, tertiary, muted)
 * - Semantic HTML element selection
 * - Leading-relaxed for readability
 *
 * Design Philosophy:
 * - Stone color palette for all text
 * - Generous line-height for readability
 * - Clear visual hierarchy through color
 * - Minimalist, clean typography
 */

'use client';

import { type ReactNode } from 'react';
import { cn, colors, typography } from '../design-tokens';

type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
type TextColor = 'primary' | 'secondary' | 'tertiary' | 'muted' | 'light';
type TextElement = 'p' | 'span' | 'div' | 'label';

interface TextProps {
  size?: TextSize;
  color?: TextColor;
  as?: TextElement;
  children: ReactNode;
  className?: string;
}

const colorStyles: Record<TextColor, string> = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  tertiary: colors.text.tertiary,
  muted: colors.text.muted,
  light: colors.text.light,
};

const sizeStyles: Record<TextSize, string> = {
  xs: typography.body.xs,
  sm: typography.body.sm,
  base: typography.body.base,
  lg: typography.body.lg,
  xl: typography.body.xl,
};

export function Text({
  size = 'base',
  color = 'secondary',
  as: Component = 'p',
  children,
  className = '',
}: TextProps) {
  return (
    <Component
      className={cn(
        // Size and color
        sizeStyles[size],
        colorStyles[color],

        // Custom className
        className
      )}
    >
      {children}
    </Component>
  );
}
