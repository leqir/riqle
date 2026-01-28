import { db } from '@/lib/db';
import { ContentList } from '@/components/admin/ContentList';
import { Card } from '@/components/admin/ui/Card';
import Link from 'next/link';
import { Package, CheckCircle, FileEdit, Star } from 'lucide-react';

async function getProducts(status?: string) {
  const where: { published?: boolean } = {};

  if (status === 'draft') where.published = false;
  else if (status === 'published') where.published = true;

  return db.product.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      featured: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function getStats() {
  const [total, published, drafts, featured] = await Promise.all([
    db.product.count(),
    db.product.count({ where: { published: true } }),
    db.product.count({ where: { published: false } }),
    db.product.count({ where: { featured: true } }),
  ]);

  return { total, published, drafts, featured };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const [products, stats] = await Promise.all([getProducts(params.status), getStats()]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="mt-2 text-slate-600">Manage resources and products</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <StatBox label="Total" value={stats.total} icon={<Package className="h-5 w-5" />} />
        <StatBox label="Published" value={stats.published} icon={<CheckCircle className="h-5 w-5" />} />
        <StatBox label="Drafts" value={stats.drafts} icon={<FileEdit className="h-5 w-5" />} />
        <StatBox label="Featured" value={stats.featured} icon={<Star className="h-5 w-5" />} />
      </div>

      <div className="flex gap-2">
        <FilterButton href="/admin/products" label="All" active={!params.status} />
        <FilterButton
          href="/admin/products?status=published"
          label="Published"
          active={params.status === 'published'}
        />
        <FilterButton
          href="/admin/products?status=draft"
          label="Drafts"
          active={params.status === 'draft'}
        />
      </div>

      <ContentList items={products} baseUrl="/resources" emptyMessage="No products found" />
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
