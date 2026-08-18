"use client";

import { LogOut, User } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function AuthArea({
  onNavigate,
  stacked = false,
}: {
  onNavigate?: () => void;
  stacked?: boolean;
}) {
  const { user, isLoaded } = useUser();
  const t = useTranslations("Nav");

  if (!isLoaded) return null;

  if (!user) {
    return (
      <Link
        href="/auth/login"
        onClick={onNavigate}
        aria-label={t("signIn")}
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold text-espresso transition-colors hover:bg-gold/90"
      >
        <User className="size-5" />
      </Link>
    );
  }

  const avatar = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={user.imageUrl || "/default.jpg"}
      alt=""
      className="size-10 rounded-full object-cover ring-2 ring-gold/50"
    />
  );

  if (stacked) {
    return (
      <div className="flex flex-col gap-3">
        <Link
          href="/profile"
          onClick={onNavigate}
          className="flex items-center gap-3 text-ivory hover:text-gold"
        >
          {avatar}
          <span className="font-heading text-sm font-medium">
            {user.fullName || t("profile")}
          </span>
        </Link>
        <SignOutButton onNavigate={onNavigate} stacked />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/profile"
        onClick={onNavigate}
        aria-label={t("profile")}
        className="rounded-full"
      >
        {avatar}
      </Link>
      <SignOutButton onNavigate={onNavigate} />
    </div>
  );
}

function SignOutButton({
  onNavigate,
  stacked = false,
}: {
  onNavigate?: () => void;
  stacked?: boolean;
}) {
  const { signOut } = useClerk();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const homePath = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return (
    <button
      type="button"
      onClick={() => {
        onNavigate?.();
        void signOut({ redirectUrl: homePath });
      }}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center gap-2 font-heading text-sm font-medium tracking-wide text-ivory/80 transition-colors hover:text-gold",
        stacked ? "justify-start" : "px-2"
      )}
    >
      <LogOut className="size-4" strokeWidth={1.75} />
      {t("logOut")}
    </button>
  );
}
