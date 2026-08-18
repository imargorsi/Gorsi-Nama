import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb, pageBanner } from "@/components/page-breadcrumb";
import { HistoryIntro } from "@/components/history/history-intro";
import { AncientHistory } from "@/components/history/ancient-history";
import { DetailSection } from "@/components/history/detail-section";

export const metadata: Metadata = {
  title: "History | Gorsi Nama",
};

export default async function HistoryPage({
  params,
}: PageProps<"/[locale]/history">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb
        image={pageBanner.history}
        eyebrow="Our chronicle"
        title="History of the Gorsi Clan"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our History" },
        ]}
        description="A proud sub-tribe of the Gujjar community, with roots across the Indian subcontinent."
      />
      <HistoryIntro />
      <AncientHistory />
      <DetailSection />
    </>
  );
}
