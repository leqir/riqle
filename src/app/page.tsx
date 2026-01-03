import { auth } from '@/auth';
import Link from 'next/link';
import { SignOutButton } from '@/components/auth/sign-out-button';

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Riqle</h1>
        <p className="text-lg text-gray-600">Foundation infrastructure is being built...</p>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>✅ Next.js 15</span>
          <span>✅ TypeScript</span>
          <span>✅ Tailwind CSS</span>
          <span>✅ Database</span>
          <span>✅ Auth</span>
          <span>⏳ Payments</span>
        </div>

        {/* Auth Status */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          {session ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-gray-600">
                Signed in as <span className="font-semibold">{session.user.email}</span>
              </p>
              <div className="flex gap-3">
                <Link
                  href="/admin"
                  className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
                >
                  Go to Admin
                </Link>
                <SignOutButton className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                  Sign Out
                </SignOutButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-gray-600">Not signed in</p>
              <Link
                href="/login"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
