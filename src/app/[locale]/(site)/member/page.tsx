import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import {
  MembershipCard,
  MembershipCardGrid,
} from "@/components/members/membership-card";
import { placeholderMembers } from "@/data/members";

export const metadata: Metadata = {
  title: "Our Members | Gorsi Nama",
};

export default async function MembersPage({
  params,
}: PageProps<"/[locale]/member">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb title="Our Members" />
      <div className="site-shell px-4 py-16 sm:px-0">
        <p className="heritage-eyebrow">The Directory</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-espresso sm:text-4xl">
          Honored Members of the Gorsi Clan
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-warm-gray sm:text-base">
          Together, we stand as the pillars of the Gorsi legacy, united by
          heritage, strength, and an unwavering spirit. These cards are
          placeholders until the live member directory is connected.
        </p>

        <MembershipCardGrid className="mt-10">
          {placeholderMembers.map((member) => (
            <MembershipCard
              key={member.id}
              name={member.name}
              membershipId={member.membershipId}
              image={member.image}
              href={`/member/${member.id}`}
            />
          ))}
        </MembershipCardGrid>
      </div>
      <CallToAction
        text="Create your Gorsi Nama account to appear in the member directory and share your story."
        buttonText="Join Gorsi Nama"
        href="/auth/signup"
      />
    </>
  );
}
