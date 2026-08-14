"use client";

import Link from "next/link";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserInfo } from "@/context/user-context";

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
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
            className="size-9 rounded-full object-cover border border-border"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Log out"
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
    <Button render={<Link href="/auth/login" onClick={onNavigate} />}>
      Sign In
    </Button>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-xl font-semibold">
          Gorsi Nama<span className="text-primary">.</span>
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
                className="md:hidden"
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
