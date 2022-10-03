import useUser from "@lib/client/useUser";
import { objectIsEmpty } from "@lib/common";
import { getIronSession } from "iron-session";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { Suspense } from "react";

const Home: NextPage = ({ defaultUser }: any) => {
  const { user, isLoading, error } = useUser();

  // console.log("defaultUser - ", defaultUser);
  // console.log("user - ", user);
  // console.log("error - ", error);

  return (
    <div>
      <h1>Hello</h1>

      {/* Suspense가 동작을 안함. 이유를 모르겟음 */}
      <Suspense fallback={<p>user: {defaultUser.name}</p>}>
        {!isLoading && user?.ok ? (
          <p>user: {user?.data?.name}</p>
        ) : (
          <p>you need Login</p>
        )}
      </Suspense>

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

export async function getServerSideProps({ req, res }: any) {
  const cookieOptions = {
    cookieName: "shop-user-info",
    password: process.env.IRON_PASSWORD!, // complex_password_at_least_32_characters_long
  };

  const result = await getIronSession(req, res, cookieOptions);

  let defaultUser = {};

  if (!objectIsEmpty(result)) {
    defaultUser = {
      id: result?.user?.id,
      name: result?.user?.name?.nickname,
    };
  }

  return {
    props: {
      defaultUser: defaultUser,
    },
  };
}

export default Home;
