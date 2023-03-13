import React from "react";

export default function Header1() {
  return (
    <div className="px-16 py-2 text-gray-500 font-bold text-base flex justify-between border-b-2">
      <div className="flex space-x-3">
        <p>웹툰/만화</p>
        <p className="opacity-20 text-gray-500">•</p>
        <p>웹소설</p>
        <p className="opacity-20 text-gray-500">•</p>
        <p className="text-gray-800">도서</p>
        <p className="opacity-20 text-gray-500">•</p>
        <p>셀렉트</p>
      </div>
      <div>
        <p>캐시충전</p>
      </div>
    </div>
  );
}
