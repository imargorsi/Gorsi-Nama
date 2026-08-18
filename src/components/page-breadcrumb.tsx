import type { ReactNode } from "react";
import { House } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { HeritageRule } from "@/components/heritage-ornaments";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const pageBanner = {
  community: "/people.jpg",
  stories: "/writing.jpg",
  history: "/fortimage.jpg",
  people: "/history__image__4.jpg",
  members: "/people.jpg",
  library: "/book.jpg",
  profile: "/people.jpg",
} as const;

export type PageCrumb = {
  label: string;
  href?: string;
};

export function PageBreadcrumb({
  image,
  title,
  eyebrow,
  description,
  crumbs,
  children,
  headingAs = "h1",
}: {
  image: string;
  title: string;
  eyebrow?: string;
  description?: string;
  crumbs?: PageCrumb[];
  children?: ReactNode;
  headingAs?: "h1" | "p";
}) {
  const trail = crumbs ?? [
    { label: "Home", href: "/" },
    { label: title },
  ];
  const HeadingTag = headingAs;

  return (
    <section className="relative isolate overflow-hidden bg-espresso">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />
      <div className="absolute inset-0 bg-linear-to-r from-espresso/94 via-espresso/78 to-espresso/40" />
      <div className="absolute inset-0 bg-gold/8" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-espresso/85 to-transparent" />

      <div className="site-shell relative px-4 pt-28 pb-10 sm:px-0 sm:pt-32 sm:pb-14">
        <Reveal mode="load">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-y-1 text-sm">
              {trail.map((crumb, index) => {
                const isLast = index === trail.length - 1;
                return (
                  <li
                    key={`${crumb.label}-${index}`}
                    className="flex min-w-0 items-center"
                  >
                    {index > 0 ? (
                      <span className="mx-2 text-gold/50" aria-hidden>
                        /
                      </span>
                    ) : null}
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="inline-flex items-center gap-1.5 text-ivory/70 transition-colors hover:text-gold"
                      >
                        {crumb.href === "/" ? (
                          <House className="size-3.5 text-gold" strokeWidth={1.75} />
                        ) : null}
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          "min-w-0 truncate",
                          isLast ? "font-medium text-ivory" : "text-ivory/70"
                        )}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          {eyebrow ? (
            <p className="heritage-eyebrow mt-6">{eyebrow}</p>
          ) : null}

          <div
            className={cn(
              "mt-4 flex flex-col gap-6",
              children && "sm:flex-row sm:items-end sm:justify-between sm:gap-8"
            )}
          >
            <div className="min-w-0">
              <HeadingTag className="max-w-3xl font-heading text-3xl font-semibold tracking-tight text-ivory sm:text-4xl lg:text-5xl lg:leading-tight">
                {title}
              </HeadingTag>
              <HeritageRule className="mt-4" />
              {description ? (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory/80 sm:text-base">
                  {description}
                </p>
              ) : null}
            </div>
            {children ? (
              <div className="w-full shrink-0 sm:w-auto">{children}</div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
