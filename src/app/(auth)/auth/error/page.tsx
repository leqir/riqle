'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

/**
 * Authentication Error Page
 *
 * Displays user-friendly error messages for various auth failures.
 * Configured in auth.config.ts pages.error
 */

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorDetails = (errorCode: string | null) => {
    switch (errorCode) {
      case 'Configuration':
        return {
          title: 'configuration error',
          message: 'there is a problem with the authentication configuration. please contact support.',
          icon: '⚙️',
        };
      case 'AccessDenied':
        return {
          title: 'access denied',
          message: 'you do not have permission to access this resource.',
          icon: '🚫',
        };
      case 'Verification':
        return {
          title: 'verification failed',
          message:
            'the sign-in link is no longer valid. it may have been used already or has expired. please request a new link.',
          icon: '⏰',
        };
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
      case 'Callback':
        return {
          title: 'sign in error',
          message: 'an error occurred during the sign-in process. please try again.',
          icon: '❌',
        };
      case 'OAuthAccountNotLinked':
        return {
          title: 'account already exists',
          message:
            'an account with this email already exists using a different sign-in method. please use your original sign-in method.',
          icon: '🔗',
        };
      case 'EmailSignin':
        return {
          title: 'email error',
          message: 'the sign-in email could not be sent. please try again or contact support.',
          icon: '📧',
        };
      case 'CredentialsSignin':
        return {
          title: 'invalid credentials',
          message: 'the credentials you provided are incorrect. please try again.',
          icon: '🔒',
        };
      case 'SessionRequired':
        return {
          title: 'session required',
          message: 'you must be signed in to access this page.',
          icon: '🔐',
        };
      default:
        return {
          title: 'authentication error',
          message: 'an unexpected error occurred. please try signing in again.',
          icon: '⚠️',
        };
    }
  };

  const errorDetails = getErrorDetails(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md animate-slideUp">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-4xl shadow-lg animate-bounce">
            {errorDetails.icon}
          </div>
        </div>

        {/* Error Card */}
        <div className="rounded-2xl border border-red-100 bg-white p-8 shadow-xl">
          <h1 className="mb-3 text-center text-2xl font-bold lowercase text-gray-900">
            {errorDetails.title}
          </h1>
          <p className="mb-6 text-center lowercase text-gray-600">{errorDetails.message}</p>

          {/* Error Code (for debugging) */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-3">
              <p className="text-center text-xs font-mono lowercase text-red-700">error: {error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-3 text-center font-semibold lowercase text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              try again
            </Link>
            <Link
              href="/"
              className="block w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-center font-medium lowercase text-stone-700 transition-all duration-200 hover:bg-stone-50 active:scale-95"
            >
              go home
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <p className="mt-6 text-center text-sm lowercase text-gray-600">
          need help?{' '}
          <Link href="/contact" className="font-medium text-cyan-600 hover:text-cyan-700">
            contact support
          </Link>
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
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
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
