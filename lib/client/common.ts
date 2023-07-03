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

// 윤년 계산
const isLeapYear = (year: number) => {
  if (year % 4 !== 0) {
    return false;
  }

  if (year % 100 !== 0) {
    return true;
  }

  if (year % 400 === 0) {
    return true;
  }

  return false;
};

export const dateEndValue = (year: number, month: number) => {
  if (month === 2) {
    return isLeapYear(year) ? 28 : 29;
  }

  let result = -1;

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      result = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      result = 30;
      break;
  }

  return result;
};

export function sum(a: number, b: number) {
  return a + b;
}
