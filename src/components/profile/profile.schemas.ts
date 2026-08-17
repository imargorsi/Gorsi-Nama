import { z } from "zod";

// Clerk-owned identity shown on the profile page. Editing these goes through
// Clerk's account UI — see doc/auth-and-roles.md.
export interface UserInfo {
  userId: string;
  fullName: string;
  email: string;
  profilePhoto?: string | null;
}

function optionalHttpUrl(label: string) {
  return z
    .string()
    .trim()
    .max(200, `${label} is too long`)
    .refine((value) => value === "" || /^https?:\/\/.+/i.test(value), {
      message: `Enter a valid ${label} URL`,
    });
}

export const profileDetailsSchema = z.object({
  city: z.string().trim().max(80, "City is too long"),
  profession: z.string().trim().max(80, "Profession is too long"),
  summary: z.string().trim().max(500, "Summary must be 500 characters or less"),
  facebookUrl: optionalHttpUrl("Facebook"),
  instagramUrl: optionalHttpUrl("Instagram"),
  twitterUrl: optionalHttpUrl("X / Twitter"),
  websiteUrl: optionalHttpUrl("Website"),
});

export type ProfileDetailsValues = z.infer<typeof profileDetailsSchema>;

export const profileDetailsResponseSchema = z.object({
  city: z.string().nullable(),
  profession: z.string().nullable(),
  summary: z.string().nullable(),
  facebookUrl: z.string().nullable(),
  instagramUrl: z.string().nullable(),
  twitterUrl: z.string().nullable(),
  websiteUrl: z.string().nullable(),
});

export type ProfileDetails = z.infer<typeof profileDetailsResponseSchema>;

export const emptyProfileDetails: ProfileDetails = {
  city: null,
  profession: null,
  summary: null,
  facebookUrl: null,
  instagramUrl: null,
  twitterUrl: null,
  websiteUrl: null,
};

export function toProfileFormValues(details: ProfileDetails): ProfileDetailsValues {
  return {
    city: details.city ?? "",
    profession: details.profession ?? "",
    summary: details.summary ?? "",
    facebookUrl: details.facebookUrl ?? "",
    instagramUrl: details.instagramUrl ?? "",
    twitterUrl: details.twitterUrl ?? "",
    websiteUrl: details.websiteUrl ?? "",
  };
}

export function toStoredProfileDetails(values: ProfileDetailsValues): ProfileDetails {
  const blankToNull = (value: string) => (value.length > 0 ? value : null);
  return {
    city: blankToNull(values.city),
    profession: blankToNull(values.profession),
    summary: blankToNull(values.summary),
    facebookUrl: blankToNull(values.facebookUrl),
    instagramUrl: blankToNull(values.instagramUrl),
    twitterUrl: blankToNull(values.twitterUrl),
    websiteUrl: blankToNull(values.websiteUrl),
  };
}
