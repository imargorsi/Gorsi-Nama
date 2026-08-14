import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function HistoryTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Separator className="w-12 bg-primary" />
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
            Where Tradition Meets Technology: Uniting the Gorsi Nama Across
            Generations
          </h2>
          <p className="text-muted-foreground">
            The Gorsi community has a rich history rooted in culture, honor,
            and resilience. This platform is dedicated to preserving our
            heritage by sharing the stories of those who have made
            significant contributions to our tribe.
          </p>
          <p className="text-muted-foreground">
            From historical accounts to the achievements of modern-day
            trailblazers, we aim to create a digital archive that connects
            Gorsi across generations. Join us in honoring our legacy and
            building a stronger, united future for our tribe.
          </p>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src="/history__image__3.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src="/history__image__4.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src="/fortimage.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-heading text-xl font-semibold">
            A Brief History About Gorsi
          </h3>
          <p className="text-muted-foreground">
            The Gujars belong to the north-western parts of India like
            Gujarat, Rajasthan, Himachal Pradesh, Jammu &amp; Kashmir, Uttar
            Pradesh, Uttranchal, Haryana, and Punjab. They are mostly
            Muslims, the rest being either Hindus or Sikhs. Gujarat is said
            to be named after them as they settled there in the 6th century.
          </p>
          <Link
            href="/history"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Read More
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
