import { Hero } from "@/components/home/hero";
import { HistoryTeaser } from "@/components/home/history-teaser";
import { Banner } from "@/components/home/banner";
import { BlogGrid } from "@/components/home/blog-grid";

export default function Home() {
  return (
    <>
      <Hero />
      <HistoryTeaser />
      <Banner />
      <BlogGrid />
    </>
  );
}
