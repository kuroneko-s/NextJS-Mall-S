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

export interface SessionUser {
  id: string;
  name: string;
  role: "ADMIN" | "USER";
}

export interface BuyHistoryAggregation {
  DT: string;
  TOTAL: number;
  TOTAL_AMOUNT: number;
}
