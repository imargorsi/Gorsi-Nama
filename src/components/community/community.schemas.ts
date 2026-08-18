import { z } from "zod";
import { communityCategoryIds } from "./community-categories";

export const communityPostSchema = z.object({
  body: z
    .string()
    .trim()
    .min(3, "Write a little more before publishing.")
    .max(2000, "Keep posts under 2,000 characters."),
  categoryId: z.enum(communityCategoryIds),
  linkUrl: z
    .string()
    .trim()
    .url("Enter a valid link.")
    .or(z.literal(""))
    .optional(),
});

export type CommunityPostValues = z.infer<typeof communityPostSchema>;
