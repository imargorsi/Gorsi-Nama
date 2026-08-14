import { z } from "zod";

function countWords(value: string | undefined) {
  return value ? value.split(/\s+/).filter((word) => word.length > 0).length : 0;
}

export const editProfileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  city: z.string().optional(),
  profession: z.string().optional(),
  dateOfBirth: z.string().nullable().optional(),
  contact: z
    .string()
    .optional()
    .refine((value) => !value || /^[0-9]{11}$/.test(value), {
      message: "Phone number must be exactly 11 digits",
    }),
  summary: z
    .string()
    .optional()
    .refine((value) => countWords(value) <= 50, {
      message: "Summary must be under 50 words",
    }),
  facebookUsername: z.string().optional(),
  instagramUsername: z.string().optional(),
  profilePhoto: z.string().nullable().optional(),
  galleryImage1: z.string().nullable().optional(),
  galleryImage2: z.string().nullable().optional(),
});

export type EditProfileValues = z.infer<typeof editProfileSchema>;
