import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NotFound: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("Default Error Message");
  const router = useRouter();

  useEffect(() => {
    const split = router.asPath?.split("=");

    if (split.length >= 2) {
      setErrorMessage(split[1]);
    }
  }, [router]);

  return (
    <div>
      <h1>Error page</h1>
      <p>{errorMessage}</p>

      <Link href={"/"}>
        <a>
          <button type="button">메인화면</button>
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
