import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CommunityFeed } from "@/components/community/community-feed";
import { isCommunityCategoryId } from "@/components/community/community-categories";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/community">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Community" });
  return pageMetadata({
    locale,
    href: "/community",
    title: t("metaTitle"),
    description: t("description"),
  });
}

export default async function CommunityPage({
  params,
  searchParams,
}: PageProps<"/[locale]/community">) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("Community");
  const common = await getTranslations("Common");

  const requestedCategory = Array.isArray(query.category)
    ? query.category[0]
    : query.category;
  const requestedTag = Array.isArray(query.tag) ? query.tag[0] : query.tag;
  const requestedPage = Array.isArray(query.page) ? query.page[0] : query.page;
  const parsedPage = Number(requestedPage);

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
      <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <CommunityFeed
          showFilters
          initialCategory={
            isCommunityCategoryId(requestedCategory)
              ? requestedCategory
              : undefined
          }
          initialTag={
            typeof requestedTag === "string" && requestedTag.trim()
              ? requestedTag.trim()
              : undefined
          }
          initialPage={
            Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1
          }
        />
      </div>
    </>
  );
}
