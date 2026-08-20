import type { ReactNode } from "react";
import Image from "next/image";
import { Compass, Mail, UserRound, Users, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AccentIcon } from "@/components/accent-icon";
import type { CommunityCategoryId } from "@/components/community/community-categories";
import { HeritagePatternBand } from "@/components/heritage-ornaments";
import { Reveal } from "@/components/reveal";
import { contactEmail, contactMailto } from "@/lib/site";

const exploreLinks = [
  { key: "history", href: "/history" },
  { key: "stories", href: "/blog" },
  { key: "notableGorsi", href: "/people" },
  { key: "library", href: "/library" },
] as const;

const footerCommunityIds = [
  "our-stories",
  "discussions",
  "places-communities",
  "history-heritage",
] as const satisfies readonly CommunityCategoryId[];

const communityLinkKeys = {
  "our-stories": "ourStories",
  discussions: "discussions",
  "places-communities": "placesCommunities",
  "history-heritage": "historyHeritage",
} as const;

const accountLinks = [
  { key: "myAccount", href: "/profile" },
  { key: "savedPosts", href: "/profile#saved-content" },
  { key: "myPosts", href: "/community" },
  { key: "myStories", href: "/profile#your-stories" },
] as const;

const linkClass =
  "text-sm leading-snug text-ivory/70 transition-colors hover:text-gold";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="relative overflow-hidden bg-espresso text-ivory/70">
      <Reveal amount={0.2} className="site-shell relative z-10 px-4 pt-16 pb-20 sm:px-0 sm:pb-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start md:gap-x-8 md:gap-y-12">
          <div className="flex flex-col gap-3 md:col-span-6 lg:pe-8">
            <Link href="/" className="relative h-16 w-72 sm:h-[4.5rem] sm:w-80">
              <Image
                src="/veriosn-v2.png"
                alt="Gujjar Nama"
                fill
                sizes="320px"
                className="object-contain object-left mix-blend-lighten rtl:object-right"
                unoptimized
              />
            </Link>
            <p className="text-sm text-ivory/65">{t("tagline")}</p>
            <p className="max-w-md text-sm leading-relaxed text-ivory/50">
              {t("about")}
            </p>
            <a
              href={contactMailto}
              className="inline-flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-gold"
            >
              <Mail className="size-4 shrink-0" strokeWidth={1.75} />
              {contactEmail}
            </a>
          </div>

          <FooterColumn
            title={t("explore")}
            icon={Compass}
            className="md:col-span-2"
          >
            <FooterLinkList>
              {exploreLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className={linkClass}>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </FooterLinkList>
          </FooterColumn>

          <FooterColumn
            title={t("community")}
            icon={Users}
            className="md:col-span-2"
          >
            <FooterLinkList>
              {footerCommunityIds.map((id) => (
                <li key={id}>
                  <Link
                    href={`/community?category=${id}`}
                    className={linkClass}
                  >
                    {t(communityLinkKeys[id])}
                  </Link>
                </li>
              ))}
            </FooterLinkList>
          </FooterColumn>

          <FooterColumn
            title={t("account")}
            icon={UserRound}
            className="md:col-span-2"
          >
            <FooterLinkList>
              {accountLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className={linkClass}>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </FooterLinkList>
          </FooterColumn>
        </div>

        <div className="mt-12 border-t border-gold/20 pt-6 text-sm text-ivory/50">
          <span>{t("copyright")}</span>
        </div>
      </Reveal>
      <HeritagePatternBand />
    </footer>
  );
}

function FooterColumn({
  title,
  icon,
  className,
  children,
}: {
  title: string;
  icon: LucideIcon;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <h3 className="mb-4 flex items-center gap-2.5">
        <AccentIcon icon={icon} size="sm" tone="on-dark" />
        <span className="heritage-eyebrow">{title}</span>
      </h3>
      {children}
    </div>
  );
}

function FooterLinkList({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col gap-2.5">{children}</ul>;
}
