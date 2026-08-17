"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { HeaderMenu } from "@/components/header-menu";
import { cn } from "@/lib/utils";

type NavItem = { key: string; href: string };
type NavTone = "on-dark" | "on-light";

const exploreLinks: NavItem[] = [
  { key: "history", href: "/history" },
  { key: "stories", href: "/blog" },
  { key: "people", href: "/people" },
  { key: "library", href: "/library" },
];

const communityLinks: NavItem[] = [
  { key: "members", href: "/member" },
  { key: "communityFeed", href: "#" },
  { key: "discussions", href: "#" },
];

const comingSoonLinks: NavItem[] = [{ key: "gallery", href: "#" }];

function isActivePath(pathname: string, href: string) {
  if (href === "#") return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function HeaderLink({
  href,
  children,
  onNavigate,
  variant = "bar",
}: {
  href: string;
  children: ReactNode;
  onNavigate?: () => void;
  variant?: "bar" | "menu" | "sheet";
}) {
  const pathname = usePathname();
  const isUnavailable = href === "#";
  const isActive = isActivePath(pathname, href);

  const classes = cn(
    "font-heading text-sm tracking-wide whitespace-nowrap transition-colors",
    variant === "bar" &&
      cn(
        "relative inline-flex h-full items-center py-1 font-medium after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100",
        isActive && "text-gold after:scale-x-100",
        !isActive && "text-ivory/70 hover:text-gold"
      ),
    variant === "menu" &&
      cn(
        "flex w-full items-center justify-between px-3.5 py-2.5 text-start font-medium",
        isUnavailable
          ? "cursor-not-allowed text-muted-foreground"
          : isActive
            ? "text-gold"
            : "text-foreground hover:bg-espresso/5 hover:text-gold"
      ),
    variant === "sheet" &&
      cn(
        "font-medium",
        isUnavailable
          ? "cursor-not-allowed text-ivory/40"
          : isActive
            ? "text-gold"
            : "text-ivory/70 hover:text-gold"
      )
  );

  if (isUnavailable) {
    return (
      <span aria-disabled="true" className={classes}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} onClick={onNavigate} className={classes} role={variant === "menu" ? "menuitem" : undefined}>
      {children}
    </Link>
  );
}

function SoonBadge({ tone }: { tone: NavTone }) {
  const t = useTranslations("Nav");

  return (
    <span
      className={cn(
        "text-[0.65rem] font-medium tracking-[0.16em] uppercase",
        tone === "on-dark" ? "text-gold/60" : "text-gold"
      )}
    >
      {t("soon")}
    </span>
  );
}

function CommunityMenu({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const isActive = communityLinks.some((link) => isActivePath(pathname, link.href));

  return (
    <HeaderMenu
      align="start"
      trigger={({ open, menuId }) => (
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls={menuId}
          className={cn(
            "relative inline-flex h-full items-center gap-1 py-1 font-heading text-sm font-medium tracking-wide whitespace-nowrap transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100",
            isActive || open ? "text-gold after:scale-x-100" : "text-ivory/70 hover:text-gold"
          )}
        >
          {t("community")}
          <ChevronDown
            className={cn("size-3.5 opacity-70 transition-transform duration-200", open && "rotate-180")}
          />
        </button>
      )}
    >
      {communityLinks.map((link) => (
        <HeaderLink
          key={link.key}
          href={link.href}
          onNavigate={onNavigate}
          variant="menu"
        >
          {t(link.key)}
          {link.href === "#" ? <SoonBadge tone="on-light" /> : null}
        </HeaderLink>
      ))}
    </HeaderMenu>
  );
}

function NavGroup({
  titleKey,
  links,
  onNavigate,
}: {
  titleKey: string;
  links: NavItem[];
  onNavigate?: () => void;
}) {
  const t = useTranslations("Nav");

  return (
    <div className="flex flex-col gap-3">
      <p className="heritage-eyebrow text-[0.65rem] tracking-[0.22em]">
        {t(titleKey)}
      </p>
      {links.map((link) => (
        <HeaderLink
          key={link.key}
          href={link.href}
          onNavigate={onNavigate}
          variant="sheet"
        >
          <span className="flex items-center justify-between gap-3">
            {t(link.key)}
            {link.href === "#" ? <SoonBadge tone="on-dark" /> : null}
          </span>
        </HeaderLink>
      ))}
    </div>
  );
}

export function NavLinks({
  onNavigate,
  stacked = false,
}: {
  onNavigate?: () => void;
  stacked?: boolean;
}) {
  const t = useTranslations("Nav");

  if (stacked) {
    return (
      <>
        <NavGroup
          titleKey="explore"
          links={[...exploreLinks, ...comingSoonLinks]}
          onNavigate={onNavigate}
        />
        <NavGroup titleKey="community" links={communityLinks} onNavigate={onNavigate} />
      </>
    );
  }

  return (
    <div className="flex h-full items-center gap-6 xl:gap-8">
      {exploreLinks.map((link) => (
        <HeaderLink key={link.key} href={link.href} onNavigate={onNavigate}>
          {t(link.key)}
        </HeaderLink>
      ))}
      <CommunityMenu onNavigate={onNavigate} />
    </div>
  );
}
