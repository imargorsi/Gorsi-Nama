import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { ExploreGrid } from "@/components/home/explore-grid";
import { CommunityPulse } from "@/components/home/community-pulse";
import { HistoryTeaser } from "@/components/home/history-teaser";
import { BlogGrid } from "@/components/home/blog-grid";
import { CommunityPreview } from "@/components/home/community-preview";
import { LibraryPreview } from "@/components/home/library-preview";
import { Banner } from "@/components/home/banner";

// Section order is locked — see doc/homepage-structure.md before reordering,
// removing, or adding a top-level section.
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ExploreGrid />
      <CommunityPulse />
      <HistoryTeaser />
      <BlogGrid />
      <CommunityPreview />
      <LibraryPreview />
      <Banner />
    </>
  );
}
