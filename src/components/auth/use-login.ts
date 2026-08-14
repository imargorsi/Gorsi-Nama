import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { UserInfo } from "@/context/user-context";
import type { LoginValues } from "./auth.schemas";

interface LoginResponse {
  message: string;
  data: { user: UserInfo };
}

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: LoginValues) => {
      const { data } = await apiClient.post<LoginResponse>("/login", payload);
      return data;
    },
  });
}
