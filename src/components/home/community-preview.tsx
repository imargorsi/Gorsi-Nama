import {
  MembershipCard,
  MembershipCardGrid,
} from "@/components/members/membership-card";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { placeholderMembers } from "@/data/members";
import { SectionHeading } from "./section-heading";
import { SectionLink } from "./section-link";

export function CommunityPreview() {
  return (
    <section
      id="meet-the-gorsi-community"
      className="scroll-mt-28 pt-12 pb-16 sm:scroll-mt-32 sm:pt-16 sm:pb-20"
    >
      <div className="site-shell px-4 sm:px-0">
        <Reveal as="header">
          <SectionHeading
            eyebrow="Our People"
            title="Meet the Gorsi Community"
            description="Gorsi people connected across generations, cities and countries."
          >
            <SectionLink href="/member">Explore Members</SectionLink>
          </SectionHeading>
        </Reveal>

        <Stagger>
          <MembershipCardGrid className="mt-10 lg:grid-cols-4">
            {placeholderMembers.slice(0, 4).map((member, index) => (
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
    </section>
  );
}
