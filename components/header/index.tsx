import React, { useContext } from "react";
import Link from "next/link";
import Menu from "@components/menu";
import { Container, ContentsContainer } from "styles/common";
import { GlobalContext } from "pages/_app";

const Header = () => {
  const { userInfo } = useContext(GlobalContext);

  return (
    <>
      <Container className="text-gray-500 font-extrabold text-sm border-b-2">
        <ContentsContainer className="flex justify-end">
          <div className="space-x-3">
            <Link href={"/signup"}>
              <a>회원가입</a>
            </Link>
            <span className="text-gray-300">|</span>
            {userInfo?.id ? (
              <Link href={"/api/login/logout"}>로그아웃</Link>
            ) : (
              <Link href={"/login"}>로그인</Link>
            )}
          </div>
        </ContentsContainer>
      </Container>
      <Menu />
    </>
  );
};

export default Header;
