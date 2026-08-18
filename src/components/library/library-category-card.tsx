import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { surfaceClass } from "@/components/surface";
import { cn } from "@/lib/utils";
import type { LibraryCategory } from "@/components/library/library-categories";

export function LibraryCategoryCard({
  category,
}: {
  category: LibraryCategory;
}) {
  return (
    <Link
      href={`/library?category=${category.id}`}
      className={cn(
        surfaceClass,
        "group flex h-full min-w-0 flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none"
      )}
    >
      <div className="relative aspect-3/2 overflow-hidden bg-espresso">
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 90vw"
          className="object-contain p-2 mix-blend-screen transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:p-3"
        />
        <div className="absolute inset-0 ring-2 ring-gold ring-inset" />
      </div>

      <div className="flex flex-1 flex-col px-4 pt-3 pb-4 sm:px-5">
        <p className="heritage-eyebrow">{category.eyebrow}</p>
        <h3 className="mt-1.5 font-heading text-xl font-semibold tracking-tight text-espresso">
          {category.title}
        </h3>
        <p className="mt-1.5 mb-4 text-sm leading-snug text-warm-gray">
          {category.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 border-t border-gold/20 pt-3 text-sm font-medium tracking-wide text-gold">
          {category.cta}
          <ArrowRight
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
            strokeWidth={1.75}
          />
        </span>
      </div>
    </Link>
  );
}
