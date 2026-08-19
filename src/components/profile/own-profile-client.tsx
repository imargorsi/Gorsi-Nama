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
    <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20" aria-hidden>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19.5rem]">
        <div>
          <div className="h-3 w-28 animate-pulse rounded-full bg-espresso/10" />
          <div className="mt-5 flex items-center gap-4 sm:gap-5">
            <div className="size-20 shrink-0 animate-pulse rounded-full bg-espresso/10 sm:size-24" />
            <div className="flex-1 space-y-2">
              <div className="h-8 w-40 animate-pulse rounded-md bg-espresso/10 sm:h-9 sm:w-56" />
              <div className="h-4 w-32 animate-pulse rounded-md bg-espresso/10" />
            </div>
          </div>
        </div>
        <div className="hidden rounded-xl bg-ivory p-5 shadow-md lg:block">
          <div className="h-3 w-20 animate-pulse rounded-full bg-espresso/10" />
          <div className="mt-6 space-y-4">
            <div className="h-4 w-24 animate-pulse rounded-md bg-espresso/10" />
            <div className="h-4 w-32 animate-pulse rounded-md bg-espresso/10" />
          </div>
        </div>
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
    firstName: user.firstName || undefined,
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
