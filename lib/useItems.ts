import { useState } from "react";
import { appendCookie, removeCookieValue, removeCookieAll } from "./cookies";
import { COOKIE_NAME } from "@lib/common";

export interface UseItems {
  baskets?: string[];
  appendItems?: appendItemFn;
  removeItem?: removeItemFn;
  removeAll?: removeAllFn;
}

type appendItemFn = (...newItems: string[]) => void;
type removeItemFn = (item: string) => void;
type removeAllFn = () => void;

export default function useBaskets(): [
  string[],
  appendItemFn,
  removeItemFn,
  removeAllFn
] {
  const [baskets, setBaskets] = useState<string[]>([]);

  const appendItems: appendItemFn = (...newItems: string[]) => {
    setBaskets([...baskets, ...newItems]);

    for (const target of newItems) {
      appendCookie({ cookieName: COOKIE_NAME, value: target });
    }
  };

  const removeItem: removeItemFn = (item: string) => {
    const index = baskets.indexOf(item);
    if (index < 0) return;

    setBaskets([...baskets.slice(0, index), ...baskets.slice(index + 1)]);
    removeCookieValue({ cookieName: COOKIE_NAME, value: item });
  };

  const removeAll = () => {
    setBaskets([]);
    removeCookieAll(COOKIE_NAME);
  };

  return [baskets, appendItems, removeItem, removeAll];
}
