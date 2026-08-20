"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { StoryActions } from "@/components/blog/story-actions";
import { BlogShareLinks } from "@/components/blog/blog-share-links";
import { surfaceClass } from "@/components/surface";
import type { BlogPost } from "@/components/blog/blog.schemas";
import { readingMinutes } from "@/lib/stories/format";
import { formatTag } from "@/lib/parse-tags";
import { initialsFromName } from "@/lib/initials";
import { Text } from "@/components/typography";
import { cn } from "@/lib/utils";

function formatPublishedDate(iso: string | undefined, locale: string) {
  if (!iso) return undefined;
  return new Date(iso).toLocaleDateString(locale === "ur" ? "ur-PK" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Text variant="label">{label}</Text>
      <Text as="div" variant="small">{children}</Text>
    </div>
  );
}

export function StoryArticleSidebar({ post }: { post: BlogPost }) {
  const t = useTranslations("Stories");
  const common = useTranslations("Common");
  const locale = useLocale();
  const published = formatPublishedDate(post.publishedAt ?? post.updatedAt, locale);
  const minutes = readingMinutes(post);

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <section className={cn(surfaceClass, "flex flex-col gap-5 p-5")}>
        <p className="heritage-eyebrow">{common("details")}</p>

        <MetaRow label={t("sidebarAuthor")}>
          <span className="flex items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-espresso ring-1 ring-gold/45">
              <span className="font-heading text-[0.7rem] font-semibold text-ivory">
                {initialsFromName(post.authorName)}
              </span>
            </span>
            {post.authorName}
          </span>
        </MetaRow>

        <MetaRow label={t("sidebarCategory")}>
          <Link
            href={`/blog?category=${post.categoryId}`}
            className="text-espresso transition-colors hover:text-gold"
          >
            {t(`categories.${post.categoryId}`)}
          </Link>
        </MetaRow>

        {published ? <MetaRow label={t("sidebarPublished")}>{published}</MetaRow> : null}

        <MetaRow label={t("sidebarLength")}>{t("minRead", { minutes })}</MetaRow>

        <StoryActions story={post} />
      </section>

      {post.tags.length > 0 ? (
        <section className={cn(surfaceClass, "p-5")}>
          <p className="heritage-eyebrow">{common("tags")}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-espresso/8 px-2.5 py-1 text-xs font-medium text-espresso"
              >
                {formatTag(tag)}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className={cn(surfaceClass, "p-5")}>
        <p className="heritage-eyebrow">{common("share")}</p>
        <div className="mt-4">
          <BlogShareLinks title={post.title} />
        </div>
      </section>
    </aside>
  );
}
