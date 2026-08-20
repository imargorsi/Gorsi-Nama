import type { Metadata } from "next";
import { NotFoundPanel } from "@/components/not-found-panel";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { SiteHeader } from "@/components/site-header";
import { getTranslations } from "next-intl/server";
import { noIndexRobots } from "@/lib/site";

export const metadata: Metadata = {
  robots: noIndexRobots,
};

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  const common = await getTranslations("Common");

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PageBreadcrumb
          crumbs={[
            { label: common("home"), href: "/" },
            { label: t("crumb") },
          ]}
        />
        <NotFoundPanel heading={t("heading")} text={t("text")} />
      </main>
    </>
  );
}
