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
      <header className="fixed inset-x-0 top-0 z-50 bg-espresso pt-[env(safe-area-inset-top)] lg:bg-transparent lg:px-6 lg:pt-6">
        <div
          className={cn(
            "flex items-center justify-between border-gold/20 bg-espresso backdrop-blur-md transition-all duration-300 ease-out",
            "h-16 rounded-none border-b px-4 ring-0",
            "lg:site-shell lg:rounded-2xl lg:border lg:border-gold/20",
            scrolled
              ? "lg:h-16 lg:px-6 lg:shadow-md lg:ring-1 lg:ring-gold/12"
              : "lg:h-20 lg:px-8 lg:shadow-lg lg:ring-1 lg:ring-gold/20"
          )}
        >
          <Link href="/" className="flex h-full min-w-0 items-center">
            <span
              className={cn(
                "relative max-w-full transition-[height,width] duration-300",
                scrolled
                  ? "h-10 w-44 lg:h-12 lg:w-60"
                  : "h-10 w-44 lg:h-16 lg:w-72"
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

          <div className="flex h-full shrink-0 items-center gap-2 self-stretch sm:gap-4 lg:gap-5">
            <nav className="hidden h-full lg:block">
              <NavLinks />
            </nav>

            <span aria-hidden className="hidden h-5 w-px bg-ivory/15 lg:block" />

            <div className="hidden h-full items-center gap-3 lg:flex">
              <LanguageSwitcher />
              <AuthArea />
            </div>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    aria-label={t("openMenu")}
                    className="text-ivory/70 hover:bg-ivory/10 hover:text-gold lg:hidden"
                  />
                }
              >
                <Menu />
              </SheetTrigger>
              <SheetContent
                side={locale === "ur" ? "left" : "right"}
                showCloseButton={false}
                fullScreen
                className="bg-espresso text-ivory"
              >
                <SheetHeader className="h-[calc(4rem+env(safe-area-inset-top))] flex-row items-center justify-between gap-3 border-b border-gold/20 px-4 py-0 pt-[env(safe-area-inset-top)]">
                  <SheetTitle className="sr-only">{t("openMenu")}</SheetTitle>
                  <Link href="/" onClick={closeMenu} className="relative h-10 w-44">
                    <Image
                      src="/veriosn-v2.png"
                      alt="Gujjar Nama"
                      fill
                      sizes="176px"
                      className="object-contain object-left mix-blend-lighten rtl:object-right"
                      unoptimized
                    />
                  </Link>
                  <SheetClose
                    render={
                      <Button
                        variant="ghost"
                        size="icon-lg"
                        aria-label={t("closeMenu")}
                        className="text-ivory/70 hover:bg-ivory/10 hover:text-gold"
                      />
                    }
                  >
                    <X />
                  </SheetClose>
                </SheetHeader>
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                  <NavLinks stacked onNavigate={closeMenu} />
                </nav>
                <SheetFooter className="gap-4 border-t border-gold/20 px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  <LanguageSwitcher className="self-start" />
                  <AuthArea stacked onNavigate={closeMenu} />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      {!isHome ? (
        <div
          className="h-[calc(4rem+env(safe-area-inset-top))] shrink-0 lg:h-32"
          aria-hidden
        />
      ) : null}
    </>
  );
}
