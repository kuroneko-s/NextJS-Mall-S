import { BookInfo, CategoryInfo } from "@lib/interface";
import uesQuery from "../hooks/uesQuery";

export interface QueryResult<type> {
  ok: boolean;
  data: type;
  error?: any | undefined;
}

const BASE_URL = "/api/db";

class MySqlUtil {
  constructor() {}

  getCategoryInfo(id: string) {
    return uesQuery<QueryResult<CategoryInfo>>({
      path: `${BASE_URL}/getCategory`,
      args: { id },
    });
  }

  getBookInfo(id: string) {
    return uesQuery<QueryResult<BookInfo>>({
      path: "/api/db/getBookInfo",
      args: { id },
    });
  }

  getBookAndBookSeries(bookId: string) {
    return uesQuery<QueryResult<BookInfo>>({
      path: "",
      args: { id: bookId },
    });
  }
}

export const mySqlUtil = new MySqlUtil();
