'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !email) {
        setStatus('error');
        setErrorMessage('invalid or missing verification link');
        return;
      }

      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, token }),
        });

        const data = await response.json();

        if (!response.ok) {
          setStatus('error');
          setErrorMessage(data.error || 'verification failed');
          return;
        }

        setStatus('success');
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setErrorMessage('an unexpected error occurred');
      }
    };

    verifyEmail();
  }, [token, email]);

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
        @keyframes spin {
          to {
            transform: rotate(360deg);
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
          {/* Verifying State */}
          {status === 'verifying' && (
            <>
              <div className="mb-8 flex justify-center">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg"
                  style={{
                    animation: 'spin 1s linear infinite',
                  }}
                >
                  <div className="h-16 w-16 rounded-full border-4 border-white border-t-transparent"></div>
                </div>
              </div>

              <div className="rounded-2xl border border-cyan-100 bg-white p-8 shadow-xl">
                <h1 className="mb-3 text-center text-2xl font-bold lowercase text-gray-900">
                  verifying your email...
                </h1>
                <p className="text-center lowercase text-gray-600">
                  please wait while we verify your account
                </p>
              </div>
            </>
          )}

          {/* Success State */}
          {status === 'success' && (
            <>
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

              <div className="rounded-2xl border border-green-100 bg-white p-8 shadow-xl">
                <h1 className="mb-3 text-center text-2xl font-bold lowercase text-gray-900">
                  email verified!
                </h1>
                <p className="mb-6 text-center lowercase text-gray-600">
                  your email has been successfully verified. you can now sign in to your account.
                </p>

                <Link
                  href="/login"
                  className="block w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3 text-center font-semibold lowercase text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  sign in now
                </Link>
              </div>
            </>
          )}

          {/* Error State */}
          {status === 'error' && (
            <>
              <div className="mb-8 flex justify-center">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-orange-500 text-4xl shadow-lg"
                  style={{
                    animation: 'scaleIn 0.5s ease-out',
                  }}
                >
                  ✕
                </div>
              </div>

              <div className="rounded-2xl border border-red-100 bg-white p-8 shadow-xl">
                <h1 className="mb-3 text-center text-2xl font-bold lowercase text-gray-900">
                  verification failed
                </h1>
                <p className="mb-6 text-center lowercase text-gray-600">{errorMessage}</p>

                <div className="mb-6 rounded-lg bg-red-50 p-4">
                  <p className="mb-2 text-sm font-semibold lowercase text-red-900">
                    possible reasons:
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-sm lowercase text-red-800">
                    <li>the verification link has expired</li>
                    <li>the link has already been used</li>
                    <li>the link is invalid or corrupted</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/signup"
                    className="block w-full rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-3 text-center font-semibold lowercase text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                  >
                    sign up again
                  </Link>
                  <Link
                    href="/login"
                    className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-center font-medium lowercase text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95"
                  >
                    back to sign in
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600"></div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
