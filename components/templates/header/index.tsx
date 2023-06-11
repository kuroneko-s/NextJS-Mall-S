import React, { useContext } from "react";
import { Container, ContentsContainer } from "styles/common";
import { GlobalContext } from "pages/_app";
import LinkedText from "@components/atoms/LinkedText";
import Menu from "../menu";
import { getIronSession } from "iron-session";
import { objectIsEmpty } from "@lib/common";

const Header = (props: any) => {
  console.log("🚀 ~ file: index.tsx:10 ~ Header ~ prosp:", props);
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

export async function getServerSideProps({ req, res }: any) {
  const cookieOptions = {
    cookieName: "shop-user-info",
    password: process.env.IRON_PASSWORD!, // complex_password_at_least_32_characters_long
  };

  const result = await getIronSession(req, res, cookieOptions);
  let loginUser = {};
  console.log("RUN");

  if (!objectIsEmpty(result)) {
    console.log("RUN");
    loginUser = {
      id: result?.user?.id,
      name: result?.user?.name,
    };
  }

  return {
    props: {
      loginUser,
    },
  };
}

export default Header;
