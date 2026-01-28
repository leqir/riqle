# Database Configuration & Connection Pooling

## Overview

This document describes database configuration best practices, connection pooling setup, and performance optimization for the Riqle platform.

## Connection Pooling

Prisma automatically manages database connection pooling. The connection pool is configured via the `DATABASE_URL` environment variable.

### Configuration

**Format:**
```
DATABASE_URL="postgresql://user:password@host:port/database?connection_limit=10&pool_timeout=20"
```

**Recommended Settings:**

- **connection_limit**: `10` (for serverless environments like Vercel)
  - Serverless functions can spawn many instances
  - Lower limit prevents exhausting database connections
  - For dedicated servers: `20-50` connections

- **pool_timeout**: `20` seconds
  - How long to wait for an available connection
  - Should be higher than your slowest expected query

- **connect_timeout**: `10` seconds (optional)
  - Maximum time to establish initial connection
  - Helps detect connection issues early

**Example Production URL:**
```
DATABASE_URL="postgresql://user:pass@db.example.com:5432/riqle?connection_limit=10&pool_timeout=20&connect_timeout=10"
```

### Environment-Specific Settings

**Development:**
```bash
# .env.development
DATABASE_URL="postgresql://localhost:5432/riqle_dev?connection_limit=5"
```

**Production (Vercel):**
```bash
# Vercel environment variables
DATABASE_URL="postgresql://user:pass@host:5432/riqle_prod?connection_limit=10&pool_timeout=20"
```

**Production (Dedicated Server):**
```bash
# Higher connection limit for dedicated infrastructure
DATABASE_URL="postgresql://user:pass@host:5432/riqle_prod?connection_limit=30&pool_timeout=20"
```

## Query Performance Tools

### 1. Query Timeouts

Prevent slow queries from blocking requests:

```typescript
import { withTimeout } from '@/lib/db/with-timeout';
import { prisma } from '@/lib/db/prisma';

// Timeout after 3 seconds
const posts = await withTimeout(
  prisma.post.findMany({ where: { published: true } }),
  3000
);
```

**Default timeout:** 5 seconds
**Recommended for:**
- API endpoints: 3-5 seconds
- Background jobs: 10-30 seconds
- Admin operations: 10-15 seconds

### 2. Safe Query Limits

Enforce maximum result limits to prevent unbounded queries:

```typescript
import { safeAdminQuery } from '@/lib/db/safe-queries';

const { items, total, page, pageSize } = await safeAdminQuery({
  model: 'post',
  where: { published: true },
  page: 1,
  pageSize: 20, // Automatically capped at MAX_QUERY_LIMIT (100)
});
```

**Limits:**
- `MAX_QUERY_LIMIT`: 100 records per query
- `DEFAULT_QUERY_LIMIT`: 20 records for paginated lists

### 3. Query Monitoring

Track and log slow queries for optimization:

```typescript
import { monitoredQuery } from '@/lib/db/monitoring';

const posts = await monitoredQuery(
  'posts.findPublished', // Query name for tracking
  () => prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  }),
  {
    timeoutMs: 3000,
    slowThreshold: 500 // Log if query takes > 500ms
  }
);
```

**Slow query threshold:** 1000ms (1 second)
**Logs:** Console in development, send to Sentry in production

## Index Strategy

All critical queries have supporting indexes. See `prisma/schema.prisma` for full index list.

### Key Indexes

**Orders:**
- `status` - Filter by order status
- `customerEmail` - Customer lookup
- `createdAt` - Chronological sorting
- `userId` - User's orders

**Posts:**
- `[published, publishedAt]` - Published posts by date
- `[featured, published]` - Featured published posts
- `slug` - Single post lookup

**Entitlements:**
- `[userId, active]` - Active user entitlements
- `[productId, active]` - Active product licenses
- `[accessToken]` - Token validation

**Products:**
- `slug` - Product page lookup
- `active` - Active products list

### Adding New Indexes

When adding new queries, consider indexes if:
1. Query filters on a column frequently
2. Query sorts by a column
3. Query joins on a foreign key (already indexed by Prisma)

```prisma
model Post {
  // ...fields...

  @@index([newColumn]) // Single column
  @@index([column1, column2]) // Composite index
}
```

Run migration after adding indexes:
```bash
npx prisma migrate dev --name add_index_name
```

## Performance Monitoring

### Database Health Check

Monitor database connectivity:
```bash
curl https://your-domain.com/api/health/db
```

Returns:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-27T12:00:00.000Z",
  "database": {
    "connected": true,
    "responseTimeMs": 45
  }
}
```

**Configure monitoring service** (UptimeRobot, Pingdom, etc.) to poll this endpoint every 1-5 minutes.

### Query Statistics (Development)

In development, track slow queries:

```typescript
import { globalQueryStats } from '@/lib/db/monitoring';

// View slowest queries
const slowest = globalQueryStats?.getSlowestQueries(10);
console.table(slowest);
```

## Best Practices

### ✅ DO

- **Always use pagination** for list queries
- **Set explicit limits** on all findMany queries
- **Use indexes** for frequently queried columns
- **Monitor slow queries** in production
- **Use connection pooling** with appropriate limits
- **Add timeouts** to all queries
- **Use transactions** for multi-step operations

```typescript
// Good: Explicit limit, timeout, monitoring
const posts = await monitoredQuery(
  'posts.recent',
  () => prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 20, // Explicit limit
  }),
  { timeoutMs: 3000 }
);
```

### ❌ DON'T

- **Don't use findMany without take/skip** (unbounded queries)
- **Don't query in loops** (N+1 problem)
- **Don't use overly complex queries** (break into multiple queries)
- **Don't ignore slow query warnings** (optimize immediately)
- **Don't exceed connection pool** (use appropriate limits)

```typescript
// Bad: No limit, potential N+1
const posts = await prisma.post.findMany();
for (const post of posts) {
  // N+1: Each iteration makes a query
  const author = await prisma.user.findUnique({
    where: { id: post.userId }
  });
}

// Good: Include related data
const posts = await prisma.post.findMany({
  take: 20,
  include: { user: true }, // Single query with join
});
```

## Troubleshooting

### Connection Pool Exhausted

**Error:** `Timed out fetching a new connection from the connection pool`

**Solutions:**
1. Reduce `connection_limit` in DATABASE_URL
2. Ensure queries are completing (not hanging)
3. Check for connection leaks (missing `await`)
4. Increase `pool_timeout` if queries are legitimately slow

### Slow Queries

**Symptoms:** Requests taking > 1 second, timeout errors

**Solutions:**
1. Check monitoring logs for slow queries
2. Add indexes for filtered/sorted columns
3. Reduce query complexity (fewer includes/joins)
4. Add pagination/limits
5. Use database EXPLAIN ANALYZE to identify bottlenecks

### Database Connection Failures

**Symptoms:** 503 errors, health check failures

**Solutions:**
1. Check database is running
2. Verify DATABASE_URL is correct
3. Check network connectivity
4. Verify connection limits not exhausted
5. Check database server logs

## Additional Resources

- [Prisma Connection Management](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [PostgreSQL Connection Pooling](https://www.postgresql.org/docs/current/runtime-config-connection.html)
- [Next.js Database Best Practices](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns)
