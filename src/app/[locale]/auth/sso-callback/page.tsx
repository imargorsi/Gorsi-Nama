"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { getPathname } from "@/i18n/navigation";

export default function SSOCallbackPage() {
  const locale = useLocale();
  const profilePath = getPathname({ href: "/profile", locale });

  return (
    <div className="flex min-h-[60svh] items-center justify-center">
      <p className="text-sm text-muted-foreground">Completing sign-in…</p>
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl={profilePath}
        signUpFallbackRedirectUrl={profilePath}
      />
    </div>
  );
}
