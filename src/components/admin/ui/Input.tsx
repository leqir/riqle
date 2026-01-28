'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, className = '', ...props }, ref) => {
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    const borderColor = hasError
      ? 'border-error-500 focus:border-error-600 focus:ring-error-500'
      : hasSuccess
      ? 'border-success-500 focus:border-success-600 focus:ring-success-500'
      : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2 rounded-lg
            border-2
            text-slate-900 placeholder-slate-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
            ${borderColor}
            ${className}
          `.trim()}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
