import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { createContext } from "react";
import useBaskets, { UseItems } from "@lib/useItems";
import Layout from "@components/layout";
import Header from "@components/header";
import Footer from "@components/footer";

export const GlobalContext = createContext<UseItems>({});

function MyApp({ Component, pageProps }: AppProps) {
  const [baskets, appendItems, removeItem, removeAll] = useBaskets();

  return (
    <GlobalContext.Provider
      value={{
        baskets,
        appendItems,
        removeItem,
        removeAll,
      }}
    >
      <SWRConfig
        value={{
          refreshInterval: 15000,
          fetcher: (url: any) => fetch(url).then((response) => response.json()),
        }}
      >
        <Layout>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </SWRConfig>
    </GlobalContext.Provider>
  );
}

export default MyApp;
