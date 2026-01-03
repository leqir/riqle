# tRPC API Testing Guide

This guide provides examples of how to test all tRPC endpoints manually and programmatically.

## Setup

The tRPC API is fully type-safe and accessible through:

- **Client-side**: `import { api } from '@/trpc/react'` (React hooks)
- **Server-side**: `import { api } from '@/trpc/server'` (direct calls in Server Components)

## Authentication

All protected and admin endpoints require authentication. To test:

1. Sign in through NextAuth
2. Session will be automatically included in tRPC context
3. Admin endpoints also check for admin role in the database

## Posts Router (`api.posts.*`)

### Public Endpoints

#### Get All Posts

```tsx
// Client
const { data } = api.posts.getAll.useQuery({
  limit: 10,
  status: 'published',
});

// Server
const posts = await api.posts.getAll({ limit: 10 });
```

#### Get Post by Slug

```tsx
const { data } = api.posts.getBySlug.useQuery({
  slug: 'my-first-post',
});
```

#### Get Post by ID

```tsx
const { data } = api.posts.getById.useQuery({
  id: 'clx123...',
});
```

### Editor/Admin Endpoints

#### Create Post

```tsx
const createPost = api.posts.create.useMutation();

createPost.mutate({
  title: 'My New Post',
  slug: 'my-new-post',
  content: 'Post content here...',
  excerpt: 'Short summary',
  status: 'draft',
  tags: ['typescript', 'nextjs'],
});
```

#### Update Post

```tsx
const updatePost = api.posts.update.useMutation();

updatePost.mutate({
  id: 'clx123...',
  title: 'Updated Title',
  status: 'published',
  publishedAt: new Date(),
});
```

#### Delete Post (Soft)

```tsx
const deletePost = api.posts.delete.useMutation();
deletePost.mutate({ id: 'clx123...' });
```

#### Hard Delete Post (Admin Only)

```tsx
const hardDelete = api.posts.hardDelete.useMutation();
hardDelete.mutate({ id: 'clx123...' });
```

## Products Router (`api.products.*`)

### Public Endpoints

#### Get All Products

```tsx
const { data } = api.products.getAll.useQuery({
  limit: 10,
  status: 'published',
  type: 'course',
});
```

#### Get Product by Slug

```tsx
const { data } = api.products.getBySlug.useQuery({
  slug: 'typescript-course',
});
```

### Admin Endpoints

#### Create Product

```tsx
const createProduct = api.products.create.useMutation();

createProduct.mutate({
  name: 'TypeScript Masterclass',
  slug: 'typescript-masterclass',
  description: 'Learn TypeScript from scratch',
  status: 'published',
  type: 'course',
  prices: [
    {
      amount: 9900, // $99.00 in cents
      currency: 'USD',
      interval: null, // One-time payment
      active: true,
    },
  ],
});
```

#### Update Product

```tsx
const updateProduct = api.products.update.useMutation();

updateProduct.mutate({
  id: 'clx123...',
  name: 'Updated Product Name',
  status: 'published',
});
```

#### Add Price to Product

```tsx
const addPrice = api.products.addPrice.useMutation();

addPrice.mutate({
  productId: 'clx123...',
  amount: 19900,
  currency: 'USD',
  interval: 'month',
  active: true,
});
```

## Orders Router (`api.orders.*`)

### Protected Endpoints

#### Get My Orders

```tsx
const { data } = api.orders.getMyOrders.useQuery({
  limit: 10,
  status: 'completed',
});
```

#### Get Order by ID

```tsx
const { data } = api.orders.getById.useQuery({
  id: 'clx123...',
});
```

#### Create Order (Manual)

```tsx
const createOrder = api.orders.create.useMutation();

createOrder.mutate({
  items: [{ productId: 'clx123...', priceId: 'clx456...' }],
  customerEmail: 'user@example.com',
  customerName: 'John Doe',
});
```

### Admin Endpoints

#### Get All Orders

```tsx
const { data } = api.orders.getAll.useQuery({
  limit: 50,
  status: 'pending',
  userId: 'clx123...',
});
```

#### Update Order Status

```tsx
const updateStatus = api.orders.updateStatus.useMutation();

updateStatus.mutate({
  id: 'clx123...',
  status: 'completed',
});
```

#### Fulfill Order (Grant Access)

```tsx
const fulfill = api.orders.fulfill.useMutation();
fulfill.mutate({ id: 'clx123...' });
```

#### Refund Order

```tsx
const refund = api.orders.refund.useMutation();

refund.mutate({
  id: 'clx123...',
  reason: 'Customer requested refund',
});
```

## Admin Router (`api.admin.*`)

### System Stats

```tsx
const { data: stats } = api.admin.getStats.useQuery();
// Returns: users, orders, revenue, products, posts, entitlements
```

### User Management

#### Get All Users

```tsx
const { data } = api.admin.getUsers.useQuery({
  limit: 50,
  search: 'john',
});
```

#### Get User by ID

```tsx
const { data } = api.admin.getUserById.useQuery({
  id: 'clx123...',
});
```

#### Assign Role

```tsx
const assignRole = api.admin.assignRole.useMutation();

assignRole.mutate({
  userId: 'clx123...',
  roleName: 'editor',
});
```

#### Remove Role

```tsx
const removeRole = api.admin.removeRole.useMutation();

removeRole.mutate({
  userId: 'clx123...',
  roleName: 'editor',
});
```

### Entitlement Management

#### Grant Access

```tsx
const grantAccess = api.admin.grantEntitlement.useMutation();

grantAccess.mutate({
  userId: 'clx123...',
  productId: 'clx456...',
  expiresAt: new Date('2025-12-31'),
  reason: 'Promotional access',
});
```

#### Revoke Access

```tsx
const revokeAccess = api.admin.revokeEntitlement.useMutation();

revokeAccess.mutate({
  userId: 'clx123...',
  productId: 'clx456...',
  reason: 'Subscription expired',
});
```

### Audit Logs

```tsx
const { data } = api.admin.getAuditLogs.useQuery({
  limit: 100,
  action: 'refund',
  entity: 'order',
});
```

### Get Roles

```tsx
const { data: roles } = api.admin.getRoles.useQuery();
```

## Error Handling

All tRPC endpoints use standardized error codes:

- `UNAUTHORIZED` (401): User not authenticated
- `FORBIDDEN` (403): User lacks required permissions
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Duplicate resource (e.g., slug already exists)
- `BAD_REQUEST` (400): Invalid input data
- `INTERNAL_SERVER_ERROR` (500): Server error

### Example Error Handling

```tsx
const createPost = api.posts.create.useMutation({
  onSuccess: (data) => {
    console.log('Post created:', data);
  },
  onError: (error) => {
    if (error.data?.code === 'UNAUTHORIZED') {
      console.log('Please sign in');
    } else if (error.data?.code === 'CONFLICT') {
      console.log('Slug already exists');
    } else if (error.data?.zodError) {
      console.log('Validation errors:', error.data.zodError);
    }
  },
});
```

## Input Validation

All endpoints use Zod for validation. Invalid inputs will return detailed error messages:

```tsx
createPost.mutate({
  title: '', // Error: Title is required
  slug: 'Invalid Slug!', // Error: Slug must be lowercase alphanumeric with hyphens
  content: 'Content'
});

// Error response includes:
{
  data: {
    zodError: {
      fieldErrors: {
        title: ['Title is required'],
        slug: ['Slug must be lowercase alphanumeric with hyphens']
      }
    }
  }
}
```

## Testing Checklist

### Posts

- [ ] Create post as editor
- [ ] Update own post as editor
- [ ] Try to update another user's post (should fail)
- [ ] Delete post (soft delete)
- [ ] Hard delete as admin
- [ ] List published posts (public)
- [ ] Try to view draft post without auth (should fail)

### Products

- [ ] Create product as admin
- [ ] Add price to product
- [ ] Update price
- [ ] List published products (public)
- [ ] Try to create product as non-admin (should fail)

### Orders

- [ ] Create order
- [ ] View own orders
- [ ] Fulfill order as admin
- [ ] Refund order as admin
- [ ] Verify entitlements granted on fulfillment
- [ ] Verify entitlements revoked on refund

### Admin

- [ ] View system stats
- [ ] Assign admin role to user
- [ ] Manually grant product access
- [ ] Revoke product access
- [ ] View audit logs
- [ ] Try admin endpoints as non-admin (should fail)

## Server-Side Usage in React Server Components

```tsx
// app/posts/page.tsx
import { api } from '@/trpc/server';

export default async function PostsPage() {
  const { posts } = await api.posts.getAll({ limit: 10 });

  return (
    <div>
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

## Client-Side Usage in Client Components

```tsx
'use client';

import { api } from '@/trpc/react';

export function PostsList() {
  const { data, isLoading } = api.posts.getAll.useQuery({
    limit: 10,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}
```
