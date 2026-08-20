"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Briefcase, Globe, LogOut, Mail, MapPin, Pencil, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
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
import { Skeleton } from "@/components/ui/skeleton";
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
  const t = useTranslations("Profile");
  const common = useTranslations("Common");
  const socials = [
    details.facebookUrl
      ? { href: details.facebookUrl, label: t("facebook"), icon: <FacebookIcon className="size-5" /> }
      : null,
    details.instagramUrl
      ? { href: details.instagramUrl, label: t("instagram"), icon: <InstagramIcon className="size-5" /> }
      : null,
    details.twitterUrl
      ? { href: details.twitterUrl, label: "X", icon: <TwitterIcon className="size-5" /> }
      : null,
    details.websiteUrl
      ? {
          href: details.websiteUrl,
          label: t("website"),
          icon: <Globe className="size-4" />,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <section className={cn(surfaceClass, "flex flex-col gap-5 p-5")}>
        <p className="heritage-eyebrow">{common("details")}</p>

        <MetaRow icon={MapPin} label={t("city")}>
          {isLoading ? (
            <Skeleton className="h-4 w-28" />
          ) : (
            details.city || t("notAdded")
          )}
        </MetaRow>

        <MetaRow icon={Briefcase} label={t("profession")}>
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            details.profession || t("notAdded")
          )}
        </MetaRow>

        {email ? (
          <MetaRow icon={Mail} label={t("email")}>
            <span className="break-all">{email}</span>
          </MetaRow>
        ) : null}

        {socials.length > 0 ? (
          <MetaRow icon={Globe} label={t("links")}>
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
        <p className="heritage-eyebrow">{t("shareEyebrow")}</p>
        <Text variant="small" className="mt-3">
          {t("shareHint")}
        </Text>
        <div className="mt-4">
          <ProfileShareLink path={sharePath} />
        </div>
      </section>

      <section className={cn(surfaceClass, "flex flex-col gap-2 p-5")}>
        <p className="heritage-eyebrow">{t("account")}</p>
        <Button
          className="mt-3 w-full"
          disabled={!canEdit}
          title={canEdit ? undefined : t("loadingDetails")}
          onClick={onEdit}
        >
          <Pencil className="size-4" />
          {t("editProfile")}
        </Button>
        <Button variant="outline" className="w-full" onClick={onManageAccount}>
          <Settings className="size-4" />
          {t("manageAccount")}
        </Button>
        <Button variant="ghost" className="w-full" onClick={onSignOut}>
          <LogOut className="size-4" />
          {signOutLabel}
        </Button>
      </section>
    </aside>
  );
}
