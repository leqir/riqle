/**
 * Card Molecule - Unified Card Component
 *
 * CRITICAL COMPONENT: Replaces WorkCard, EssayCard, ResourceCard, StartupCard
 *
 * Features:
 * - Consistent rounded-2xl design across all cards
 * - Accent color variants (blue, indigo, purple)
 * - Flexible badge and metadata support
 * - Hand-drawn arrow icon CTA
 * - Hover effects (border, shadow, text color)
 *
 * Design Philosophy:
 * - Apple-inspired minimalism
 * - Calm, professional interactions
 * - Generous whitespace
 * - Stone color palette with accent colors
 * - Group hover effects for cohesive interaction
 *
 * Usage Examples:
 * - WorkCard: accentColor="blue", badge={status}, metaItems={[role, outcome]}
 * - EssayCard: accentColor="indigo", badge={theme}, metaItems={[date, readingTime]}
 * - ResourceCard: accentColor="indigo", badge={featured}, metaItems={[format, price]}
 * - StartupCard: accentColor="blue", badge={status}, metaItems={[role]}
 */

'use client';

import Link from 'next/link';
import { type ReactNode } from 'react';
import { HandDrawnArrowRight } from '@/components/icons/hand-drawn-arrow-right';
import { cn, colors, effects, transitions, getAccentColors } from '../design-tokens';

type AccentColor = 'blue' | 'indigo' | 'purple';

interface CardProps {
  href: string;
  title: string;
  description: string;
  accentColor?: AccentColor;
  badge?: ReactNode;
  metaItems?: ReactNode[];
  ctaText?: string;
  className?: string;
}

// Map AccentColor to section names for getAccentColors
const accentColorMap: Record<AccentColor, 'work' | 'writing' | 'resources'> = {
  blue: 'work',
  indigo: 'writing',
  purple: 'resources',
};

export function Card({
  href,
  title,
  description,
  accentColor = 'blue',
  badge,
  metaItems,
  ctaText = 'View details',
  className = '',
}: CardProps) {
  const accent = getAccentColors(accentColorMap[accentColor]);

  return (
    <Link
      href={href}
      className={cn(
        // Base card styles (from design-tokens)
        effects.card.combined,

        // Group for hover effects
        'group block',

        // Custom className
        className
      )}
    >
      {/* Title & Badge */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3
          className={cn(
            'text-2xl font-semibold',
            colors.text.primary,
            transitions.colors,
            transitions.base,
            accent.groupHoverText
          )}
        >
          {title}
        </h3>
        {badge && <div className="flex-shrink-0">{badge}</div>}
      </div>

      {/* Description */}
      <p className={cn('mb-6 text-lg leading-relaxed', colors.text.secondary)}>{description}</p>

      {/* Metadata (flexible) */}
      {metaItems && metaItems.length > 0 && (
        <div
          className={cn(
            'mb-4 flex flex-col gap-2 text-base sm:flex-row sm:items-center sm:gap-4',
            colors.text.tertiary
          )}
        >
          {metaItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              {item}
              {index < metaItems.length - 1 && (
                <span className={cn('hidden sm:inline', colors.text.light)}>•</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div
        className={cn(
          'inline-flex items-center gap-2 text-base font-semibold',
          accent.text,
          transitions.colors,
          transitions.base,
          accent.textHover
        )}
      >
        {ctaText}
        <HandDrawnArrowRight
          className={cn(
            'h-4 w-4',
            transitions.transform,
            transitions.base,
            'group-hover:translate-x-1'
          )}
        />
      </div>
    </Link>
  );
}
