import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { HistoryIntro } from "@/components/history/history-intro";
import { AncientHistory } from "@/components/history/ancient-history";
import { DetailSection } from "@/components/history/detail-section";

export const metadata: Metadata = {
  title: "History | Gorsi Nama",
};

export default function HistoryPage() {
  return (
    <>
      <PageBreadcrumb title="Our History" />
      <HistoryIntro />
      <AncientHistory />
      <DetailSection />
    </>
  );
}
