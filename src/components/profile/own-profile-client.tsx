"use client";

import { useUser } from "@clerk/nextjs";
import { ProfileView } from "@/components/profile/profile-view";
import type { UserInfo } from "@/components/profile/profile.schemas";

export function OwnProfileClient() {
  const { user, isLoaded } = useUser();
  if (!isLoaded || !user) return null;

  const userInfo: UserInfo = {
    userId: user.id,
    fullName: user.fullName || user.primaryEmailAddress?.emailAddress || "",
    email: user.primaryEmailAddress?.emailAddress || "",
    profilePhoto: user.imageUrl,
  };

  return <ProfileView userDetails={userInfo} />;
}
