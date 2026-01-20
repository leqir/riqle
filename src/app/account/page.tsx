import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import Link from 'next/link';

/**
 * Account Page
 *
 * Shows user account information and purchases.
 * Requires authentication.
 */
export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/account');
  }

  // Fetch user's entitlements with product details
  const entitlements = await db.entitlement.findMany({
    where: {
      userId: session.user.id,
      active: true,
    },
    include: {
      Product: {
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          format: true,
          downloadUrls: true,
        },
      },
      Order: {
        select: {
          id: true,
          createdAt: true,
          total: true,
          currency: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold lowercase text-gray-900">my account</h1>
          <p className="lowercase text-gray-600">manage your account and purchases</p>
        </div>

        {/* Account Info */}
        <div className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold lowercase text-gray-900">account information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium lowercase text-gray-500">name</p>
              <p className="text-gray-900">{session.user.name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm font-medium lowercase text-gray-500">email</p>
              <p className="text-gray-900">{session.user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium lowercase text-gray-500">role</p>
              <p className="text-gray-900">{session.user.role || 'customer'}</p>
            </div>
          </div>
        </div>

        {/* Purchases */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-bold lowercase text-gray-900">my purchases</h2>

          {entitlements.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">📦</div>
              <p className="mb-4 text-lg lowercase text-gray-600">you haven't purchased anything yet</p>
              <Link
                href="/resources"
                className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-semibold lowercase text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                browse resources
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {entitlements.map((entitlement) => (
                <div
                  key={entitlement.id}
                  className="rounded-xl border border-stone-200 bg-gradient-to-br from-white to-stone-50 p-6 transition-all duration-200 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-gray-900">
                        {entitlement.Product.title}
                      </h3>
                      <p className="text-sm lowercase text-gray-600">
                        purchased {new Date(entitlement.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold lowercase text-green-700">
                      active
                    </span>
                  </div>

                  <p className="mb-4 text-sm text-gray-700">{entitlement.Product.description}</p>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/resources/${entitlement.Product.slug}`}
                      className="rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium lowercase text-cyan-700 transition-colors hover:bg-cyan-100"
                    >
                      view details
                    </Link>
                    {entitlement.Product.downloadUrls.length > 0 && (
                      <Link
                        href={`/api/downloads/${entitlement.Product.id}`}
                        className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 text-sm font-semibold lowercase text-white shadow-sm transition-all duration-200 hover:shadow-md"
                      >
                        download ({entitlement.Product.format})
                      </Link>
                    )}
                  </div>

                  {entitlement.Order && (
                    <div className="mt-4 border-t border-stone-200 pt-4">
                      <p className="text-xs lowercase text-gray-500">
                        order #{entitlement.Order.id} •{' '}
                        {(entitlement.Order.total / 100).toFixed(2)}{' '}
                        {entitlement.Order.currency}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
