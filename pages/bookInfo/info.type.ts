import { Book, BookSeries, Translator, Writer } from "@prisma/client";

export interface BookInfoProps {
  bookInfo?: Book | undefined;
  seriesInfo?: BookSeries | undefined;
  writerInfo?: Writer | undefined;
  translatorInfo?: Translator | undefined;
}
