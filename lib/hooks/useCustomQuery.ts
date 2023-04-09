import { server } from "@lib/common";
import useSWR from "swr";

interface QueryProps {
  path: string;
  args: { [key: string]: string };
  intervalTime?: number;
}

export default function useCustomQuery<type>({
  path,
  args,
  intervalTime = 10000,
}: QueryProps) {
  const params = Object.keys(args)
    .map((key) => `${key}=${args[key]}`)
    .join("");

  const apiUrl = `${server}${path}?${params}`;

  const { data, error, mutate } = useSWR<type>(apiUrl, {
    refreshInterval: intervalTime,
  });

  return { queryResult: data, error, isLoading: !data && !error, mutate };
}
