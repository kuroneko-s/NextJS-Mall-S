import { BookInfo, CategoryInfo } from "@lib/interface";
import uesQuery from "./uesQuery";

export interface QueryResult<type> {
  ok: boolean;
  data: type;
  error?: any | undefined;
}

class MySqlUtil {
  constructor() {}

  getCategoryInfo(id: string) {
    return uesQuery<QueryResult<CategoryInfo>>({
      path: "/api/db/getCategory",
      args: { id },
    });
  }

  getBookInfo(id: string) {
    return uesQuery<QueryResult<BookInfo>>({
      path: "/api/db/getBookInfo",
      args: { id },
    });
  }

  getBookAndBookSeries(bookId: string) {}
}

export const mySqlUtil = new MySqlUtil();
