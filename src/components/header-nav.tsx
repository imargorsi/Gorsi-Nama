"use client";

import type { ReactNode } from "react";
import {
  BookOpen,
  Landmark,
  Library,
  MessagesSquare,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type NavItem = { key: string; href: string; icon: LucideIcon };

const exploreLinks: NavItem[] = [
  { key: "history", href: "/history", icon: Landmark },
  { key: "stories", href: "/blog", icon: BookOpen },
  { key: "people", href: "/people", icon: UserRound },
  { key: "library", href: "/library", icon: Library },
];

const communityLinks: NavItem[] = [
  { key: "members", href: "/member", icon: Users },
  { key: "community", href: "/community", icon: MessagesSquare },
];

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function HeaderLink({
  href,
  children,
  onNavigate,
  variant = "bar",
  icon: Icon,
}: {
  href: string;
  children: ReactNode;
  onNavigate?: () => void;
  variant?: "bar" | "sheet";
  icon: LucideIcon;
}) {
  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);

  const classes = cn(
    "inline-flex items-center gap-1.5 font-heading text-sm font-medium tracking-wide whitespace-nowrap transition-colors",
    variant === "bar" &&
      cn(
        "relative h-full py-1 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100",
        isActive && "text-gold after:scale-x-100",
        !isActive && "text-ivory/70 hover:text-gold"
      ),
    variant === "sheet" &&
      cn("min-h-11", isActive ? "text-gold" : "text-ivory/70 hover:text-gold")
  );

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={classes}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon
        className={cn("size-3.5 shrink-0", isActive ? "text-gold" : "text-gold/80")}
        strokeWidth={1.75}
      />
      {children}
    </Link>
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
          icon={link.icon}
        >
          {t(link.key)}
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
          links={exploreLinks}
          onNavigate={onNavigate}
        />
        <div className="flex flex-col gap-3">
          {communityLinks.map((link) => (
            <HeaderLink
              key={link.key}
              href={link.href}
              onNavigate={onNavigate}
              variant="sheet"
              icon={link.icon}
            >
              {t(link.key)}
            </HeaderLink>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="flex h-full items-center gap-4 lg:gap-5 xl:gap-7">
      {[...exploreLinks, ...communityLinks].map((link) => (
        <HeaderLink
          key={link.key}
          href={link.href}
          onNavigate={onNavigate}
          icon={link.icon}
        >
          {t(link.key)}
        </HeaderLink>
      ))}
    </div>
  );
}
