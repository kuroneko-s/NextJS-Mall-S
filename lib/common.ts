const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://deployment.server.com";

export function objectIsEmpty(obj: any): boolean {
  return (
    obj === undefined ||
    obj === null ||
    (obj.constructor === Object && Object.keys(obj).length === 0)
  );
}
