import { relations } from "drizzle-orm";
import { libraryItems } from "./library";
import { notablePeople } from "./people";
import {
  postImages,
  postLikes,
  postSaves,
  postTags,
  posts,
} from "./posts";
import { stories, storyTags } from "./stories";
import { tags } from "./tags";
import { profiles, users } from "./users";

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  posts: many(posts),
  stories: many(stories),
  postLikes: many(postLikes),
  postSaves: many(postSaves),
  libraryItems: many(libraryItems),
  notablePeople: many(notablePeople),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  postTags: many(postTags),
  storyTags: many(storyTags),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
  images: many(postImages),
  tags: many(postTags),
  likes: many(postLikes),
  saves: many(postSaves),
}));

export const postImagesRelations = relations(postImages, ({ one }) => ({
  post: one(posts, { fields: [postImages.postId], references: [posts.id] }),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, { fields: [postTags.postId], references: [posts.id] }),
  tag: one(tags, { fields: [postTags.tagId], references: [tags.id] }),
}));

export const postLikesRelations = relations(postLikes, ({ one }) => ({
  user: one(users, { fields: [postLikes.userId], references: [users.id] }),
  post: one(posts, { fields: [postLikes.postId], references: [posts.id] }),
}));

export const postSavesRelations = relations(postSaves, ({ one }) => ({
  user: one(users, { fields: [postSaves.userId], references: [users.id] }),
  post: one(posts, { fields: [postSaves.postId], references: [posts.id] }),
}));

export const storiesRelations = relations(stories, ({ one, many }) => ({
  author: one(users, { fields: [stories.authorId], references: [users.id] }),
  tags: many(storyTags),
}));

export const storyTagsRelations = relations(storyTags, ({ one }) => ({
  story: one(stories, { fields: [storyTags.storyId], references: [stories.id] }),
  tag: one(tags, { fields: [storyTags.tagId], references: [tags.id] }),
}));

export const libraryItemsRelations = relations(libraryItems, ({ one }) => ({
  createdBy: one(users, {
    fields: [libraryItems.createdBy],
    references: [users.id],
  }),
}));

export const notablePeopleRelations = relations(notablePeople, ({ one }) => ({
  createdBy: one(users, {
    fields: [notablePeople.createdBy],
    references: [users.id],
  }),
}));
