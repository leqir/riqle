'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

// Import client config
import '../../../sentry.client.config';

/**
 * Client-side Sentry Provider Component
 * Initializes Sentry for the browser and sets up error boundaries
 */
export function SentryClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Set up any client-specific Sentry configuration
    // or add context to Sentry on mount

    // Get request ID from header if available
    const requestId = document.querySelector('meta[name="x-request-id"]')?.getAttribute('content');

    if (requestId) {
      Sentry.setTag('requestId', requestId);
    }
  }, []);

  return children;
}

/**
 * Error Boundary Component for Sentry
 * Catches errors in the component tree and reports them to Sentry
 */
export const SentryErrorBoundary = Sentry.withErrorBoundary(
  ({ children }: { children: React.ReactNode }) => children,
  {
    fallback: (
      <div className="flex min-h-screen items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-900">Something went wrong</h1>
          <p className="mt-2 text-red-700">Our team has been notified about this issue.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      </div>
    ),
    showDialog: false,
    onError: (error, componentStack) => {
      console.error('Error Boundary caught:', error, componentStack);
    },
  }
);
