import useUser from "@lib/client/useUser";
import { objectIsEmpty } from "@lib/common";
import { getIronSession } from "iron-session";
import Link from "next/link";
import { SWRConfig } from "swr";
import type { NextPage } from "next";
import Item from "components/Item";
import { itemArr } from "./../lib/itemSample";
import CookiesProvider from "react-cookie/cjs/CookiesProvider";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { setCookie } from "@lib/cookies";
import { appendCookie } from "./../lib/cookies";

const Home: NextPage = () => {
  console.log("index component");
  const { user, isLoading, error, mutate } = useUser();

  const [cookies, _, removeCookie] = useCookies(["checked-item"]);

  var date = new Date();
  date.setDate(date.getDate() + 1);

  useEffect(() => {
    setCookie({
      cookieName: "checked-item",
      values: ["test", "values"],
      path: "*", // 적용 범위
      expires: date, // 적용 시간
    });
  }, []);

  return (
    <div>
      <h1>Hello</h1>

      {!isLoading && user && user?.ok ? (
        <p>user: {user?.data?.name}</p>
      ) : (
        <p>you need Login</p>
      )}

      <h1>품목 리스트</h1>
      <div>
        {itemArr.map((item, i) => (
          <Link key={item.id} href={`/item/${item.id}`}>
            <a>
              <Item
                index={i}
                item={item}
                btnHandler={() =>
                  appendCookie({
                    cookieName: "checked-item",
                    value: item.id + "",
                  })
                }
              />
            </a>
          </Link>
        ))}
      </div>
      <Link href={"/login"}>
        <a style={{ marginRight: "5px" }}>
          <button>Login</button>
        </a>
      </Link>
      <Link href={"/api/login/logout"}>
        <a>
          <button type="button">logout</button>
        </a>
      </Link>
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
      <CookiesProvider>
        <Home />
      </CookiesProvider>
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
