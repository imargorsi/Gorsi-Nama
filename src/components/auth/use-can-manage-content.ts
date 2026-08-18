"use client";

import { useUser } from "@clerk/nextjs";
import { canManageContent, isSuperAdmin } from "@/lib/roles";

export function useCanManageContent(authorId?: string) {
  const { user, isLoaded } = useUser();

  return {
    isLoaded,
    userId: user?.id,
    isSuperAdmin: isSuperAdmin(user?.publicMetadata.role),
    canManage: canManageContent({
      authorId,
      userId: user?.id,
      role: user?.publicMetadata.role,
    }),
  };
}
