'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

/**
 * Auth Error Page
 *
 * Displays authentication errors with user-friendly messages.
 * NextAuth redirects here when authentication fails.
 */
export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, { title: string; description: string }> = {
    Configuration: {
      title: 'Server Configuration Error',
      description:
        'There is a problem with the server configuration. Please contact support if this persists.',
    },
    AccessDenied: {
      title: 'Access Denied',
      description: 'You do not have permission to sign in. Please contact an administrator.',
    },
    Verification: {
      title: 'Verification Failed',
      description:
        'The sign in link is no longer valid. It may have already been used or expired. Please request a new one.',
    },
    Default: {
      title: 'Authentication Error',
      description: 'An error occurred during authentication. Please try again.',
    },
  };

  const errorInfo = error && error in errorMessages ? errorMessages[error] : errorMessages.Default;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">{errorInfo.title}</h1>
          <p className="mb-6 text-center text-gray-600">{errorInfo.description}</p>

          {error && (
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-500">
                Error code: <span className="font-mono">{error}</span>
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Try again
            </Link>
            <Link
              href="/"
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Go to homepage
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Need help?{' '}
          <a href="mailto:support@riqle.com" className="text-purple-600 hover:text-purple-700">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
