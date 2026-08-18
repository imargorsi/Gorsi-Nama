"use client";

import { motion } from "motion/react";
import { HeritageCard, HeritageCardGrid } from "@/components/heritage-card";
import { libraryCategories } from "@/components/library/library-categories";
import { SectionHeading } from "./section-heading";
import { SectionLink } from "./section-link";

const ease = [0.22, 1, 0.36, 1] as const;

export function LibraryPreview() {
  return (
    <section
      id="the-gorsi-library"
      className="scroll-mt-28 pt-12 pb-20 sm:scroll-mt-32 sm:pt-16 sm:pb-24"
    >
      <div className="site-shell px-4 sm:px-0">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease }}
        >
          <SectionHeading
            eyebrow="The Archive"
            title="The Gorsi Library"
            description="Three collections. One archive. Books, documents, and images kept for the generations after us."
          >
            <SectionLink href="/library">Explore the Library</SectionLink>
          </SectionHeading>
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
          <HeritageCardGrid className="mt-10 sm:mt-12 lg:grid-cols-3 xl:grid-cols-3">
            {libraryCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="h-full min-w-0"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                }}
              >
                <HeritageCard
                  index={index + 1}
                  category={category.eyebrow}
                  title={category.title}
                  description={category.description}
                  image={category.image}
                  href={`/library?category=${category.id}`}
                  cta={category.cta}
                />
              </motion.div>
            ))}
          </HeritageCardGrid>
        </motion.div>
      </div>
    </section>
  );
}
