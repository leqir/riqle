import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import Link from 'next/link';

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/account');
  }

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
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        <header className="mb-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">
            account
          </p>
          <h1 className="mb-2 text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight tracking-tight text-stone-900">
            {session.user.name ?? 'my account'}
          </h1>
          <p className="text-stone-500">{session.user.email}</p>
        </header>

        {/* Account Details */}
        <section className="mb-16">
          <div className="mb-6 border-l-2 border-stone-300 pl-6">
            <p className="text-sm font-medium text-stone-500">details</p>
          </div>
          <div className="grid gap-8 rounded-lg border border-stone-200 p-6 md:grid-cols-3">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-stone-400">
                name
              </p>
              <p className="text-sm text-stone-900">{session.user.name ?? 'not set'}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-stone-400">
                email
              </p>
              <p className="text-sm text-stone-900">{session.user.email}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-stone-400">
                role
              </p>
              <p className="text-sm text-stone-900">{session.user.role ?? 'customer'}</p>
            </div>
          </div>
        </section>

        {/* Purchases */}
        <section>
          <div className="mb-8 flex items-baseline justify-between border-l-2 border-stone-900 pl-6">
            <p className="text-sm font-medium text-stone-500">purchases</p>
            <span className="text-xs text-stone-400">
              {entitlements.length} {entitlements.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {entitlements.length === 0 ? (
            <div className="rounded-lg border border-stone-200 px-8 py-16 text-center">
              <p className="mb-2 text-base font-medium text-stone-900">no purchases yet</p>
              <p className="mb-6 text-sm text-stone-600">browse resources to get started</p>
              <Link
                href="/resources"
                className="text-sm font-medium text-stone-900 underline underline-offset-4 transition-colors hover:text-stone-500"
              >
                browse resources →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {entitlements.map((entitlement) => (
                <div
                  key={entitlement.id}
                  className="rounded-lg border border-stone-200 p-6 transition-colors hover:border-stone-300"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="mb-1 text-base font-medium text-stone-900">
                        {entitlement.Product.title}
                      </h3>
                      <p className="text-xs text-stone-400">
                        purchased{' '}
                        {new Date(entitlement.createdAt).toLocaleDateString('en-AU', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
                      active
                    </span>
                  </div>

                  {entitlement.Product.description && (
                    <p className="mb-4 text-sm leading-relaxed text-stone-600">
                      {entitlement.Product.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/resources/${entitlement.Product.slug}`}
                      className="text-sm text-stone-500 underline underline-offset-4 transition-colors hover:text-stone-900"
                    >
                      view details
                    </Link>
                    {entitlement.Product.downloadUrls.length > 0 && (
                      <a
                        href={`/api/products/${entitlement.Product.id}/download`}
                        className="text-sm font-medium text-stone-900 underline underline-offset-4 transition-colors hover:text-stone-500"
                      >
                        download ({entitlement.Product.format})
                      </a>
                    )}
                  </div>

                  {entitlement.Order && (
                    <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
                      <p className="text-xs text-stone-400">
                        order #{entitlement.Order.id.slice(0, 8)}
                      </p>
                      <p className="text-xs text-stone-600">
                        {(entitlement.Order.total / 100).toFixed(2)}{' '}
                        <span className="uppercase">{entitlement.Order.currency}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
