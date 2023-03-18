import { objectIsEmpty } from "@lib/common";
import { getIronSession } from "iron-session";
import { SWRConfig } from "swr";
import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Recommendation from "components/index/Recommendation";
import Event from "components/index/Event";
import { cls } from "@lib/client/common";

const Home: NextPage = () => {
  const [swapping, setSwapping] = useState<"recommendation" | "event">(
    "recommendation"
  );

  return (
    <div className="px-16">
      <div className="max-w-[1280px] mx-auto">
        <Head>
          <title>도서 | 흑우냥이</title>
          {/* <meta /> */}
        </Head>

        <div className="flex space-x-3 mb-5">
          <button
            className={cls(
              "font-bold text-base px-3 py-1",
              swapping === "recommendation"
                ? "bg-blue-400 text-white rounded-lg"
                : ""
            )}
            type="button"
            onClick={() => setSwapping("recommendation")}
          >
            도서
          </button>
          <button
            className={cls(
              "font-bold text-base px-3 py-1",
              swapping === "event" ? "bg-blue-400 text-white rounded-lg" : ""
            )}
            type="button"
            onClick={() => setSwapping("event")}
          >
            기획전
          </button>
        </div>

        {swapping === "recommendation" ? <Recommendation /> : <Event />}
      </div>
    </div>
  );
};

export default function Page({ defaultUser }: any) {
  console.log("SWR");
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/user/info": {
            user: {
              ...defaultUser,
              ok: true,
            },
            isLoading: false,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
}

export async function getServerSideProps({ req, res }: any) {
  console.log("SSR RUn");
  const cookieOptions = {
    cookieName: "shop-user-info",
    password: process.env.IRON_PASSWORD!, // complex_password_at_least_32_characters_long
  };

  const result = await getIronSession(req, res, cookieOptions);

  let defaultUser = {};

  if (!objectIsEmpty(result)) {
    defaultUser = {
      id: result?.user?.id,
      name: result?.user?.name,
    };
  }

  return {
    props: {
      defaultUser,
    },
  };
}
