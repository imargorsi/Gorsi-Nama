import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb, pageBanner } from "@/components/page-breadcrumb";
import { EditStoryClient } from "@/components/blog/edit-story-client";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Edit Story | Gorsi Nama",
};

export default async function EditStoryPage({
  params,
}: PageProps<"/[locale]/blog/[slug]/edit">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb
        image={pageBanner.stories}
        eyebrow="Stories"
        title="Edit your story"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Stories", href: "/blog" },
          { label: "Edit story" },
        ]}
        description="Update the title, excerpt, content, and featured image. Drafts stay on this device until the archive backend is live."
      />
      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <Reveal mode="load">
          <EditStoryClient slug={slug} />
        </Reveal>
      </div>
    </>
  );
}
