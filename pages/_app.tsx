import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { createContext, useEffect, useState } from "react";
import useGlobalStore from "@lib/contextApi";
import { getIronSession } from "iron-session";
import { objectIsEmpty } from "@lib/common";
import App from "next/app";
import { User } from "@prisma/client";
import useSocket from "@lib/hooks/useSocket";
import { ContextApiProps } from "@lib/interface/store";
import Layout from "@components/templates/layout";
import Header from "@components/templates/header";
import Footer from "@components/templates/footer";

// contextAPI Store
export const GlobalContext = createContext<ContextApiProps>({});

function MyApp({ Component, pageProps }: AppProps) {
  // contextAPI Fn File
  const [
    baskets,
    appendItems,
    removeItem,
    removeItemsAll,
    websocket,
    setWebSocket,
  ] = useGlobalStore();
  const [userInfo, setUserInfo] = useState<User>();

  // connect socket
  useSocket();

  useEffect(() => {
    setUserInfo((cur) =>
      // @ts-ignore
      pageProps?.loginUser !== undefined ? pageProps?.loginUser : cur
    );

    // 구독
    /* socket.on("with-binary", (message: any) => {
      console.log("receive - ", message);
    });

    setTimeout(() => {
      fetch("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: "rwqrwqr" }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
        });
    }, 3000); */
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
        items: baskets,
        appendItems,
        removeItem,
        removeItemsAll,
        user: userInfo,
        websocket,
        setWebSocket,
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
        role: result?.user?.role,
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
