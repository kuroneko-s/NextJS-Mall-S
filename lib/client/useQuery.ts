import { server } from "@lib/common";
import useSWR from "swr";

interface QueryUser {
  name: string;
}

export interface QueryResult {
  ok: boolean;
  data: QueryUser[];
  error?: any | undefined;
}

export default function useQuery() {
  const { data, error, mutate } = useSWR<QueryResult>(
    `${server}/api/db/getUsers`
  );

  return { queryResult: data, error, isLoading: !data && !error, mutate };
}
