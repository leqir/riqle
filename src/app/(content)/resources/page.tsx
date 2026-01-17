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
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'resources | riqle',
  description:
    'educational materials based on real teaching experience with 500+ hsc english students.',
};

export default async function ResourcesPage() {
  // Fetch published products, ordered by display order
  const products = await db.product.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
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
            <p>
              these resources exist because students asked for them. after teaching 500+ hsc english
              students, certain patterns became clear—what works, what doesn&apos;t, and what
              students actually need.
            </p>
            <p>
              every resource here is based on real teaching experience. no theory without
              application, no frameworks without proof, no advice i wouldn&apos;t give to family.
            </p>
            <p>
              14-day refund, no questions asked. if it doesn&apos;t help, email and i&apos;ll refund
              immediately. the goal is to help students, not extract revenue.
            </p>
          </div>
        </section>

        {/* Resources List */}
        {products.length === 0 ? (
          <div className="border-l-2 border-stone-300 py-12 pl-8">
            <p className="text-lg text-stone-600">no published resources yet. check back soon.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {products.map((product, index) => {
              const price = (product.priceInCents / 100).toFixed(2);
              const currencySymbol = product.currency === 'AUD' ? 'A$' : '$';

              return (
                <article key={product.slug} className="group">
                  <Link href={`/resources/${product.slug}`} className="block">
                    {/* Resource Number */}
                    <p className="mb-4 font-mono text-sm font-medium text-stone-400">
                      {String(index + 1).padStart(2, '0')}
                    </p>

                    {/* Title */}
                    <h2 className="mb-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-stone-900 transition-colors group-hover:text-stone-600">
                      {product.title}
                    </h2>

                    {/* Description */}
                    <p className="mb-6 text-lg leading-relaxed text-stone-600">
                      {product.description}
                    </p>

                    {/* Meta */}
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

                    {/* Divider */}
                    {index < products.length - 1 && (
                      <div className="mt-16 h-px bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200" />
                    )}
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
