# Authorization Implementation Guide (Story 14.4)

## Overview

This document describes the authorization (access control) system requirements for the Riqle platform based on Epic 14, Story 14.4.

**Status**: 📋 NOT YET IMPLEMENTED
**Priority**: High (Required for admin access)
**Complexity**: High (8-10 hours estimated)
**Depends On**: Story 14.3 (Authentication)

---

## Requirements Summary

From Epic 14, Story 14.4:

**Goal**: Access controls that prevent unauthorized access

**Acceptance Criteria**:
- ✅ RBAC enforced (public, customer, admin)
- ✅ Entitlement-based checks protect paid content
- ✅ All access decisions occur server-side
- ✅ Default deny, explicit allow
- ✅ No route or resource accidentally accessible
- ✅ Privilege escalation impossible

---

## Role-Based Access Control (RBAC)

### Roles

```typescript
export enum Role {
  PUBLIC = 'PUBLIC',     // Anonymous users
  CUSTOMER = 'CUSTOMER', // Purchased at least one product
  ADMIN = 'ADMIN',       // Full system access
}
```

### Permissions

```typescript
export enum Permission {
  // Content
  VIEW_PUBLIC_CONTENT = 'content:view:public',
  VIEW_PAID_CONTENT = 'content:view:paid',
  MANAGE_CONTENT = 'content:manage',

  // Commerce
  PURCHASE_PRODUCT = 'commerce:purchase',
  VIEW_OWN_ORDERS = 'commerce:view:own',
  VIEW_ALL_ORDERS = 'commerce:view:all',
  ISSUE_REFUND = 'commerce:refund',

  // Admin
  ACCESS_ADMIN = 'admin:access',
  MANAGE_PRODUCTS = 'admin:products:manage',
  MANAGE_USERS = 'admin:users:manage',
  VIEW_LOGS = 'admin:logs:view',
}
```

### Role-Permission Mapping

```typescript
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.PUBLIC]: [
    Permission.VIEW_PUBLIC_CONTENT,
    Permission.PURCHASE_PRODUCT,
  ],

  [Role.CUSTOMER]: [
    Permission.VIEW_PUBLIC_CONTENT,
    Permission.VIEW_PAID_CONTENT,
    Permission.PURCHASE_PRODUCT,
    Permission.VIEW_OWN_ORDERS,
  ],

  [Role.ADMIN]: [
    // Admin has all permissions
    ...Object.values(Permission),
  ],
};
```

---

## Implementation

### Step 1: Create RBAC System

Create `lib/auth/rbac.ts`:

```typescript
export enum Role {
  PUBLIC = 'PUBLIC',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export enum Permission {
  // Content
  VIEW_PUBLIC_CONTENT = 'content:view:public',
  VIEW_PAID_CONTENT = 'content:view:paid',
  MANAGE_CONTENT = 'content:manage',

  // Commerce
  PURCHASE_PRODUCT = 'commerce:purchase',
  VIEW_OWN_ORDERS = 'commerce:view:own',
  VIEW_ALL_ORDERS = 'commerce:view:all',
  ISSUE_REFUND = 'commerce:refund',

  // Admin
  ACCESS_ADMIN = 'admin:access',
  MANAGE_PRODUCTS = 'admin:products:manage',
  MANAGE_USERS = 'admin:users:manage',
  VIEW_LOGS = 'admin:logs:view',
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.PUBLIC]: [Permission.VIEW_PUBLIC_CONTENT, Permission.PURCHASE_PRODUCT],

  [Role.CUSTOMER]: [
    Permission.VIEW_PUBLIC_CONTENT,
    Permission.VIEW_PAID_CONTENT,
    Permission.PURCHASE_PRODUCT,
    Permission.VIEW_OWN_ORDERS,
  ],

  [Role.ADMIN]: Object.values(Permission), // All permissions
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission));
}
```

### Step 2: Create Authorization Middleware

Create `lib/auth/require-permission.ts`:

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from './auth-options';
import { Permission, hasPermission } from './rbac';
import { NextResponse } from 'next/server';

export async function requirePermission(permission: Permission) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Not authenticated');
  }

  if (!hasPermission(session.user.role, permission)) {
    throw new Error(`Missing permission: ${permission}`);
  }

  return session;
}

export async function requireAnyPermission(permissions: Permission[]) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Not authenticated');
  }

  if (!hasAnyPermission(session.user.role, permissions)) {
    throw new Error('Missing required permissions');
  }

  return session;
}

// API route helper
export function withPermission(permission: Permission, handler: Function) {
  return async (request: Request) => {
    try {
      await requirePermission(permission);
      return handler(request);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Unauthorized' },
        { status: 403 }
      );
    }
  };
}

// Usage:
// export const POST = withPermission(
//   Permission.MANAGE_CONTENT,
//   async (request: Request) => {
//     // Handler code
//   }
// );
```

### Step 3: Create Route Guards

Create `lib/auth/route-guards.ts`:

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from './auth-options';
import { redirect } from 'next/navigation';
import { Role } from './rbac';

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return session;
}

export async function requireRole(allowedRoles: Role[]) {
  const session = await requireAuth();

  if (!allowedRoles.includes(session.user.role)) {
    redirect('/');
  }

  return session;
}

export async function requireAdmin() {
  return requireRole([Role.ADMIN]);
}

// Usage in page components:
// export default async function AdminPage() {
//   await requireAdmin();
//   // ... render admin page
// }
```

### Step 4: Create Entitlement Checks

Create `lib/access/check-entitlement.ts`:

```typescript
import { prisma } from '@/lib/db/prisma';

export async function checkEntitlement(
  userId: string,
  productId: string
): Promise<boolean> {
  const entitlement = await prisma.entitlement.findFirst({
    where: {
      userId,
      productId,
      active: true,
    },
  });

  return !!entitlement;
}

export async function requireEntitlement(
  userId: string,
  productId: string
): Promise<void> {
  const hasAccess = await checkEntitlement(userId, productId);

  if (!hasAccess) {
    throw new Error('No entitlement for this product');
  }
}

// Usage in access routes:
// export async function GET(request: Request) {
//   const token = verifyAccessToken(searchParams.token);
//   await requireEntitlement(token.userId, product.id);
//   // ... grant access
// }
```

### Step 5: Create API Handler with Authorization

Create `lib/api/api-handler.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { Permission, hasPermission } from '@/lib/auth/rbac';

interface ApiHandlerOptions {
  requireAuth?: boolean;
  requirePermission?: Permission;
  allowedMethods?: string[];
}

export function createApiHandler(
  handler: (request: NextRequest) => Promise<NextResponse>,
  options: ApiHandlerOptions = {}
) {
  return async (request: NextRequest) => {
    try {
      // Method validation
      if (options.allowedMethods && !options.allowedMethods.includes(request.method)) {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
      }

      // Authentication check
      if (options.requireAuth || options.requirePermission) {
        const session = await getServerSession(authOptions);

        if (!session) {
          return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }

        // Permission check
        if (options.requirePermission) {
          if (!hasPermission(session.user.role, options.requirePermission)) {
            return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
          }
        }
      }

      // Execute handler
      return handler(request);
    } catch (error) {
      console.error('API handler error:', error);

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  };
}

// Usage:
// export const POST = createApiHandler(
//   async (request) => {
//     // Handler code
//   },
//   {
//     requireAuth: true,
//     requirePermission: Permission.MANAGE_CONTENT,
//     allowedMethods: ['POST'],
//   }
// );
```

---

## Usage Examples

### Example 1: Protect Admin Page

```typescript
// app/admin/page.tsx
import { requireAdmin } from '@/lib/auth/route-guards';

export default async function AdminPage() {
  await requireAdmin(); // Redirects if not admin

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin content */}
    </div>
  );
}
```

### Example 2: Protect API Endpoint with Permission

```typescript
// app/api/admin/products/route.ts
import { createApiHandler } from '@/lib/api/api-handler';
import { Permission } from '@/lib/auth/rbac';

export const POST = createApiHandler(
  async (request) => {
    const body = await request.json();
    // Create product logic
    return NextResponse.json({ success: true });
  },
  {
    requireAuth: true,
    requirePermission: Permission.MANAGE_PRODUCTS,
    allowedMethods: ['POST'],
  }
);
```

### Example 3: Check User's Own Resources

```typescript
// app/api/orders/[orderId]/route.ts
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
  });

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  // Check if user owns this order OR is admin
  if (order.userId !== session.user.id && session.user.role !== Role.ADMIN) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json(order);
}
```

### Example 4: Entitlement Check

```typescript
// app/api/products/[productId]/download/route.ts
import { requireEntitlement } from '@/lib/access/check-entitlement';
import { getServerSession } from 'next-auth';

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Check entitlement
  try {
    await requireEntitlement(session.user.id, params.productId);
  } catch (error) {
    return NextResponse.json({ error: 'No access to this product' }, { status: 403 });
  }

  // Generate signed URL and return
  // ...
}
```

---

## Testing Privilege Escalation

### Test Cases

Create `tests/security/privilege-escalation.test.ts`:

```typescript
describe('Privilege Escalation Prevention', () => {
  it('public user cannot access admin routes', async () => {
    const response = await fetch('/api/admin/products', {
      method: 'GET',
    });

    expect(response.status).toBe(401); // Unauthorized
  });

  it('customer cannot access other customer orders', async () => {
    const customerASession = await signIn('customer-a@example.com');
    const customerBOrderId = 'order-123';

    const response = await fetch(`/api/orders/${customerBOrderId}`, {
      method: 'GET',
      headers: {
        Cookie: customerASession.cookie,
      },
    });

    expect(response.status).toBe(403); // Forbidden
  });

  it('customer cannot grant themselves admin', async () => {
    const customerSession = await signIn('customer@example.com');

    const response = await fetch('/api/users/me', {
      method: 'PATCH',
      headers: {
        Cookie: customerSession.cookie,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: 'ADMIN' }),
    });

    expect(response.status).toBe(403); // Forbidden
  });

  it('entitlement cannot be bypassed', async () => {
    const customerSession = await signIn('customer@example.com');
    const productWithoutEntitlement = 'product-123';

    const response = await fetch(`/api/download/${productWithoutEntitlement}`, {
      method: 'GET',
      headers: {
        Cookie: customerSession.cookie,
      },
    });

    expect(response.status).toBe(403); // Forbidden (no entitlement)
  });

  it('admin role cannot be set directly in database without validation', async () => {
    // Test that direct database manipulation doesn't grant admin access
    // This tests application-level authorization
  });
});
```

---

## Default Deny Principle

**Critical**: Always default to denying access, then explicitly allow.

### ❌ Wrong (Insecure)

```typescript
// BAD: Allows access by default
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  // Only check if NOT admin
  if (session?.user?.role !== 'ADMIN') {
    // Do something different
  }

  // Proceeds regardless
  return NextResponse.json({ data: 'sensitive' });
}
```

### ✅ Right (Secure)

```typescript
// GOOD: Denies by default, explicitly allows
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  // Deny by default
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Explicitly check role
  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Only proceeds if explicitly allowed
  return NextResponse.json({ data: 'sensitive' });
}
```

---

## Security Checklist

Before deploying:

- [ ] All admin routes protected with `requireAdmin()`
- [ ] All API endpoints have authorization checks
- [ ] User can only access their own resources
- [ ] Entitlement checks server-side (never client-only)
- [ ] Default deny principle enforced everywhere
- [ ] No client-only security checks
- [ ] Privilege escalation tests pass
- [ ] Role assignment only possible by admins
- [ ] Entitlements verified before content access
- [ ] API endpoints return 401 (not authenticated) or 403 (forbidden) appropriately

---

## Common Pitfalls

### ❌ Pitfall 1: Client-Side Authorization

```typescript
// BAD: Client-side check only
'use client';

export default function AdminPage() {
  const { data: session } = useSession();

  if (session?.user?.role !== 'ADMIN') {
    return <div>Access denied</div>;
  }

  return <AdminContent />; // Can be bypassed in browser
}
```

### ✅ Solution: Server-Side Authorization

```typescript
// GOOD: Server-side check
export default async function AdminPage() {
  await requireAdmin(); // Server-side redirect if not admin

  return <AdminContent />;
}
```

### ❌ Pitfall 2: Trusting Client Input

```typescript
// BAD: Trusting role from request
export async function POST(request: Request) {
  const { role } = await request.json();

  if (role === 'ADMIN') {
    // Grant admin access - INSECURE!
  }
}
```

### ✅ Solution: Get Role from Session

```typescript
// GOOD: Get role from authenticated session
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role === 'ADMIN') {
    // Grant admin access - SECURE
  }
}
```

### ❌ Pitfall 3: No Resource Ownership Check

```typescript
// BAD: No ownership check
export async function DELETE(request: Request, { params }) {
  await prisma.order.delete({ where: { id: params.orderId } });
  return NextResponse.json({ success: true });
}
```

### ✅ Solution: Verify Ownership

```typescript
// GOOD: Check ownership
export async function DELETE(request: Request, { params }) {
  const session = await getServerSession(authOptions);
  const order = await prisma.order.findUnique({ where: { id: params.orderId } });

  if (order?.userId !== session?.user?.id && session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await prisma.order.delete({ where: { id: params.orderId } });
  return NextResponse.json({ success: true });
}
```

---

## Resources

- [OWASP Access Control](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [NextAuth.js Authorization](https://next-auth.js.org/configuration/callbacks#jwt-callback)
- [Principle of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege)

---

Last Updated: 2024-01-27
Status: 📋 Ready for Implementation
Dependencies: Story 14.3 (Authentication) must be completed first
