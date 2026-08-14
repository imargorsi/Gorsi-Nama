"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/context/user-context";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { userInfo } = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.replace("/auth/login");
    }
  }, [userInfo, router]);

  if (!userInfo) {
    return null;
  }

  return <>{children}</>;
}
