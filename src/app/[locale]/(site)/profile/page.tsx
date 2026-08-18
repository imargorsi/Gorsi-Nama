import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb, pageBanner } from "@/components/page-breadcrumb";
import { OwnProfileClient } from "@/components/profile/own-profile-client";

export const metadata: Metadata = {
  title: "My Profile | Gorsi Nama",
};

export default async function ProfilePage({
  params,
}: PageProps<"/[locale]/profile">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb
        image={pageBanner.profile}
        eyebrow="Account"
        title="My Profile"
        description="Your membership details, stories, and saved archive."
      />
      <OwnProfileClient />
    </>
  );
}
