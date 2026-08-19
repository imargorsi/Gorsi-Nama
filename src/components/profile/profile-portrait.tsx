import { Briefcase, MapPin } from "lucide-react";
import { CommunityAvatar } from "@/components/community/community-avatar";
import type { ProfileDetails, UserInfo } from "@/components/profile/profile.schemas";

export function ProfilePortrait({
  userDetails,
  profile,
  isLoadingProfile,
}: {
  userDetails: UserInfo;
  profile: ProfileDetails;
  isLoadingProfile: boolean;
}) {
  const firstName = userDetails.firstName || userDetails.fullName.split(/\s+/)[0];

  return (
    <div>
      <p className="heritage-eyebrow">Welcome Back</p>
      <div className="mt-5 flex items-center gap-4 sm:gap-5">
        <CommunityAvatar
          name={userDetails.fullName}
          imageUrl={userDetails.profilePhoto || undefined}
          size="xl"
        />
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-espresso sm:text-3xl">
            {userDetails.fullName}
          </h1>
          {isLoadingProfile && !profile.city && !profile.profession ? (
            <span className="mt-1 block h-4 w-40 animate-pulse rounded-md bg-espresso/10" />
          ) : profile.city || profile.profession ? (
            <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-warm-gray">
              {profile.city ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-gold" strokeWidth={1.75} aria-hidden />
                  {profile.city}
                </span>
              ) : null}
              {profile.profession ? (
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="size-3.5 text-gold" strokeWidth={1.75} aria-hidden />
                  {profile.profession}
                </span>
              ) : null}
            </p>
          ) : (
            <p className="mt-1 text-sm text-warm-gray">
              {firstName}, this is your place in Gorsi Nama.
            </p>
          )}
        </div>
      </div>

      <section className="mt-8 rounded-lg border border-espresso/18 bg-transparent px-4 py-4 sm:px-5">
        <p className="heritage-eyebrow">About</p>
        {isLoadingProfile ? (
          <div className="mt-3 space-y-2" aria-hidden>
            <div className="h-4 w-full animate-pulse rounded-md bg-espresso/10" />
            <div className="h-4 w-5/6 animate-pulse rounded-md bg-espresso/10" />
          </div>
        ) : profile.summary ? (
          <p className="mt-3 min-w-0 text-base leading-relaxed wrap-break-word text-espresso/85 sm:text-lg">
            {profile.summary}
          </p>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-warm-gray sm:text-base">
            {firstName}, a few sentences about you will appear here — hometown,
            craft, or the chapter of the Gorsi story you carry.
          </p>
        )}
      </section>
    </div>
  );
}
