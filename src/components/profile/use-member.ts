import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { UserInfo } from "@/context/user-context";

interface MemberResponse {
  message: string;
  data: UserInfo;
}

export function useMemberQuery(id: string) {
  return useQuery({
    queryKey: ["member", id],
    queryFn: async () => {
      const { data } = await apiClient.get<MemberResponse>(`/${id}`);
      if (data.message !== "User found successfully") return null;
      return data.data;
    },
  });
}
