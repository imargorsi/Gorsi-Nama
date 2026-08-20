import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { OwnProfileClient } from "@/components/profile/own-profile-client";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/profile">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Profile" });
  return pageMetadata({
    locale,
    href: "/profile",
    title: t("metaTitle"),
    index: false,
  });
}

export default async function ProfilePage({
  params,
}: PageProps<"/[locale]/profile">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Profile");
  const common = await getTranslations("Common");

  return (
    <>
      <PageBreadcrumb
        crumbs={[
          { label: common("home"), href: "/" },
          { label: t("crumb") },
        ]}
      />
      <OwnProfileClient />
    </>
  );
}
