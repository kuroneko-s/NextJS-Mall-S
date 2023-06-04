import CartSvg from "@components/atoms/svg/Cart";
import HomeSvg from "@components/atoms/svg/Home";
import Link from "next/link";
import React from "react";
import { Container, ContentsContainer } from "styles/common";

export default function ServiceCenter() {
  return (
    <Container>
      <ContentsContainer className="min-h-[65vh] mt-12 flex items-start justify-center">
        <div className="flex flex-col items-center py-20 w-full rounded-md shadow-sm">
          <h1 className="font-extrabold text-gray-700 text-2xl mb-12">
            공지사항은 준비중입니다.
          </h1>
          <Link href="/">
            <a className="flex items-center w-[217px] text-2lg hover:bg-blue-400 hover:text-white hover:fill-white rounded-md py-4 px-9 mb-2">
              <HomeSvg />
              <span className="ml-2">홈 화면</span>
            </a>
          </Link>
        </div>
      </ContentsContainer>
    </Container>
  );
}
