import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { libraryCategoryEnum } from "./enums";
import { users } from "./users";

export const libraryItems = pgTable(
  "library_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdBy: text("created_by").references(() => users.id, {
      onDelete: "set null",
    }),
    category: libraryCategoryEnum("category").notNull(),
    title: text("title").notNull(),
    summary: text("summary"),
    objectKey: text("object_key"),
    publicUrl: text("public_url"),
    coverImageKey: text("cover_image_key"),
    coverImageUrl: text("cover_image_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("library_items_category_idx").on(table.category),
    index("library_items_created_at_idx").on(table.createdAt),
  ]
);

export type LibraryItem = typeof libraryItems.$inferSelect;
