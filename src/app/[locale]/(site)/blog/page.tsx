import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb, pageBanner } from "@/components/page-breadcrumb";
import { BlogList, BlogWriteButton } from "@/components/blog/blog-list";

export const metadata: Metadata = {
  title: "Stories | Gorsi Nama",
  description: "Stories, updates, and heritage articles from the Gorsi community.",
};

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb
        image={pageBanner.stories}
        eyebrow="From Our People"
        title="Stories from our people"
        description="Stories, updates, and heritage articles from the Gorsi community."
      >
        <BlogWriteButton />
      </PageBreadcrumb>
      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <BlogList />
      </div>
    </>
  );
}
