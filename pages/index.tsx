import useUser from "@lib/client/useUser";
import { COOKIE_NAME, objectIsEmpty } from "@lib/common";
import { getIronSession } from "iron-session";
import Link from "next/link";
import { SWRConfig } from "swr";
import type { NextPage } from "next";
import Item from "components/Item";
import useItem from "@lib/itemSample";
import CookiesProvider from "react-cookie/cjs/CookiesProvider";
import { appendCookie, removeCookieAll } from "@lib/cookies";

const Home: NextPage = () => {
  console.log("index component");
  const { user, isLoading, error, mutate } = useUser();
  const itemArr = useItem();

  var date = new Date();
  date.setDate(date.getDate() + 1);

  return (
    <div>
      <h1>Hello</h1>
      <div>
        <button
          type="button"
          onClick={() => {
            removeCookieAll(COOKIE_NAME);
          }}
        >
          REMOVE_COOKIE_ALL
        </button>
      </div>
      <div>
        <Link href={"/buy"}>
          <a>
            <button>구매</button>
          </a>
        </Link>
      </div>

      {!isLoading && user && user?.ok ? (
        <p>user: {user?.data?.name}</p>
      ) : (
        <p>you need Login</p>
      )}

      <h1>품목 리스트</h1>
      <div>
        {itemArr &&
          itemArr.map((item, i) => (
            <Item
              key={item.id}
              index={i}
              item={item}
              btnHandler={() =>
                appendCookie({
                  cookieName: COOKIE_NAME,
                  value: item.id + "",
                })
              }
            />
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
