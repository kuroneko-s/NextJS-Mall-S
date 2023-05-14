import Link from "next/link";
import React from "react";
import { Container, ContentsContainer } from "styles/common";

export default function SignUpSuccess() {
  return (
    <Container>
      <ContentsContainer className="min-h-[62vh] flex flex-col items-center">
        <h1 className="font-semibold text-2xl my-4">회원가입 완료!</h1>
        <div className="flex flex-col justify-center items-start w-1/5">
          <Link href={"/"}>
            <a className="bg-blue-500 py-2 w-full text-center font-bold text-lg hover:bg-blue-600 text-gray-50 rounded-md shadow-md mb-4">
              <button type="button">메인화면으로</button>
            </a>
          </Link>
          <Link href={"/login"}>
            <a className="bg-blue-500 py-2 w-full text-center font-bold text-lg hover:bg-blue-600 text-gray-50 rounded-md shadow-md">
              <button type="button">로그인 화면으로</button>
            </a>
          </Link>
        </div>
      </ContentsContainer>
    </Container>
  );
}
