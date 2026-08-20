import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CallToAction } from "@/components/call-to-action";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { BlogList, BlogWriteButton } from "@/components/blog/blog-list";
import { isBlogCategoryId } from "@/components/blog/blog-categories";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Stories" });
  return pageMetadata({
    locale,
    href: "/blog",
    title: t("metaTitle"),
    description: t("description"),
  });
}

export default async function BlogPage({
  params,
  searchParams,
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Stories");

  const query = await searchParams;
  const requested = typeof query.category === "string" ? query.category : undefined;

  return (
    <>
      <PageBreadcrumb
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      >
        <BlogWriteButton />
      </PageBreadcrumb>
      <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <BlogList
          initialCategory={isBlogCategoryId(requested) ? requested : undefined}
        />
      </div>
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
