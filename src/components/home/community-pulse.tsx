import { SectionHeading } from "./section-heading";
import { SectionLink } from "./section-link";
import { CommunityFeed } from "@/components/community/community-feed";

export function CommunityPulse() {
  return (
    <section
      id="community-pulse"
      className="scroll-mt-28 pt-12 pb-16 sm:scroll-mt-32 sm:pt-16 sm:pb-20"
    >
      <div className="site-shell px-4 sm:px-0">
        <SectionHeading
          eyebrow="Community Pulse"
          title="What's Happening in Our Community"
          description="Share stories, ideas and moments that matter to our people."
        >
          <SectionLink href="/community">Explore Community</SectionLink>
        </SectionHeading>

        <div className="mt-10">
          <CommunityFeed layout="slider" />
        </div>
      </div>
    </section>
  );
}
