import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhotoGallery } from "@/components/library/photo-gallery";
import { BookGallery } from "@/components/library/book-gallery";

export const metadata: Metadata = {
  title: "Library | Gorsi Nama",
};

export default async function LibraryPage({
  params,
}: PageProps<"/[locale]/library">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb title="Library" />

      <div className="site-shell px-4 py-16 sm:px-0">
        <h2 className="font-heading text-2xl font-semibold">
          Browse Our Library for Gorsi Resources
        </h2>

        <Tabs defaultValue="images" className="mt-6">
          <TabsList>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
          </TabsList>
          <TabsContent value="images" className="mt-6">
            <PhotoGallery />
          </TabsContent>
          <TabsContent value="books" className="mt-6">
            <BookGallery />
          </TabsContent>
        </Tabs>
      </div>

      <CallToAction
        text="If you have any documents, books, images, or other resources that can positively contribute to our community, please don't hesitate to use the form below to submit them. All members of our clan can then have access to these valuable resources."
        buttonText="Submit Form"
      />
    </>
  );
}
