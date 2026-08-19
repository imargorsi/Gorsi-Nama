import { Reveal } from "@/components/reveal";
import { SectionHeading } from "./section-heading";
import { SectionLink } from "./section-link";
import { communityDescription } from "@/components/community/community-categories";
import { CommunityFeed } from "@/components/community/community-feed";

export function CommunityPulse() {
  return (
    <section
      id="community-pulse"
      className="scroll-mt-28 pt-12 pb-16 sm:scroll-mt-32 sm:pt-16 sm:pb-20"
    >
      <div className="site-shell px-4 sm:px-0">
        <Reveal as="header">
          <SectionHeading
            eyebrow="Community Pulse"
            title="What's Happening in Our Community"
            description={communityDescription}
          >
            <SectionLink href="/community">Explore Community</SectionLink>
          </SectionHeading>
        </Reveal>

        <Reveal className="mt-10" amount={0.12}>
          <CommunityFeed layout="slider" />
        </Reveal>
      </div>
    </section>
  );
}
