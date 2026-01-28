import { db } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';
import { type OrderStatus } from '@prisma/client';
import Link from 'next/link';
import { Card } from '@/components/admin/ui/Card';
import { Badge } from '@/components/admin/ui/Badge';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '@/components/admin/ui/Table';
import { ShoppingCart, CheckCircle, RotateCcw, XCircle, FileX } from 'lucide-react';

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
        <p className="mt-2 text-slate-600">View and manage customer orders</p>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <StatBox label="Total" value={stats.total} icon={<ShoppingCart className="h-5 w-5" />} />
        <StatBox label="Completed" value={stats.completed} icon={<CheckCircle className="h-5 w-5" />} />
        <StatBox label="Refunded" value={stats.refunded} icon={<RotateCcw className="h-5 w-5" />} />
        <StatBox label="Failed" value={stats.failed} icon={<XCircle className="h-5 w-5" />} />
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
        <div className="rounded-lg bg-white p-12 text-center shadow-card">
          <FileX className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <p className="text-slate-600 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow-card">
          <Table>
            <TableHeader>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Products</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'neutral'> = {
                  completed: 'success',
                  refunded: 'warning',
                  failed: 'error',
                  pending: 'neutral',
                };

                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">
                          {order.customerName || 'Unknown'}
                        </div>
                        <div className="text-sm text-slate-600">{order.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-slate-700">
                        {order.OrderItem.map(
                          (item: { productName: string; amount: number }, idx: number) => (
                            <div key={idx}>{item.productName}</div>
                          )
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      ${(order.total / 100).toFixed(2)} {order.currency.toUpperCase()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[order.status] || 'neutral'} size="sm">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {formatDistanceToNow(order.createdAt, { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-slate-600">{label}</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{value}</div>
        </div>
        <div className="p-3 bg-brand-50 rounded-lg text-brand-600">
          {icon}
        </div>
      </div>
    </Card>
  );
}

function FilterButton({ href, label, active }: { href: string; label: string; active: boolean }) {
  const baseClass = 'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150';
  const activeClass = active
    ? 'bg-brand-600 text-white'
    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50';

  return (
    <Link href={href} className={`${baseClass} ${activeClass}`}>
      {label}
    </Link>
  );
}
