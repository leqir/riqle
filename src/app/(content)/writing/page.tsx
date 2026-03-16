/**
 * Writing Page - Thinking Made Inspectable
 *
 * Features:
 * - Minimalist Apple HIG typography
 * - Library feel, not blog
 * - Curated essays on thinking and judgment
 * - Clean, scannable layout
 */

import { type Metadata } from 'next';
import { db } from '@/lib/db';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'writing | riqle',
  description:
    'essays on education, systems, learning, product, and decision-making—thinking made inspectable.',
};

export default async function WritingPage() {
  // Fetch published posts, ordered by publication date
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      slug: true,
      title: true,
      description: true,
      publishedAt: true,
      readingTime: true,
      theme: true,
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">
            writing
          </p>
          <h1 className="mb-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            thinking made inspectable
          </h1>
          <p className="text-xl leading-relaxed text-stone-600">
            essays on education, systems, learning, product, and decision-making.
          </p>
        </header>

        {/* Essay List */}
        {posts.length === 0 ? (
          <div className="border-l-2 border-stone-300 py-12 pl-8">
            <p className="text-lg text-stone-600">no published essays yet. check back soon.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {posts.map((post, index) => {
              const formattedDate = post.publishedAt
                ? new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(post.publishedAt))
                : null;

              return (
                <article key={post.slug} className="group">
                  <Link href={`/writing/${post.slug}`} className="block">
                    {/* Essay Number */}
                    <p className="mb-4 font-mono text-sm font-medium text-stone-400">
                      {String(index + 1).padStart(2, '0')}
                    </p>

                    {/* Title */}
                    <h2 className="mb-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-stone-900 transition-colors group-hover:text-stone-600">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="mb-6 text-lg leading-relaxed text-stone-600">
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                      {formattedDate && (
                        <div>
                          <span className="font-medium text-stone-400">published</span>
                          <span className="ml-3 text-stone-700">{formattedDate}</span>
                        </div>
                      )}
                      {post.readingTime && (
                        <div>
                          <span className="font-medium text-stone-400">reading time</span>
                          <span className="ml-3 text-stone-700">{post.readingTime} min</span>
                        </div>
                      )}
                      {post.theme && (
                        <div>
                          <span className="ml-auto inline-block rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                            {post.theme}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    {index < posts.length - 1 && (
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
