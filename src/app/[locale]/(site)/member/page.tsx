import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { MemberDirectory } from "@/components/members/member-directory";

export const metadata: Metadata = {
  title: "Members | Gorsi Nama",
};

export default async function MembersPage({
  params,
}: PageProps<"/[locale]/member">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb
        eyebrow="Our People"
        title="Proud Members of the Gorsi Clan"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Members" },
        ]}
        description="This directory is for every Gorsi who carries our name with pride. Join us, claim your place, and let the generations after us find their people here."
      />
      <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <MemberDirectory />
      </div>
      <CallToAction
        eyebrow="Our People"
        title="Become a Proud Member"
        text="Create your Gorsi Nama account to appear in this directory and stand with your clan."
        buttonText="Join Gorsi Nama"
        href="/auth/signup"
      />
    </>
  );
}
