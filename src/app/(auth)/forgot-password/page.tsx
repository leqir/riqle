'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!email || !email.includes('@')) {
      setErrorMessage('please enter a valid email address');
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.error || 'failed to send reset link');
          return;
        }

        // Always show success screen (security: don't reveal if email exists)
        setIsSubmitted(true);
      } catch (error) {
        console.error('Forgot password error:', error);
        setErrorMessage('an unexpected error occurred. please try again.');
      }
    });
  };

  if (isSubmitted) {
    return (
      <>
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
        `}</style>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4">
          <div
            className="w-full max-w-md"
            style={{
              animation: 'fadeIn 0.5s ease-out',
            }}
          >
            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 text-4xl shadow-lg"
                style={{
                  animation: 'scaleIn 0.5s ease-out',
                }}
              >
                ✉️
              </div>
            </div>

            {/* Success Card */}
            <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-xl">
              <h1 className="mb-3 text-center text-2xl font-bold lowercase text-gray-900">
                check your email
              </h1>
              <p className="mb-6 text-center lowercase text-gray-600">
                if an account exists with <strong>{email}</strong>, you will receive a password
                reset link.
              </p>

              <div className="mb-6 rounded-lg bg-blue-50 p-4">
                <p className="mb-2 text-sm lowercase text-blue-900">
                  <strong>next steps:</strong>
                </p>
                <ol className="list-inside list-decimal space-y-1 text-sm lowercase text-blue-800">
                  <li>check your inbox (and spam folder)</li>
                  <li>click the reset password link</li>
                  <li>create a new password</li>
                  <li>sign in with your new credentials</li>
                </ol>
              </div>

              <Link
                href="/login"
                className="block w-full rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-3 text-center font-semibold lowercase text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                back to sign in
              </Link>
            </div>

            <p className="mt-6 text-center text-sm lowercase text-gray-600">
              didn&apos;t receive the email?{' '}
              <button
                onClick={() => setIsSubmitted(false)}
                className="font-medium text-cyan-600 hover:text-cyan-700"
              >
                try again
              </button>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
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
      `}</style>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4">
        <div
          className="w-full max-w-md"
          style={{
            animation: 'fadeIn 0.5s ease-out',
          }}
        >
          {/* Logo/Title */}
          <div className="mb-8 text-center">
            <h1
              className="mb-2 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 bg-clip-text text-4xl font-bold lowercase tracking-tight text-transparent"
              style={{
                animation: 'slideUp 0.6s ease-out 0.1s both',
              }}
            >
              forgot password?
            </h1>
            <p
              className="lowercase text-gray-600"
              style={{
                animation: 'slideUp 0.6s ease-out 0.2s both',
              }}
            >
              no worries, we&apos;ll send you reset instructions
            </p>
          </div>

          {/* Form */}
          <div
            className="rounded-2xl border border-purple-100 bg-white p-8 shadow-xl"
            style={{
              animation: 'slideUp 0.6s ease-out 0.3s both',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium lowercase text-gray-700"
                >
                  email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 lowercase placeholder-gray-400 transition-all duration-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
                <p className="mt-1 text-xs lowercase text-gray-500">
                  enter the email address associated with your account
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div
                  className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm lowercase text-red-800"
                  style={{
                    animation: 'shake 0.5s ease-in-out',
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-3 font-semibold lowercase text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    sending...
                  </span>
                ) : (
                  'send reset link'
                )}
              </button>
            </form>
          </div>

          {/* Back to Login Link */}
          <p className="mt-6 text-center text-sm lowercase text-gray-600">
            <Link href="/login" className="font-medium text-cyan-600 hover:text-cyan-700">
              ← back to sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
