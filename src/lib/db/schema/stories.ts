import {
  index,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { storyCategoryEnum, storyStatusEnum } from "./enums";
import { tags } from "./tags";
import { users } from "./users";

export const stories = pgTable(
  "stories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    authorId: text("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    category: storyCategoryEnum("category").notNull(),
    status: storyStatusEnum("status").notNull().default("draft"),
    featuredImageKey: text("featured_image_key"),
    featuredImageUrl: text("featured_image_url"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("stories_slug_idx").on(table.slug),
    index("stories_author_id_idx").on(table.authorId),
    index("stories_status_published_at_idx").on(table.status, table.publishedAt),
  ]
);

export const storyTags = pgTable(
  "story_tags",
  {
    storyId: uuid("story_id")
      .notNull()
      .references(() => stories.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.storyId, table.tagId] })]
);

export type Story = typeof stories.$inferSelect;
