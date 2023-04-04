import { server } from "@lib/common";
import useSWR from "swr";

interface QueryProps {
  path: string;
  args: { [key: string]: string };
}

export default function useQuery<type>({ path, args }: QueryProps) {
  const params = Object.keys(args)
    .map((key) => `${key}=${args[key]}`)
    .join("");

  const apiUrl = `${server}${path}?${params}`;

  const { data, error, mutate } = useSWR<type>(apiUrl, {
    refreshInterval: 10000,
  });

  return { queryResult: data, error, isLoading: !data && !error, mutate };
}
