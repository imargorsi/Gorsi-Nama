"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useLocale, useTranslations } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { Text } from "@/components/typography";

export default function SSOCallbackPage() {
  const locale = useLocale();
  const t = useTranslations("Auth");
  const profilePath = getPathname({ href: "/profile", locale });

  return (
    <div className="flex min-h-[60svh] items-center justify-center">
      <Text variant="small">{t("ssoCallback")}</Text>
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl={profilePath}
        signUpFallbackRedirectUrl={profilePath}
      />
    </div>
  );
}
