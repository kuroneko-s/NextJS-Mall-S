import type { NextPage } from "next";
import { useState } from "react";
import IndexPresentation from "./index.presentation";

// Presentation & Container Pattern
// Container Component
const Home: NextPage = () => {
  const [swapping, setSwapping] = useState<"recommendation" | "event">(
    "recommendation"
  );

  return <IndexPresentation setSwapping={setSwapping} swapping={swapping} />;
};

export default Home;

/* export default function Page({ defaultUser }: any) {
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
