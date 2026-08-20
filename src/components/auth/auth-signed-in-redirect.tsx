"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { postAuthHref } from "@/lib/auth-redirect";

/** If Google/Clerk already created a session, do not leave the user on the auth screen. */
export function AuthSignedInRedirect() {
  const { isLoaded, isSignedIn } = useAuth();
  const locale = useLocale();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const fallback = getPathname({ href: "/profile", locale });
    const redirectUrl = new URLSearchParams(window.location.search).get(
      "redirect_url"
    );
    window.location.replace(postAuthHref(redirectUrl, fallback));
  }, [isLoaded, isSignedIn, locale]);

  return null;
}
