import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ur"],
  defaultLocale: "en",
  // English (default) keeps today's bare URLs (/, /history, ...); only
  // Urdu gets a visible /ur prefix. Keeps every existing English link working.
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
