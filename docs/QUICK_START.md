# tRPC API Quick Start Guide

## Setup Environment Variables

Add these to your `.env` file:

```bash
# Auth (Required for tRPC protected endpoints)
NEXTAUTH_SECRET="your-secret-key-min-32-chars-long"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Database (Already configured)
DATABASE_URL="your-database-url"
DIRECT_URL="your-direct-url"

# Other required env vars...
```

## Database Setup

Ensure you've run migrations and have seeded data:

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate:dev

# Seed database with test data
npm run db:seed
```

The seed script should create:

- Admin user with role
- Editor user with role
- Sample posts
- Sample products with prices
- Sample orders

## Quick Test in Browser Console

### 1. Start Development Server

```bash
npm run dev
```

### 2. Test Public Endpoints

Open browser console on any page and paste:

```javascript
// Fetch all published posts
fetch('/api/trpc/posts.getAll?input={"limit":5}')
  .then((r) => r.json())
  .then(console.log);

// Fetch all products
fetch('/api/trpc/products.getAll?input={"limit":5}')
  .then((r) => r.json())
  .then(console.log);
```

### 3. Test Protected Endpoints

First, sign in via `/auth/signin` (if auth pages exist), then:

```javascript
// Create a post (requires editor role)
fetch('/api/trpc/posts.create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Test Post',
    slug: 'test-post-' + Date.now(),
    content: 'This is a test post',
    status: 'draft',
  }),
})
  .then((r) => r.json())
  .then(console.log);
```

## Test with React Components

### Client Component Example

```tsx
'use client';

import { api } from '@/trpc/react';

export function PostsList() {
  const { data, isLoading, error } = api.posts.getAll.useQuery({
    limit: 10,
    status: 'published',
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Posts</h1>
      {data?.posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <small>By {post.author.name}</small>
        </article>
      ))}
    </div>
  );
}
```

### Server Component Example

```tsx
import { api } from '@/trpc/server';

export default async function PostsPage() {
  const { posts } = await api.posts.getAll({ limit: 10 });

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

## Verify Type Safety

1. Open any file that uses the API
2. Type `api.` and verify autocomplete shows all routers
3. Type `api.posts.` and verify autocomplete shows all procedures
4. Type `api.posts.getAll.` and verify autocomplete shows `.useQuery()`
5. Hover over input parameter to see Zod schema requirements

## Test Error Handling

### Invalid Input

```tsx
'use client';

import { api } from '@/trpc/react';

export function TestErrors() {
  const createPost = api.posts.create.useMutation({
    onError: (error) => {
      console.log('Error code:', error.data?.code);
      console.log('Validation errors:', error.data?.zodError);
    },
  });

  const testInvalidInput = () => {
    createPost.mutate({
      title: '', // Invalid: required
      slug: 'Invalid Slug!', // Invalid: must be lowercase-hyphenated
      content: 'Test',
      status: 'draft',
    });
  };

  return <button onClick={testInvalidInput}>Test Invalid Input</button>;
}
```

### Unauthorized Access

```tsx
// Try to create a post without being logged in
// Should get UNAUTHORIZED error
const createPost = api.posts.create.useMutation();
createPost.mutate({
  /* ... */
});
```

### Forbidden Access

```tsx
// Try to access admin endpoint without admin role
// Should get FORBIDDEN error
const stats = api.admin.getStats.useQuery();
```

## Common Issues

### "Module not found: Can't resolve '@/server/api/root'"

- Run `npm run db:generate` to generate Prisma Client
- Restart TypeScript server in VS Code

### "UNAUTHORIZED" error on protected endpoints

- Ensure you're signed in via NextAuth
- Check that session is being created in database

### "FORBIDDEN" error on admin endpoints

- Ensure your user has the 'admin' role in the database
- Check `UserRole` table has entry linking user to admin role

### Zod validation errors

- Check the input schema in the router file
- Ensure all required fields are provided
- Verify data types match schema

## Next Steps

1. Review [API_TESTING_GUIDE.md](./API_TESTING_GUIDE.md) for comprehensive examples
2. Review [TRPC_IMPLEMENTATION_SUMMARY.md](./TRPC_IMPLEMENTATION_SUMMARY.md) for architecture details
3. Implement UI components that consume the API
4. Add Stripe checkout integration
5. Build admin dashboard

## Development Workflow

### Adding a New Endpoint

1. **Define the endpoint** in the appropriate router:

```typescript
// src/server/api/routers/posts.ts
export const postsRouter = createTRPCRouter({
  // ... existing endpoints

  getByTag: publicProcedure
    .input(
      z.object({
        tagSlug: z.string(),
        limit: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          tags: {
            some: {
              tag: { slug: input.tagSlug },
            },
          },
          status: 'published',
        },
        take: input.limit,
      });

      return { posts };
    }),
});
```

2. **Use it in your component** (types are automatic!):

```tsx
'use client';

import { api } from '@/trpc/react';

export function PostsByTag({ tagSlug }: { tagSlug: string }) {
  const { data } = api.posts.getByTag.useQuery({
    tagSlug,
    limit: 10,
  });

  return <div>{/* render posts */}</div>;
}
```

3. **No build step needed** - TypeScript knows about your new endpoint immediately!

## Debugging

### Enable tRPC Logging

The logger link is already enabled in development. Check browser console for:

- Request duration
- Query/mutation name
- Input data
- Response data
- Errors

### Enable Prisma Query Logging

Already configured in `src/lib/db.ts`:

- Development: logs queries, errors, warnings
- Production: logs errors only

### Check API Route

Visit `http://localhost:3000/api/trpc/posts.getAll?input={}` to see raw response.

## Production Checklist

Before deploying:

- [ ] All environment variables set in production
- [ ] Database migrations run
- [ ] At least one admin user created
- [ ] Test all critical endpoints
- [ ] Error monitoring configured (Sentry)
- [ ] Rate limiting enabled
- [ ] CORS configured if needed

## Support

For issues or questions:

1. Check this guide first
2. Review API_TESTING_GUIDE.md
3. Review TRPC_IMPLEMENTATION_SUMMARY.md
4. Check tRPC documentation: https://trpc.io
