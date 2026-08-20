"use client";

import { useUser } from "@clerk/nextjs";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { ProfileView } from "@/components/profile/profile-view";
import { useOwnProfile } from "@/components/profile/use-profile";
import { emptyProfileDetails, type UserInfo } from "@/components/profile/profile.schemas";
import { Skeleton } from "@/components/ui/skeleton";

function memberProfilePath(userId: string, locale: string) {
  const suffix = `/member/${userId}`;
  return locale === routing.defaultLocale ? suffix : `/${locale}${suffix}`;
}

function ProfilePageSkeleton() {
  const t = useTranslations("Profile");
  return (
    <div
      className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20"
      aria-busy="true"
      aria-label={t("loadingAria")}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19.5rem] lg:items-start">
        <div className="flex min-w-0 flex-col gap-10">
          <div>
            <Skeleton className="h-3 w-28 rounded-full" />
            <div className="mt-5 flex items-center gap-4 sm:gap-5">
              <Skeleton className="size-20 shrink-0 rounded-full sm:size-24" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-8 w-40 sm:h-9 sm:w-56" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="mt-8 rounded-lg border border-espresso/18 px-4 py-4 sm:px-5">
              <Skeleton className="h-3 w-16 rounded-full" />
              <div className="mt-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
          <div>
            <Skeleton className="h-3 w-24 rounded-full" />
            <Skeleton className="mt-3 h-7 w-40" />
            <div className="mt-6 space-y-3">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          </div>
        </div>
        <div className="hidden space-y-4 lg:block">
          <div className="rounded-xl bg-ivory p-5 shadow-md">
            <Skeleton className="h-3 w-20 rounded-full" />
            <div className="mt-6 space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <div className="rounded-xl bg-ivory p-5 shadow-md">
            <Skeleton className="h-3 w-16 rounded-full" />
            <Skeleton className="mt-4 h-11 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function OwnProfileClient() {
  const { user, isLoaded } = useUser();
  const locale = useLocale();
  const t = useTranslations("Profile");
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
          ? profileQuery.error.message || t("loadError")
          : undefined
      }
    />
  );
}
