import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb, pageBanner } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import {
  MembershipCard,
  MembershipCardGrid,
} from "@/components/members/membership-card";
import { Stagger, StaggerItem } from "@/components/reveal";
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
      <PageBreadcrumb
        image={pageBanner.members}
        eyebrow="The Directory"
        title="Honored Members of the Gorsi Clan"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Members" },
        ]}
        description="Together, we stand as the pillars of the Gorsi legacy, united by heritage, strength, and an unwavering spirit. These cards are placeholders until the live member directory is connected."
      />
      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <Stagger mode="load">
          <MembershipCardGrid>
            {placeholderMembers.map((member, index) => (
              <StaggerItem
                key={member.id}
                index={index}
                isHoverable
                className="h-full"
              >
                <MembershipCard
                  name={member.name}
                  membershipId={member.membershipId}
                  image={member.image}
                  href={`/member/${member.id}`}
                />
              </StaggerItem>
            ))}
          </MembershipCardGrid>
        </Stagger>
      </div>
      <CallToAction
        eyebrow="The Directory"
        title="Take your place in the clan"
        text="Create your Gorsi Nama account to appear in the member directory and share your story."
        buttonText="Join Gorsi Nama"
        href="/auth/signup"
      />
    </>
  );
}
