import { requireAuth } from '@/lib/auth';
import { SignOutButton } from '@/components/infrastructure/auth/sign-out-button';

/**
 * Admin Dashboard Page
 *
 * This page is protected by:
 * 1. Middleware (auth.config.ts authorized callback) - redirects to /login if not authenticated
 * 2. Server-side auth check (requireAuth) - throws error if not authenticated
 *
 * This demonstrates the authentication protection in action.
 */
export default async function AdminPage() {
  const session = await requireAuth();

  // Optional: Add role-based check here
  // const isAdmin = await checkUserRole(session.user.id, 'admin');
  // if (!isAdmin) redirect('/unauthorized');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mb-6 text-gray-600">Welcome to the admin area. You are authenticated!</p>

          <div className="rounded-lg bg-blue-50 p-4">
            <h2 className="mb-2 font-semibold text-blue-900">Session Information</h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-medium text-blue-800">Email:</dt>
                <dd className="text-blue-700">{session.user.email}</dd>
              </div>
              <div>
                <dt className="font-medium text-blue-800">User ID:</dt>
                <dd className="font-mono text-blue-700">{session.user.id}</dd>
              </div>
              <div>
                <dt className="font-medium text-blue-800">Role:</dt>
                <dd className="text-blue-700">{session.user.role}</dd>
              </div>
              {session.user.name && (
                <div>
                  <dt className="font-medium text-blue-800">Name:</dt>
                  <dd className="text-blue-700">{session.user.name}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="mt-6">
            <SignOutButton className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Sign Out
            </SignOutButton>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Protected Features</h2>
          <p className="mb-4 text-gray-600">
            This page demonstrates authentication protection. Only authenticated users can see this
            content.
          </p>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>Middleware-level route protection</li>
            <li>Server-side session validation</li>
            <li>Automatic redirect to login for unauthenticated users</li>
            <li>Role-based access control ready</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
