import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import kakaoLoginImage from "@images/kakao_login.png";
import naverLoginImage from "@images/naver_login.png";
import { useRef, useContext } from "react";
import { GlobalContext } from "pages/_app";

const Login: NextPage = () => {
  const { userInfo } = useContext(GlobalContext);
  console.log("🚀 ~ file: index.tsx:15 ~ userInfo:", userInfo);

  const stateToken = useRef<string>(`(
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2)
  ).substring(2, 34)`);

  const naverRedirectUrl = process.env.NAVER_REDIRECT_URL!;
  const encodeUri = encodeURI(naverRedirectUrl);

  const kakaoUrl = useRef<string>(
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}`
  );
  const naverUrl = useRef<string>(
    `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NAVER_CLIENT_ID}&response_type=code&redirect_uri=${encodeUri}&state=${stateToken.current}`
  );

  return (
    <div>
      <h1>Login</h1>
      {userInfo?.name !== undefined ? (
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
          <Link href={kakaoUrl.current}>
            <a style={{ marginRight: "5px" }}>
              <Image
                src={kakaoLoginImage}
                quality="100"
                alt="kakaoLoginImage"
                placeholder="blur"
              />
            </a>
          </Link>

          <Link href={naverUrl.current}>
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

export default Login;
