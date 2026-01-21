import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { db } from '@/lib/db';

/**
 * Admin Authentication & Authorization
 *
 * Role-based access control (RBAC) system for admin users.
 * Follows Epic 11 principles: explicit actions, audit trails, security-first.
 */

// ============================================================================
// PERMISSION SYSTEM
// ============================================================================

export enum Permission {
  // Content permissions
  CONTENT_VIEW = 'content:view',
  CONTENT_EDIT = 'content:edit',
  CONTENT_PUBLISH = 'content:publish',
  CONTENT_DELETE = 'content:delete',

  // Product permissions
  PRODUCT_MANAGE = 'product:manage',
  PRODUCT_PRICE = 'product:price',

  // Order permissions
  ORDER_VIEW = 'order:view',
  ORDER_REFUND = 'order:refund',

  // Customer permissions
  CUSTOMER_VIEW = 'customer:view',
  CUSTOMER_GRANT_ACCESS = 'customer:grant_access',
  CUSTOMER_REVOKE_ACCESS = 'customer:revoke_access',

  // System permissions
  SYSTEM_MONITOR = 'system:monitor',
  SYSTEM_MANAGE_JOBS = 'system:manage_jobs',
  SYSTEM_CACHE = 'system:cache',
  SYSTEM_AUDIT = 'system:audit',
}

// Admin role has all permissions
// const ADMIN_PERMISSIONS = new Set(Object.values(Permission));

// ============================================================================
// AUTHENTICATION HELPERS
// ============================================================================

/**
 * Require authenticated admin user
 * Redirects to login if not authenticated, to unauthorized if not admin
 */
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/admin');
  }

  if (session.user.role !== 'admin') {
    redirect('/unauthorized');
  }

  return session;
}

/**
 * Check if user has specific permission
 * Admin role has all permissions
 */
export async function requirePermission(_permission: Permission) {
  const session = await requireAdmin();

  // Admin role has all permissions
  if (session.user.role === 'admin') {
    return session;
  }

  // Future: Check role-specific permissions from database
  redirect('/unauthorized');
}

/**
 * Check if current user is admin (without redirect)
 * Useful for conditional UI rendering
 */
export async function isAdmin(): Promise<boolean> {
  const session = await auth();
  return session?.user?.role === 'admin';
}

/**
 * Get current admin user session
 * Returns null if not admin
 */
export async function getAdminSession() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'admin') {
    return null;
  }

  return session;
}

// ============================================================================
// ROLE MANAGEMENT
// ============================================================================

/**
 * Grant admin role to a user
 * Creates admin role if it doesn't exist
 */
export async function grantAdminRole(userId: string, _grantedByUserId: string) {
  // Ensure admin role exists
  let adminRole = await db.role.findUnique({
    where: { name: 'admin' },
  });

  if (!adminRole) {
    const now = new Date();
    adminRole = await db.role.create({
      data: {
        id: crypto.randomUUID(),
        name: 'admin',
        description: 'Full administrative access to all system functions',
        createdAt: now,
        updatedAt: now,
      },
    });
  }

  // Check if user already has admin role
  const existingUserRole = await db.userRole.findFirst({
    where: {
      userId,
      roleId: adminRole.id,
    },
  });

  if (existingUserRole) {
    return existingUserRole;
  }

  // Grant admin role
  return db.userRole.create({
    data: {
      id: crypto.randomUUID(),
      userId,
      roleId: adminRole.id,
    },
  });
}

/**
 * Revoke admin role from a user
 */
export async function revokeAdminRole(userId: string) {
  const adminRole = await db.role.findUnique({
    where: { name: 'admin' },
  });

  if (!adminRole) {
    return null;
  }

  const userRole = await db.userRole.findFirst({
    where: {
      userId,
      roleId: adminRole.id,
    },
  });

  if (!userRole) {
    return null;
  }

  return db.userRole.delete({
    where: { id: userRole.id },
  });
}

/**
 * Get all admin users
 */
export async function getAdminUsers() {
  const adminRole = await db.role.findUnique({
    where: { name: 'admin' },
    include: {
      UserRole: {
        include: {
          User: {
            select: {
              id: true,
              email: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!adminRole) {
    return [];
  }

  return adminRole.UserRole.map((ur) => ur.User);
}
