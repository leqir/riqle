import Link from 'next/link';
import { db } from '@/lib/db';

/**
 * Admin Dashboard
 *
 * Central hub with stats and alerts
 * Epic 11 Principle: "Only actionable metrics"
 */

async function getDashboardStats() {
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalProjects,
    totalStartups,
    totalProducts,
    recentOrders,
    failedJobs,
  ] = await Promise.all([
    db.post.count(),
    db.post.count({ where: { published: true } }),
    db.post.count({ where: { published: false } }),
    db.project.count(),
    db.startup.count(),
    db.product.count(),
    db.order.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
    db.failedJob.count({ where: { status: 'PENDING' } }),
  ]);

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalProjects,
    totalStartups,
    totalProducts,
    recentOrders,
    failedJobs,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const alerts = [];
  if (stats.draftPosts > 0) {
    alerts.push({
      type: 'info',
      message: `${stats.draftPosts} draft posts ready to publish`,
      link: '/admin/posts?status=draft',
    });
  }
  if (stats.failedJobs > 0) {
    alerts.push({
      type: 'warning',
      message: `${stats.failedJobs} failed jobs need attention`,
      link: '/admin/monitoring',
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Admin Dashboard</h1>
        <p className="mt-2 text-stone-600">
          Operational control center - manage content, commerce, and system health
        </p>
      </div>

      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert, idx) => {
            const bgColor =
              alert.type === 'warning'
                ? 'bg-amber-50 border-amber-200'
                : 'bg-blue-50 border-blue-200';
            const textColor = alert.type === 'warning' ? 'text-amber-900' : 'text-blue-900';

            return (
              <div key={idx} className={`rounded-lg border p-4 ${bgColor}`}>
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${textColor}`}>{alert.message}</p>
                  <Link
                    href={alert.link}
                    className={`text-sm font-semibold ${textColor} hover:underline`}
                  >
                    View →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Posts"
          value={stats.totalPosts}
          subtitle={`${stats.publishedPosts} published, ${stats.draftPosts} drafts`}
          link="/admin/posts"
        />
        <StatCard title="Projects" value={stats.totalProjects} link="/admin/projects" />
        <StatCard title="Startups" value={stats.totalStartups} link="/admin/startups" />
        <StatCard title="Products" value={stats.totalProducts} link="/admin/products" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <StatCard title="Orders (7 days)" value={stats.recentOrders} link="/admin/orders" />
        <StatCard
          title="Failed Jobs"
          value={stats.failedJobs}
          link="/admin/monitoring"
          alert={stats.failedJobs > 0}
        />
      </div>

      <div className="rounded-lg border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-900">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ActionButton href="/admin/posts" label="Manage Posts" />
          <ActionButton href="/admin/projects" label="Manage Projects" />
          <ActionButton href="/admin/products" label="Manage Products" />
          <ActionButton href="/admin/orders" label="View Orders" />
          <ActionButton href="/admin/monitoring" label="System Monitoring" />
          <ActionButton href="/admin/cache" label="Revalidate Cache" />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  link,
  alert,
}: {
  title: string;
  value: number;
  subtitle?: string;
  link: string;
  alert?: boolean;
}) {
  const borderColor = alert ? 'border-amber-200' : 'border-stone-200';

  return (
    <Link
      href={link}
      className={`rounded-lg border ${borderColor} bg-white p-6 transition-all hover:border-stone-300 hover:shadow-lg`}
    >
      <div className="text-sm font-medium text-stone-500">{title}</div>
      <div className="mt-2 text-3xl font-bold text-stone-900">{value}</div>
      {subtitle && <div className="mt-1 text-sm text-stone-600">{subtitle}</div>}
    </Link>
  );
}

function ActionButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-md border border-stone-300 bg-white px-4 py-2 text-center text-sm font-medium text-stone-700 hover:bg-stone-50"
    >
      {label}
    </Link>
  );
}
