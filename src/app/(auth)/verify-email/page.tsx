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
      } catch (err) {
        console.error('Verification error:', err);
        setStatus('error');
        setErrorMessage('an unexpected error occurred');
      }
    };

    verifyEmail();
  }, [token, email]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="px-8 py-6">
        <Link
          href="/"
          className="text-sm font-medium text-stone-900 transition-colors hover:text-stone-500"
        >
          riqle
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 pb-20">
        <div className="w-full max-w-sm">
          {status === 'verifying' && (
            <>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
                please wait
              </p>
              <h1 className="mb-1 text-2xl font-semibold tracking-tight text-stone-900">
                verifying your email
              </h1>
              <p className="mb-8 text-sm text-stone-500">this will only take a moment</p>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-200 border-t-stone-900" />
            </>
          )}

          {status === 'success' && (
            <>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
                verified
              </p>
              <h1 className="mb-1 text-2xl font-semibold tracking-tight text-stone-900">
                email confirmed
              </h1>
              <p className="mb-8 text-sm text-stone-500">
                your email has been verified. you can now sign in.
              </p>
              <Link
                href="/login"
                className="block w-full rounded-lg bg-stone-900 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-stone-700"
              >
                sign in
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
                error
              </p>
              <h1 className="mb-1 text-2xl font-semibold tracking-tight text-stone-900">
                verification failed
              </h1>
              <p className="mb-6 text-sm text-stone-500">{errorMessage}</p>

              <div className="mb-8 space-y-1.5 text-sm text-stone-400">
                <p>— the link may have expired</p>
                <p>— the link may have already been used</p>
                <p>— the link may be invalid or corrupted</p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/signup"
                  className="block w-full rounded-lg bg-stone-900 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-stone-700"
                >
                  sign up again
                </Link>
                <Link
                  href="/login"
                  className="block w-full rounded-lg border border-stone-200 px-6 py-3 text-center text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
                >
                  back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-200 border-t-stone-900" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
