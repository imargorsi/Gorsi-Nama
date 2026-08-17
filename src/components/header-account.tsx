"use client";

import { User } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

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
      alt={user.fullName || t("profile")}
      className="size-10 rounded-full object-cover ring-2 ring-gold/50"
    />
  );

  if (stacked) {
    return (
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
    );
  }

  return (
    <Link href="/profile" onClick={onNavigate} aria-label={t("profile")} className="rounded-full">
      {avatar}
    </Link>
  );
}
