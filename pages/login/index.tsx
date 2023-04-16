import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import kakaoLoginImage from "@images/kakao_login.png";
import naverLoginImage from "@images/naver_login.png";
import { useRef, useContext } from "react";
import { GlobalContext } from "pages/_app";
import { Container, ContentsContainer } from "styles/common";

const Login: NextPage = () => {
  const { userInfo } = useContext(GlobalContext);

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
    <Container>
      <ContentsContainer className="min-h-[71vh] flex items-center justify-center">
        {userInfo?.name !== undefined ? (
          <div>
            <p className="font-extrabold text-[50px] text-center">
              이미 로그인되어 있음
            </p>
            <div className="flex flex-col w-60 mx-auto">
              <Link href={"/"}>
                <a className="text-center mb-2 bg-blue-500 hover:bg-blue-400 text-gray-200 font-bold text-2xl py-2 px-12 rounded-md">
                  Home
                </a>
              </Link>
              <Link href={"/api/login/logout"}>
                <a className="text-center mb-2 bg-red-400 hover:bg-red-300 text-gray-200 font-bold text-2xl py-2 px-12 rounded-md">
                  logout
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-extrabold text-[70px] text-center my-6 text-blue-500">
              로그인
            </p>
            <div className="flex flex-col justify-center items-center">
              <Link href={kakaoUrl.current}>
                <a className="mb-2">
                  <Image
                    src={kakaoLoginImage}
                    quality="100"
                    alt="kakaoLoginImage"
                    placeholder="blur"
                    width={420}
                    height={100}
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
                    width={420}
                    height={100}
                  />
                </a>
              </Link>
            </div>
          </div>
        )}
      </ContentsContainer>
    </Container>
  );
};

export default Login;
