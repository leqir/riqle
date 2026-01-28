import 'server-only';

/**
 * Role-Based Access Control (RBAC) System (Epic 14: Story 14.4)
 *
 * This module defines roles, permissions, and authorization logic.
 *
 * Security Principle: Default deny, explicit allow.
 * - If a permission is not explicitly granted, it's denied
 * - Roles accumulate permissions (Customer has all Public permissions + their own)
 * - Admin has all permissions
 */

/**
 * User Roles
 *
 * Roles are hierarchical:
 * - PUBLIC: Anonymous users (no authentication)
 * - CUSTOMER: Authenticated users who have purchased at least one product
 * - ADMIN: Full system access for platform operators
 */
export enum Role {
  PUBLIC = 'public',
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

/**
 * Permissions
 *
 * Format: <resource>:<action>:<scope>
 * - content:view:public - View free content
 * - content:view:paid - View paid content (requires entitlement)
 * - admin:access - Access admin dashboard
 */
export enum Permission {
  // Content Permissions
  VIEW_PUBLIC_CONTENT = 'content:view:public',
  VIEW_PAID_CONTENT = 'content:view:paid',
  MANAGE_CONTENT = 'content:manage',

  // Commerce Permissions
  PURCHASE_PRODUCT = 'commerce:purchase',
  VIEW_OWN_ORDERS = 'commerce:view:own',
  VIEW_ALL_ORDERS = 'commerce:view:all',
  ISSUE_REFUND = 'commerce:refund',
  MANAGE_ENTITLEMENTS = 'commerce:entitlements:manage',

  // Admin Permissions
  ACCESS_ADMIN = 'admin:access',
  MANAGE_PRODUCTS = 'admin:products:manage',
  MANAGE_USERS = 'admin:users:manage',
  VIEW_LOGS = 'admin:logs:view',
  VIEW_MONITORING = 'admin:monitoring:view',
  MANAGE_CACHE = 'admin:cache:manage',
}

/**
 * Role-Permission Mapping
 *
 * Defines which permissions each role has.
 * Permissions are cumulative (Customer includes Public permissions).
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.PUBLIC]: [
    Permission.VIEW_PUBLIC_CONTENT,
    Permission.PURCHASE_PRODUCT,
  ],

  [Role.CUSTOMER]: [
    // All public permissions
    Permission.VIEW_PUBLIC_CONTENT,
    Permission.PURCHASE_PRODUCT,
    // Plus customer-specific permissions
    Permission.VIEW_PAID_CONTENT, // Access to purchased content (checked via entitlements)
    Permission.VIEW_OWN_ORDERS,
  ],

  [Role.ADMIN]: [
    // Admins have ALL permissions
    ...Object.values(Permission),
  ],
};

/**
 * Check if a role has a specific permission
 *
 * @param role - The user's role
 * @param permission - The permission to check
 * @returns True if role has the permission
 *
 * @example
 * ```typescript
 * if (hasPermission(Role.ADMIN, Permission.VIEW_LOGS)) {
 *   // Show logs
 * }
 * ```
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions.includes(permission);
}

/**
 * Check if a role has ANY of the specified permissions
 *
 * @param role - The user's role
 * @param permissions - Array of permissions to check
 * @returns True if role has at least one permission
 *
 * @example
 * ```typescript
 * if (hasAnyPermission(role, [Permission.MANAGE_CONTENT, Permission.MANAGE_PRODUCTS])) {
 *   // User can manage at least one type of content
 * }
 * ```
 */
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

/**
 * Check if a role has ALL of the specified permissions
 *
 * @param role - The user's role
 * @param permissions - Array of permissions to check
 * @returns True if role has all permissions
 *
 * @example
 * ```typescript
 * if (hasAllPermissions(role, [Permission.VIEW_LOGS, Permission.MANAGE_USERS])) {
 *   // User has both permissions
 * }
 * ```
 */
export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission));
}

/**
 * Get all permissions for a role
 *
 * @param role - The user's role
 * @returns Array of permissions
 */
export function getRolePermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role];
}

/**
 * Check if a role is at least a certain level
 *
 * Hierarchy: PUBLIC < CUSTOMER < ADMIN
 *
 * @param role - The user's role
 * @param minimumRole - The minimum required role
 * @returns True if role meets or exceeds minimum
 *
 * @example
 * ```typescript
 * if (isRoleAtLeast(userRole, Role.CUSTOMER)) {
 *   // User is customer or admin
 * }
 * ```
 */
export function isRoleAtLeast(role: Role, minimumRole: Role): boolean {
  const hierarchy = [Role.PUBLIC, Role.CUSTOMER, Role.ADMIN];
  const userIndex = hierarchy.indexOf(role);
  const minIndex = hierarchy.indexOf(minimumRole);

  return userIndex >= minIndex;
}
