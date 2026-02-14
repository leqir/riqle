/**
 * Resources Page - Educational Materials
 *
 * Features:
 * - Minimalist Apple HIG typography
 * - Clean, scannable layout
 * - Calm presentation (no urgency or hype)
 * - Trust-first educational commerce
 */

import { type Metadata } from 'next';
import { db } from '@/lib/db';
import { addProductCountsToCategories } from '@/lib/resources/count-products';
import Link from 'next/link';

// Enable ISR with 5-minute revalidation for instant loading
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'resources | riqle',
  description:
    'educational materials based on real teaching experience with 500+ hsc english students.',
};

export default async function ResourcesPage() {
  // Fetch root categories (HSC, Theology, University)
  const rootCategoriesRaw = await db.resourceCategory.findMany({
    where: {
      published: true,
      parentId: null,
    },
    orderBy: { displayOrder: 'asc' },
  });

  // Add product counts (including descendants)
  const rootCategories = await addProductCountsToCategories(rootCategoriesRaw);

  // Fetch published products for featured section
  const products = await db.product.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 3, // Show only 3 featured resources
    select: {
      slug: true,
      title: true,
      description: true,
      format: true,
      priceInCents: true,
      currency: true,
      featured: true,
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">
            resources
          </p>
          <h1 className="mb-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            educational materials
          </h1>
          <p className="text-xl leading-relaxed text-stone-600">
            proven frameworks and practical guidance from teaching 500+ students.
          </p>
        </header>

        {/* Philosophy Section */}
        <section className="mb-20 border-l-2 border-stone-900 pl-8">
          <div className="space-y-6 text-lg leading-relaxed text-stone-700">
            <p>these resources exist because students asked for them.</p>
            <p>
              every resource here is based on real teaching experience. i curate only the highest
              quality materials—each one selected from an extensive database of exemplars and
              rigorously annotated to reflect the sophistication required to state rank.
            </p>
            <p>
              14-day refund, no questions asked. if it doesn&apos;t help, i&apos;ll refund
              immediately.
            </p>
            <p>the goal is to help students, not extract revenue.</p>
          </div>
        </section>

        {/* Tutoring Section */}
        <section className="mb-20 border-l-2 border-stone-300 pl-8">
          <div className="space-y-6 text-lg leading-relaxed text-stone-700">
            <p>i also tutor english</p>
            <p>
              not in a &quot;here&apos;s a template&quot; way, but in a &quot;why does this actually
              score higher?&quot; way.
            </p>
            <div className="space-y-2 text-base text-stone-600">
              <p>for context:</p>
              <p>- graduated sydney boys &apos;24</p>
              <p>- 2+ years private tutoring + centre experience</p>
              <p>- took 4u english for fun</p>
            </div>
            <p className="text-base text-stone-600">
              i&apos;m based in hurstville area - i love you but i ain&apos;t trekking to epping or
              castle hill
            </p>
            <p>
              msg me if you&apos;re stuck in band 5, doing extension, or just want english to make
              sense.
            </p>
          </div>
        </section>

        {/* Browse by Category Section */}
        {rootCategories.length > 0 && (
          <section className="mb-20">
            <h2 className="mb-8 text-2xl font-semibold text-stone-900">browse by category</h2>
            <p className="mb-8 text-lg text-stone-600">
              find resources tailored to your course and study level.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rootCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/resources/browse/${category.path}`}
                  className="group block"
                  prefetch={true}
                >
                  <div className="h-full rounded-2xl border-2 border-stone-200 bg-white p-6 transition-all hover:border-purple-600 hover:shadow-lg">
                    <h3 className="mb-2 text-xl font-semibold text-stone-900 transition-colors group-hover:text-purple-600">
                      {category.name}
                    </h3>

                    {category.description && (
                      <p className="mb-4 text-sm leading-relaxed text-stone-600">
                        {category.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-stone-900">
                        {category._count.products}
                      </span>
                      <span className="text-sm text-stone-500">
                        {category._count.products === 1 ? 'resource' : 'resources'}
                      </span>
                      <span className="ml-auto text-sm font-medium text-purple-600 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured Resources Section */}
        {products.length > 0 && (
          <section className="mb-20">
            <h2 className="mb-8 text-2xl font-semibold text-stone-900">featured resources</h2>
            <div className="space-y-12">
              {products.map((product) => {
                const price = (product.priceInCents / 100).toFixed(2);
                const currencySymbol = product.currency === 'AUD' ? 'A$' : '$';

                return (
                  <article key={product.slug} className="group">
                    <Link href={`/resources/${product.slug}`} className="block" prefetch={true}>
                      <h3 className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-stone-900 transition-colors group-hover:text-stone-600">
                        {product.title}
                      </h3>

                      <p className="mb-4 text-lg leading-relaxed text-stone-600">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                        <div>
                          <span className="font-medium text-stone-400">format</span>
                          <span className="ml-3 text-stone-700">{product.format}</span>
                        </div>
                        <div>
                          <span className="font-medium text-stone-400">price</span>
                          <span className="ml-3 text-stone-700">
                            {currencySymbol}
                            {price}
                          </span>
                        </div>
                        {product.featured && (
                          <div>
                            <span className="ml-auto inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                              featured
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Browse All Resources Link */}
        <div className="text-center">
          <Link
            href="/resources/browse"
            className="inline-flex items-center gap-2 rounded-full border-2 border-stone-900 bg-white px-8 py-4 text-base font-semibold text-stone-900 transition-all hover:bg-stone-900 hover:text-white"
            prefetch={true}
          >
            browse all resources
            <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
