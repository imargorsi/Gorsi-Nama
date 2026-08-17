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

// Member-facing profile fields we own. Identity (name, email, avatar) stays
// on Clerk / `users`; this table is the source of truth for everything a
// member customizes on Gorsi Nama. See doc/data-and-backend.md.
export const profiles = pgTable("profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  city: text("city"),
  profession: text("profession"),
  summary: text("summary"),
  facebookUrl: text("facebook_url"),
  instagramUrl: text("instagram_url"),
  twitterUrl: text("twitter_url"),
  websiteUrl: text("website_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Profile = typeof profiles.$inferSelect;
