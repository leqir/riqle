import { auth } from '@/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import 'server-only';

/**
 * Auth Helper Functions
 *
 * Server-side utilities for authentication and authorization.
 * These functions should only be used in Server Components, Server Actions, or API Routes.
 */

/**
 * Get the current session or throw an error if not authenticated
 *
 * @throws {Error} If user is not authenticated
 * @returns {Promise<Session>} The current session
 *
 * @example
 * ```tsx
 * // In a Server Component
 * export default async function DashboardPage() {
 *   const session = await requireAuth();
 *   return <div>Welcome {session.user.name}</div>;
 * }
 * ```
 */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized: You must be logged in to access this resource');
  }
  return session;
}

/**
 * Get the current session or redirect to login page
 *
 * @param redirectTo - URL to redirect to after login (optional)
 * @returns {Promise<Session>} The current session
 *
 * @example
 * ```tsx
 * // In a Server Component
 * export default async function ProfilePage() {
 *   const session = await requireAuthOrRedirect();
 *   return <div>Profile: {session.user.email}</div>;
 * }
 * ```
 */
export async function requireAuthOrRedirect(redirectTo?: string) {
  const session = await auth();
  if (!session?.user) {
    const callbackUrl = redirectTo || '/';
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  return session;
}

/**
 * Check if the current user has a specific role
 *
 * @param userId - The user ID to check
 * @param roleName - The role name to check for (e.g., 'admin', 'editor')
 * @returns {Promise<boolean>} True if user has the role
 */
export async function checkUserRole(userId: string, roleName: string): Promise<boolean> {
  try {
    const userRole = await db.userRole.findFirst({
      where: {
        userId,
        role: {
          name: roleName,
        },
      },
    });
    return !!userRole;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
}

/**
 * Require admin role or throw an error
 *
 * @throws {Error} If user is not authenticated or not an admin
 * @returns {Promise<Session>} The current session
 *
 * @example
 * ```tsx
 * // In a Server Component
 * export default async function AdminPage() {
 *   const session = await requireAdmin();
 *   return <div>Admin Dashboard</div>;
 * }
 * ```
 */
export async function requireAdmin() {
  const session = await requireAuth();
  const isAdmin = await checkUserRole(session.user.id, 'admin');
  if (!isAdmin) {
    throw new Error('Forbidden: You must be an admin to access this resource');
  }
  return session;
}

/**
 * Require admin role or redirect to unauthorized page
 *
 * @param redirectTo - URL to redirect to if not admin (default: '/')
 * @returns {Promise<Session>} The current session
 *
 * @example
 * ```tsx
 * // In a Server Component
 * export default async function AdminSettingsPage() {
 *   const session = await requireAdminOrRedirect();
 *   return <div>Admin Settings</div>;
 * }
 * ```
 */
export async function requireAdminOrRedirect(redirectTo: string = '/') {
  const session = await auth();
  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(redirectTo)}`);
  }

  const isAdmin = await checkUserRole(session.user.id, 'admin');
  if (!isAdmin) {
    redirect('/unauthorized');
  }

  return session;
}

/**
 * Get all roles for a user
 *
 * @param userId - The user ID
 * @returns {Promise<string[]>} Array of role names
 */
export async function getUserRoles(userId: string): Promise<string[]> {
  try {
    const userRoles = await db.userRole.findMany({
      where: { userId },
      include: { role: true },
    });
    return userRoles.map((ur) => ur.role.name);
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return [];
  }
}

/**
 * Check if user owns a resource
 *
 * @param userId - The user ID
 * @param resourceType - The type of resource (e.g., 'post', 'project')
 * @param resourceId - The resource ID
 * @returns {Promise<boolean>} True if user owns the resource
 */
export async function checkOwnership(
  userId: string,
  resourceType: 'post' | 'project' | 'startup' | 'mediaAsset',
  resourceId: string
): Promise<boolean> {
  try {
    let resource;
    switch (resourceType) {
      case 'post':
        resource = await db.post.findFirst({
          where: { id: resourceId, authorId: userId },
        });
        break;
      case 'project':
        resource = await db.project.findFirst({
          where: { id: resourceId, authorId: userId },
        });
        break;
      case 'startup':
        resource = await db.startup.findFirst({
          where: { id: resourceId, authorId: userId },
        });
        break;
      case 'mediaAsset':
        resource = await db.mediaAsset.findFirst({
          where: { id: resourceId, createdBy: userId },
        });
        break;
      default:
        return false;
    }
    return !!resource;
  } catch (error) {
    console.error('Error checking ownership:', error);
    return false;
  }
}

/**
 * Require ownership of a resource or throw an error
 *
 * @param resourceType - The type of resource
 * @param resourceId - The resource ID
 * @throws {Error} If user is not authenticated or doesn't own the resource
 * @returns {Promise<Session>} The current session
 */
export async function requireOwnership(
  resourceType: 'post' | 'project' | 'startup' | 'mediaAsset',
  resourceId: string
) {
  const session = await requireAuth();
  const isOwner = await checkOwnership(session.user.id, resourceType, resourceId);
  if (!isOwner) {
    throw new Error('Forbidden: You do not have permission to access this resource');
  }
  return session;
}
