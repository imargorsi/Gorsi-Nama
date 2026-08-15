import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Clerk owns identity/session; this table mirrors just enough to let our own
// tables (profiles, posts, etc.) join on a stable id without calling out to
// Clerk on every request. Kept in sync via the webhook at
// app/api/webhooks/clerk/route.ts. See doc/data-and-backend.md.
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user id (e.g. "user_...")
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  imageUrl: text("image_url"),
  role: text("role").notNull().default("member"), // mirrors Clerk publicMetadata.role; Clerk stays the source of truth
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
