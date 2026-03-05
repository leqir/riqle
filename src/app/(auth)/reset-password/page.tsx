'use client';

import { useState, useTransition, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!token) {
      setErrorMessage('invalid or missing reset token');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

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

        setIsSubmitted(true);

        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (err) {
        console.error('Reset password error:', err);
        setErrorMessage('an unexpected error occurred. please try again.');
      }
    });
  };

  if (isSubmitted) {
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
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
              success
            </p>
            <h1 className="mb-1 text-2xl font-semibold tracking-tight text-stone-900">
              password updated
            </h1>
            <p className="mb-8 text-sm text-stone-500">
              your password has been reset. redirecting you to sign in...
            </p>

            <div className="mb-6 flex items-center gap-2 text-sm text-stone-400">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-200 border-t-stone-400" />
              redirecting...
            </div>

            <Link
              href="/login"
              className="block w-full rounded-lg bg-stone-900 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-stone-700"
            >
              sign in now
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">
            account
          </p>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight text-stone-900">
            reset password
          </h1>
          <p className="mb-8 text-sm text-stone-500">enter your new password</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-stone-900">
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
                className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-300 transition-colors focus:border-stone-900 focus:outline-none"
              />
              <p className="mt-1 text-xs text-stone-400">min 8 characters</p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-stone-900"
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
                className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-300 transition-colors focus:border-stone-900 focus:outline-none"
              />
            </div>

            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

            <button
              type="submit"
              disabled={isPending || !token}
              className="w-full rounded-lg bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  resetting...
                </span>
              ) : (
                'reset password'
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-stone-500">
            <Link
              href="/login"
              className="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-600"
            >
              ← back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-200 border-t-stone-900" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
