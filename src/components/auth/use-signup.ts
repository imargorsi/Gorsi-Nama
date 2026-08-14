import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { SignupValues } from "./auth.schemas";

interface SignupResponse {
  message: string;
}

export function useSignup() {
  return useMutation({
    mutationFn: async (payload: SignupValues) => {
      const { data } = await apiClient.post<SignupResponse>(
        "/register",
        payload
      );
      return data;
    },
  });
}
