/**
 * Resources Browse Page - Category Navigation
 *
 * Features:
 * - Hierarchical category browsing
 * - Dynamic breadcrumbs
 * - Server-side rendering for SEO with ISR
 * - Integrates with filtering components
 * - Optimized queries for instant loading
 */

import { type Metadata } from 'next';

// Enable ISR with 5-minute revalidation for instant loading
export const revalidate = 300;
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { addProductCountsToCategories } from '@/lib/resources/count-products';
import { CategoryGrid } from '@/components/content/resources/browse/category-grid';
import { Breadcrumbs } from '@/components/content/resources/browse/breadcrumbs';
import { ResourceList } from '@/components/content/resources/browse/resource-list';

type Props = {
  params: { path?: string[] };
  searchParams: {
    search?: string;
    tags?: string | string[];
    sort?: string;
  };
};

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Build category path from params
  const { path } = await params;
  const categoryPath = path?.join('/');

  if (!categoryPath) {
    // Root browse page
    return {
      title: 'browse resources | riqle',
      description: 'browse educational resources by category, subject, and module.',
    };
  }

  // Fetch category for metadata
  const category = await db.resourceCategory.findUnique({
    where: { path: categoryPath },
    select: {
      name: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
    },
  });

  if (!category) {
    return {
      title: 'category not found | riqle',
    };
  }

  return {
    title: category.metaTitle || `${category.name} resources | riqle`,
    description:
      category.metaDescription || category.description || `browse ${category.name} resources`,
  };
}

/**
 * Browse page component
 */
export default async function BrowsePage({ params, searchParams }: Props) {
  // Build category path from params
  const { path } = await params;
  const categoryPath = path?.join('/');

  // Await searchParams once
  const resolvedSearchParams = await searchParams;

  // Fetch current category if path is provided
  let currentCategory = null;
  if (categoryPath) {
    currentCategory = await db.resourceCategory.findUnique({
      where: { path: categoryPath },
      include: {
        _count: {
          select: {
            products: {
              where: {
                product: {
                  published: true,
                },
              },
            },
          },
        },
      },
    });

    // Return 404 if category doesn't exist or is not published
    if (!currentCategory || !currentCategory.published) {
      notFound();
    }
  }

  // Fetch subcategories
  const subcategoriesRaw = await db.resourceCategory.findMany({
    where: {
      published: true,
      parentId: currentCategory?.id || null,
    },
    orderBy: { displayOrder: 'asc' },
  });

  // Add product counts (including descendants)
  const subcategories = await addProductCountsToCategories(subcategoriesRaw);

  // Build breadcrumb trail
  const breadcrumbs: Array<{ name: string; path: string }> = [];
  if (categoryPath) {
    const pathSegments = categoryPath.split('/');
    let currentPath = '';

    for (const segment of pathSegments) {
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;
      const cat = await db.resourceCategory.findUnique({
        where: { path: currentPath },
        select: { name: true, path: true },
      });

      if (cat) {
        breadcrumbs.push({ name: cat.name, path: cat.path });
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        {/* Header */}
        <header className="mb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">
            {currentCategory ? currentCategory.name : 'browse resources'}
          </p>
          <h1 className="mb-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            {currentCategory ? currentCategory.name.toLowerCase() : 'all resources'}
          </h1>
          {currentCategory?.description && (
            <p className="text-xl leading-relaxed text-stone-600">{currentCategory.description}</p>
          )}
        </header>

        {/* Subcategories Grid */}
        {subcategories.length > 0 && (
          <section className="mb-20">
            <h2 className="mb-8 text-2xl font-semibold text-stone-900">
              {currentCategory ? 'categories' : 'browse by category'}
            </h2>
            <CategoryGrid categories={subcategories} />
          </section>
        )}

        {/* Resources List with Filtering */}
        <section>
          <h2 className="mb-8 text-2xl font-semibold text-stone-900">
            {currentCategory?._count.products || 0 > 0 ? 'resources' : 'all resources'}
          </h2>
          <ResourceList
            categoryPath={categoryPath}
            initialSearch={resolvedSearchParams.search}
            initialTags={
              Array.isArray(resolvedSearchParams.tags)
                ? resolvedSearchParams.tags
                : resolvedSearchParams.tags
                  ? [resolvedSearchParams.tags]
                  : undefined
            }
            initialSort={resolvedSearchParams.sort}
          />
        </section>
      </div>
    </div>
  );
}
