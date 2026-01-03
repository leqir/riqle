/**
 * StartupRelatedContent Component
 *
 * Epic 6 - Story 6.8: Cross-linking with Work & Writing
 *
 * Features:
 * - Shows related Work projects
 * - Shows related Writing posts
 * - Referential tone, not promotional
 * - Helps trace ideas → systems → outcomes
 */

'use client';

import Link from 'next/link';

type RelatedItem = {
  slug: string;
  title: string;
};

type StartupRelatedContentProps = {
  projects?: RelatedItem[];
  posts?: RelatedItem[];
};

export function StartupRelatedContent({ projects, posts }: StartupRelatedContentProps) {
  // Don't render if no related content
  if (!projects?.length && !posts?.length) {
    return null;
  }

  return (
    <section className="border-t border-stone-200 pt-12">
      <h3 className="mb-6 text-2xl font-semibold text-stone-900">Related</h3>

      <div className="space-y-6">
        {/* Related Work Projects */}
        {projects && projects.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-stone-600">
              Work
            </p>
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-lg text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Writing Posts */}
        {posts && posts.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-stone-600">
              Writing
            </p>
            <ul className="space-y-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="text-lg text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
