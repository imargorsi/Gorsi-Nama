import type { ReactNode } from "react";
import { ChevronRight, House } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/home/section-heading";
import { Reveal } from "@/components/reveal";
import { breadcrumbListJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export type PageCrumb = {
  label: string;
  href?: string;
};

export async function PageBreadcrumb({
  title,
  eyebrow,
  description,
  crumbs,
  children,
}: {
  title?: string;
  eyebrow?: string;
  description?: string;
  crumbs?: PageCrumb[];
  children?: ReactNode;
}) {
  const t = await getTranslations("Common");
  const locale = await getLocale();
  const trail = crumbs ?? [
    { label: t("home"), href: "/" },
    ...(title ? [{ label: title }] : []),
  ];

  return (
    <>
      {trail.length > 1 ? (
        <JsonLd
          data={breadcrumbListJsonLd(
            trail.map((crumb) => ({ name: crumb.label, href: crumb.href })),
            locale
          )}
        />
      ) : null}
      <Reveal mode="load" className="site-shell px-4 pt-6 sm:px-0 sm:pt-8">
        <nav aria-label={t("breadcrumb")}>
        <ol className="flex flex-wrap items-center gap-y-1 text-sm">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li
                key={`${crumb.label}-${index}`}
                className="flex min-w-0 items-center"
              >
                {index > 0 ? (
                  <ChevronRight
                    className="mx-1.5 size-3.5 shrink-0 text-gold/55 rtl:rotate-180"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                ) : null}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="inline-flex min-w-0 items-center gap-1.5 text-warm-gray transition-colors hover:text-gold"
                  >
                    {crumb.href === "/" ? (
                      <House
                        className="size-3.5 text-gold"
                        strokeWidth={1.75}
                      />
                    ) : null}
                    <span className="truncate">{crumb.label}</span>
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "min-w-0 truncate",
                      isLast
                        ? "font-medium text-espresso"
                        : "text-warm-gray"
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

      {title ? (
        <SectionHeading
          as="h1"
          className="mt-6"
          eyebrow={eyebrow}
          title={title}
          description={description}
        >
          {children}
        </SectionHeading>
      ) : null}
    </Reveal>
    </>
  );
}
