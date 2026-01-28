'use client';

import { useState, useTransition, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Login Page
 *
 * Password-based authentication with credentials provider.
 * Features:
 * - Smooth animations
 * - Modern gradient design
 * - Loading states
 * - Error handling
 * - Forgot password link
 */
function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(
    error === 'CredentialsSignin' ? 'invalid email or password' : null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validation
    if (!email || !password) {
      setErrorMessage('email and password are required');
      return;
    }

    startTransition(async () => {
      try {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl,
        });

        if (result?.error) {
          if (result.error === 'EMAIL_NOT_VERIFIED') {
            setErrorMessage('please verify your email before signing in');
          } else {
            setErrorMessage('invalid email or password');
          }
        } else if (result?.ok) {
          // Success - redirect to callback URL
          router.push(callbackUrl);
          router.refresh();
        }
      } catch (error) {
        console.error('Sign in error:', error);
        setErrorMessage('an unexpected error occurred. please try again.');
      }
    });
  };

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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
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
              welcome back
            </h1>
            <p
              className="lowercase text-gray-600"
              style={{
                animation: 'slideUp 0.6s ease-out 0.2s both',
              }}
            >
              sign in to your account
            </p>
          </div>

          {/* Login Form */}
          <div
            className="rounded-2xl border border-cyan-100 bg-white p-8 shadow-xl"
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
                  email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 lowercase placeholder-gray-400 transition-all duration-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium lowercase text-gray-700"
                  >
                    password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm lowercase text-cyan-600 hover:text-cyan-700"
                  >
                    forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 transition-all duration-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
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
                    signing in...
                  </span>
                ) : (
                  'sign in'
                )}
              </button>
            </form>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm lowercase text-gray-600">
            don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-cyan-600 hover:text-cyan-700">
              create one
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600"></div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
