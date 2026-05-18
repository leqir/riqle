import { db } from '@/lib/db';
import { formatDistanceToNow, format } from 'date-fns';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/admin/ui/Table';
import { Card } from '@/components/admin/ui/Card';
import { Badge } from '@/components/admin/ui/Badge';
import { Users, UserPlus, CheckCircle, ShoppingBag } from 'lucide-react';

async function getUsers() {
  return db.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      emailVerified: true,
      UserRole: { select: { Role: { select: { name: true } } } },
      _count: {
        select: {
          Order: true,
          Entitlement: { where: { active: true } },
        },
      },
    },
  });
}

async function getStats() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [total, verified, last7d] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { emailVerified: { not: null } } }),
    db.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
  ]);
  return { total, verified, last7d };
}

export default async function UsersPage() {
  const [users, stats] = await Promise.all([getUsers(), getStats()]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Users</h1>
        <p className="mt-2 text-slate-600">All signups, newest first</p>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        <StatBox label="Total" value={stats.total} icon={<Users className="h-5 w-5" />} />
        <StatBox
          label="Verified"
          value={stats.verified}
          icon={<CheckCircle className="h-5 w-5" />}
        />
        <StatBox label="New (7d)" value={stats.last7d} icon={<UserPlus className="h-5 w-5" />} />
      </div>

      {users.length === 0 ? (
        <div className="rounded-lg bg-white p-12 text-center shadow-card">
          <Users className="mx-auto mb-4 h-12 w-12 text-slate-400" />
          <p className="text-lg text-slate-600">No users yet</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow-card">
          <Table>
            <TableHeader>
              <TableHeaderCell>User</TableHeaderCell>
              <TableHeaderCell>Roles</TableHeaderCell>
              <TableHeaderCell>Activity</TableHeaderCell>
              <TableHeaderCell>Verified</TableHeaderCell>
              <TableHeaderCell>Signed up</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-900">{u.name || '—'}</div>
                      <div className="text-sm text-slate-600">{u.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {u.UserRole.length === 0 ? (
                        <span className="text-sm text-slate-400">none</span>
                      ) : (
                        u.UserRole.map((ur, i) => (
                          <Badge key={i} variant="neutral" size="sm">
                            {ur.Role.name}
                          </Badge>
                        ))
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="h-4 w-4 text-slate-400" />
                        {u._count.Order} order{u._count.Order === 1 ? '' : 's'}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span>
                        {u._count.Entitlement} entitlement
                        {u._count.Entitlement === 1 ? '' : 's'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {u.emailVerified ? (
                      <Badge variant="success" size="sm">
                        yes
                      </Badge>
                    ) : (
                      <Badge variant="neutral" size="sm">
                        no
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    <div>{formatDistanceToNow(u.createdAt, { addSuffix: true })}</div>
                    <div className="text-xs text-slate-400">
                      {format(u.createdAt, 'd MMM yyyy, h:mma')}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
        <div className="rounded-lg bg-brand-50 p-3 text-brand-600">{icon}</div>
      </div>
    </Card>
  );
}
