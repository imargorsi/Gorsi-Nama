import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Stagger, StaggerItem } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { chronicleDescription } from "@/data/history-chronicle";
import { cn } from "@/lib/utils";

const photoFrameClass =
  "relative overflow-hidden rounded-lg bg-espresso ring-2 ring-gold";

export function HistoryTeaser() {
  return (
    <section
      id="our-history"
      className="scroll-mt-28 pt-12 pb-16 sm:scroll-mt-32 sm:pt-16 sm:pb-20"
    >
      <div className="site-shell px-4 sm:px-0">
        <Stagger className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-stretch md:gap-14 lg:gap-20">
          <StaggerItem index={0} className="flex min-w-0 flex-col border-t border-espresso pt-8 md:justify-between md:gap-12">
            <div>
              <p className="heritage-eyebrow mb-4">Our History</p>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-espresso sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                Where Tradition Meets Technology: Uniting the Gorsi Tribe Across
                Generations
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-warm-gray sm:text-base">
                {chronicleDescription}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 md:mt-0">
              <div className={cn(photoFrameClass, "aspect-square")}>
                <Image
                  src="/history__image__3.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className={cn(photoFrameClass, "aspect-square")}>
                <Image
                  src="/history__image__4.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </StaggerItem>

          <StaggerItem index={1} className="flex min-w-0 flex-col border-b border-espresso pb-8">
            <div className={cn(photoFrameClass, "aspect-16/10")}>
              <Image
                src="/connecting-tech.png"
                alt="Gorsi elders and younger members gathered on a traditional rug, sharing a laptop and tablets"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[center_45%]"
              />
            </div>
            <h3 className="mt-6 font-heading text-xl font-semibold tracking-tight text-espresso sm:text-2xl">
              A Brief History About Gorsi
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-warm-gray sm:text-base">
              The Gorsi community has a rich history rooted in culture, honor,
              and resilience. This platform is dedicated to preserving our
              heritage by sharing the stories of those who have made
              significant contributions to our tribe.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-warm-gray sm:text-base">
              From historical accounts to the achievements of modern-day
              trailblazers, we aim to create a digital archive that connects
              Gorsi across generations. Join us in honoring our legacy and
              building a stronger, united future for our tribe.
            </p>
            <Link
              href="/history"
              className={cn(
                buttonVariants({
                  className:
                    "mt-6 h-11 w-fit bg-espresso px-6 text-ivory hover:bg-espresso/90",
                })
              )}
            >
              Read More
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
