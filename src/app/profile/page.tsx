"use client";

import { RequireAuth } from "@/components/auth/require-auth";
import { useUserInfo } from "@/context/user-context";
import { ProfileView } from "@/components/profile/profile-view";

function OwnProfile() {
  const { userInfo } = useUserInfo();
  if (!userInfo) return null;
  return <ProfileView userDetails={userInfo} isOwner />;
}

export default function ProfilePage() {
  return (
    <RequireAuth>
      <OwnProfile />
    </RequireAuth>
  );
}
