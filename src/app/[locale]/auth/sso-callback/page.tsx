"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useLocale, useTranslations } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { Text } from "@/components/typography";

export default function SSOCallbackPage() {
  const locale = useLocale();
  const t = useTranslations("Auth");
  const profilePath = getPathname({ href: "/profile", locale });
  const loginPath = getPathname({ href: "/auth/login", locale });
  const signupPath = getPathname({ href: "/auth/signup", locale });

  return (
    <div className="flex min-h-[60svh] items-center justify-center">
      <Text variant="small">{t("ssoCallback")}</Text>
      <AuthenticateWithRedirectCallback
        signInUrl={loginPath}
        signUpUrl={signupPath}
        signInForceRedirectUrl={profilePath}
        signUpForceRedirectUrl={profilePath}
        signInFallbackRedirectUrl={profilePath}
        signUpFallbackRedirectUrl={profilePath}
      />
      {/* Required for first-time Google users: Clerk treats that as sign-up and
          bot protection needs this node on the OAuth callback page. */}
      <div id="clerk-captcha" />
    </div>
  );
}
