import ReadingGlassesSvg from "@svg/ReadingGlasses";
import Image from "next/image";
import Link from "next/link";
import React, { KeyboardEvent, useRef, useState } from "react";
import emptyImg from "@images/empty.jpg";
import { server } from "@lib/common";
import { Book } from "@prisma/client";
import { cls } from "@lib/client/common";

export default function Search() {
  const [keyword, setKeyword] = useState<string>("");
  const [bookList, setBookList] = useState<Book[]>();
  const [active, setActive] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchListBoxRef = useRef<HTMLInputElement>(null);

  const searchHandler = () => {
    search();
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const search = async () => {
    const bookList = await fetch(`${server}/api/db/getBookListForTitle`, {
      method: "POST",
      body: JSON.stringify({ keyword }),
    }).then((res) => res.json());

    setBookList(bookList.data);
    setActive(true);
  };

  return (
    <div className="flex flex-col items-end group" ref={searchListBoxRef}>
      <div className="relative">
        <div className="cursor-pointer" onClick={searchHandler}>
          <ReadingGlassesSvg />
        </div>
        <input
          ref={inputRef}
          type={"text"}
          value={keyword}
          maxLength={50}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={keyDownHandler}
          className="bg-gray-200 h-full pl-8 py-2 shadow-sm rounded-lg w-[220px] outline-none focus:ring-offset-1 focus:ring-2 focus:ring-blue-500 group-focus-within:w-[300px] duration-150 ease-in"
        />
      </div>
      <div
        className={
          "absolute top-[95px] flex-col z-10 max-h-[380px] overflow-y-scroll w-[300px] space-y-3 bg-slate-50 rounded-md shadow-md px-1 transition delay-50 duration-100 ease-in-out group-focus-within:flex hidden"
        }
      >
        {bookList === undefined || bookList?.length <= 0 ? (
          <div>검색결과 없음</div>
        ) : (
          bookList.map((book) => {
            return (
              <Link key={book.isbn} href={`/bookInfo/${book.isbn}`}>
                <a
                  className="hover:bg-slate-200 flex"
                  onClick={() => {
                    setKeyword("");
                    setActive(false);
                    inputRef.current?.blur();
                    searchListBoxRef.current?.blur();
                  }}
                >
                  <div className="w-[80px] h-[110px] rounded-sm overflow-hidden mr-1">
                    <Image
                      src={book.imagePath ?? emptyImg}
                      alt={book.title}
                      width={80}
                      height={110}
                    />
                  </div>
                  <div className="flex flex-col items-center flex-1 justify-center w-full overflow-x-hidden">
                    <div className="text-gray-800 font-bold w-full max-h-[50px] overflow-hidden whitespace-nowrap overflow-ellipsis break-all">
                      {book.title}
                    </div>
                  </div>
                </a>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
