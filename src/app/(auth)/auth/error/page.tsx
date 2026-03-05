'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorDetails = (errorCode: string | null) => {
    switch (errorCode) {
      case 'Configuration':
        return {
          title: 'configuration error',
          message:
            'there is a problem with the authentication configuration. please contact support.',
        };
      case 'AccessDenied':
        return {
          title: 'access denied',
          message: 'you do not have permission to access this resource.',
        };
      case 'Verification':
        return {
          title: 'link expired',
          message:
            'the sign-in link is no longer valid. it may have been used already or has expired.',
        };
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
      case 'Callback':
        return {
          title: 'sign in error',
          message: 'an error occurred during the sign-in process. please try again.',
        };
      case 'OAuthAccountNotLinked':
        return {
          title: 'account already exists',
          message:
            'an account with this email already exists using a different sign-in method. please use your original sign-in method.',
        };
      case 'EmailSignin':
        return {
          title: 'email error',
          message: 'the sign-in email could not be sent. please try again or contact support.',
        };
      case 'CredentialsSignin':
        return {
          title: 'invalid credentials',
          message: 'the credentials you provided are incorrect. please try again.',
        };
      case 'SessionRequired':
        return {
          title: 'sign in required',
          message: 'you must be signed in to access this page.',
        };
      default:
        return {
          title: 'authentication error',
          message: 'an unexpected error occurred. please try signing in again.',
        };
    }
  };

  const errorDetails = getErrorDetails(error);

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
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">error</p>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight text-stone-900">
            {errorDetails.title}
          </h1>
          <p className="mb-8 text-sm text-stone-500">{errorDetails.message}</p>

          {error && <p className="mb-6 font-mono text-xs text-stone-300">code: {error}</p>}

          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full rounded-lg bg-stone-900 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-stone-700"
            >
              try again
            </Link>
            <Link
              href="/"
              className="block w-full rounded-lg border border-stone-200 px-6 py-3 text-center text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
            >
              go home
            </Link>
          </div>

          <p className="mt-6 text-sm text-stone-500">
            need help?{' '}
            <a
              href="mailto:nathanael.thie@gmail.com"
              className="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-600"
            >
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-200 border-t-stone-900" />
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
