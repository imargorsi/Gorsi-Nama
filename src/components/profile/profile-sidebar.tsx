import type { ReactNode } from "react";
import Image from "next/image";
import { Briefcase, Globe, MapPin } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/icons/brand-icons";
import { HeritageRule } from "@/components/heritage-ornaments";
import { ProfileShareLink } from "@/components/profile/profile-share-link";
import type { ProfileDetails } from "@/components/profile/profile.schemas";
import { cn } from "@/lib/utils";

function Detail({
  icon: Icon,
  label,
  value,
  isLoading,
}: {
  icon: typeof MapPin;
  label: string;
  value: string | null;
  isLoading: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
      <div className="min-w-0">
        <p className="heritage-eyebrow text-gold/80">{label}</p>
        {isLoading ? (
          <span className="mt-2 block h-4 w-28 animate-pulse rounded-md bg-ivory/10" />
        ) : (
          <p
            className={cn(
              "mt-1.5 text-sm",
              value ? "text-ivory" : "text-ivory/50"
            )}
          >
            {value || "Not added yet"}
          </p>
        )}
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full bg-ivory ring-1 ring-gold/25 transition-opacity hover:opacity-90 hover:ring-gold/50"
    >
      {children}
    </a>
  );
}

export function ProfileSidebar({
  details,
  sharePath,
  isLoading = false,
}: {
  details: ProfileDetails;
  sharePath: string;
  isLoading?: boolean;
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
          icon: <Globe className="size-4 text-espresso" />,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  const isSparse = !details.city && !details.profession && socials.length === 0;

  return (
    <aside className="relative overflow-hidden rounded-2xl bg-espresso px-6 py-8 text-ivory shadow-md ring-1 ring-gold/20 sm:px-7">
      <Image
        src="/trademarkgorsi.png"
        alt=""
        width={220}
        height={220}
        className="pointer-events-none absolute -right-8 -bottom-10 w-44 opacity-[0.07]"
      />

      <div className="relative">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-ivory">
          About me
        </h2>
        <HeritageRule className="mt-4" />

        <div className="mt-8 flex flex-col gap-6">
          <Detail icon={MapPin} label="City" value={details.city} isLoading={isLoading} />
          <Detail
            icon={Briefcase}
            label="Profession"
            value={details.profession}
            isLoading={isLoading}
          />
        </div>

        {socials.length > 0 ? (
          <div className="mt-8">
            <p className="heritage-eyebrow text-gold/80">Social & links</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {socials.map((social) => (
                <SocialLink key={social.label} href={social.href} label={social.label}>
                  {social.icon}
                </SocialLink>
              ))}
            </div>
          </div>
        ) : null}

        {!isLoading && isSparse ? (
          <p className="mt-8 text-sm leading-relaxed text-ivory/60">
            Add a city, profession, or a link so other members can find you.
          </p>
        ) : null}

        <div className="mt-10 border-t border-gold/20 pt-6">
          <p className="heritage-eyebrow text-gold/80">Share</p>
          <p className="mt-2 text-sm text-ivory/70">Your public member link</p>
          <div className="mt-3">
            <ProfileShareLink path={sharePath} />
          </div>
        </div>
      </div>
    </aside>
  );
}
