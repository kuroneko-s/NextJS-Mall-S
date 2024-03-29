import React, { useContext } from "react";
import { Container, ContentsContainer } from "styles/common";
import { GlobalContext } from "pages/_app";
import LinkedText from "@components/atoms/LinkedText";
import Menu from "../menu";

const Header = () => {
  const { user } = useContext(GlobalContext);

  return (
    <>
      <Container className="font-extrabold border-b-2">
        <ContentsContainer className="flex justify-end">
          <div className="space-x-2">
            {user?.id ? null : (
              <>
                <LinkedText url="/signup" context="회원가입" size="sm" />
                <span className="text-gray-300">|</span>
              </>
            )}

            {user?.role === "ADMIN" ? (
              <>
                <LinkedText url="/admin" context="관리자 페이지" size="sm" />
                <span className="text-gray-300">|</span>
              </>
            ) : null}

            {user?.id ? (
              <LinkedText
                url="/api/login/logout"
                context="로그아웃"
                size="sm"
              />
            ) : (
              <LinkedText url="/login" context="로그인" size="sm" />
            )}
          </div>
        </ContentsContainer>
      </Container>
      <Menu />
    </>
  );
};

export default Header;
