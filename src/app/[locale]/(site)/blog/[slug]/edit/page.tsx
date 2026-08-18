import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { EditStoryClient } from "@/components/blog/edit-story-client";

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
      <PageBreadcrumb title="Edit story" />
      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <p className="heritage-eyebrow">Stories</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-espresso sm:text-4xl">
          Edit your story
        </h2>
        <div className="mt-10">
          <EditStoryClient slug={slug} />
        </div>
      </div>
    </>
  );
}
