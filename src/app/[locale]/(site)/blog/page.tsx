import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CallToAction } from "@/components/call-to-action";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { BlogList, BlogWriteButton } from "@/components/blog/blog-list";
import { isBlogCategoryId } from "@/components/blog/blog-categories";

export const metadata: Metadata = {
  title: "Stories | Gorsi Nama",
  description: "Stories, updates, and heritage articles from the Gorsi community.",
};

export default async function BlogPage({
  params,
  searchParams,
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const query = await searchParams;
  const requested = typeof query.category === "string" ? query.category : undefined;

  return (
    <>
      <PageBreadcrumb
        eyebrow="From Our People"
        title="Stories From Our People"
        description="Stories, updates, and heritage articles from the Gorsi community."
      >
        <BlogWriteButton />
      </PageBreadcrumb>
      <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <BlogList
          initialCategory={isBlogCategoryId(requested) ? requested : undefined}
        />
      </div>
      <CallToAction
        eyebrow="From Our People"
        title="Share a Story From Your Family"
        text="Title, excerpt, photographs, and the chapter of Gorsi life you carry — published to this archive."
        buttonText="Write a story"
        href="/blog/write"
      />
    </>
  );
}
