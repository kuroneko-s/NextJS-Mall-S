import React from "react";
import Link from "next/link";
import Menu from "@components/menu";
import { Container, ContentsContainer } from "styles/common";

interface HeaderProp {
  [key: string]: any;
}

const Header = (pageProps: HeaderProp) => {
  console.log("🚀 ~ file: index.tsx:11 ~ Header ~ pageProps:", pageProps);
  const {
    loginUser: { id, name },
  } = pageProps;

  return (
    <>
      <Container className="text-gray-500 font-extrabold text-sm border-b-2">
        <ContentsContainer className="flex justify-end">
          <div className="space-x-3">
            <Link href={"/signup"}>
              <a>회원가입</a>
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href={{
                pathname: "/login",
                query: { id, name },
              }}
              replace
            >
              로그인
            </Link>
          </div>
        </ContentsContainer>
      </Container>
      <Menu />
    </>
  );
};

export default Header;
