import { Book } from "@prisma/client";

export interface SearchResultListProps {
  bookList: Book[];
  resultClicedHandler: () => void;
}
