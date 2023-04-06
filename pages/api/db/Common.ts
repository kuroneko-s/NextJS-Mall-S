export const hasError = (obj: test) => {
  return obj?.hasOwnProperty("error");
};

interface test {
  result?: any[] | undefined;
  error?: any | undefined;
}
