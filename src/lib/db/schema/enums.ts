import { pgEnum } from "drizzle-orm/pg-core";

export const communityCategoryEnum = pgEnum("community_category", [
  "our-stories",
  "discussions",
  "places-communities",
  "history-heritage",
  "language-traditions",
]);

export const storyCategoryEnum = pgEnum("story_category", [
  "heritage",
  "community",
  "family",
  "history",
  "traditions",
]);

export const storyStatusEnum = pgEnum("story_status", ["draft", "publish"]);

export const libraryCategoryEnum = pgEnum("library_category", [
  "books",
  "documents",
  "images",
]);
