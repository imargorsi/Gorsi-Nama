import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth" });
  return pageMetadata({
    locale,
    href: "/auth/sso-callback",
    title: t("ssoMetaTitle"),
    index: false,
  });
}

export default function SSOCallbackLayout({
  children,
}: LayoutProps<"/[locale]">) {
  return children;
}
