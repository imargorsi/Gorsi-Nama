import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CallToAction } from "@/components/call-to-action";
import { Chronicle } from "@/components/history/chronicle";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { chronicleDescription } from "@/data/history-chronicle";

export const metadata: Metadata = {
  title: "History | Gorsi Nama",
  description: chronicleDescription,
};

export default async function HistoryPage({
  params,
}: PageProps<"/[locale]/history">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb
        eyebrow="Our Chronicle"
        title="History of the Gorsi Clan"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "History" },
        ]}
        description={chronicleDescription}
      />
      <Chronicle />
      <CallToAction
        eyebrow="Our Chronicle"
        title="Help Grow This Chronicle"
        text="Family records, elders' accounts, photographs, and land documents can fill the chapters still waiting to be discovered."
        buttonText="Share a story"
        href="/blog/write"
      />
    </>
  );
}
