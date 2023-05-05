import { Book } from "@prisma/client";
import { KeyedMutator } from "swr";

export interface QueryResult<type> {
  queryResult: type | undefined;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<type>;
}

export type BookWithWriter = Book & {
  writer: {
    id: number;
    name: string;
  };
};
