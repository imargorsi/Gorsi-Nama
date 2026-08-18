export const userRoles = ["member", "super-admin"] as const;
export type UserRole = (typeof userRoles)[number];

export const superAdminRole = "super-admin";

export function parseRole(value: unknown): UserRole {
  return value === superAdminRole ? superAdminRole : "member";
}

export function isSuperAdmin(role: unknown) {
  return parseRole(role) === superAdminRole;
}

export function canManageContent({
  authorId,
  userId,
  role,
}: {
  authorId?: string;
  userId?: string | null;
  role?: unknown;
}) {
  if (!userId) return false;
  if (isSuperAdmin(role)) return true;
  return Boolean(authorId && authorId === userId);
}

export function canManageArchive(role: unknown) {
  return isSuperAdmin(role);
}
