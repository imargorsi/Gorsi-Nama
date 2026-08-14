"use client";

import { useUserInfo } from "@/context/user-context";
import { ProfileView } from "@/components/profile/profile-view";

export function OwnProfileClient() {
  const { userInfo } = useUserInfo();
  if (!userInfo) return null;
  return <ProfileView userDetails={userInfo} isOwner />;
}
