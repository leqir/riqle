# tRPC API Implementation Summary

## Overview

This document summarizes the complete tRPC API implementation for the Riqle platform, implementing Story 0.7 from Epic 0 (Infrastructure).

## What Was Implemented

### 1. Core tRPC Setup

#### `/src/server/auth.ts`

- NextAuth v5 configuration with GitHub and Google providers
- Prisma adapter for database-backed sessions
- Type-safe session augmentation
- Helper function `getServerAuthSession()` for server-side auth checks

#### `/src/server/api/context.ts`

- tRPC context creation with session and database access
- Fetch adapter compatible context for Next.js App Router
- Type exports for type-safe context usage

#### `/src/server/api/trpc.ts`

- tRPC initialization with SuperJSON transformer
- Zod error formatting for detailed validation errors
- **Four procedure types:**
  - `publicProcedure`: No authentication required
  - `protectedProcedure`: Requires authentication
  - `editorProcedure`: Requires editor or admin role
  - `adminProcedure`: Requires admin role
- Role-checking middleware with database lookups

### 2. Domain Routers

#### Posts Router (`/src/server/api/routers/posts.ts`)

**Public Endpoints:**

- `getAll`: Paginated list with cursor-based pagination
- `getBySlug`: Get single post by slug
- `getById`: Get single post by ID

**Protected Endpoints (Editor+):**

- `create`: Create new post with tags
- `update`: Update post (own posts or admin for all)
- `delete`: Soft delete by archiving

**Admin Endpoints:**

- `hardDelete`: Permanently remove post

**Features:**

- Slug uniqueness validation
- Tag creation/linking with polymorphic TagLink table
- Author permission checks
- Published vs draft visibility
- Comprehensive error handling

#### Products Router (`/src/server/api/routers/products.ts`)

**Public Endpoints:**

- `getAll`: List products with filtering by type
- `getBySlug`: Get product with active prices
- `getById`: Get product by ID

**Admin Endpoints:**

- `create`: Create product with initial prices
- `update`: Update product details
- `delete`: Soft delete by archiving
- `addPrice`: Add new price point
- `updatePrice`: Update price details
- `deletePrice`: Remove price

**Features:**

- Support for one-time and subscription pricing
- Product types: resource, course, bundle
- Multi-currency support
- Active/inactive price management

#### Orders Router (`/src/server/api/routers/orders.ts`)

**Protected Endpoints:**

- `getMyOrders`: Get current user's orders
- `getById`: Get order details (own or admin)
- `create`: Create order manually

**Admin Endpoints:**

- `getAll`: List all orders with filters
- `updateStatus`: Change order status
- `fulfill`: Grant product access (create entitlements)
- `refund`: Refund order and revoke access

**Features:**

- Automatic total calculation
- Order item snapshots (prices at purchase time)
- Entitlement creation on fulfillment
- Entitlement revocation on refund
- Audit logging for critical actions
- Support for guest purchases (userId nullable)

#### Admin Router (`/src/server/api/routers/admin.ts`)

**Endpoints:**

- `getStats`: System-wide statistics dashboard
- `getUsers`: Paginated user list with search
- `getUserById`: Detailed user info with orders/entitlements
- `assignRole`: Grant role to user
- `removeRole`: Remove role from user
- `grantEntitlement`: Manually grant product access
- `revokeEntitlement`: Revoke product access
- `getAuditLogs`: View system audit trail
- `getRoles`: List all available roles

**Features:**

- Comprehensive user management
- Manual access control for support scenarios
- Full audit trail with details
- System health monitoring

### 3. API Integration

#### `/src/server/api/root.ts`

- Combines all domain routers
- Exports `AppRouter` type for client type inference
- Single source of truth for API structure

#### `/src/app/api/trpc/[trpc]/route.ts`

- Next.js App Router API handler
- Fetch adapter for App Router compatibility
- Development error logging
- GET and POST support

### 4. Client Setup

#### `/src/trpc/react.tsx`

- React Query integration
- TRPCReactProvider component
- SuperJSON transformer
- Logger link for development
- HTTP batch link for request optimization
- Type-safe hooks: `api.posts.getAll.useQuery()`

#### `/src/trpc/server.ts`

- Server-side caller for React Server Components
- Direct procedure calls without HTTP overhead
- Request-scoped context caching
- Type-safe server calls: `await api.posts.getAll()`

### 5. Environment Configuration

#### `/src/env.ts`

Added OAuth provider configuration:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## Architecture Decisions

### Why tRPC?

1. **End-to-end type safety**: Changes to server types instantly reflected in client
2. **No code generation**: Types inferred directly from router
3. **Better DX**: Autocomplete, inline errors, refactoring support
4. **Less boilerplate**: No need to define separate API schemas
5. **Performance**: Request batching and caching built-in

### Why SuperJSON?

- Preserves Date objects, Maps, Sets, BigInt
- Automatic serialization/deserialization
- No manual date string conversion

### Why Cursor-Based Pagination?

- Consistent results even with new data
- Better for real-time apps
- Scales better than offset pagination
- No "page drift" issues

### Permission Model

Three-tier access control:

1. **Public**: Anyone (including unauthenticated)
2. **Protected**: Authenticated users only
3. **Editor**: Authenticated + editor role
4. **Admin**: Authenticated + admin role

Roles stored in database, checked via middleware.

## Input Validation

All endpoints use Zod schemas:

- Type inference from schema
- Runtime validation
- Detailed error messages
- Reusable validation logic

Example schema:

```typescript
const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  content: z.string().min(1),
  status: z.enum(['draft', 'published', 'archived']),
  tags: z.array(z.string()).optional(),
});
```

## Error Handling

Standardized error codes:

- `UNAUTHORIZED` (401): Not logged in
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource doesn't exist
- `CONFLICT` (409): Duplicate resource
- `BAD_REQUEST` (400): Invalid input
- `INTERNAL_SERVER_ERROR` (500): Server error

Errors include:

- Human-readable message
- Error code
- Zod validation details (if applicable)

## Type Safety Flow

```
1. Define router procedure with Zod input schema
   ↓
2. tRPC infers types from schema
   ↓
3. Export AppRouter type
   ↓
4. Client imports AppRouter type
   ↓
5. Client gets full autocomplete and type checking
```

No manual type definitions needed!

## Security Features

1. **Authentication**: NextAuth session validation
2. **Authorization**: Role-based access control
3. **Input Validation**: Zod schemas prevent invalid data
4. **SQL Injection**: Prisma prepared statements
5. **Audit Logging**: Critical actions logged
6. **Ownership Checks**: Users can only modify their own resources
7. **Admin Overrides**: Admins can access all resources

## Testing Coverage

See `/docs/API_TESTING_GUIDE.md` for:

- Example queries and mutations
- Error handling examples
- Server-side and client-side usage
- Comprehensive testing checklist

## Performance Optimizations

1. **Request Batching**: Multiple queries sent in one HTTP request
2. **Cursor Pagination**: Efficient data fetching
3. **Database Indexes**: All query fields indexed
4. **Context Caching**: Server-side context cached per request
5. **Query Caching**: React Query stale-time configuration
6. **Selective Includes**: Only fetch needed relations

## Integration Points

### NextAuth

- Session available in tRPC context
- User ID accessible in protected procedures
- Role checks via database queries

### Prisma

- All database operations via Prisma Client
- Type-safe queries
- Relation loading with `include`
- Transaction support available

### Stripe (Future)

- Order creation from Stripe webhooks
- Price syncing with Stripe
- Webhook idempotency via StripeEvent table

## File Structure

```
src/
├── server/
│   ├── auth.ts                 # NextAuth config
│   └── api/
│       ├── context.ts          # tRPC context
│       ├── trpc.ts             # tRPC init & procedures
│       ├── root.ts             # Root router
│       └── routers/
│           ├── posts.ts        # Blog posts
│           ├── products.ts     # Digital products
│           ├── orders.ts       # Order management
│           └── admin.ts        # Admin operations
├── app/
│   └── api/
│       └── trpc/
│           └── [trpc]/
│               └── route.ts    # API route handler
├── trpc/
│   ├── react.tsx               # Client provider
│   └── server.ts               # Server-side caller
└── env.ts                      # Environment validation
```

## Next Steps

1. **Testing**: Run comprehensive tests per API_TESTING_GUIDE.md
2. **Stripe Integration**: Connect order creation to Stripe checkout
3. **Webhooks**: Implement Stripe webhook handlers
4. **Email Notifications**: Send emails on order completion
5. **Admin Dashboard**: Build UI using admin router
6. **Content Management**: Build post/product management UI
7. **Rate Limiting**: Add rate limiting middleware
8. **Caching**: Implement Redis caching for hot data

## Maintenance

### Adding New Endpoints

1. Add procedure to appropriate router
2. Define Zod input schema
3. Implement handler logic
4. Add to API_TESTING_GUIDE.md
5. Types automatically propagate to client

### Adding New Router

1. Create file in `src/server/api/routers/`
2. Export router using `createTRPCRouter`
3. Import and add to `appRouter` in `root.ts`
4. Types automatically available

### Updating Schemas

1. Modify Zod schema
2. TypeScript will show errors in handler
3. Fix handler implementation
4. Client types update automatically

## Known Limitations

1. **Checkout router missing**: Need to implement Stripe checkout flow
2. **File uploads**: Not yet implemented (will use Vercel Blob)
3. **Websockets**: Not supported (use HTTP only)
4. **Caching**: Currently client-side only (no Redis yet)

## Documentation

- **API Usage**: `/docs/API_TESTING_GUIDE.md`
- **Implementation Details**: This file
- **Epic Requirements**: `/docs/epics/epic-0-infrastructure.md` (Story 0.7)

## Success Metrics

✅ All CRUD operations implemented
✅ Type safety end-to-end
✅ Input validation on all endpoints
✅ Consistent error handling
✅ Role-based access control
✅ Audit logging for sensitive operations
✅ Public/protected/admin procedures
✅ Server and client usage patterns
✅ Comprehensive documentation

## Compliance with Story 0.7

| Requirement                          | Status      |
| ------------------------------------ | ----------- |
| Install and configure tRPC           | ✅ Complete |
| Create router structure with context | ✅ Complete |
| Implement publicProcedure            | ✅ Complete |
| Implement protectedProcedure         | ✅ Complete |
| Implement adminProcedure             | ✅ Complete |
| Create posts router                  | ✅ Complete |
| Create products router               | ✅ Complete |
| Create orders router                 | ✅ Complete |
| Create admin router                  | ✅ Complete |
| Use Zod for validation               | ✅ Complete |
| Consistent error handling            | ✅ Complete |
| API client for frontend              | ✅ Complete |
| Type safety end-to-end               | ✅ Complete |
| Next.js API route handler            | ✅ Complete |
| Server-side client                   | ✅ Complete |

**Story 0.7: COMPLETE** ✅
