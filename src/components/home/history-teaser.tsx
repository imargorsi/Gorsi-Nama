import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { HeritageRule } from "@/components/heritage-ornaments";
import { Stagger, StaggerItem } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
              <HeritageRule className="mt-4" />
              <p className="mt-6 text-sm leading-relaxed text-warm-gray sm:text-base">
                The Gujars belong to the north-western parts of India like
                Gujarat, Rajasthan, Himachal Pradesh, Jammu &amp; Kashmir, Uttar
                Pradesh, Uttranchal, Haryana, and Punjab. They are mostly
                Muslims, the rest being either Hindus or Sikhs. Gujarat is said
                to be named after them as they settled there in the 6th century.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 md:mt-0">
              <div className="relative aspect-square overflow-hidden bg-espresso">
                <Image
                  src="/history__image__3.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden bg-espresso">
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
            <div className="relative aspect-16/10 overflow-hidden bg-espresso">
              <Image
                src="/fortimage.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
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
                    "mt-6 h-11 w-fit bg-gold px-6 text-espresso hover:bg-gold/90",
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
