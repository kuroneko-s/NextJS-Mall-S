import Link from "next/link";
import React from "react";

export default function Header1() {
  return (
    <div className="px-16 py-2 text-gray-500 font-extrabold text-sm border-b-2">
      <div className="max-w-[1280px] mx-auto flex justify-between">
        <div className="flex"></div>
        <div className="space-x-3">
          <Link href={"/charge"}>
            <a className=" select-none pointer-events-none">캐시충전</a>
          </Link>
          <span className="text-gray-300">|</span>
          <Link href={"/signup"}>회원가입</Link>
        </div>
      </div>
    </div>
  );
}
