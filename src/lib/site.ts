/** Canonical production origin. Used by metadataBase, robots.txt, and the sitemap. */
export const siteOrigin = "https://www.gujjarnama.online";

/** Google Analytics 4 measurement ID (gtag.js). Public by design — it appears in the page source. */
export const gaMeasurementId = "G-QTFECP11M4";

/** Account, auth, and editor routes must stay out of search results. */
export const noIndexRobots = {
  index: false,
  follow: false,
} as const;
