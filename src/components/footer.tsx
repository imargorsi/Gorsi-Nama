import Image from "next/image";
import { Compass, PenLine, UserRound, Users, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AccentIcon } from "@/components/accent-icon";
import { HeritageKnot } from "@/components/heritage-ornaments";

type FooterLink = { key: string; href: string };

const columns: {
  titleKey: string;
  icon: LucideIcon;
  links: FooterLink[];
}[] = [
  {
    titleKey: "explore",
    icon: Compass,
    links: [
      { key: "history", href: "/history" },
      { key: "stories", href: "/blog" },
      { key: "notableGorsi", href: "/people" },
      { key: "library", href: "/library" },
    ],
  },
  {
    titleKey: "community",
    icon: Users,
    links: [
      { key: "communityFeed", href: "/community" },
      { key: "members", href: "/member" },
    ],
  },
  {
    titleKey: "contribute",
    icon: PenLine,
    links: [
      { key: "shareStory", href: "/blog/write" },
      { key: "sharePhoto", href: "/community" },
    ],
  },
  {
    titleKey: "account",
    icon: UserRound,
    links: [
      { key: "signIn", href: "/auth/login" },
      { key: "createAccount", href: "/auth/signup" },
      { key: "profile", href: "/profile" },
    ],
  },
];

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-espresso text-ivory/70">
      <div className="site-shell px-4 py-16 sm:px-0">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="relative h-10 w-40">
              <Image
                src="/veriosn-v2.png"
                alt="Gorsi Nama"
                fill
                sizes="160px"
                className="object-contain object-left rtl:object-right"
              />
            </Link>
            <p className="flex items-center gap-2 text-sm text-ivory/60">
              <HeritageKnot />
              <span>{t("tagline")}</span>
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.titleKey} className="flex flex-col gap-3">
              <h3 className="flex items-center gap-2.5">
                <AccentIcon icon={column.icon} size="sm" tone="on-dark" />
                <span className="heritage-eyebrow">{t(column.titleKey)}</span>
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-gold"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-gold/20 pt-6 text-sm text-ivory/50">
          <span>{t("copyright")}</span>
          <HeritageKnot />
        </div>
      </div>
    </footer>
  );
}
