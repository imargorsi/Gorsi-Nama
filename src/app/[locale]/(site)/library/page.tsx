import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { LibraryBrowser } from "@/components/library/library-browser";
import { isLibraryCategoryId } from "@/components/library/library-categories";

export const metadata: Metadata = {
  title: "Library | Gujjar Nama",
  description:
    "The Gujjar archive of PDF documents and photographs, kept so later generations can still find what we were careful to keep.",
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
        title="The Gujjar Library"
        description="A growing record of family documents, photographs, land records, letters, and other materials that preserve the history and memory of the Gujjar people."
      />

      <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <LibraryBrowser initialCategory={category} />
      </div>

      <CallToAction
        eyebrow="The Archive"
        title="Help Grow the Archive"
        text="Have family records, photographs, or historical documents that preserve our story? Share them with Gujjar Nama and help safeguard our heritage for future generations."
        buttonText="Email us"
        href="mailto:hey@argorsi.com"
      />
    </>
  );
}
