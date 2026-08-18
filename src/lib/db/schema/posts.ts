import {
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { communityCategoryEnum } from "./enums";
import { tags } from "./tags";
import { users } from "./users";

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    authorId: text("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    category: communityCategoryEnum("category").notNull(),
    body: text("body").notNull(),
    linkUrl: text("link_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("posts_created_at_idx").on(table.createdAt),
    index("posts_author_id_idx").on(table.authorId),
    index("posts_category_idx").on(table.category),
  ]
);

export const postImages = pgTable(
  "post_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    objectKey: text("object_key").notNull(),
    publicUrl: text("public_url").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [index("post_images_post_id_idx").on(table.postId)]
);

export const postTags = pgTable(
  "post_tags",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.postId, table.tagId] })]
);

export const postLikes = pgTable(
  "post_likes",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.postId] }),
    index("post_likes_post_id_idx").on(table.postId),
  ]
);

export const postSaves = pgTable(
  "post_saves",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.postId] }),
    index("post_saves_user_id_idx").on(table.userId),
    index("post_saves_post_id_idx").on(table.postId),
  ]
);

export type Post = typeof posts.$inferSelect;
export type PostImage = typeof postImages.$inferSelect;
export type PostLike = typeof postLikes.$inferSelect;
export type PostSave = typeof postSaves.$inferSelect;
