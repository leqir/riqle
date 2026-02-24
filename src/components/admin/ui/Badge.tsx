import { type ReactNode } from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-success-50 text-success-600 border-success-100',
  warning: 'bg-warning-50 text-warning-600 border-warning-100',
  error: 'bg-error-50 text-error-600 border-error-100',
  info: 'bg-brand-50 text-brand-600 border-brand-100',
  neutral: 'bg-slate-50 text-slate-600 border-slate-100',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

export function Badge({ variant = 'neutral', size = 'md', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium transition-all duration-150 ${variantStyles[variant]} ${sizeStyles[size]} ${className} `.trim()}
    >
      {children}
    </span>
  );
}
