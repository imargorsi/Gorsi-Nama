import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { BlogList } from "@/components/blog/blog-list";

export const metadata: Metadata = {
  title: "Stories | Gorsi Nama",
  description: "Stories, updates, and heritage articles from the Gorsi community.",
};

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb title="Stories" />
      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <BlogList />
      </div>
    </>
  );
}
