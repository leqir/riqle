import { db } from '@/lib/db';
import { ContentList } from '@/components/admin/ContentList';
import Link from 'next/link';

/**
 * Projects Management Page
 *
 * View and manage work portfolio
 */

async function getProjects(status?: string) {
  const where: { published?: boolean } = {};

  if (status === 'draft') where.published = false;
  else if (status === 'published') where.published = true;

  return db.project.findMany({
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
    db.project.count(),
    db.project.count({ where: { published: true } }),
    db.project.count({ where: { published: false } }),
    db.project.count({ where: { featured: true } }),
  ]);

  return { total, published, drafts, featured };
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const [projects, stats] = await Promise.all([getProjects(params.status), getStats()]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Projects</h1>
          <p className="mt-1 text-stone-600">Manage work portfolio</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatBox label="Total" value={stats.total} />
        <StatBox label="Published" value={stats.published} />
        <StatBox label="Drafts" value={stats.drafts} />
        <StatBox label="Featured" value={stats.featured} />
      </div>

      <div className="flex gap-2">
        <FilterButton href="/admin/projects" label="All" active={!params.status} />
        <FilterButton
          href="/admin/projects?status=published"
          label="Published"
          active={params.status === 'published'}
        />
        <FilterButton
          href="/admin/projects?status=draft"
          label="Drafts"
          active={params.status === 'draft'}
        />
      </div>

      <ContentList items={projects} baseUrl="/work" emptyMessage="No projects found" />
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
