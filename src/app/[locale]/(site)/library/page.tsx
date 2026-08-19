import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { LibraryBrowser } from "@/components/library/library-browser";
import { isLibraryCategoryId } from "@/components/library/library-categories";

export const metadata: Metadata = {
  title: "Library | Gorsi Nama",
  description:
    "The Gorsi archive of PDF documents and photographs, kept so later generations can still find what we were careful to keep.",
};

export default async function LibraryPage({
  params,
  searchParams,
}: PageProps<"/[locale]/library">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const query = await searchParams;
  const requested =
    typeof query.category === "string" ? query.category : undefined;
  const category =
    requested && isLibraryCategoryId(requested) ? requested : undefined;

  return (
    <>
      <PageBreadcrumb
        eyebrow="The Archive"
        title="The Gorsi Library"
        description="One archive, two formats. Documents are PDFs — letters, records, and scanned papers. Photographs are JPEG, PNG, and WebP. Archive keepers add holdings; everyone can browse."
      />

      <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <LibraryBrowser initialCategory={category} />
      </div>

      <CallToAction
        eyebrow="The Archive"
        title="Help Grow the Archive"
        text="Official holdings are added by archive keepers. Family memories and photographs you want to share belong in Stories."
        buttonText="Write a story"
        href="/blog/write"
      />
    </>
  );
}
