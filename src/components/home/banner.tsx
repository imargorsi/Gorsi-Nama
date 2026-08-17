import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function Banner() {
  return (
    <section className="relative isolate overflow-hidden py-20">
      <Image src="/hero.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-espresso/70" />

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <h2 className="font-heading text-2xl font-semibold text-ivory sm:text-3xl">
          Help Write the Next Chapter
        </h2>
        <p className="text-ivory/80">
          Our history isn&apos;t only found in books. It&apos;s in our
          photographs, memories, family stories and the people who lived
          them. Every contribution becomes part of the story we leave for the
          generations after us.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link
            href="/auth/signup"
            className={cn(buttonVariants({ className: "bg-gold text-espresso hover:bg-gold/90" }))}
          >
            Join Gorsi Nama
          </Link>
          <Link
            href="/auth/signup"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "border-ivory/30 bg-transparent text-ivory hover:bg-ivory/10",
              })
            )}
          >
            Share Your Story
          </Link>
        </div>
      </div>
    </section>
  );
}
