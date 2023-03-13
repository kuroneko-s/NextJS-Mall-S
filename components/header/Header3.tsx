import React from "react";

export default function Header3() {
  return (
    <div className="px-16 py-4 flex justify-between border-b-2 font-extrabold">
      <p className="text-2xl text-blue-500 pointer-events-none">도서</p>
      <div className="flex space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <p className="text-base">전체 카테고리</p>
      </div>
    </div>
  );
}
