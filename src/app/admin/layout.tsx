import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/admin';
import { AdminNav } from '@/components/admin/AdminNav';

/**
 * Admin Layout
 *
 * Protected layout for admin pages
 * Enforces authentication and admin role
 */

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    await requireAdmin();
  } catch {
    redirect('/login?callbackUrl=/admin');
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav />
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
