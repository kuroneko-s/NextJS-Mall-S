import HamburgerSvg from "@components/atoms/svg/Hamburger";
import React from "react";
import { Container, SvgContainer } from "styles/common";

export default function SubMenu() {
  return (
    <Container className="border-b-2 font-extrabold">
      <SvgContainer className="flex justify-between">
        <p className="text-2xl text-blue-500 pointer-events-none">도서</p>
        <div className="flex space-x-2 items-center">
          <HamburgerSvg />
          <p className="text-base whitespace-nowrap">전체 카테고리</p>
        </div>
      </SvgContainer>
    </Container>
  );
}
