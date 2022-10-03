import useSWR from "swr";

export default function useCustomSWR(url: string) {
  const { data, error } = useSWR(url);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
