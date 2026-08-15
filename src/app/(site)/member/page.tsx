import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { MembershipCard } from "@/components/members/membership-card";

export const metadata: Metadata = {
  title: "Our Members | Gorsi Nama",
};

// Placeholder data — there's no members-list API endpoint yet.
// See doc/product-overview.md and doc/data-and-backend.md.
const PLACEHOLDER_MEMBERS = Array.from({ length: 6 }, (_, index) => ({
  name: "AR GORSI",
  membershipId: String(123 + index),
}));

export default function MembersPage() {
  return (
    <>
      <PageBreadcrumb title="Our Members" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-2xl font-semibold">
          Honored Members of the Gorsi Clan
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Together, we stand as the pillars of the Gorsi legacy, united by
          heritage, strength, and an unwavering spirit. Every member of this
          tribe carries forward the proud traditions of our ancestors, adding
          their own chapter to the ever-growing story of our community. Here,
          we celebrate our shared history, achievements, and the bonds that
          make us stronger. Welcome to the family.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_MEMBERS.map((member) => (
            <MembershipCard
              key={member.membershipId}
              name={member.name}
              membershipId={member.membershipId}
            />
          ))}
        </div>
      </div>
    </>
  );
}
