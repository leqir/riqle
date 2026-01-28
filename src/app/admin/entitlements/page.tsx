import { db } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Card } from '@/components/admin/ui/Card';
import { Badge } from '@/components/admin/ui/Badge';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '@/components/admin/ui/Table';
import { Key, CheckCircle, XCircle, Clock, FileX } from 'lucide-react';

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Entitlements</h1>
        <p className="mt-2 text-slate-600">Manage customer access grants</p>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <StatBox label="Total" value={stats.total} icon={<Key className="h-5 w-5" />} />
        <StatBox label="Active" value={stats.active} icon={<CheckCircle className="h-5 w-5" />} />
        <StatBox label="Revoked" value={stats.revoked} icon={<XCircle className="h-5 w-5" />} />
        <StatBox label="Expired" value={stats.expired} icon={<Clock className="h-5 w-5" />} />
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
        <div className="rounded-lg bg-white p-12 text-center shadow-card">
          <FileX className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <p className="text-slate-600 text-lg">No entitlements found</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow-card">
          <Table>
            <TableHeader>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Expires</TableHeaderCell>
              <TableHeaderCell>Granted</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {entitlements.map((entitlement) => {
                const now = new Date();
                const isExpired = entitlement.expiresAt && entitlement.expiresAt < now;
                const isActive = entitlement.active && !isExpired;

                let statusVariant: 'success' | 'warning' | 'error' | 'neutral' = 'neutral';
                let statusLabel = 'Unknown';

                if (entitlement.revokedAt) {
                  statusVariant = 'error';
                  statusLabel = 'Revoked';
                } else if (isExpired) {
                  statusVariant = 'warning';
                  statusLabel = 'Expired';
                } else if (isActive) {
                  statusVariant = 'success';
                  statusLabel = 'Active';
                }

                return (
                  <TableRow key={entitlement.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">
                          {entitlement.User.name || 'Unknown'}
                        </div>
                        <div className="text-sm text-slate-600">{entitlement.User.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700">
                      {entitlement.Product.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant} size="sm">
                        {statusLabel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {entitlement.expiresAt
                        ? formatDistanceToNow(entitlement.expiresAt, { addSuffix: true })
                        : 'Never'}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {formatDistanceToNow(entitlement.createdAt, { addSuffix: true })}
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
