import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
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
      <PageBreadcrumb title="Community" />
      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <p className="heritage-eyebrow">Community</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-espresso sm:text-4xl">
          Community Feed
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-warm-gray sm:text-base">
          Share stories, questions, and photographs with the Gorsi community.
        </p>
        <div className="mt-10">
          <CommunityFeed showFilters />
        </div>
      </div>
    </>
  );
}
