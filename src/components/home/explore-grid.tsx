import { BookOpen, Landmark, Library, Users } from "lucide-react";
import { HeritageCard, HeritageCardGrid } from "@/components/heritage-card";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "./section-heading";

const cards = [
  {
    index: 1,
    category: "History",
    title: "Our History",
    description:
      "Trace our journey across generations and discover the roots of who we are.",
    href: "/history",
    cta: "Explore History",
    image: "/history-card.png",
    icon: Landmark,
  },
  {
    index: 2,
    category: "Stories",
    title: "Our Stories",
    description:
      "Read stories and memories that preserve a piece of who we are.",
    href: "/blog",
    cta: "Explore Stories",
    image: "/our-story.png",
    icon: BookOpen,
  },
  {
    index: 3,
    category: "People",
    title: "Our People",
    description:
      "Discover the people who shape our community and keep our heritage alive.",
    href: "/member",
    cta: "Meet the Community",
    image: "/people.jpg",
    icon: Users,
  },
  {
    index: 4,
    category: "Archive",
    title: "Our Archive",
    description:
      "Browse books, documents and photographs that preserve our heritage.",
    href: "/library",
    cta: "Explore Library",
    image: "/book.jpg",
    icon: Library,
  },
] as const;

export function ExploreGrid() {
  return (
    <section
      id="explore-gorsi-nama"
      className="relative overflow-hidden scroll-mt-28 pt-10 pb-16 sm:scroll-mt-32 sm:pt-12 sm:pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 end-0 z-0 w-[min(72%,28rem)] [mask-image:linear-gradient(to_left,black_30%,transparent)] sm:w-[min(58%,36rem)] rtl:[mask-image:linear-gradient(to_right,black_30%,transparent)]"
      >
        <div className="h-full w-full bg-gold/30 [mask-image:url('/pattern-circle.png')] [mask-position:right_center] [mask-repeat:no-repeat] [mask-size:contain] [mask-mode:luminance] rtl:[mask-position:left_center]" />
      </div>

      <div className="site-shell relative z-10 px-4 sm:px-0">
        <Reveal as="header">
          <SectionHeading
            title="Explore Gorsi Nama"
            description="Stories, people, history and memories that connect us across generations."
          />
        </Reveal>

        <Stagger>
          <HeritageCardGrid className="mt-10 sm:mt-12">
            {cards.map((card, index) => (
              <StaggerItem
                key={card.href}
                index={index}
                isHoverable
                className="h-full"
              >
                <HeritageCard {...card} />
              </StaggerItem>
            ))}
          </HeritageCardGrid>
        </Stagger>
      </div>
    </section>
  );
}
