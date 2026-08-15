"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LogOut, Menu, User } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/library", key: "library" },
  { href: "/blog", key: "blog" },
  { href: "/history", key: "history" },
] as const;

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations("Nav");

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className="text-sm font-medium text-parchment/70 transition-colors hover:text-gold"
        >
          {t(link.key)}
        </Link>
      ))}
    </>
  );
}

function AuthArea({ onNavigate }: { onNavigate?: () => void }) {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const homePath = locale === routing.defaultLocale ? "/" : `/${locale}`;

  if (!isLoaded) return null;

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/profile" onClick={onNavigate}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.imageUrl || "/default.jpg"}
            alt={user.fullName || "Profile"}
            className="size-10 rounded-full object-cover ring-2 ring-gold/50"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={t("logOut")}
          className="text-parchment/70 hover:bg-ivory/10 hover:text-gold"
          onClick={() => {
            onNavigate?.();
            signOut({ redirectUrl: homePath });
          }}
        >
          <LogOut />
        </Button>
      </div>
    );
  }

  return (
    <Link
      href="/auth/login"
      onClick={onNavigate}
      aria-label={t("signIn")}
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold text-ivory transition-colors hover:bg-gold/90"
    >
      <User className="size-5" />
    </Link>
  );
}

export function SiteHeader() {
  const scrolled = useScrolled();
  const t = useTranslations("Nav");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[padding] duration-300 ease-out",
        scrolled ? "p-0" : "p-4 sm:p-6"
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between border-ivory/10 bg-espresso/90 backdrop-blur transition-all duration-300 ease-out supports-backdrop-filter:bg-espresso/85",
          scrolled
            ? "h-16 max-w-none rounded-none border-b px-4 sm:px-6"
            : "h-20 max-w-6xl rounded-2xl border px-5 shadow-lg ring-1 ring-gold/15 sm:px-8"
        )}
      >
        <Link href="/" className="flex shrink-0 flex-col items-start gap-0.5">
          <span className="relative h-8 w-32 sm:h-9 sm:w-36">
            <Image
              src="/logo.png"
              alt="Gorsi Nama"
              fill
              sizes="144px"
              className="object-contain object-left"
              priority
            />
          </span>
          {!scrolled && (
            <span className="hidden text-[0.65rem] font-medium tracking-[0.2em] text-parchment/60 sm:block">
              {t("tagline")}
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLinks />
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher />
          <AuthArea />
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("openMenu")}
                className="text-parchment/70 hover:bg-ivory/10 hover:text-gold md:hidden"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Gorsi Nama.</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 px-4">
              <nav className="flex flex-col gap-4">
                <NavLinks />
              </nav>
              <LanguageSwitcher />
              <AuthArea />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
