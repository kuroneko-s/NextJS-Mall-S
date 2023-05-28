import { Book, BookSeries, Translator, Writer } from "@prisma/client";

export interface BookInfoProps {
  bookInfo?: Book;
  seriesInfo?: BookSeries | undefined;
  writerInfo?: Writer;
  translatorInfo?: Translator;
}
