"use client";

import { useUser } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { ProfileView } from "@/components/profile/profile-view";
import { useOwnProfile } from "@/components/profile/use-profile";
import { emptyProfileDetails, type UserInfo } from "@/components/profile/profile.schemas";

function memberProfilePath(userId: string, locale: string) {
  const suffix = `/member/${userId}`;
  return locale === routing.defaultLocale ? suffix : `/${locale}${suffix}`;
}

function ProfilePageSkeleton() {
  return (
    <div className="site-shell px-4 py-12 sm:px-0 sm:py-16" aria-hidden>
      <div className="h-3 w-24 animate-pulse rounded-full bg-espresso/10" />
      <div className="mt-3 h-px w-12 bg-gold/20" />
      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
        <div className="size-28 animate-pulse rounded-full bg-espresso/10 sm:size-32" />
        <div className="flex-1 space-y-3">
          <div className="h-9 w-48 animate-pulse rounded-md bg-espresso/10 sm:h-10 sm:w-64" />
          <div className="h-4 w-56 animate-pulse rounded-md bg-espresso/10" />
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <div className="h-11 w-28 animate-pulse rounded-lg bg-espresso/10" />
        <div className="h-11 w-36 animate-pulse rounded-lg bg-espresso/10" />
      </div>
    </div>
  );
}

export function OwnProfileClient() {
  const { user, isLoaded } = useUser();
  const locale = useLocale();
  const profileQuery = useOwnProfile(isLoaded && !!user);

  if (!isLoaded) return <ProfilePageSkeleton />;
  if (!user) return null;

  const userInfo: UserInfo = {
    userId: user.id,
    fullName: user.fullName || user.primaryEmailAddress?.emailAddress || "",
    email: user.primaryEmailAddress?.emailAddress || "",
    profilePhoto: user.imageUrl,
  };

  return (
    <ProfileView
      userDetails={userInfo}
      profile={profileQuery.data ?? emptyProfileDetails}
      sharePath={memberProfilePath(user.id, locale)}
      canEdit={profileQuery.isSuccess}
      isLoadingProfile={profileQuery.isPending}
      loadError={
        profileQuery.isError
          ? profileQuery.error.message || "Could not load your profile details."
          : undefined
      }
    />
  );
}
