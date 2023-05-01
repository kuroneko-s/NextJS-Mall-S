import { useState } from "react";
import { appendCookie, removeCookieValue, removeCookieAll } from "./cookies";
import { COOKIE_NAME } from "@lib/common";
import { UserInfo } from "./interface/tables";

export interface ContextApiProps {
  baskets?: string[];
  appendBooks?: appendItemFn;
  removeBook?: removeItemFn;
  removeAll?: removeAllFn;
  userInfo?: UserInfo;
}

type appendItemFn = (...books: string[]) => void;
type removeItemFn = (item: string) => void;
type removeAllFn = () => void;

export default function useBaskets(): [
  string[],
  appendItemFn,
  removeItemFn,
  removeAllFn
] {
  const [baskets, setBaskets] = useState<string[]>([]);

  const appendBooks: appendItemFn = (...books: string[]) => {
    setBaskets([...baskets, ...books]);

    for (const target of books) {
      appendCookie({ cookieName: COOKIE_NAME, value: target });
    }
  };

  const removeBook: removeItemFn = (item: string) => {
    const index = baskets.indexOf(item);
    if (index < 0) return;

    setBaskets([...baskets.slice(0, index), ...baskets.slice(index + 1)]);
    removeCookieValue({ cookieName: COOKIE_NAME, value: item });
  };

  const removeAll = () => {
    setBaskets([]);
    removeCookieAll(COOKIE_NAME);
  };

  return [baskets, appendBooks, removeBook, removeAll];
}
