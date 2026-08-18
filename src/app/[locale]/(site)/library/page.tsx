import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BookMarked, FileText, ImageIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  isLibraryCategoryId,
  libraryCategories,
  type LibraryCategoryId,
} from "@/components/library/library-categories";
import { LibraryEmpty } from "@/components/library/library-empty";
import { HeritageDiamond } from "@/components/heritage-ornaments";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categoryIcons = {
  books: BookMarked,
  documents: FileText,
  images: ImageIcon,
} as const satisfies Record<LibraryCategoryId, LucideIcon>;

export const metadata: Metadata = {
  title: "Library | Gorsi Nama",
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
  const category = requested && isLibraryCategoryId(requested) ? requested : "books";

  return (
    <>
      <PageBreadcrumb title="Library" />

      <div className="site-shell px-4 py-16 sm:px-0">
        <p className="heritage-eyebrow">The Archive</p>
        <div className="mt-3 flex items-center gap-3" aria-hidden>
          <span className="h-px w-8 bg-gold/35" />
          <HeritageDiamond />
          <span className="h-px w-8 bg-gold/35" />
        </div>
        <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-espresso sm:text-4xl">
          Browse the Gorsi Library
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-warm-gray sm:text-base">
          Three collections: books, documents (PDFs and records), and images.
          Holdings will appear here as the archive grows.
        </p>

        <Tabs defaultValue={category} className="mt-10">
          <TabsList
            variant="line"
            className="h-auto w-full max-w-full justify-start gap-1 rounded-none bg-transparent p-0 sm:gap-6"
          >
            {libraryCategories.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="h-11 flex-none rounded-none px-3 font-heading text-base data-active:bg-transparent data-active:text-gold data-active:shadow-none after:bg-gold sm:px-0"
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {libraryCategories.map((item) => (
            <TabsContent key={item.id} value={item.id} className="mt-8">
              <LibraryEmpty
                icon={categoryIcons[item.id]}
                title={item.title}
                message={item.emptyMessage}
              />
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 border-t border-gold/20 pt-10">
          <h3 className="font-heading text-2xl font-semibold tracking-tight text-espresso">
            Help grow the archive
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-warm-gray">
            Books, documents, and photographs will be added as the library takes
            shape. Join Gorsi Nama to contribute.
          </p>
          <Link
            href="/auth/signup"
            className={cn(
              buttonVariants({
                className: "mt-6 h-11 gap-2 bg-gold px-5 text-espresso hover:bg-gold/90",
              })
            )}
          >
            Join Gorsi Nama
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </>
  );
}
