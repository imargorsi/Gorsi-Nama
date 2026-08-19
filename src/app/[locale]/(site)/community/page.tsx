import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CommunityFeed } from "@/components/community/community-feed";
import {
  communityDescription,
  isCommunityCategoryId,
} from "@/components/community/community-categories";

export const metadata: Metadata = {
  title: "Community | Gujjar Nama",
  description: communityDescription,
};

export default async function CommunityPage({
  params,
  searchParams,
}: PageProps<"/[locale]/community">) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const requestedCategory = Array.isArray(query.category)
    ? query.category[0]
    : query.category;
  const requestedTag = Array.isArray(query.tag) ? query.tag[0] : query.tag;
  const requestedPage = Array.isArray(query.page) ? query.page[0] : query.page;
  const parsedPage = Number(requestedPage);

  return (
    <>
      <PageBreadcrumb
        eyebrow="Community"
        title="Among Our People"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Community" },
        ]}
        description={communityDescription}
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
