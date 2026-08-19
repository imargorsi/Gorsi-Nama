"use client";

import { useEffect, useMemo, useState } from "react";
import { Archive, Search } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { AccentIcon } from "@/components/accent-icon";
import { EmptyWell } from "@/components/empty-well";
import {
  getLibraryCategory,
  libraryCategories,
  type LibraryCategoryId,
} from "@/components/library/library-categories";
import { LibrarySidebar } from "@/components/library/library-sidebar";
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
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategory);

  useEffect(() => {
    setCategoryId(initialCategory);
  }, [initialCategory]);

  const counts = useMemo(() => emptyCounts, []);
  const categoryLabel = categoryId
    ? getLibraryCategory(categoryId).title
    : "All holdings";

  function selectCategory(id?: LibraryCategoryId) {
    setCategoryId(id);
    router.replace(id ? `/library?category=${id}` : "/library", {
      scroll: false,
    });
  }

  return (
    <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-14">
      <aside className="lg:col-span-3">
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
      </aside>

      <div className="mt-8 min-w-0 lg:col-span-9 lg:mt-0">
        <Text variant="small" className="mb-6">
          {query.trim() ? (
            <>
              0 holdings matching “{query.trim()}”
              {categoryId ? ` in ${categoryLabel}` : ""}
            </>
          ) : (
            <>
              {categoryLabel}
              <span className="text-gold/50"> · </span>
              0 holdings
            </>
          )}
        </Text>

        {query.trim() ? (
          <EmptyWell
            icon={Search}
            title="No Matching Holdings"
            text="The archive has no files yet. Try another search after holdings are added."
          />
        ) : (
          <EmptyArchive categoryId={categoryId} />
        )}
      </div>
    </div>
  );
}

function EmptyArchive({ categoryId }: { categoryId?: LibraryCategoryId }) {
  if (categoryId) {
    const category = getLibraryCategory(categoryId);
    return (
      <EmptyWell
        icon={category.icon}
        title={category.emptyTitle}
        text={category.emptyMessage}
      />
    );
  }

  return (
    <div className={cn(surfaceClass, "overflow-hidden")}>
      <div className="px-5 py-10 text-center sm:px-8 sm:py-14">
        <AccentIcon icon={Archive} size="lg" className="mx-auto" />
        <Heading as="h2" variant="h4" className="mt-4">
          The Archive Is Being Prepared
        </Heading>
        <Text variant="muted" className="mx-auto mt-3 max-w-md">
          Holdings are added by archive keepers. Two formats will live here —
          PDFs for records, and photographs for visual memory.
        </Text>
      </div>
      <ul className="grid gap-px bg-espresso/8 sm:grid-cols-2">
        {libraryCategories.map((category) => {
          const Icon = category.icon;
          return (
            <li key={category.id} className="bg-ivory px-5 py-6 sm:px-6">
              <p className="heritage-eyebrow">{category.eyebrow}</p>
              <Heading as="p" variant="card" className="mt-2 flex items-center gap-2">
                <Icon className="size-4 text-gold" strokeWidth={1.75} />
                {category.title}
              </Heading>
              <Text variant="small" className="mt-2">
                {category.description}
              </Text>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
