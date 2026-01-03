'use client';

import { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

/**
 * Login Page
 *
 * Passwordless authentication using email magic links.
 * Users enter their email and receive a link to sign in.
 *
 * Features:
 * - Email validation
 * - Loading states
 * - Error handling
 * - Success confirmation
 * - Callback URL support
 */
export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic email validation
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    startTransition(async () => {
      try {
        const result = await signIn('resend', {
          email,
          redirect: false,
          callbackUrl,
        });

        if (result?.error) {
          setErrorMessage('Failed to send magic link. Please try again.');
        } else {
          setIsSubmitted(true);
        }
      } catch (error) {
        console.error('Sign in error:', error);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    });
  };

  // Display success message after email sent
  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">Check your email</h1>
            <p className="mb-6 text-center text-gray-600">
              We sent a magic link to <span className="font-semibold">{email}</span>
            </p>

            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-900">
                Click the link in the email to sign in to your account. The link will expire in 24
                hours.
              </p>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
              className="mt-6 w-full text-center text-sm text-purple-600 hover:text-purple-700"
            >
              Use a different email
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Didn&apos;t receive an email? Check your spam folder or try again.
          </p>
        </div>
      </div>
    );
  }

  // Login form
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome to Riqle</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Display auth error from URL */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-900">
                {error === 'Configuration'
                  ? 'There is a problem with the server configuration.'
                  : error === 'AccessDenied'
                    ? 'You do not have permission to sign in.'
                    : error === 'Verification'
                      ? 'The sign in link is no longer valid. It may have already been used or expired.'
                      : 'An error occurred during authentication. Please try again.'}
              </p>
            </div>
          )}

          {/* Display form validation error */}
          {errorMessage && (
            <div className="mb-6 rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-900">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isPending}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 font-semibold text-white transition hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <svg className="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
                  Sending magic link...
                </span>
              ) : (
                'Continue with Email'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>We&apos;ll email you a magic link for a password-free sign in.</p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
