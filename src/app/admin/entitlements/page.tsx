import { db } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

async function getEntitlements(status?: string) {
  const where: { active?: boolean; revokedAt?: { not: null } | null } = {};
  if (status === 'active') where.active = true;
  else if (status === 'revoked') where.revokedAt = { not: null };

  return db.entitlement.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: {
      id: true,
      active: true,
      revokedAt: true,
      expiresAt: true,
      createdAt: true,
      User: {
        select: {
          email: true,
          name: true,
        },
      },
      Product: {
        select: {
          title: true,
        },
      },
    },
  });
}

async function getStats() {
  const now = new Date();
  const [total, active, revoked, expired] = await Promise.all([
    db.entitlement.count(),
    db.entitlement.count({ where: { active: true } }),
    db.entitlement.count({ where: { revokedAt: { not: null } } }),
    db.entitlement.count({
      where: {
        expiresAt: { lt: now },
        active: true,
      },
    }),
  ]);

  return { total, active, revoked, expired };
}

export default async function EntitlementsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const [entitlements, stats] = await Promise.all([getEntitlements(params.status), getStats()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Entitlements</h1>
        <p className="mt-1 text-stone-600">Manage customer access grants</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatBox label="Total" value={stats.total} />
        <StatBox label="Active" value={stats.active} />
        <StatBox label="Revoked" value={stats.revoked} />
        <StatBox label="Expired" value={stats.expired} />
      </div>

      <div className="flex gap-2">
        <FilterButton href="/admin/entitlements" label="All" active={!params.status} />
        <FilterButton
          href="/admin/entitlements?status=active"
          label="Active"
          active={params.status === 'active'}
        />
        <FilterButton
          href="/admin/entitlements?status=revoked"
          label="Revoked"
          active={params.status === 'revoked'}
        />
      </div>

      {entitlements.length === 0 ? (
        <div className="rounded-lg border border-stone-200 bg-white p-12 text-center">
          <p className="text-stone-500">No entitlements found</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Expires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Granted
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {entitlements.map((entitlement) => {
                const now = new Date();
                const isExpired = entitlement.expiresAt && entitlement.expiresAt < now;
                const isActive = entitlement.active && !isExpired;

                let statusClass = 'bg-stone-100 text-stone-800';
                let statusLabel = 'Unknown';

                if (entitlement.revokedAt) {
                  statusClass = 'bg-red-100 text-red-800';
                  statusLabel = 'Revoked';
                } else if (isExpired) {
                  statusClass = 'bg-amber-100 text-amber-800';
                  statusLabel = 'Expired';
                } else if (isActive) {
                  statusClass = 'bg-green-100 text-green-800';
                  statusLabel = 'Active';
                }

                return (
                  <tr key={entitlement.id} className="hover:bg-stone-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div>
                        <div className="font-medium text-stone-900">
                          {entitlement.User.name || 'Unknown'}
                        </div>
                        <div className="text-sm text-stone-500">{entitlement.User.email}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-900">
                      {entitlement.Product.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusClass}`}
                      >
                        {statusLabel}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-500">
                      {entitlement.expiresAt
                        ? formatDistanceToNow(entitlement.expiresAt, { addSuffix: true })
                        : 'Never'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-500">
                      {formatDistanceToNow(entitlement.createdAt, { addSuffix: true })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="text-sm text-stone-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-stone-900">{value}</div>
    </div>
  );
}

function FilterButton({ href, label, active }: { href: string; label: string; active: boolean }) {
  const baseClass = 'rounded-md px-4 py-2 text-sm font-medium';
  const activeClass = active
    ? 'bg-indigo-600 text-white'
    : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50';

  return (
    <Link href={href} className={`${baseClass} ${activeClass}`}>
      {label}
    </Link>
  );
}
