import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import Link from 'next/link';

/**
 * Account Page
 *
 * Modern, Stripe-esque UI showing user account information and purchases.
 * Requires authentication.
 *
 * Features:
 * - Smooth animations
 * - Gradient design elements
 * - Clean card layouts
 * - Consistent with auth pages
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
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
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
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div
            className="mb-8 text-center"
            style={{
              animation: 'fadeIn 0.5s ease-out',
            }}
          >
            <h1
              className="mb-2 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 bg-clip-text text-4xl font-bold lowercase tracking-tight text-transparent"
              style={{
                animation: 'slideUp 0.6s ease-out 0.1s both',
              }}
            >
              my account
            </h1>
            <p
              className="lowercase text-gray-600"
              style={{
                animation: 'slideUp 0.6s ease-out 0.2s both',
              }}
            >
              manage your account and purchases
            </p>
          </div>

          {/* Account Info Card */}
          <div
            className="mb-8 rounded-2xl border border-cyan-100 bg-white p-8 shadow-xl"
            style={{
              animation: 'slideUp 0.6s ease-out 0.3s both',
            }}
          >
            <h2 className="mb-6 text-xl font-bold lowercase text-gray-900">account information</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="group">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                  name
                </p>
                <p className="text-base font-medium text-gray-900 transition-colors group-hover:text-cyan-600">
                  {session.user.name || 'Not set'}
                </p>
              </div>
              <div className="group">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                  email
                </p>
                <p className="text-base font-medium text-gray-900 transition-colors group-hover:text-cyan-600">
                  {session.user.email}
                </p>
              </div>
              <div className="group">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                  role
                </p>
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-50 to-purple-50 px-3 py-1 text-sm font-medium text-gray-900">
                  {session.user.role || 'customer'}
                </span>
              </div>
            </div>
          </div>

          {/* Purchases Card */}
          <div
            className="rounded-2xl border border-cyan-100 bg-white p-8 shadow-xl"
            style={{
              animation: 'slideUp 0.6s ease-out 0.4s both',
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold lowercase text-gray-900">my purchases</h2>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                {entitlements.length} {entitlements.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {entitlements.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mb-6">
                  <svg
                    className="mx-auto h-24 w-24 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <p className="mb-2 text-lg font-medium lowercase text-gray-900">no purchases yet</p>
                <p className="mb-6 lowercase text-gray-600">browse our resources to get started</p>
                <Link
                  href="/resources"
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 font-semibold lowercase text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  browse resources
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {entitlements.map((entitlement, index) => (
                  <div
                    key={entitlement.id}
                    className="group rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 transition-all duration-200 hover:border-cyan-200 hover:shadow-md"
                    style={{
                      animation: `slideUp 0.6s ease-out ${0.5 + index * 0.1}s both`,
                    }}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-cyan-600">
                          {entitlement.Product.title}
                        </h3>
                        <p className="text-sm lowercase text-gray-600">
                          purchased on {new Date(entitlement.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold lowercase text-green-700">
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        active
                      </span>
                    </div>

                    {entitlement.Product.description && (
                      <p className="mb-4 text-sm leading-relaxed text-gray-700">
                        {entitlement.Product.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/resources/${entitlement.Product.slug}`}
                        className="inline-flex items-center rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium lowercase text-cyan-700 transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-100"
                      >
                        view details
                        <svg
                          className="ml-2 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </Link>
                      {entitlement.Product.downloadUrls.length > 0 && (
                        <Link
                          href={`/api/downloads/${entitlement.Product.id}`}
                          className="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 text-sm font-semibold lowercase text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                        >
                          <svg
                            className="mr-2 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          download ({entitlement.Product.format})
                        </Link>
                      )}
                    </div>

                    {entitlement.Order && (
                      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                        <p className="text-xs lowercase text-gray-500">
                          order #{entitlement.Order.id.slice(0, 8)}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {(entitlement.Order.total / 100).toFixed(2)}{' '}
                          <span className="uppercase">{entitlement.Order.currency}</span>
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
    </>
  );
}
