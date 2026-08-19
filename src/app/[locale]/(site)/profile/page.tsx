import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { OwnProfileClient } from "@/components/profile/own-profile-client";

export const metadata: Metadata = {
  title: "My Profile | Gujjar Nama",
};

export default async function ProfilePage({
  params,
}: PageProps<"/[locale]/profile">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: "My Profile" },
        ]}
      />
      <OwnProfileClient />
    </>
  );
}
