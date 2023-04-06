import { KeyedMutator } from "swr";

export interface QueryResult<type> {
  queryResult: type | undefined;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<type>;
}
