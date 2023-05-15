import { Cookies } from "react-cookie";
import { COOKIE_NAME } from "./common";

interface CookieProps {
  cookieName: string;
  value: string;
}

interface SetCookieProps {
  cookieName: string;
  values: string[];
  [key: string]: any;
}

const cookies = new Cookies();

export const setCookie = ({
  cookieName,
  values,
  ...options
}: SetCookieProps) => {
  cookies.set(COOKIE_NAME, values, {
    ...options,
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name) as string[];
};

export function appendCookie({ cookieName, value }: CookieProps) {
  let cookie = getCookie(cookieName);

  if (cookie == undefined) {
    cookie = [];
  }

  const set = new Set([...cookie, value]);

  let date = new Date();
  date.setDate(date.getDate() + 1);

  setCookie({
    cookieName: cookieName,
    values: Array.from(set),
    path: "/", // 적용 범위
    expires: date, // 적용 시간
  });
}

export function removeCookieValue({ cookieName, value }: CookieProps) {
  let cookie = getCookie(cookieName);

  if (cookie == undefined) {
    cookie = [];
  }

  let date = new Date();
  date.setDate(date.getDate() + 1);

  setCookie({
    cookieName: cookieName,
    values: cookie.filter((str) => str !== value),
    path: "/", // 적용 범위
    expires: date, // 적용 시간
  });
}

export function removeCookieAll(cookieName: string) {
  cookies.remove(cookieName);
}
