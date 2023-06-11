import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { createContext, useEffect, useState } from "react";
import useGlobalStore from "@lib/contextApi";
import { getIronSession } from "iron-session";
import { objectIsEmpty } from "@lib/common";
import { User } from "@prisma/client";
import useSocket from "@lib/hooks/useSocket";
import { ContextApiProps } from "@lib/interface/store";
import Layout from "@components/templates/layout";
import Header from "@components/templates/header";
import Footer from "@components/templates/footer";
import { NextPageContext } from "next";

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

/**
 * _app.tsx에서 getInitialProps를 사용하면 전역 SSR로 동작된다.
 * 그렇게되면 Automatic Static Optimization이 동작하지 않게된다. (SSR이 없으면 nestJS에서 자동으로 최적화해서 페이지를 HTML로 만들어주는 기능)
 * 그래서 nestJS 9.3버전 이후에는 getInitialProps가 아닌 getStaticProps / getServerSideProps를 사용하도록 SSR/SSG를 분리해줬다.
 * 그래서 전역적인 데이터 패치 기능을 지원하지 않게 됬다.
 * NestJS 9.3버전 이후로는 추천하지 않는 방법
 */
// @ts-ignore
MyApp.getInitialProps = async ({ ctx: { req, res } }: NextPageContext) => {
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

  return { pageProps: loginUser };
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
