import useUser from "@lib/client/useUser";
import { objectIsEmpty } from "@lib/common";
import { getIronSession } from "iron-session";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { SWRConfig } from "swr";

const Home: NextPage = () => {
  console.log("index component");
  const { user, isLoading, error, mutate } = useUser();

  return (
    <div>
      <h1>Hello</h1>

      {!isLoading && user && user?.ok ? (
        <p>user: {user?.data?.name}</p>
      ) : (
        <p>you need Login</p>
      )}

      <div>
        품목 리스트
        <ul>
          <li>품목1</li>
          <li>품목2</li>
          <li>품목3</li>
          <li>품목4</li>
          <li>품목5</li>
        </ul>
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
