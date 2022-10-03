import { server } from "@lib/common";
import useSWR from "swr";

interface UserInfo {
  id: number;
  name: string;
}

export interface UserInfoResult {
  ok: boolean;
  data: UserInfo;
  error?: string;
}

export default function useUser() {
  const { data, error, mutate } = useSWR<UserInfoResult>(
    `${server}/api/user/info`
  );

  return { user: data, error, isLoading: !data && !error, mutate };
}
