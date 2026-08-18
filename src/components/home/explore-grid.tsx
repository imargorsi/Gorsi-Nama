"use client";

import { motion } from "motion/react";
import { HeritageCard, HeritageCardGrid } from "@/components/heritage-card";
import { SectionHeading } from "./section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

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
  },
] as const;

export function ExploreGrid() {
  return (
    <section
      id="explore-gorsi-nama"
      className="scroll-mt-28 pt-10 pb-16 sm:scroll-mt-32 sm:pt-12 sm:pb-20"
    >
      <div className="site-shell px-4 sm:px-0">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease }}
        >
          <SectionHeading
            eyebrow="The Gorsi Nama"
            title="Explore Gorsi Nama"
            description="Stories, people, history and memories that connect us across generations."
          />
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
          }}
        >
          <HeritageCardGrid className="mt-10 sm:mt-12">
            {cards.map((card) => (
              <motion.div
                key={card.href}
                className="min-w-0 h-full"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                }}
              >
                <HeritageCard {...card} />
              </motion.div>
            ))}
          </HeritageCardGrid>
        </motion.div>
      </div>
    </section>
  );
}
