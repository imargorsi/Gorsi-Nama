import { z } from "zod";

export const uploadFolders = ["community", "library", "profiles"] as const;
export type UploadFolder = (typeof uploadFolders)[number];

export const allowedImageMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const imageInputAccept = allowedImageMimeTypes.join(",");
export const maxImageUploadMb = 5;
export const maxImageUploadBytes = maxImageUploadMb * 1024 * 1024;

export const createUploadSchema = z.object({
  filename: z.string().trim().min(1).max(180),
  contentType: z.enum(allowedImageMimeTypes),
  size: z.number().int().positive().max(maxImageUploadBytes),
  folder: z.enum(uploadFolders),
});

export function isAllowedImageMimeType(
  value: string
): value is (typeof allowedImageMimeTypes)[number] {
  return (allowedImageMimeTypes as readonly string[]).includes(value);
}

export const createUploadResponseSchema = z.object({
  key: z.string(),
  uploadUrl: z.string().url(),
  publicUrl: z.string().url(),
});

export type CreateUploadResponse = z.infer<typeof createUploadResponseSchema>;
