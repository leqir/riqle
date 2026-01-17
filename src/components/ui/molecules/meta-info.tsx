/**
 * MetaInfo Molecule - Metadata Display Component
 *
 * Features:
 * - Displays label-value pairs (e.g., "Role: Product Lead")
 * - Or simple text items (e.g., "5 min read")
 * - Consistent typography and spacing
 * - Used within Card metaItems prop
 *
 * Design Philosophy:
 * - Stone color palette
 * - Label in bold stone-900, value in tertiary
 * - Clean, scannable presentation
 */

'use client';

import { type ReactNode } from 'react';
import { cn, colors } from '../design-tokens';

interface MetaInfoProps {
  label?: string;
  value?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function MetaInfo({ label, value, children, className = '' }: MetaInfoProps) {
  // If children provided, render as-is (flexible mode)
  if (children) {
    return <span className={cn(className)}>{children}</span>;
  }

  // Otherwise render label-value pair
  return (
    <span className={cn(className)}>
      {label && <strong className={cn('font-semibold', colors.text.primary)}>{label}: </strong>}
      {value}
    </span>
  );
}
