import { Reveal } from "@/components/reveal";
import { MemberSlider } from "@/components/members/member-slider";
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

        <div className="mt-10">
          <MemberSlider />
        </div>
      </div>
    </section>
  );
}
