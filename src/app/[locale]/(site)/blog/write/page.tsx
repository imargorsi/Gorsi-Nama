import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { StoryEditor } from "@/components/blog/story-editor";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/write">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Stories" });
  return pageMetadata({
    locale,
    href: "/blog/write",
    title: t("writeMetaTitle"),
    index: false,
  });
}

export default async function WriteStoryPage({
  params,
}: PageProps<"/[locale]/blog/write">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Stories");
  const common = await getTranslations("Common");

  return (
    <>
      <PageBreadcrumb
        eyebrow={t("writeEyebrow")}
        title={t("writeTitle")}
        crumbs={[
          { label: common("home"), href: "/" },
          { label: t("crumb"), href: "/blog" },
          { label: t("writeCrumb") },
        ]}
        description={t("writeDescription")}
      />
      <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <Reveal mode="load">
          <StoryEditor />
        </Reveal>
      </div>
    </>
  );
}
