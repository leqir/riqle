/**
 * Button Atom - Reusable Button Component
 *
 * Features:
 * - Three variants: primary, secondary, ghost
 * - Three sizes: sm, md, lg
 * - Loading state support
 * - Disabled state support
 * - Type-safe props with TypeScript
 *
 * Design Philosophy:
 * - Rounded-full for CTAs (primary, secondary)
 * - Clear visual hierarchy
 * - Calm, professional interactions
 * - No flashy animations
 */

'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn, colors, effects, transitions } from '../design-tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `${colors.accent.work.bg} ${colors.accent.work.bgHover} text-white ${effects.radius.full} ${effects.shadow.lg} shadow-blue-600/30`,
  secondary: `${colors.accent.writing.bg} ${colors.accent.writing.bgHover} text-white ${effects.radius.full} ${effects.shadow.lg} shadow-indigo-600/30`,
  ghost: `border-2 ${colors.border.default} ${colors.border.hover} ${colors.bg.white} ${effects.radius.full} ${colors.text.primary}`,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-6 py-2 text-sm font-semibold',
  md: 'px-8 py-3 text-base font-semibold',
  lg: 'px-8 py-4 text-base font-semibold',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        // Base styles
        `inline-flex items-center justify-center gap-2`,
        `${transitions.all} ${transitions.base}`,
        `${effects.button.active}`,

        // Variant and size
        variantStyles[variant],
        sizeStyles[size],

        // States
        disabled || loading ? 'cursor-not-allowed opacity-50' : '',
        !disabled && !loading ? effects.button.hover : '',

        // Custom className
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
