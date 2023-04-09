import {
  BookInfo,
  BookSeries,
  TranslatorInfo,
  WriterInfo,
} from "@lib/interface/tables";

export interface BookInfoProps {
  bookInfo?: BookInfo | undefined;
  seriesInfo?: BookSeries | undefined;
  writerInfo?: WriterInfo | undefined;
  translatorInfo?: TranslatorInfo | undefined;
}
