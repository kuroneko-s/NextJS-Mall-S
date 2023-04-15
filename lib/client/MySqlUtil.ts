import { COMMON_URL } from "@lib/client/appConstant";
import customUseQuery from "@lib/hooks/useCustomQuery";
import {
  BookInfo,
  BookSeries,
  CategoryInfo,
  TranslatorInfo,
  WriterInfo,
} from "@lib/interface/tables";

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
    return customUseQuery<QueryResult<CategoryInfo>>({
      path: `${COMMON_URL.getCategoryInfo}`,
      args: { id },
    });
  }

  getBookList() {
    return customUseQuery<QueryResultList<BookInfo>>({
      path: `${COMMON_URL.getBookList}`,
      args: {},
    });
  }

  getBookInfo(id: string) {
    return customUseQuery<QueryResult<BookInfo>>({
      path: `${COMMON_URL.getBookInfo}`,
      args: { id },
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
    return customUseQuery<QueryResult<WriterInfo>>({
      path: `${COMMON_URL.getWriterInfo}`,
      args: { id },
    });
  }

  getTranslatorInfo(id: string) {
    return customUseQuery<QueryResult<TranslatorInfo>>({
      path: `${COMMON_URL.getTranslatorInfo}`,
      args: { id },
    });
  }
}

export const mySqlUtil = new MySqlUtil();
