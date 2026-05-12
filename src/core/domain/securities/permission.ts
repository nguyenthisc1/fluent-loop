export type Permission = "USER_VIEW" | "USER_EDIT" | "USER_CREATE" | "USER_DELETE" | "ROLE_VIEW" | "ROLE_EDIT" | "ROLE_CREATE" | "ROLE_DELETE" | "PERMISSION_VIEW" | "PERMISSION_EDIT" | "PERMISSION_ASSIGN" | "RESOURCE_ACCESS" | "SECURITY_ADMIN";

// Optionally, a set helper for type safety and lookups
export const Permissions: Set<Permission> = new Set([
  "USER_VIEW",
  "USER_EDIT",
  "USER_CREATE",
  "USER_DELETE",
  "ROLE_VIEW",
  "ROLE_EDIT",
  "ROLE_CREATE",
  "ROLE_DELETE",
  "PERMISSION_VIEW",
  "PERMISSION_EDIT",
  "PERMISSION_ASSIGN",
  "RESOURCE_ACCESS",
  "SECURITY_ADMIN",
]);

export function hasPermission(userPermissions: Permission[] | Set<Permission>, required: Permission): boolean {
  if (Array.isArray(userPermissions)) {
    return userPermissions.includes(required);
  }
  return userPermissions.has(required);
}
