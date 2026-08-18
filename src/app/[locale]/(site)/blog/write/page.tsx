import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { StoryEditor } from "@/components/blog/story-editor";

export const metadata: Metadata = {
  title: "Write a Story | Gorsi Nama",
};

export default async function WriteStoryPage({
  params,
}: PageProps<"/[locale]/blog/write">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb title="Write a story" />
      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <p className="heritage-eyebrow">Stories</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-espresso sm:text-4xl">
          Share a story
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-warm-gray sm:text-base">
          Title, excerpt, content, category, tags, and a featured image.
        </p>
        <div className="mt-10">
          <StoryEditor />
        </div>
      </div>
    </>
  );
}
