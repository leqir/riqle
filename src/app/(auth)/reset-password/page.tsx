'use client';

import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Check if token exists
  useEffect(() => {
    if (!token) {
      setErrorMessage('invalid or missing reset token');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!password || !confirmPassword) {
      setErrorMessage('please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('passwords do not match');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('password must be at least 8 characters');
      return;
    }

    if (!token) {
      setErrorMessage('invalid or missing reset token');
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.error || 'failed to reset password');
          return;
        }

        // Success
        setIsSubmitted(true);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (error) {
        console.error('Reset password error:', error);
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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">
          <div
            className="w-full max-w-md"
            style={{
              animation: 'fadeIn 0.5s ease-out',
            }}
          >
            {/* Success Icon */}
            <div className="mb-8 flex justify-center">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-4xl shadow-lg"
                style={{
                  animation: 'scaleIn 0.5s ease-out',
                }}
              >
                ✓
              </div>
            </div>

            {/* Success Card */}
            <div className="rounded-2xl border border-green-100 bg-white p-8 shadow-xl">
              <h1 className="mb-3 text-center text-2xl font-bold lowercase text-gray-900">
                password reset successful!
              </h1>
              <p className="mb-6 text-center lowercase text-gray-600">
                your password has been updated successfully. redirecting you to sign in...
              </p>

              <div className="mb-6 flex justify-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>
              </div>

              <Link
                href="/login"
                className="block w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3 text-center font-semibold lowercase text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                sign in now
              </Link>
            </div>
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4">
        <div
          className="w-full max-w-md"
          style={{
            animation: 'fadeIn 0.5s ease-out',
          }}
        >
          {/* Logo/Title */}
          <div className="mb-8 text-center">
            <h1
              className="mb-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-4xl font-bold lowercase tracking-tight text-transparent"
              style={{
                animation: 'slideUp 0.6s ease-out 0.1s both',
              }}
            >
              reset password
            </h1>
            <p
              className="lowercase text-gray-600"
              style={{
                animation: 'slideUp 0.6s ease-out 0.2s both',
              }}
            >
              enter your new password
            </p>
          </div>

          {/* Form */}
          <div
            className="rounded-2xl border border-cyan-100 bg-white p-8 shadow-xl"
            style={{
              animation: 'slideUp 0.6s ease-out 0.3s both',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium lowercase text-gray-700"
                >
                  new password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 transition-all duration-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
                <p className="mt-1 text-xs lowercase text-gray-500">
                  min 8 characters, 1 uppercase, 1 lowercase, 1 number
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium lowercase text-gray-700"
                >
                  confirm new password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
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
                disabled={isPending || !token}
                className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 font-semibold lowercase text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    resetting password...
                  </span>
                ) : (
                  'reset password'
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
