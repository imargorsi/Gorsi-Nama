import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { EditStoryClient } from "@/components/blog/edit-story-client";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]/edit">): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Stories" });
  return pageMetadata({
    locale,
    href: `/blog/${slug}/edit`,
    title: t("editMetaTitle"),
    index: false,
  });
}

export default async function EditStoryPage({
  params,
}: PageProps<"/[locale]/blog/[slug]/edit">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Stories");
  const common = await getTranslations("Common");

  return (
    <>
      <PageBreadcrumb
        eyebrow={t("writeEyebrow")}
        title={t("editTitle")}
        crumbs={[
          { label: common("home"), href: "/" },
          { label: t("crumb"), href: "/blog" },
          { label: t("editCrumb") },
        ]}
        description={t("editDescription")}
      />
      <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <Reveal mode="load">
          <EditStoryClient slug={slug} />
        </Reveal>
      </div>
    </>
  );
}
