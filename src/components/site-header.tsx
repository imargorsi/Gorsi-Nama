"use client";

import Link from "next/link";
import { LogOut, Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserInfo } from "@/context/user-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/library", label: "Library" },
  { href: "/history", label: "History" },
  { href: "/blog", label: "Blog" },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className="text-sm font-medium text-parchment/70 transition-colors hover:text-gold"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

function AuthArea({ onNavigate }: { onNavigate?: () => void }) {
  const { userInfo, setUserInfo } = useUserInfo();

  if (userInfo?.userId) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/profile" onClick={onNavigate}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userInfo.profilePhoto || "/default.jpg"}
            alt={userInfo.fullName}
            className="size-9 rounded-full object-cover border border-ivory/20"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Log out"
          className="text-parchment/70 hover:bg-ivory/10 hover:text-gold"
          onClick={() => {
            setUserInfo(null);
            onNavigate?.();
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
      className={cn(buttonVariants({ className: "bg-gold text-ivory hover:bg-gold/90" }))}
    >
      Sign In
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ivory/10 bg-espresso/95 backdrop-blur supports-backdrop-filter:bg-espresso/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-xl font-semibold text-ivory">
          Gorsi Nama<span className="text-gold">.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLinks />
        </nav>

        <div className="hidden items-center md:flex">
          <AuthArea />
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
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
              <AuthArea />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
