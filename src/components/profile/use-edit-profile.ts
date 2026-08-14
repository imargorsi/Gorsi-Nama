import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { UserInfo } from "@/context/user-context";
import type { EditProfileValues } from "./profile.schemas";

interface EditProfileResponse {
  message: string;
  data: UserInfo;
}

export function useEditProfile() {
  return useMutation({
    mutationFn: async (payload: EditProfileValues & { userId: string }) => {
      const { data } = await apiClient.patch<EditProfileResponse>(
        "/editUser",
        payload
      );
      return data;
    },
  });
}
