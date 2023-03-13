import Link from "next/link";
import React from "react";

export default function Header1() {
  return (
    <div className="px-16 py-2 text-gray-500 font-bold text-base flex justify-between border-b-2">
      <div className="flex space-x-3">
        <Link href={"/webtoon"}>웹툰/만화</Link>
        <p className="opacity-20 text-gray-500">•</p>
        <Link href={"/websosur"}>웹소설</Link>
        <p className="opacity-20 text-gray-500">•</p>
        <Link href={"/books"}>
          <a className="text-gray-800">도서</a>
        </Link>
        <p className="opacity-20 text-gray-500">•</p>
        <Link href={"/select"}>셀렉트</Link>
      </div>
      <div>
        <Link href={"/charge"}>캐시충전</Link>
      </div>
    </div>
  );
}
