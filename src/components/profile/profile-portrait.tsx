import { Briefcase, LogOut, MapPin, Pencil, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { ProfileDetails, UserInfo } from "@/components/profile/profile.schemas";
import { initialsFromName } from "@/lib/initials";

export function ProfilePortrait({
  userDetails,
  profile,
  canEdit,
  isLoadingProfile,
  onEdit,
  onManageAccount,
  onSignOut,
  signOutLabel,
}: {
  userDetails: UserInfo;
  profile: ProfileDetails;
  canEdit: boolean;
  isLoadingProfile: boolean;
  onEdit: () => void;
  onManageAccount: () => void;
  onSignOut: () => void;
  signOutLabel: string;
}) {
  const initials = initialsFromName(userDetails.fullName);
  const hasMeta = Boolean(profile.city || profile.profession);

  return (
    <div>
      <p className="heritage-eyebrow">Your profile</p>
      <div className="heritage-rule mt-3" />

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
        <Avatar className="size-28 shrink-0 shadow-md ring-2 ring-gold/45 ring-offset-4 ring-offset-background after:hidden sm:size-32">
          <AvatarImage src={userDetails.profilePhoto || undefined} alt={userDetails.fullName} />
          <AvatarFallback className="bg-espresso font-heading text-3xl text-ivory">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-3xl leading-none font-semibold tracking-tight text-foreground sm:text-4xl">
            {userDetails.fullName}
          </h1>

          {hasMeta || userDetails.email || isLoadingProfile ? (
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-warm-gray">
              {isLoadingProfile && !hasMeta ? (
                <span className="h-4 w-40 animate-pulse rounded-md bg-espresso/10" />
              ) : null}
              {profile.city ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-gold" aria-hidden />
                  {profile.city}
                </span>
              ) : null}
              {profile.city && profile.profession ? (
                <span className="size-1 rotate-45 bg-gold/50" aria-hidden />
              ) : null}
              {profile.profession ? (
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="size-3.5 text-gold" aria-hidden />
                  {profile.profession}
                </span>
              ) : null}
              {(profile.city || profile.profession) && userDetails.email ? (
                <span className="size-1 rotate-45 bg-gold/50" aria-hidden />
              ) : null}
              {userDetails.email ? (
                <span className="min-w-0 truncate">{userDetails.email}</span>
              ) : null}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button
          className="h-11 px-4"
          disabled={!canEdit}
          title={canEdit ? undefined : "Loading your details…"}
          onClick={onEdit}
        >
          <Pencil />
          Edit profile
        </Button>
        <Button variant="outline" className="h-11 px-4" onClick={onManageAccount}>
          <Settings />
          Manage account
        </Button>
        <Button
          variant="ghost"
          className="h-11 px-4 text-warm-gray hover:text-foreground"
          onClick={onSignOut}
        >
          <LogOut />
          {signOutLabel}
        </Button>
      </div>

      {isLoadingProfile ? (
        <div className="mt-10 max-w-2xl space-y-2" aria-hidden>
          <div className="h-4 w-full animate-pulse rounded-md bg-espresso/10" />
          <div className="h-4 w-5/6 animate-pulse rounded-md bg-espresso/10" />
        </div>
      ) : profile.summary ? (
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground/85">
          {profile.summary}
        </p>
      ) : (
        <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
          A few sentences about you will appear here — hometown, craft, or the chapter of
          the Gorsi story you carry.
        </p>
      )}
    </div>
  );
}
