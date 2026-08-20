import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { noIndexRobots, contactEmail, siteOrigin } from "@/lib/site";

/** Default share image when a page has no photograph of its own. */
export const defaultOgImage = "/gujjar-emblem.png";

const ogLocale = {
  en: "en_US",
  ur: "ur_PK",
} as const;

export function asAppLocale(locale: string): AppLocale {
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
}

export function localizedPath(href: string, locale: string) {
  return getPathname({ href, locale: asAppLocale(locale) });
}

export function absoluteUrl(pathname: string) {
  return `${siteOrigin}${pathname}`;
}

export function languageAlternates(
  href: string,
  options?: { absolute?: boolean }
) {
  const localize = (locale: AppLocale) => {
    const path = localizedPath(href, locale);
    return options?.absolute ? absoluteUrl(path) : path;
  };

  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, localize(locale)])
    ),
    "x-default": localize(routing.defaultLocale),
  };
}

type PageMetadataInput = {
  locale: string;
  href: string;
  title: string;
  description?: string;
  index?: boolean;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export async function pageMetadata({
  locale,
  href,
  title,
  description,
  index = true,
  type = "website",
  image,
  publishedTime,
  modifiedTime,
  authors,
}: PageMetadataInput): Promise<Metadata> {
  const appLocale = asAppLocale(locale);
  const common = await getTranslations({ locale, namespace: "Common" });
  const siteName = common("brandName");
  const canonical = localizedPath(href, appLocale);
  const shareImage = image || defaultOgImage;
  const languages = languageAlternates(href);

  const openGraphBase = {
    siteName,
    locale: ogLocale[appLocale],
    url: canonical,
    title,
    description,
    images: [{ url: shareImage }],
  };

  return {
    title,
    description,
    robots: index
      ? {
          googleBot: {
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : noIndexRobots,
    alternates: {
      canonical,
      languages,
    },
    openGraph:
      type === "article"
        ? {
            ...openGraphBase,
            type: "article",
            alternateLocale: appLocale === "ur" ? "en_US" : "ur_PK",
            publishedTime,
            modifiedTime,
            authors,
          }
        : {
            ...openGraphBase,
            type: "website",
            alternateLocale: appLocale === "ur" ? "en_US" : "ur_PK",
          },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

export function organizationJsonLd(name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: siteOrigin,
    email: contactEmail,
    logo: absoluteUrl(defaultOgImage),
  };
}

export function websiteJsonLd(name: string, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: siteOrigin,
    inLanguage: asAppLocale(locale) === "ur" ? "ur" : "en",
    publisher: {
      "@type": "Organization",
      name,
    },
  };
}

export function articleJsonLd({
  locale,
  slug,
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  publisherName,
}: {
  locale: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName: string;
  publisherName: string;
}) {
  const url = absoluteUrl(localizedPath(`/blog/${slug}`, locale));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image || absoluteUrl(defaultOgImage),
    datePublished,
    dateModified,
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(defaultOgImage),
      },
    },
  };
}

export function breadcrumbListJsonLd(
  crumbs: { name: string; href?: string }[],
  locale: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.href
        ? { item: absoluteUrl(localizedPath(crumb.href, locale)) }
        : {}),
    })),
  };
}
