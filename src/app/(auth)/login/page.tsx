'use client';

import { useState, useTransition, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

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
          router.push(callbackUrl);
          router.refresh();
        }
      } catch (err) {
        console.error('Sign in error:', err);
        setErrorMessage('an unexpected error occurred. please try again.');
      }
    });
  };

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
            welcome back
          </h1>
          <p className="mb-8 text-sm text-stone-500">sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-stone-900">
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
                className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-300 transition-colors focus:border-stone-900 focus:outline-none"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-stone-900">
                  password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-stone-400 transition-colors hover:text-stone-900"
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
                className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-300 transition-colors focus:border-stone-900 focus:outline-none"
              />
            </div>

            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  signing in...
                </span>
              ) : (
                'sign in'
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-stone-500">
            don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-600"
            >
              create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-200 border-t-stone-900" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
