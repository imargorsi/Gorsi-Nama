import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { StoryEditor } from "@/components/blog/story-editor";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Write a Story | Gujjar Nama",
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
        description="Write about family, heritage, or a memory worth keeping. Publish it to Stories, or save a draft to your profile."
      />
      <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <Reveal mode="load">
          <StoryEditor />
        </Reveal>
      </div>
    </>
  );
}
