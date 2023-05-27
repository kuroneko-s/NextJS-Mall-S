import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { createContext, useEffect, useState } from "react";
import useBaskets, { ContextApiProps } from "@lib/contextApi";
import Layout from "@components/layout";
import Header from "@components/header";
import Footer from "@components/footer";
import { getIronSession } from "iron-session";
import { objectIsEmpty } from "@lib/common";
import App from "next/app";
import { User } from "@prisma/client";

export const GlobalContext = createContext<ContextApiProps>({});

function MyApp({ Component, pageProps }: AppProps) {
  const [baskets, appendItems, removeItem, removeAll] = useBaskets();
  const [userInfo, setUserInfo] = useState<User>();

  useEffect(() => {
    setUserInfo((cur) =>
      // @ts-ignore
      pageProps?.loginUser !== undefined ? pageProps?.loginUser : cur
    );
  }, []);

  const postFetcher = (url: string) =>
    fetch(url, { method: "POST" }).then((res) => res.json());

  // SWR get 요청 sample
  /* const getFetcher = (url: string) =>
    fetch(url, { method: "GET" }).then((res) => res.json()); */

  /* const { data } = useSWR(
    "https://jsonplaceholder.typicode.com/todos/1",
    getFetcher
  ); */

  return (
    <GlobalContext.Provider
      value={{
        baskets,
        appendBooks: appendItems,
        removeBook: removeItem,
        removeAll,
        userInfo,
      }}
    >
      <SWRConfig
        value={{
          refreshInterval: 15000,
          fetcher: postFetcher,
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

// life cycle (제일 먼저 실행됨.)
MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  const {
    ctx: { req, res },
  } = appContext;

  // Session 값 가져오기. (SSR)
  const cookieOptions = {
    cookieName: "shop-user-info",
    password: process.env.IRON_PASSWORD!, // complex_password_at_least_32_characters_long
  };

  let loginUser = {};

  if (req !== undefined && res !== undefined) {
    const result = await getIronSession(req, res, cookieOptions);

    if (!objectIsEmpty(result)) {
      loginUser = {
        id: result?.user?.id,
        name: result?.user?.name,
        rule: result?.user?.role,
      };
    }
  }

  return { ...appProps, pageProps: { ...appProps.pageProps, loginUser } };
};

// Session 값 가져오기. (SSR)
/* export async function getServerSideProps({ req, res }: any) {
  const cookieOptions = {
    cookieName: "shop-user-info",
    password: process.env.IRON_PASSWORD!, // complex_password_at_least_32_characters_long
  };

  const result = await getIronSession(req, res, cookieOptions);
  let loginUser = {};
  console.log("RUN");

  if (!objectIsEmpty(result)) {
    console.log("RUN");
    loginUser = {
      id: result?.user?.id,
      name: result?.user?.name,
    };
  }

  return {
    props: {
      loginUser,
    },
  };
} */

export default MyApp;
