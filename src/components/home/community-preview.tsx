import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { MembershipCard } from "@/components/members/membership-card";
import { SectionHeading } from "./section-heading";

// Placeholder data — mirrors app/(site)/member/page.tsx until a real members-list API exists.
// See doc/product-overview.md and doc/data-and-backend.md.
const PLACEHOLDER_MEMBERS = Array.from({ length: 4 }, (_, index) => ({
  name: "AR GORSI",
  membershipId: String(123 + index),
}));

export function CommunityPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        title="Meet the Gorsi Community"
        description="Gorsi people connected across generations, cities and countries."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLACEHOLDER_MEMBERS.map((member) => (
          <MembershipCard
            key={member.membershipId}
            name={member.name}
            membershipId={member.membershipId}
          />
        ))}
      </div>

      <Link
        href="/member"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        Explore the Community
        <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}
