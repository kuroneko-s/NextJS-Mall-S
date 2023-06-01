import { User } from "@prisma/client";
import { Socket } from "net";

export interface ContextApiProps {
  items?: string[];
  appendItems?: appendItemFn;
  removeItem?: removeItemFn;
  removeItemsAll?: removeAllFn;
  websocket?: Socket[];
  setWebSocket?: setWebSocketFn;
  user?: User;
}

export type appendItemFn = (...books: string[]) => void;
export type removeItemFn = (item: string) => void;
export type removeAllFn = () => void;
export type setWebSocketFn = (websocket: Socket) => void;

export type useGlobalStoreResult = [
  string[],
  appendItemFn,
  removeItemFn,
  removeAllFn,
  Socket[],
  setWebSocketFn
];
