import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { LibraryBrowser } from "@/components/library/library-browser";
import { isLibraryCategoryId } from "@/components/library/library-categories";
import { pageMetadata } from "@/lib/seo";
import { contactMailto } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/library">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Library" });
  return pageMetadata({
    locale,
    href: "/library",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function LibraryPage({
  params,
  searchParams,
}: PageProps<"/[locale]/library">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Library");

  const query = await searchParams;
  const requested =
    typeof query.category === "string" ? query.category : undefined;
  const category =
    requested && isLibraryCategoryId(requested) ? requested : undefined;

  return (
    <>
      <PageBreadcrumb
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <LibraryBrowser initialCategory={category} />
      </div>

      <CallToAction
        eyebrow={t("ctaEyebrow")}
        title={t("ctaTitle")}
        text={t("ctaText")}
        buttonText={t("ctaButton")}
        href={contactMailto}
      />
    </>
  );
}
