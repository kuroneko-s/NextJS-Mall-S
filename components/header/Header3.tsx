import HamburgerSvg from "@components/svg/Hamburger";
import React from "react";

export default function Header3() {
  return (
    <div className="px-16 py-4 border-b-2 font-extrabold">
      <div className="max-w-[1280px] mx-auto flex justify-between">
        <p className="text-2xl text-blue-500 pointer-events-none">도서</p>
        <div className="flex space-x-2">
          <HamburgerSvg />
          <p className="text-base">전체 카테고리</p>
        </div>
      </div>
    </div>
  );
}
