'use client';

import { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

/**
 * Modern Login Page
 *
 * Passwordless authentication using email magic links.
 * Features:
 * - Smooth animations
 * - Modern gradient design
 * - Loading states
 * - Error handling
 * - Success confirmation
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
      setErrorMessage('please enter a valid email address');
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
          setErrorMessage('failed to send magic link. please try again.');
        } else {
          setIsSubmitted(true);
        }
      } catch (error) {
        console.error('Sign in error:', error);
        setErrorMessage('an unexpected error occurred. please try again.');
      }
    });
  };

  // Success screen
  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4">
        <div className="animate-slideUp w-full max-w-md">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-75" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 shadow-xl">
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
          </div>

          {/* Success Card */}
          <div className="rounded-2xl border border-cyan-100 bg-white p-8 shadow-2xl">
            <h1 className="mb-2 text-center text-2xl font-bold lowercase text-gray-900">
              check your email
            </h1>
            <p className="mb-2 text-center lowercase text-gray-600">we sent a magic link to</p>
            <p className="mb-6 text-center font-semibold text-cyan-600">{email}</p>

            <div className="space-y-4">
              <div className="rounded-xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-purple-50 p-4">
                <p className="text-sm lowercase text-gray-700">
                  click the link in your email to sign in. the link will expire in 24 hours.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h2 className="mb-2 font-semibold lowercase text-gray-900">
                  didn&apos;t receive it?
                </h2>
                <ul className="space-y-1 text-sm lowercase text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500">•</span>
                    <span>check your spam folder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500">•</span>
                    <span>make sure you entered the correct email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500">•</span>
                    <span>wait a few minutes and check again</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
              className="mt-6 w-full text-center text-sm lowercase text-cyan-600 transition-colors hover:text-cyan-700 active:scale-95"
            >
              use a different email
            </button>
          </div>

          <p className="mt-6 text-center text-sm lowercase text-gray-600">
            for security reasons, this link can only be used once.
          </p>
        </div>
      </div>
    );
  }

  // Login form
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4">
      <div className="animate-fadeIn w-full max-w-md">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-50 blur-xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold lowercase tracking-tight text-gray-900">
              welcome to riqle
            </h1>
            <p className="lowercase text-gray-600">sign in to your account</p>
          </div>

          {/* Auth error from URL */}
          {error && (
            <div className="animate-shake mb-6 rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm lowercase text-red-700">
                {error === 'Configuration'
                  ? 'there is a problem with the server configuration.'
                  : error === 'AccessDenied'
                    ? 'you do not have permission to sign in.'
                    : error === 'Verification'
                      ? 'the sign in link is no longer valid. it may have already been used or expired.'
                      : 'an error occurred during authentication. please try again.'}
              </p>
            </div>
          )}

          {/* Form validation error */}
          {errorMessage && (
            <div className="animate-shake mb-6 rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm lowercase text-red-700">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium lowercase text-gray-700"
              >
                email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={isPending}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 lowercase text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50"
                />
                {email && !isPending && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      className="animate-scaleIn h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-3 font-semibold lowercase text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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
                  sending magic link...
                </span>
              ) : (
                <>
                  <span className="relative z-10">continue with email</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm lowercase text-gray-600">
              we&apos;ll email you a magic link for password-free sign in
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs lowercase text-gray-500">
          by continuing, you agree to our{' '}
          <a href="/legal/terms" className="text-cyan-600 hover:text-cyan-700">
            terms of service
          </a>{' '}
          and{' '}
          <a href="/legal/privacy" className="text-cyan-600 hover:text-cyan-700">
            privacy policy
          </a>
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
