"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  profileDetailsResponseSchema,
  type ProfileDetails,
  type ProfileDetailsValues,
} from "@/components/profile/profile.schemas";

export const profileQueryKey = ["profile", "me"] as const;

async function readError(response: Response) {
  try {
    const body: unknown = await response.json();
    if (body && typeof body === "object" && "error" in body) {
      const message = (body as { error: unknown }).error;
      if (typeof message === "string") return message;
    }
  } catch {
    // fall through
  }
  return "Something went wrong, try again.";
}

async function parseProfile(response: Response): Promise<ProfileDetails> {
  if (!response.ok) throw new Error(await readError(response));
  return profileDetailsResponseSchema.parse(await response.json());
}

async function fetchOwnProfile(): Promise<ProfileDetails> {
  return parseProfile(await fetch("/api/profile", { credentials: "same-origin" }));
}

async function saveOwnProfile(values: ProfileDetailsValues): Promise<ProfileDetails> {
  return parseProfile(
    await fetch("/api/profile", {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
  );
}

export function useOwnProfile(enabled = true) {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: fetchOwnProfile,
    enabled,
  });
}

export function useSaveOwnProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveOwnProfile,
    onSuccess: (details) => {
      queryClient.setQueryData(profileQueryKey, details);
    },
  });
}
