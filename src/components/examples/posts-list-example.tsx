/**
 * Example: Posts List Component
 *
 * This demonstrates how to use the tRPC API in a Client Component.
 * For Server Component example, see posts-list-server-example.tsx
 */

'use client';

import { api } from '@/trpc/react';
import { useState } from 'react';

export function PostsListExample() {
  const [limit, setLimit] = useState(10);

  // Query with tRPC React hooks
  const { data, isLoading, error, refetch } = api.posts.getAll.useQuery({
    limit,
    status: 'published',
  });

  // Mutation for creating posts
  const createPost = api.posts.create.useMutation({
    onSuccess: () => {
      // Refetch posts after creating a new one
      refetch();
    },
    onError: (error) => {
      console.error('Failed to create post:', error.message);
      if (error.data?.zodError) {
        console.error('Validation errors:', error.data.zodError);
      }
    },
  });

  // Mutation for deleting posts
  const deletePost = api.posts.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return <div className="p-4">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Error loading posts: {error.message}
        {error.data?.code === 'UNAUTHORIZED' && (
          <p className="mt-2">Please sign in to view posts.</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="flex gap-2">
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="rounded border px-3 py-1"
          >
            <option value={5}>5 posts</option>
            <option value={10}>10 posts</option>
            <option value={20}>20 posts</option>
          </select>
          <button
            onClick={() => refetch()}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {data?.posts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          data?.posts.map((post) => (
            <article key={post.id} className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  {post.excerpt && <p className="mt-2 text-gray-600">{post.excerpt}</p>}
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                    <span>By {post.author.name || 'Anonymous'}</span>
                    <span>•</span>
                    <span>
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                    </span>
                    {post.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex gap-2">
                          {post.tags.map((tagLink) => (
                            <span
                              key={tagLink.id}
                              className="rounded bg-gray-100 px-2 py-1 text-xs"
                            >
                              {tagLink.tag.name}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Delete button (for demo - in production, check permissions) */}
                <button
                  onClick={() => {
                    if (confirm('Delete this post?')) {
                      deletePost.mutate({ id: post.id });
                    }
                  }}
                  disabled={deletePost.isPending}
                  className="ml-4 rounded px-3 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  {deletePost.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Pagination info */}
      {data?.nextCursor && (
        <div className="text-center">
          <button
            onClick={() => {
              // In a real app, you'd implement cursor pagination here
              console.log('Next cursor:', data.nextCursor);
            }}
            className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            Load More
          </button>
        </div>
      )}

      {/* Create post form (demo) */}
      <div className="rounded-lg border bg-gray-50 p-6">
        <h3 className="mb-4 text-lg font-semibold">Create New Post</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            createPost.mutate({
              title: formData.get('title') as string,
              slug: (formData.get('title') as string)
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, ''),
              content: formData.get('content') as string,
              excerpt: formData.get('excerpt') as string,
              status: 'draft',
            });
            e.currentTarget.reset();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              required
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="My Awesome Post"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Excerpt</label>
            <textarea
              name="excerpt"
              rows={2}
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="A short summary..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              name="content"
              required
              rows={4}
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="Post content goes here..."
            />
          </div>

          <button
            type="submit"
            disabled={createPost.isPending}
            className="rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600 disabled:opacity-50"
          >
            {createPost.isPending ? 'Creating...' : 'Create Post'}
          </button>

          {createPost.error && (
            <div className="text-sm text-red-600">Error: {createPost.error.message}</div>
          )}
        </form>
      </div>
    </div>
  );
}
