import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import kakaoLoginImage from "../images/kakao_login.png";
import naverLoginImage from "../images/naver_login.png";
import { useState, useEffect } from "react";
import { getIronSession } from "iron-session";
import { objectIsEmpty } from "@lib/common";

const Login: NextPage = ({ defaultUser }: any) => {
  const [kakaoUrl, setKakaoUrl] = useState("");
  const [naverUrl, setNaverUrl] = useState("");

  useEffect(() => {
    console.log(defaultUser);
    setKakaoUrl(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}`
    );

    const stateToken = (
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2)
    ).substring(2, 34);

    const naverRedirectUrl = process.env.NAVER_REDIRECT_URL!;
    const encodeUri = encodeURI(naverRedirectUrl);

    setNaverUrl(
      `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NAVER_CLIENT_ID}&response_type=code&redirect_uri=${encodeUri}&state=${stateToken}`
    );
  }, []);

  return (
    <div>
      <h1>Login</h1>
      {defaultUser?.name ? (
        <div>
          <p>이미 로그인되어 있음</p>
          <Link href={"/"}>
            <a style={{ marginRight: "5px" }}>
              <button type="button">Home</button>
            </a>
          </Link>
          <Link href={"/api/login/logout"}>
            <a>
              <button type="button">logout</button>
            </a>
          </Link>
        </div>
      ) : (
        <>
          <Link href={kakaoUrl}>
            <a style={{ marginRight: "5px" }}>
              <Image
                src={kakaoLoginImage}
                quality="100"
                alt="kakaoLoginImage"
                placeholder="blur"
              />
            </a>
          </Link>

          <Link href={naverUrl}>
            <a>
              <Image
                src={naverLoginImage}
                quality="100"
                alt="naverLoginImage"
                placeholder="blur"
                width={183}
                height={45}
              />
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

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

export default Login;
