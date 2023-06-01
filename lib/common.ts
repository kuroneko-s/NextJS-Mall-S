const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}`;

export const websocketServer = dev
  ? "ws://localhost:3000"
  : `ws://${process.env.SERVER_IP}:${process.env.SERVER_PORT}`;

export function objectIsEmpty(obj: any): boolean {
  return (
    obj === undefined ||
    obj === null ||
    (obj.constructor === Object && Object.keys(obj).length === 0)
  );
}

export const COOKIE_NAME = "checked-item";
