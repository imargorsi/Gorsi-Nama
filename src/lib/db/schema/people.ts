import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const notablePeople = pgTable(
  "notable_people",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    createdBy: text("created_by").references(() => users.id, {
      onDelete: "set null",
    }),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    role: text("role").notNull(),
    summary: text("summary").notNull(),
    portraitKey: text("portrait_key"),
    portraitUrl: text("portrait_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("notable_people_slug_idx").on(table.slug)]
);

export type NotablePersonRow = typeof notablePeople.$inferSelect;
