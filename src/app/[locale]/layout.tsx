import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader, Noto_Nastaliq_Urdu } from "next/font/google";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { GoogleAnalytics } from "@/components/google-analytics";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { routing } from "@/i18n/routing";
import { defaultOgImage, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteOrigin } from "@/lib/site";

const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontHeading = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const fontUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
  weight: "400",
});

/** Enables env(safe-area-inset-*) on notched phones (mobile app chrome). */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const common = await getTranslations({ locale, namespace: "Common" });
  const footer = await getTranslations({ locale, namespace: "Footer" });

  return {
    metadataBase: new URL(siteOrigin),
    title: common("brandName"),
    description: footer("about"),
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png", sizes: "any" }],
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      type: "website",
      siteName: common("brandName"),
      locale: locale === "ur" ? "ur_PK" : "en_US",
      images: [{ url: defaultOgImage }],
    },
    twitter: {
      card: "summary_large_image",
      images: [defaultOgImage],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const dir = locale === "ur" ? "rtl" : "ltr";
  const common = await getTranslations("Common");
  const brandName = common("brandName");

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontSans.variable} ${fontMono.variable} ${fontHeading.variable} ${fontUrdu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <JsonLd data={organizationJsonLd(brandName)} />
        <JsonLd data={websiteJsonLd(brandName, locale)} />
        <NextIntlClientProvider>
          <ClerkProvider>
            <Providers>{children}</Providers>
          </ClerkProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
