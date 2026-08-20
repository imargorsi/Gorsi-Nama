"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { gaMeasurementId } from "@/lib/site";

/**
 * GA4 gtag snippet, once in the locale layout (every page).
 * Skipped in `next dev` so localhost does not pollute the property.
 * Sends a follow-up page_view on App Router client navigations — gtag's
 * first config() only covers the landing document.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const isFirstPath = useRef(true);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);

  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `,
        }}
      />
    </>
  );
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
