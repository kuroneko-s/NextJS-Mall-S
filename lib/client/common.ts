export function cls(...str: string[]) {
  return str.join(" ");
}

type voidFunc = () => void;

let timeoutId: NodeJS.Timeout | null = null;

export function throttle(func: voidFunc, delay: number) {
  return () => {
    if (timeoutId === null) {
      func();
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    }
  };
}

export function dateFormatYYYMMDD(date: Date) {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
}
