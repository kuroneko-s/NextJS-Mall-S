import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 5000,
        fetcher: (url: any) => fetch(url).then((response) => response.json()),
      }}
    >
      <link
        rel="stylesheet"
        href="https://cdn.simplecss.org/simple.min.css"
      ></link>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
