"use client";

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
    image: "/history__image__4.jpg",
    icon: Landmark,
  },
  {
    index: 2,
    category: "Stories",
    title: "Our Stories",
    description:
      "Read stories and memories shared by our community. Every story preserves a piece of us.",
    href: "/blog",
    cta: "Explore Stories",
    image: "/writing.jpg",
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
      "Explore books, documents, photographs and resources that preserve our shared heritage.",
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
      className="scroll-mt-28 pt-10 pb-16 sm:scroll-mt-32 sm:pt-12 sm:pb-20"
    >
      <div className="site-shell px-4 sm:px-0">
        <Reveal as="header">
          <SectionHeading
            eyebrow="The Gorsi Nama"
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
