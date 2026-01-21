import Link from 'next/link';
import { auth } from '@/auth';

/**
 * Admin Navigation
 *
 * Three-column layout achieving Epic 11's "≤2 clicks to any function"
 * Content | Commerce | System
 */

export async function AdminNav() {
  const session = await auth();

  return (
    <nav className="border-b border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-lg font-bold text-stone-900">
              Admin
            </Link>

            <div className="flex gap-6">
              {/* Content Section */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-stone-500">Content</span>
                <Link href="/admin/posts" className="text-sm text-stone-700 hover:text-stone-900">
                  Posts
                </Link>
                <Link
                  href="/admin/projects"
                  className="text-sm text-stone-700 hover:text-stone-900"
                >
                  Projects
                </Link>
                <Link
                  href="/admin/startups"
                  className="text-sm text-stone-700 hover:text-stone-900"
                >
                  Startups
                </Link>
                <Link
                  href="/admin/products"
                  className="text-sm text-stone-700 hover:text-stone-900"
                >
                  Products
                </Link>
              </div>

              {/* Commerce Section */}
              <div className="flex items-center gap-4 border-l border-stone-200 pl-6">
                <span className="text-sm font-medium text-stone-500">Commerce</span>
                <Link href="/admin/orders" className="text-sm text-stone-700 hover:text-stone-900">
                  Orders
                </Link>
                <Link
                  href="/admin/entitlements"
                  className="text-sm text-stone-700 hover:text-stone-900"
                >
                  Entitlements
                </Link>
              </div>

              {/* System Section */}
              <div className="flex items-center gap-4 border-l border-stone-200 pl-6">
                <span className="text-sm font-medium text-stone-500">System</span>
                <Link
                  href="/admin/monitoring"
                  className="text-sm text-stone-700 hover:text-stone-900"
                >
                  Monitoring
                </Link>
                <Link href="/admin/audit" className="text-sm text-stone-700 hover:text-stone-900">
                  Audit
                </Link>
                <Link
                  href="/admin/email-logs"
                  className="text-sm text-stone-700 hover:text-stone-900"
                >
                  Email Logs
                </Link>
                <Link href="/admin/cache" className="text-sm text-stone-700 hover:text-stone-900">
                  Cache
                </Link>
              </div>
            </div>
          </div>

          <div className="text-sm text-stone-600">{session?.user?.email}</div>
        </div>
      </div>
    </nav>
  );
}
