import { COMMON_URL } from "@lib/appConstant";
import customUseQuery from "@lib/hooks/useCustomQuery";
import { BookInfo, CategoryInfo } from "@lib/interface";

export interface QueryResult<type> {
  ok: boolean;
  data: type;
  error?: any | undefined;
}

export interface QueryResultList<type> {
  ok: boolean;
  data: type[];
  error?: any | undefined;
}

class MySqlUtil {
  constructor() {}

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
    });
  }

  getBookAndBookSeries(bookId: string) {
    return customUseQuery<QueryResult<BookInfo>>({
      path: `${COMMON_URL.getBookAndBookSeries}`,
      args: { id: bookId },
    });
  }
}

export const mySqlUtil = new MySqlUtil();
