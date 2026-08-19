"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { Text } from "@/components/typography";

export default function SSOCallbackPage() {
  const locale = useLocale();
  const profilePath = getPathname({ href: "/profile", locale });

  return (
    <div className="flex min-h-[60svh] items-center justify-center">
      <Text variant="small">Completing sign-in…</Text>
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl={profilePath}
        signUpFallbackRedirectUrl={profilePath}
      />
    </div>
  );
}
