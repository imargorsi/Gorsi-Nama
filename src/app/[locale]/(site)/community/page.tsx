import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb, pageBanner } from "@/components/page-breadcrumb";
import { CommunityFeed } from "@/components/community/community-feed";

export const metadata: Metadata = {
  title: "Community | Gorsi Nama",
};

export default async function CommunityPage({
  params,
}: PageProps<"/[locale]/community">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb
        image={pageBanner.community}
        eyebrow="Community"
        title="Community Feed"
        description="Share stories, questions, and photographs with the Gorsi community."
      />
      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <CommunityFeed showFilters />
      </div>
    </>
  );
}
