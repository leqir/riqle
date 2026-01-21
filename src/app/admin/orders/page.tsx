import { db } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';
import { type OrderStatus } from '@prisma/client';
import Link from 'next/link';

async function getOrders(status?: string) {
  return db.order.findMany({
    where: status ? { status: status as OrderStatus } : {},
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: {
      id: true,
      customerEmail: true,
      customerName: true,
      total: true,
      currency: true,
      status: true,
      createdAt: true,
      fulfilledAt: true,
      refundedAt: true,
      OrderItem: {
        select: {
          productName: true,
          amount: true,
        },
      },
    },
  });
}

async function getStats() {
  const [total, completed, refunded, failed] = await Promise.all([
    db.order.count(),
    db.order.count({ where: { status: 'completed' } }),
    db.order.count({ where: { status: 'refunded' } }),
    db.order.count({ where: { status: 'failed' } }),
  ]);

  return { total, completed, refunded, failed };
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const [orders, stats] = await Promise.all([getOrders(params.status), getStats()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Orders</h1>
        <p className="mt-1 text-stone-600">View and manage customer orders</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatBox label="Total" value={stats.total} />
        <StatBox label="Completed" value={stats.completed} />
        <StatBox label="Refunded" value={stats.refunded} />
        <StatBox label="Failed" value={stats.failed} />
      </div>

      <div className="flex gap-2">
        <FilterButton href="/admin/orders" label="All" active={!params.status} />
        <FilterButton
          href="/admin/orders?status=completed"
          label="Completed"
          active={params.status === 'completed'}
        />
        <FilterButton
          href="/admin/orders?status=refunded"
          label="Refunded"
          active={params.status === 'refunded'}
        />
        <FilterButton
          href="/admin/orders?status=failed"
          label="Failed"
          active={params.status === 'failed'}
        />
      </div>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-stone-200 bg-white p-12 text-center">
          <p className="text-stone-500">No orders found</p>
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
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {orders.map((order) => {
                const statusColors: Record<string, string> = {
                  completed: 'bg-green-100 text-green-800',
                  refunded: 'bg-amber-100 text-amber-800',
                  failed: 'bg-red-100 text-red-800',
                  pending: 'bg-stone-100 text-stone-800',
                };
                const statusClass = statusColors[order.status] || statusColors.pending;

                return (
                  <tr key={order.id} className="hover:bg-stone-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div>
                        <div className="font-medium text-stone-900">
                          {order.customerName || 'Unknown'}
                        </div>
                        <div className="text-sm text-stone-500">{order.customerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-stone-900">
                        {order.OrderItem.map(
                          (item: { productName: string; amount: number }, idx: number) => (
                            <div key={idx}>{item.productName}</div>
                          )
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-900">
                      {(order.total / 100).toFixed(2)} {order.currency.toUpperCase()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusClass}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-500">
                      {formatDistanceToNow(order.createdAt, { addSuffix: true })}
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
