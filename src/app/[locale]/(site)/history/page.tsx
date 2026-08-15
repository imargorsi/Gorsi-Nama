import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
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
      <PageBreadcrumb title="Our History" />
      <HistoryIntro />
      <AncientHistory />
      <DetailSection />
    </>
  );
}
