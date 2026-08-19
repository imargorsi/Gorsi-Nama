import { z } from "zod";
import { blogCategoryIds, type BlogCategoryId } from "@/components/blog/blog-categories";

export const blogStatusIds = ["draft", "publish"] as const;
export type BlogStatus = (typeof blogStatusIds)[number];

export const blogPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Give this story a title.")
    .max(120, "Keep titles under 120 characters."),
  slug: z
    .string()
    .trim()
    .min(3, "Add a short permalink.")
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  excerpt: z.string().trim().max(300, "Keep the excerpt under 300 characters.").optional(),
  content: z
    .string()
    .trim()
    .min(20, "Write a little more before saving.")
    .max(20000, "Keep stories under 20,000 characters."),
  categoryId: z.enum(blogCategoryIds),
  tags: z.string().max(160).optional(),
  featuredImage: z.string().trim().max(2000).optional(),
  featuredImageKey: z.string().trim().max(500).optional(),
  status: z.enum(blogStatusIds),
});

export type BlogPostValues = z.infer<typeof blogPostSchema>;

export const storyDtoSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  categoryId: z.enum(blogCategoryIds),
  tags: z.array(z.string()),
  featuredImage: z.string().optional(),
  featuredImageKey: z.string().optional(),
  status: z.enum(blogStatusIds),
  authorName: z.string(),
  authorId: z.string(),
  publishedAt: z.string().optional(),
  updatedAt: z.string(),
});

export type BlogPost = z.infer<typeof storyDtoSchema>;

export const storyCategoryCountsSchema = z.object({
  heritage: z.number().int().nonnegative(),
  community: z.number().int().nonnegative(),
  family: z.number().int().nonnegative(),
  history: z.number().int().nonnegative(),
  traditions: z.number().int().nonnegative(),
});

export type StoryCategoryCounts = z.infer<typeof storyCategoryCountsSchema>;

export const storyListResponseSchema = z.object({
  stories: z.array(storyDtoSchema),
  total: z.number().int().nonnegative(),
  counts: storyCategoryCountsSchema,
});

export type StoryListResponse = z.infer<typeof storyListResponseSchema>;

export const storyMineResponseSchema = z.object({
  stories: z.array(storyDtoSchema),
});

export const storyListQuerySchema = z.object({
  category: z.enum(blogCategoryIds).optional(),
  q: z.string().trim().max(120).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(24),
  offset: z.coerce.number().int().min(0).max(10_000).default(0),
});

export type StoryListQuery = z.infer<typeof storyListQuerySchema>;

export function emptyStoryCounts(): StoryCategoryCounts {
  return {
    heritage: 0,
    community: 0,
    family: 0,
    history: 0,
    traditions: 0,
  };
}

export function isBlogCategoryCountKey(id: string): id is BlogCategoryId {
  return blogCategoryIds.includes(id as BlogCategoryId);
}
