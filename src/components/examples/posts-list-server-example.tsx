/**
 * Example: Posts List Server Component
 *
 * This demonstrates how to use the tRPC API in a React Server Component.
 * For Client Component example, see posts-list-example.tsx
 */

import { api } from '@/trpc/server';

interface PostsListServerExampleProps {
  limit?: number;
  status?: 'draft' | 'published' | 'archived';
}

export async function PostsListServerExample({
  limit = 10,
  status = 'published',
}: PostsListServerExampleProps = {}) {
  // Direct server-side API call - no HTTP overhead!
  const { posts } = await api.posts.getAll({
    limit,
    status,
  });

  if (posts.length === 0) {
    return <div className="p-4 text-gray-500">No {status} posts found.</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">
        {status.charAt(0).toUpperCase() + status.slice(1)} Posts
      </h1>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{post.title}</h2>

            {post.excerpt && <p className="mt-2 text-gray-600">{post.excerpt}</p>}

            <div className="mt-4 flex items-center gap-2">
              {/* Author info */}
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <img
                    src={post.author.image}
                    alt={post.author.name || 'Author'}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-600">{post.author.name || 'Anonymous'}</span>
              </div>

              {/* Published date */}
              {post.publishedAt && (
                <>
                  <span className="text-gray-400">•</span>
                  <time className="text-sm text-gray-600">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </>
              )}

              {/* Tags */}
              {post.tags.length > 0 && (
                <>
                  <span className="text-gray-400">•</span>
                  <div className="flex gap-2">
                    {post.tags.map((tagLink) => (
                      <span
                        key={tagLink.id}
                        className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
                      >
                        {tagLink.tag.name}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Preview of content */}
            <div className="mt-4 text-sm text-gray-700">
              {post.content.substring(0, 200)}
              {post.content.length > 200 && '...'}
            </div>

            {/* Read more link */}
            <a
              href={`/posts/${post.slug}`}
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Read more →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

/**
 * Example usage in a page:
 *
 * // app/posts/page.tsx
 * import { PostsListServerExample } from '@/components/examples/posts-list-server-example'
 *
 * export default function PostsPage() {
 *   return <PostsListServerExample limit={20} status="published" />
 * }
 */

/**
 * Advanced example with parallel data fetching:
 */
export async function PostsWithStatsExample() {
  // Fetch multiple queries in parallel
  const [_postsData, adminStats] = await Promise.all([
    api.posts.getAll({ limit: 5, status: 'published' }),
    // This would fail if not admin, handle with try/catch in production
    api.admin.getStats().catch(() => null),
  ]);

  return (
    <div className="space-y-6 p-4">
      {/* Stats panel (admin only) */}
      {adminStats && (
        <div className="rounded-lg bg-blue-50 p-4">
          <h2 className="text-lg font-semibold">Platform Stats</h2>
          <div className="mt-2 grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold">{adminStats.posts.total}</div>
              <div className="text-sm text-gray-600">Total Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{adminStats.users.total}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                ${(adminStats.revenue.total / 100).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>
        </div>
      )}

      {/* Posts list */}
      <PostsListServerExample limit={5} />
    </div>
  );
}

/**
 * Example with error handling:
 */
export async function PostsWithErrorHandling() {
  try {
    const { posts } = await api.posts.getAll({ limit: 10 });

    return (
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch posts:', error);

    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800">
        <h3 className="font-semibold">Failed to load posts</h3>
        <p className="mt-1 text-sm">{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
}
