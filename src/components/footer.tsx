import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type FooterLink =
  | { key: string; href: string }
  | { key: string; comingSoon: true };

const columns: { titleKey: string; links: FooterLink[] }[] = [
  {
    titleKey: "explore",
    links: [
      { key: "history", href: "/history" },
      { key: "stories", href: "/blog" },
      { key: "notableGorsi", href: "/people" },
      { key: "library", href: "/library" },
      { key: "gallery", comingSoon: true },
    ],
  },
  {
    titleKey: "community",
    links: [
      { key: "communityFeed", comingSoon: true },
      { key: "discussions", comingSoon: true },
      { key: "members", href: "/member" },
    ],
  },
  {
    titleKey: "contribute",
    links: [
      { key: "shareStory", href: "/auth/signup" },
      { key: "sharePhoto", comingSoon: true },
    ],
  },
  {
    titleKey: "account",
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
    <footer className="border-t border-border bg-espresso text-parchment/70">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-2 sm:col-span-3 lg:col-span-1">
            <span className="font-heading text-xl font-semibold text-ivory">
              Gorsi Nama<span className="text-gold">.</span>
            </span>
            <p className="text-sm text-parchment/60">{t("tagline")}</p>
          </div>

          {columns.map((column) => (
            <div key={column.titleKey} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-ivory">
                {t(column.titleKey)}
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.key}>
                    {"href" in link ? (
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:text-gold"
                      >
                        {t(link.key)}
                      </Link>
                    ) : (
                      <span className="text-sm text-parchment/40">
                        {t(link.key)}{" "}
                        <span className="text-xs italic">— {t("comingSoon")}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-ivory/10 pt-6 text-sm text-parchment/50">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
