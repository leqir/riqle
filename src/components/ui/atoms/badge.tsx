/**
 * Badge Atom - Status and Label Badges
 *
 * Features:
 * - Multiple color variants (stone, indigo, blue, purple)
 * - Consistent rounded-full design
 * - Used for status, featured, theme labels
 *
 * Design Philosophy:
 * - Subtle, not flashy
 * - Clear visual hierarchy
 * - Consistent with minimalist aesthetic
 */

'use client';

import { type ReactNode } from 'react';
import { cn } from '../design-tokens';

type BadgeColor = 'stone' | 'indigo' | 'blue' | 'purple';

interface BadgeProps {
  color?: BadgeColor;
  children: ReactNode;
  className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
  stone: 'bg-stone-50 text-stone-700',
  indigo: 'bg-indigo-50 text-indigo-700',
  blue: 'bg-blue-50 text-blue-700',
  purple: 'bg-purple-50 text-purple-700',
};

export function Badge({ color = 'stone', children, className = '' }: BadgeProps) {
  return (
    <span
      className={cn(
        // Base styles
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',

        // Color variant
        colorStyles[color],

        // Custom className
        className
      )}
    >
      {children}
    </span>
  );
}
