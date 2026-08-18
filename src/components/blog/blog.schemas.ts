import { z } from "zod";
import { blogCategoryIds } from "@/components/blog/blog-categories";

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
  featuredImage: z.string().optional(),
  status: z.enum(blogStatusIds),
});

export type BlogPostValues = z.infer<typeof blogPostSchema>;
