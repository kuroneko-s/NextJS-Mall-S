import { COMMON_URL } from "@lib/appConstant";
import customUseQuery from "@lib/hooks/useCustomQuery";
import { BookInfo, BookSeries, CategoryInfo } from "@lib/interface/tables";

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
    });
  }

  getBookSeries(bookId: string) {
    return customUseQuery<QueryResult<BookSeries>>({
      path: `${COMMON_URL.getBookSeries}`,
      args: { id: bookId },
    });
  }
}

export const mySqlUtil = new MySqlUtil();
