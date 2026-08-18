import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { StoryEditor } from "@/components/blog/story-editor";
import { Reveal } from "@/components/reveal";

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
      <PageBreadcrumb
        eyebrow="Stories"
        title="Share a Story"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Stories", href: "/blog" },
          { label: "Write a story" },
        ]}
        description="Title, excerpt, content, category, tags, and a featured image."
      />
      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <Reveal mode="load">
          <StoryEditor />
        </Reveal>
      </div>
    </>
  );
}
