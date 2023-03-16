import Link from "next/link";
import React from "react";

export default function Header1() {
  return (
    <div className="px-16 py-2 text-gray-500 font-extrabold text-sm border-b-2">
      <div className="max-w-[1280px] mx-auto flex justify-between">
        <div className="flex space-x-3">
          <Link href={"/webtoon"}>
            <a className="hover:opacity-70">웹툰/만화</a>
          </Link>
          <p className="opacity-20 text-gray-500">•</p>
          <Link href={"/websosur"}>
            <a className="hover:opacity-70">웹소설</a>
          </Link>
          <p className="opacity-20 text-gray-500">•</p>
          <Link href={"/books"}>
            <a className="text-gray-800">도서</a>
          </Link>
          <p className="opacity-20 text-gray-500">•</p>
          <Link href={"/select"}>
            <a className="hover:opacity-70">셀렉트</a>
          </Link>
        </div>
        <div>
          <Link href={"/charge"}>캐시충전</Link>
        </div>
      </div>
    </div>
  );
}
