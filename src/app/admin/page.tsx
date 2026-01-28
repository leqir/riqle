import Link from 'next/link';
import { db } from '@/lib/db';
import { StatCard } from '@/components/admin/dashboard/StatCard';
import { AlertBanner } from '@/components/admin/dashboard/AlertBanner';
import { QuickActionCard } from '@/components/admin/dashboard/QuickActionCard';
import {
  FileText,
  FolderKanban,
  Rocket,
  Package,
  ShoppingCart,
  AlertTriangle,
  Activity,
  RefreshCw,
} from 'lucide-react';

/**
 * Admin Dashboard - Stripe-Inspired Design
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Operational control center - manage content, commerce, and system health
        </p>
      </div>

      {/* Alerts */}
      <div className="space-y-4">
        {stats.draftPosts > 0 && (
          <AlertBanner variant="info" dismissible>
            <div className="flex items-center justify-between">
              <span>
                <strong>{stats.draftPosts}</strong> draft posts ready to publish
              </span>
              <Link
                href="/admin/posts?status=draft"
                className="ml-4 font-semibold hover:underline"
              >
                View →
              </Link>
            </div>
          </AlertBanner>
        )}
        {stats.failedJobs > 0 && (
          <AlertBanner variant="warning" dismissible>
            <div className="flex items-center justify-between">
              <span>
                <strong>{stats.failedJobs}</strong> failed jobs need attention
              </span>
              <Link href="/admin/monitoring" className="ml-4 font-semibold hover:underline">
                View →
              </Link>
            </div>
          </AlertBanner>
        )}
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Posts"
          value={stats.totalPosts}
          icon={<FileText className="h-6 w-6" />}
          href="/admin/posts"
        />
        <StatCard
          title="Projects"
          value={stats.totalProjects}
          icon={<FolderKanban className="h-6 w-6" />}
          href="/admin/projects"
        />
        <StatCard
          title="Startups"
          value={stats.totalStartups}
          icon={<Rocket className="h-6 w-6" />}
          href="/admin/startups"
        />
        <StatCard
          title="Products"
          value={stats.totalProducts}
          icon={<Package className="h-6 w-6" />}
          href="/admin/products"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <StatCard
          title="Orders (7 days)"
          value={stats.recentOrders}
          icon={<ShoppingCart className="h-6 w-6" />}
          href="/admin/orders"
        />
        <StatCard
          title="Failed Jobs"
          value={stats.failedJobs}
          icon={<AlertTriangle className="h-6 w-6" />}
          href="/admin/monitoring"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard
            title="Manage Posts"
            description="Create, edit, and publish blog posts"
            icon={<FileText className="h-6 w-6" />}
            href="/admin/posts"
          />
          <QuickActionCard
            title="Manage Projects"
            description="Showcase your portfolio projects"
            icon={<FolderKanban className="h-6 w-6" />}
            href="/admin/projects"
          />
          <QuickActionCard
            title="Manage Products"
            description="Configure digital products for sale"
            icon={<Package className="h-6 w-6" />}
            href="/admin/products"
          />
          <QuickActionCard
            title="View Orders"
            description="Track purchases and transactions"
            icon={<ShoppingCart className="h-6 w-6" />}
            href="/admin/orders"
          />
          <QuickActionCard
            title="System Monitoring"
            description="Monitor background jobs and errors"
            icon={<Activity className="h-6 w-6" />}
            href="/admin/monitoring"
          />
          <QuickActionCard
            title="Revalidate Cache"
            description="Clear and refresh site cache"
            icon={<RefreshCw className="h-6 w-6" />}
            href="/admin/cache"
          />
        </div>
      </div>
    </div>
  );
}
