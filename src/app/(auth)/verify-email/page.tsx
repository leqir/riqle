/**
 * Verify Email Page
 *
 * This page is shown after a user clicks "Sign in with Email"
 * and before they click the magic link in their email.
 *
 * NextAuth will automatically redirect here based on the
 * verifyRequest page configuration in auth.config.ts
 */
export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">Check your email</h1>
          <p className="mb-6 text-center text-gray-600">
            A sign in link has been sent to your email address.
          </p>

          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-900">
                Click the link in the email to sign in to your account. The link will expire in 24
                hours.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <h2 className="mb-2 font-semibold text-gray-900">Didn&apos;t receive the email?</h2>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                <li>Check your spam or junk folder</li>
                <li>Make sure you entered the correct email address</li>
                <li>Wait a few minutes and check again</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a href="/login" className="text-sm text-purple-600 hover:text-purple-700">
              Back to sign in
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          For security reasons, this link can only be used once.
        </p>
      </div>
    </div>
  );
}
