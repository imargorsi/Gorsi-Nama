import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CallToAction } from "@/components/call-to-action";
import { Chronicle } from "@/components/history/chronicle";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/history">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "History" });
  return pageMetadata({
    locale,
    href: "/history",
    title: t("metaTitle"),
    description: t("description"),
  });
}

export default async function HistoryPage({
  params,
}: PageProps<"/[locale]/history">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("History");
  const common = await getTranslations("Common");

  return (
    <>
      <PageBreadcrumb
        eyebrow={t("eyebrow")}
        title={t("title")}
        crumbs={[
          { label: common("home"), href: "/" },
          { label: t("crumb") },
        ]}
        description={t("description")}
      />
      <Chronicle />
      <CallToAction
        eyebrow={t("ctaEyebrow")}
        title={t("ctaTitle")}
        text={t("ctaText")}
        buttonText={t("ctaButton")}
        href="/blog/write"
      />
    </>
  );
}
