import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { EditStoryClient } from "@/components/blog/edit-story-client";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Edit Story | Gujjar Nama",
};

export default async function EditStoryPage({
  params,
}: PageProps<"/[locale]/blog/[slug]/edit">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb
        eyebrow="Stories"
        title="Edit Your Story"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Stories", href: "/blog" },
          { label: "Edit story" },
        ]}
        description="Update the title, story, and photo. Published changes go live on Stories right away."
      />
      <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <Reveal mode="load">
          <EditStoryClient slug={slug} />
        </Reveal>
      </div>
    </>
  );
}
