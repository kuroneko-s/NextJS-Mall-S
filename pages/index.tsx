import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Recommendation from "@components/main/recommendation";
import Event from "@components/main/event";
import { cls } from "@lib/client/common";
import { Container, ContentsContainer } from "styles/common";

const Home: NextPage = () => {
  const [swapping, setSwapping] = useState<"recommendation" | "event">(
    "recommendation"
  );

  return (
    <Container>
      <Head>
        <title>도서 | 흑우냥이</title>
        {/* <meta /> */}
      </Head>
      <ContentsContainer>
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
      </ContentsContainer>
    </Container>
  );
};

export default Home;

/* export default function Page({ defaultUser }: any) {
  console.log("🚀 ~ file: index.tsx:56 ~ Page ~ defaultUser:", defaultUser);
  console.log("SWR");

  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/user/info": {
            ok: true,
            user: {
              id: defaultUser?.id ?? "",
              name: defaultUser?.name ?? "",
              role: defaultUser?.rule ?? "USER",
            },
            isLoading: false,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
} */

/* export async function getServerSideProps({ req, res }: any) {
  console.log("SSR");

  const cookieOptions = {
    cookieName: "shop-user-info",
    password: process.env.IRON_PASSWORD!, // complex_password_at_least_32_characters_long
  };

  const result = await getIronSession(req, res, cookieOptions);
  console.log("🚀 ~ file: index.tsx:84 ~ getServerSideProps ~ result:", result);

  let defaultUser = {};

  if (!objectIsEmpty(result)) {
    defaultUser = {
      id: result?.user?.id,
      name: result?.user?.name,
      rule: result?.user?.role,
    };
  }

  return {
    props: {
      defaultUser,
    },
  };
} */
