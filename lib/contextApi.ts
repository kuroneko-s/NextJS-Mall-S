import { useState } from "react";
import { appendCookie, removeCookieValue, removeCookieAll } from "./cookies";
import { COOKIE_NAME } from "@lib/common";
import { Socket } from "net";
import {
  appendItemFn,
  removeItemFn,
  useGlobalStoreResult,
} from "./interface/store";

export default function useGlobalStore(): useGlobalStoreResult {
  const [items, setItems] = useState<string[]>([]);
  const [websocket, setWebsocket] = useState<Socket[]>([]);

  const appendBooks: appendItemFn = (...books: string[]) => {
    setItems((cur) => [...cur, ...books]);

    for (const target of books) {
      appendCookie({ cookieName: COOKIE_NAME, value: target });
    }
  };

  const removeBook: removeItemFn = (item: string) => {
    const index = items.indexOf(item);
    if (index < 0) return;

    setItems((cur) => [...cur.slice(0, index), ...cur.slice(index + 1)]);
    removeCookieValue({ cookieName: COOKIE_NAME, value: item });
  };

  const removeItemsAll = () => {
    setItems([]);
    removeCookieAll(COOKIE_NAME);
  };

  const setWebSocket = (websocket: Socket): void => {
    setWebsocket((cur) => [...cur, websocket]);
  };

  return [
    items,
    appendBooks,
    removeBook,
    removeItemsAll,
    websocket,
    setWebSocket,
  ];
}
