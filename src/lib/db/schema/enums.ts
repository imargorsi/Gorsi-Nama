import { pgEnum } from "drizzle-orm/pg-core";

export const communityCategoryEnum = pgEnum("community_category", [
  "our-stories",
  "discussions",
  "places-communities",
  "history-heritage",
  "language-traditions",
]);

/** Locked story categories. Keep in sync with `blogCategoryIds` in `components/blog/blog-categories.ts`. */
export const storyCategoryIds = [
  "heritage",
  "community",
  "family",
  "history",
  "traditions",
] as const;

export const storyCategoryEnum = pgEnum("story_category", storyCategoryIds);

export const storyStatusEnum = pgEnum("story_status", ["draft", "publish"]);

export const libraryCategoryEnum = pgEnum("library_category", [
  "documents",
  "images",
]);
