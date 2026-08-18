import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb, pageBanner } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  isLibraryCategoryId,
  libraryCategories,
} from "@/components/library/library-categories";
import { LibraryEmpty } from "@/components/library/library-empty";

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
      <PageBreadcrumb
        image={pageBanner.library}
        eyebrow="The Archive"
        title="Browse the Gorsi Library"
        description="Three collections: books, documents (PDFs and records), and images. Holdings will appear here as the archive grows."
      />

      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <Tabs defaultValue={category}>
          <TabsList
            variant="line"
            className="h-auto w-full max-w-full justify-start gap-1 rounded-none bg-transparent p-0 sm:gap-6"
          >
            {libraryCategories.map((item) => {
              const Icon = item.icon;
              return (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="h-11 flex-none rounded-none px-3 font-heading text-base data-active:bg-transparent data-active:text-gold data-active:shadow-none after:bg-gold sm:px-0"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon className="size-3.5 text-gold" strokeWidth={1.75} />
                    {item.title}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {libraryCategories.map((item) => (
            <TabsContent key={item.id} value={item.id} className="mt-8">
              <LibraryEmpty
                icon={item.icon}
                title={item.title}
                message={item.emptyMessage}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <CallToAction
        eyebrow="The Archive"
        title="Help grow the archive"
        text="Books, documents, and photographs will be added as the library takes shape. Join Gorsi Nama to contribute."
        buttonText="Join Gorsi Nama"
        href="/auth/signup"
      />
    </>
  );
}
