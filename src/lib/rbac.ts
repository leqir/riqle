import { db } from './db';
import 'server-only';

/**
 * Check if a user has a specific role
 */
export async function checkUserRole(userId: string, roleName: string): Promise<boolean> {
  const userRole = await db.userRole.findFirst({
    where: {
      userId,
      role: { name: roleName },
    },
  });
  return !!userRole;
}

/**
 * Require a user to have a specific role (throws if not)
 */
export async function requireRole(userId: string, roleName: string): Promise<void> {
  const hasRole = await checkUserRole(userId, roleName);
  if (!hasRole) {
    throw new Error(`Required role: ${roleName}`);
  }
}

/**
 * Get all roles for a user
 */
export async function getUserRoles(userId: string): Promise<string[]> {
  const userRoles = await db.userRole.findMany({
    where: { userId },
    include: { role: true },
  });
  return userRoles.map((ur) => ur.role.name);
}

/**
 * Check if user is an admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  return checkUserRole(userId, 'admin');
}

/**
 * Check if user is a customer
 */
export async function isCustomer(userId: string): Promise<boolean> {
  return checkUserRole(userId, 'customer');
}
