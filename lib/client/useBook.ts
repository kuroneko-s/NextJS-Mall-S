import { server } from "@lib/common";
import useSWR from "swr";

interface UseBookProps {
  id: string;
}

interface BookInfo {
  isbn: string;
  writer_id: string;
  title: string;
  price: string;
  book_description: string;
  publisher: string;
  publishing_description: string;
  listening_yn: string;
  pc_yn: string;
  mac_yn: string;
  window_yn: string;
  android_yn: string;
  linux_yn: string;
  ios_yn: string;
  file_type: string;
  file_size: string;
  text_count: string;
  publisher_description: string;
  book_contents: string;
  category_id: string;
}

export interface QueryResult {
  ok: boolean;
  data: BookInfo;
  error?: any | undefined;
}

export default function useBook({ id }: UseBookProps) {
  const { data, error, mutate } = useSWR<QueryResult>(
    `${server}/api/db/getBookInfo?isbn=${id}`,
    {
      refreshInterval: 5000,
    }
  );

  return { queryResult: data, error, isLoading: !data && !error, mutate };
}
