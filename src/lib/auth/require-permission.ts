import { auth } from '@/auth';
import { Permission, hasPermission, hasAnyPermission, hasAllPermissions, Role } from './rbac';
import { NextResponse } from 'next/server';
import 'server-only';

/**
 * Permission-Based Authorization (Epic 14: Story 14.4)
 *
 * Middleware for checking user permissions in API routes and server actions.
 *
 * Security Principle: Server-side authorization only.
 * - Never trust client-side permission checks
 * - All authorization decisions happen on the server
 * - Default deny (explicit permission required)
 */

/**
 * Require a specific permission
 *
 * @param permission - The required permission
 * @throws {Error} If user is not authenticated or lacks permission
 * @returns The current session
 *
 * @example
 * ```typescript
 * // In a Server Action
 * export async function deletePost(postId: string) {
 *   await requirePermission(Permission.MANAGE_CONTENT);
 *   // ... proceed with deletion
 * }
 * ```
 */
export async function requirePermission(permission: Permission) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized: Authentication required');
  }

  const userRole = (session.user.role as Role) || Role.PUBLIC;

  if (!hasPermission(userRole, permission)) {
    throw new Error(`Forbidden: Missing permission: ${permission}`);
  }

  return session;
}

/**
 * Require ANY of the specified permissions
 *
 * @param permissions - Array of permissions (user needs at least one)
 * @throws {Error} If user lacks all permissions
 * @returns The current session
 *
 * @example
 * ```typescript
 * await requireAnyPermission([
 *   Permission.MANAGE_CONTENT,
 *   Permission.MANAGE_PRODUCTS
 * ]);
 * ```
 */
export async function requireAnyPermission(permissions: Permission[]) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized: Authentication required');
  }

  const userRole = (session.user.role as Role) || Role.PUBLIC;

  if (!hasAnyPermission(userRole, permissions)) {
    throw new Error(`Forbidden: Missing required permissions`);
  }

  return session;
}

/**
 * Require ALL of the specified permissions
 *
 * @param permissions - Array of permissions (user needs all)
 * @throws {Error} If user lacks any permission
 * @returns The current session
 *
 * @example
 * ```typescript
 * await requireAllPermissions([
 *   Permission.VIEW_LOGS,
 *   Permission.MANAGE_USERS
 * ]);
 * ```
 */
export async function requireAllPermissions(permissions: Permission[]) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized: Authentication required');
  }

  const userRole = (session.user.role as Role) || Role.PUBLIC;

  if (!hasAllPermissions(userRole, permissions)) {
    throw new Error(`Forbidden: Missing required permissions`);
  }

  return session;
}

/**
 * Check if current user has a permission (non-throwing)
 *
 * @param permission - The permission to check
 * @returns True if user has permission, false otherwise
 *
 * @example
 * ```typescript
 * const canManage = await checkPermission(Permission.MANAGE_CONTENT);
 * if (canManage) {
 *   // Show manage button
 * }
 * ```
 */
export async function checkPermission(permission: Permission): Promise<boolean> {
  try {
    await requirePermission(permission);
    return true;
  } catch {
    return false;
  }
}

/**
 * API route wrapper that requires a specific permission
 *
 * @param permission - The required permission
 * @param handler - The API route handler function
 * @returns Wrapped handler with permission check
 *
 * @example
 * ```typescript
 * import { withPermission } from '@/lib/auth/require-permission';
 * import { Permission } from '@/lib/auth/rbac';
 *
 * async function handler(request: Request) {
 *   // ... your handler code
 *   return NextResponse.json({ success: true });
 * }
 *
 * export const POST = withPermission(Permission.MANAGE_CONTENT, handler);
 * ```
 */
export function withPermission<T extends (...args: any[]) => Promise<any>>(
  permission: Permission,
  handler: T
): T {
  return (async (...args: any[]) => {
    try {
      await requirePermission(permission);
      return await handler(...args);
    } catch (error) {
      if (error instanceof Error) {
        const isUnauthorized = error.message.startsWith('Unauthorized');
        const status = isUnauthorized ? 401 : 403;

        return NextResponse.json(
          {
            error: error.message,
            code: isUnauthorized ? 'UNAUTHORIZED' : 'FORBIDDEN',
            permission: permission,
          },
          { status }
        );
      }
      throw error;
    }
  }) as T;
}

/**
 * API route wrapper that requires ANY of the specified permissions
 *
 * @param permissions - Array of permissions (user needs at least one)
 * @param handler - The API route handler function
 * @returns Wrapped handler with permission check
 */
export function withAnyPermission<T extends (...args: any[]) => Promise<any>>(
  permissions: Permission[],
  handler: T
): T {
  return (async (...args: any[]) => {
    try {
      await requireAnyPermission(permissions);
      return await handler(...args);
    } catch (error) {
      if (error instanceof Error) {
        const isUnauthorized = error.message.startsWith('Unauthorized');
        const status = isUnauthorized ? 401 : 403;

        return NextResponse.json(
          {
            error: error.message,
            code: isUnauthorized ? 'UNAUTHORIZED' : 'FORBIDDEN',
            permissions: permissions,
          },
          { status }
        );
      }
      throw error;
    }
  }) as T;
}

/**
 * API route wrapper that requires ALL of the specified permissions
 *
 * @param permissions - Array of permissions (user needs all)
 * @param handler - The API route handler function
 * @returns Wrapped handler with permission check
 */
export function withAllPermissions<T extends (...args: any[]) => Promise<any>>(
  permissions: Permission[],
  handler: T
): T {
  return (async (...args: any[]) => {
    try {
      await requireAllPermissions(permissions);
      return await handler(...args);
    } catch (error) {
      if (error instanceof Error) {
        const isUnauthorized = error.message.startsWith('Unauthorized');
        const status = isUnauthorized ? 401 : 403;

        return NextResponse.json(
          {
            error: error.message,
            code: isUnauthorized ? 'UNAUTHORIZED' : 'FORBIDDEN',
            permissions: permissions,
          },
          { status }
        );
      }
      throw error;
    }
  }) as T;
}
