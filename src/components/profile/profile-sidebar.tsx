import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Briefcase, Globe, LogOut, Mail, MapPin, Pencil, Settings } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/icons/brand-icons";
import { ProfileShareLink } from "@/components/profile/profile-share-link";
import type { ProfileDetails } from "@/components/profile/profile.schemas";
import { surfaceClass } from "@/components/surface";
import { Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function MetaRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
      <div className="min-w-0 flex-1">
        <Text variant="label">{label}</Text>
        <Text as="div" variant="small" className="mt-1">
          {children}
        </Text>
      </div>
    </div>
  );
}

export function ProfileSidebar({
  details,
  email,
  sharePath,
  isLoading = false,
  canEdit,
  onEdit,
  onManageAccount,
  onSignOut,
  signOutLabel,
}: {
  details: ProfileDetails;
  email: string;
  sharePath: string;
  isLoading?: boolean;
  canEdit: boolean;
  onEdit: () => void;
  onManageAccount: () => void;
  onSignOut: () => void;
  signOutLabel: string;
}) {
  const socials = [
    details.facebookUrl
      ? { href: details.facebookUrl, label: "Facebook", icon: <FacebookIcon className="size-5" /> }
      : null,
    details.instagramUrl
      ? { href: details.instagramUrl, label: "Instagram", icon: <InstagramIcon className="size-5" /> }
      : null,
    details.twitterUrl
      ? { href: details.twitterUrl, label: "X", icon: <TwitterIcon className="size-5" /> }
      : null,
    details.websiteUrl
      ? {
          href: details.websiteUrl,
          label: "Website",
          icon: <Globe className="size-4" />,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <section className={cn(surfaceClass, "flex flex-col gap-5 p-5")}>
        <p className="heritage-eyebrow">Details</p>

        <MetaRow icon={MapPin} label="City">
          {isLoading ? (
            <span className="block h-4 w-28 animate-pulse rounded-md bg-espresso/10" />
          ) : (
            details.city || "Not added yet"
          )}
        </MetaRow>

        <MetaRow icon={Briefcase} label="Profession">
          {isLoading ? (
            <span className="block h-4 w-32 animate-pulse rounded-md bg-espresso/10" />
          ) : (
            details.profession || "Not added yet"
          )}
        </MetaRow>

        {email ? (
          <MetaRow icon={Mail} label="Email">
            <span className="break-all">{email}</span>
          </MetaRow>
        ) : null}

        {socials.length > 0 ? (
          <MetaRow icon={Globe} label="Links">
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-11 items-center justify-center rounded-lg bg-espresso/8 text-espresso ring-1 ring-gold/25 transition-colors hover:bg-espresso/12 hover:ring-gold/50"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </MetaRow>
        ) : null}
      </section>

      <section className={cn(surfaceClass, "p-5")}>
        <p className="heritage-eyebrow">Share</p>
        <Text variant="small" className="mt-3">
          Your public member link
        </Text>
        <div className="mt-4">
          <ProfileShareLink path={sharePath} />
        </div>
      </section>

      <section className={cn(surfaceClass, "flex flex-col gap-2 p-5")}>
        <p className="heritage-eyebrow">Account</p>
        <Button
          className="mt-3 w-full"
          disabled={!canEdit}
          title={canEdit ? undefined : "Loading your details…"}
          onClick={onEdit}
        >
          <Pencil className="size-4" />
          Edit profile
        </Button>
        <Button variant="outline" className="w-full" onClick={onManageAccount}>
          <Settings className="size-4" />
          Manage account
        </Button>
        <Button variant="ghost" className="w-full" onClick={onSignOut}>
          <LogOut className="size-4" />
          {signOutLabel}
        </Button>
      </section>
    </aside>
  );
}
