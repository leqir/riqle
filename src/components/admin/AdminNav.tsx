import Link from 'next/link';
import { auth } from '@/auth';
import { AdminNavLink } from './AdminNavLink';

/**
 * Admin Navigation - Stripe-Inspired Design
 *
 * Three-column layout achieving Epic 11's "≤2 clicks to any function"
 * Content | Commerce | System
 */

export async function AdminNav() {
  const session = await auth();

  return (
    <nav className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-lg font-bold text-brand-600">
              Admin
            </Link>

            <div className="flex gap-6">
              {/* Content Section */}
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-slate-500">Content</span>
                <AdminNavLink href="/admin/posts">Posts</AdminNavLink>
                <AdminNavLink href="/admin/projects">Projects</AdminNavLink>
                <AdminNavLink href="/admin/startups">Startups</AdminNavLink>
                <AdminNavLink href="/admin/products">Products</AdminNavLink>
              </div>

              {/* Commerce Section */}
              <div className="flex items-center gap-6 border-l border-slate-200 pl-6">
                <span className="text-sm font-medium text-slate-500">Commerce</span>
                <AdminNavLink href="/admin/orders">Orders</AdminNavLink>
                <AdminNavLink href="/admin/entitlements">Entitlements</AdminNavLink>
              </div>

              {/* System Section */}
              <div className="flex items-center gap-6 border-l border-slate-200 pl-6">
                <span className="text-sm font-medium text-slate-500">System</span>
                <AdminNavLink href="/admin/analytics">Analytics</AdminNavLink>
                <AdminNavLink href="/admin/monitoring">Monitoring</AdminNavLink>
                <AdminNavLink href="/admin/audit">Audit</AdminNavLink>
                <AdminNavLink href="/admin/email-logs">Email Logs</AdminNavLink>
                <AdminNavLink href="/admin/cache">Cache</AdminNavLink>
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-600">{session?.user?.email}</div>
        </div>
      </div>
    </nav>
  );
}
