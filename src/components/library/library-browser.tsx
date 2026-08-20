"use client";

import { useEffect, useMemo, useState } from "react";
import { Archive, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { AccentIcon } from "@/components/accent-icon";
import { EmptyWell } from "@/components/empty-well";
import {
  getLibraryCategory,
  libraryCategories,
  type LibraryCategoryId,
} from "@/components/library/library-categories";
import { LibrarySidebar } from "@/components/library/library-sidebar";
import { SplitReveal } from "@/components/reveal";
import { surfaceClass } from "@/components/surface";
import { Heading, Text } from "@/components/typography";
import { cn } from "@/lib/utils";

const emptyCounts = Object.fromEntries(
  libraryCategories.map((category) => [category.id, 0])
) as Record<LibraryCategoryId, number>;

export function LibraryBrowser({
  initialCategory,
}: {
  initialCategory?: LibraryCategoryId;
}) {
  const t = useTranslations("Library");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategory);

  useEffect(() => {
    setCategoryId(initialCategory);
  }, [initialCategory]);

  const counts = useMemo(() => emptyCounts, []);
  const categoryLabel = categoryId
    ? t(`categories.${categoryId}.title`)
    : t("allHoldings");

  function selectCategory(id?: LibraryCategoryId) {
    setCategoryId(id);
    router.replace(id ? `/library?category=${id}` : "/library", {
      scroll: false,
    });
  }

  return (
    <SplitReveal
      sidebar={
        <div className="lg:sticky lg:top-32">
          <LibrarySidebar
            query={query}
            categoryId={categoryId}
            totalCount={0}
            counts={counts}
            onQueryChange={setQuery}
            onCategoryChange={selectCategory}
          />
        </div>
      }
    >
      <Text variant="small" className="mb-6">
          {query.trim() ? (
            <>
              {t("holdingCountMatching", { count: 0 })} “{query.trim()}”
              {categoryId ? ` ${t("inCategory", { category: categoryLabel })}` : ""}
            </>
          ) : (
            <>
              {categoryLabel}
              <span className="text-gold/50"> · </span>
              {t("holdingCount", { count: 0 })}
            </>
          )}
        </Text>

        {query.trim() ? (
          <EmptyWell
            icon={Search}
            title={t("noMatchTitle")}
            text={t("noMatchText")}
          />
        ) : (
          <EmptyArchive categoryId={categoryId} />
        )}
    </SplitReveal>
  );
}

function EmptyArchive({ categoryId }: { categoryId?: LibraryCategoryId }) {
  const t = useTranslations("Library");

  if (categoryId) {
    const category = getLibraryCategory(categoryId);
    return (
      <EmptyWell
        icon={category.icon}
        title={t(`categories.${categoryId}.emptyTitle`)}
        text={t(`categories.${categoryId}.emptyMessage`)}
      />
    );
  }

  return (
    <div className={cn(surfaceClass, "overflow-hidden")}>
      <div className="px-5 py-10 text-center sm:px-8 sm:py-14">
        <AccentIcon icon={Archive} size="lg" className="mx-auto" />
        <Heading as="h2" variant="h4" className="mt-4">
          {t("emptyTitle")}
        </Heading>
        <Text variant="muted" className="mx-auto mt-3 max-w-md">
          {t("emptyText")}
        </Text>
      </div>
      <ul className="grid gap-px bg-espresso/8 sm:grid-cols-2">
        {libraryCategories.map((category) => {
          const Icon = category.icon;
          return (
            <li key={category.id} className="bg-ivory px-5 py-6 sm:px-6">
              <p className="heritage-eyebrow">{t(`categories.${category.id}.eyebrow`)}</p>
              <Heading as="p" variant="card" className="mt-2 flex items-center gap-2">
                <Icon className="size-4 text-gold" strokeWidth={1.75} />
                {t(`categories.${category.id}.title`)}
              </Heading>
              <Text variant="small" className="mt-2">
                {t(`categories.${category.id}.description`)}
              </Text>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
