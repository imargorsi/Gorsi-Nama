"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { NavLinks } from "@/components/header-nav";
import { AuthArea } from "@/components/header-account";
import { cn } from "@/lib/utils";

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > 12 : y > 32));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

export function SiteHeader() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const isHome = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
        <div
          className={cn(
            "site-shell flex items-center justify-between rounded-2xl border border-gold/20 bg-espresso backdrop-blur-md transition-all duration-300 ease-out",
            scrolled
              ? "h-16 px-4 shadow-md ring-1 ring-gold/12 sm:px-6"
              : "h-20 px-5 shadow-lg ring-1 ring-gold/20 sm:px-8"
          )}
        >
          <Link href="/" className="flex h-full shrink-0 items-center">
            <span
              className={cn(
                "relative transition-[height,width] duration-300",
                scrolled
                  ? "h-12 w-52 sm:w-60"
                  : "h-14 w-60 sm:h-16 sm:w-72"
              )}
            >
              <Image
                src="/veriosn-v2.png"
                alt="Gujjar Nama"
                fill
                sizes="288px"
                className="object-contain object-left mix-blend-lighten rtl:object-right"
                priority
                unoptimized
              />
            </span>
          </Link>

          <div className="flex h-full items-center gap-3 self-stretch sm:gap-5">
            <nav className="hidden h-full md:block">
              <NavLinks />
            </nav>

            <span aria-hidden className="hidden h-5 w-px bg-ivory/15 md:block" />

            <div className="hidden h-full items-center gap-3 md:flex">
              <LanguageSwitcher />
              <AuthArea />
            </div>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t("openMenu")}
                    className="text-ivory/70 hover:bg-ivory/10 hover:text-gold md:hidden"
                  />
                }
              >
                <Menu />
              </SheetTrigger>
              <SheetContent
                side={locale === "ur" ? "left" : "right"}
                showCloseButton={false}
                className="border-ivory/10 bg-espresso text-ivory"
              >
                <SheetHeader className="flex-row items-center justify-between gap-3">
                  <SheetTitle className="sr-only">{t("openMenu")}</SheetTitle>
                  <span className="relative h-11 w-48">
                    <Image
                      src="/veriosn-v2.png"
                      alt="Gujjar Nama"
                      fill
                      sizes="192px"
                      className="object-contain object-left mix-blend-lighten rtl:object-right"
                      unoptimized
                    />
                  </span>
                  <SheetClose
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={t("closeMenu")}
                        className="text-ivory/70 hover:bg-ivory/10 hover:text-gold"
                      />
                    }
                  >
                    <X />
                  </SheetClose>
                </SheetHeader>
                <nav className="flex flex-col gap-8 px-4">
                  <NavLinks stacked onNavigate={closeMenu} />
                </nav>
                <SheetFooter className="gap-5 border-t border-ivory/10">
                  <LanguageSwitcher />
                  <AuthArea stacked onNavigate={closeMenu} />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      {!isHome ? (
        <div className="h-28 shrink-0 sm:h-32" aria-hidden />
      ) : null}
    </>
  );
}
