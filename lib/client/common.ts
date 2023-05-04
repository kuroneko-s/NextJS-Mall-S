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
