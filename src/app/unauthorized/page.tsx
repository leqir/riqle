import Link from 'next/link';

/**
 * Unauthorized Page
 *
 * Shown when a user tries to access a resource they don't have permission for.
 * This is used by the requireAdminOrRedirect() helper function.
 */
export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
              <svg
                className="h-8 w-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

          <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="mb-6 text-center text-gray-600">
            You don&apos;t have permission to access this resource.
          </p>

          <div className="rounded-lg bg-yellow-50 p-4">
            <p className="text-sm text-yellow-900">
              If you believe you should have access to this page, please contact an administrator.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href="/"
              className="block w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Go to homepage
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Need help?{' '}
          <a href="mailto:support@riqle.com" className="text-purple-600 hover:text-purple-700">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
