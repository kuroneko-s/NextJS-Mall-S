import Link from "next/link";
import React from "react";
import { Container, ContentsContainer } from "styles/common";

export default function SignUpSuccess() {
  return (
    <Container>
      <ContentsContainer>
        <h1>회원가입 완료!</h1>
        <Link href={"/"}>
          <a>
            <button type="button">메인화면으로</button>
          </a>
        </Link>
        <Link href={"/login"}>
          <a>
            <button type="button">로그인 화면으로</button>
          </a>
        </Link>
      </ContentsContainer>
    </Container>
  );
}
