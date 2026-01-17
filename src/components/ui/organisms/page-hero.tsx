/**
 * PageHero Organism - Page Header Pattern
 *
 * Features:
 * - Optional hand-drawn icon
 * - Responsive page title with clamp()
 * - Description text
 * - Consistent spacing and typography
 *
 * Design Philosophy:
 * - Apple-inspired minimalism
 * - Clean, generous whitespace (mb-16)
 * - Stone color palette
 * - Responsive typography
 *
 * Replaces:
 * - /work page header (lines 44-54)
 * - /writing page header
 * - /resources page header
 */

'use client';

import { type ReactNode } from 'react';
import { cn, colors, spacing, typography } from '../design-tokens';

interface PageHeroProps {
  icon?: ReactNode;
  title: string;
  description: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '5xl';
  children?: ReactNode;
  className?: string;
}

const maxWidthStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '5xl': 'max-w-5xl',
};

export function PageHero({
  icon,
  title,
  description,
  maxWidth = '2xl',
  children,
  className = '',
}: PageHeroProps) {
  return (
    <header className={cn(spacing.card.marginBottom, className)}>
      {/* Icon + Title */}
      <div className="mb-6">
        {icon ? (
          <div className="inline-flex items-center gap-3">
            {icon}
            <h1 className={cn(typography.pageTitle, colors.text.primary)}>{title}</h1>
          </div>
        ) : (
          <h1 className={cn(typography.pageTitle, colors.text.primary)}>{title}</h1>
        )}
      </div>

      {/* Description */}
      <p className={cn(maxWidthStyles[maxWidth], 'text-xl leading-relaxed', colors.text.tertiary)}>
        {description}
      </p>

      {/* Optional children (e.g., CTA buttons) */}
      {children && <div className="mt-8">{children}</div>}
    </header>
  );
}
