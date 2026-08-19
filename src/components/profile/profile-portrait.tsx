import { Briefcase, MapPin } from "lucide-react";
import { CommunityAvatar } from "@/components/community/community-avatar";
import type { ProfileDetails, UserInfo } from "@/components/profile/profile.schemas";
import { Heading, Text } from "@/components/typography";

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
          <Heading as="h1" variant="h3">
            {userDetails.fullName}
          </Heading>
          {isLoadingProfile && !profile.city && !profile.profession ? (
            <span className="mt-1 block h-4 w-40 animate-pulse rounded-md bg-espresso/10" />
          ) : profile.city || profile.profession ? (
            <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              {profile.city ? (
                <Text as="span" variant="small" className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-gold" strokeWidth={1.75} aria-hidden />
                  {profile.city}
                </Text>
              ) : null}
              {profile.profession ? (
                <Text as="span" variant="small" className="inline-flex items-center gap-1.5">
                  <Briefcase className="size-3.5 text-gold" strokeWidth={1.75} aria-hidden />
                  {profile.profession}
                </Text>
              ) : null}
            </p>
          ) : (
            <Text variant="small" className="mt-1">
              {firstName}, this is your place in Gorsi Nama.
            </Text>
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
          <Text variant="lead" className="mt-3 min-w-0 wrap-break-word">
            {profile.summary}
          </Text>
        ) : (
          <Text variant="muted" className="mt-3">
            {firstName}, a few sentences about you will appear here — hometown,
            craft, or the chapter of the Gorsi story you carry.
          </Text>
        )}
      </section>
    </div>
  );
}
