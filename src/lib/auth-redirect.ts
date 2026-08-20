import { getPathname } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

const authPath = "/auth/";

function localeOf(locale: string): AppLocale {
  return locale === "ur" ? "ur" : "en";
}

/** Same-origin destination after sign-in. Never returns an auth URL. */
export function postAuthHref(redirectUrl: string | null, fallback: string) {
  const origin = window.location.origin;
  const fallbackHref = new URL(fallback, origin).href;

  if (!redirectUrl) return fallbackHref;

  try {
    const url = new URL(redirectUrl, origin);
    if (url.origin !== origin) return fallbackHref;
    if (url.protocol !== "http:" && url.protocol !== "https:") return fallbackHref;
    if (url.pathname.includes(authPath)) return fallbackHref;
    return url.href;
  } catch {
    return fallbackHref;
  }
}

export function googleSsoRedirects(locale: string) {
  const origin = window.location.origin;
  const appLocale = localeOf(locale);
  return {
    redirectUrl: `${origin}${getPathname({ href: "/auth/sso-callback", locale: appLocale })}`,
    redirectCallbackUrl: `${origin}${getPathname({ href: "/profile", locale: appLocale })}`,
  };
}
