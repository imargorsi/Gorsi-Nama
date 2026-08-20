import type { MetadataRoute } from "next";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  absoluteUrl,
  languageAlternates,
  localizedPath,
} from "@/lib/seo";
import { listPublishedStorySitemapRows } from "@/lib/stories/queries";

export const revalidate = 3600;

const publicHrefs = [
  "/",
  "/history",
  "/blog",
  "/library",
  "/people",
  "/member",
  "/community",
] as const;

function entry(
  href: string,
  locale: AppLocale,
  lastModified?: Date
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(localizedPath(href, locale)),
    lastModified,
    alternates: {
      languages: languageAlternates(href, { absolute: true }),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = routing.locales.flatMap((locale) =>
    publicHrefs.map((href) => entry(href, locale))
  );

  let storyEntries: MetadataRoute.Sitemap = [];
  try {
    const rows = await listPublishedStorySitemapRows();
    storyEntries = routing.locales.flatMap((locale) =>
      rows.map((row) => entry(`/blog/${row.slug}`, locale, row.updatedAt))
    );
  } catch {
    // Public routes still ship if Neon is unreachable at generation time.
  }

  return [...staticEntries, ...storyEntries];
}
