import { COMMON_URL } from "@lib/client/appConstant";
import customUseQuery from "@lib/hooks/useCustomQuery";
import {
  Artist,
  Book,
  BookSeries,
  Category,
  Publisher,
  Translator,
  Writer,
} from "@prisma/client";

interface QueryResult<type> {
  ok: boolean;
  data: type;
  error?: any | undefined;
}

interface QueryResultList<type> {
  ok: boolean;
  data: type[];
  error?: any | undefined;
}

class MySqlUtil {
  getCategoryInfo(id: string) {
    return customUseQuery<QueryResult<Category>>({
      path: `${COMMON_URL.getCategoryInfo}`,
      args: { id },
    });
  }

  getBookList() {
    return customUseQuery<QueryResultList<Book>>({
      path: `${COMMON_URL.getBookList}`,
      args: {},
    });
  }

  getBookInfo(id: string) {
    return customUseQuery<QueryResult<Book>>({
      path: `${COMMON_URL.getBookInfo}`,
      args: { id },
      intervalTime: 10000000,
    });
  }

  getNewBookList() {
    return customUseQuery<QueryResult<Book[]>>({
      path: `${COMMON_URL.getNewBookList}`,
      args: {},
      intervalTime: 10000000,
    });
  }

  getBookSeries(bookId: string) {
    return customUseQuery<QueryResult<BookSeries>>({
      path: `${COMMON_URL.getBookSeries}`,
      args: { id: bookId },
    });
  }

  getWriterInfo(id: string) {
    return customUseQuery<QueryResult<Writer>>({
      path: `${COMMON_URL.getWriterInfo}`,
      args: { id },
    });
  }

  getTranslatorInfo(id: string) {
    return customUseQuery<QueryResult<Translator>>({
      path: `${COMMON_URL.getTranslatorInfo}`,
      args: { id },
    });
  }

  getArtistInfo(id: string) {
    return customUseQuery<QueryResult<Artist>>({
      path: `${COMMON_URL.getArtistInfo}`,
      args: { id },
    });
  }

  getPublisherInfo(id: string) {
    return customUseQuery<QueryResult<Publisher>>({
      path: `${COMMON_URL.getPublisherInfo}`,
      args: { id },
    });
  }
}

export const mySqlUtil = new MySqlUtil();
