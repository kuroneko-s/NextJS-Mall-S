import ReadingGlassesSvg from "@svg/ReadingGlasses";
import React, { KeyboardEvent, useRef, useState } from "react";
import { server } from "@lib/common";
import { Book } from "@prisma/client";
import SearchResultList from "./SearchResultList";

export default function Search() {
  const [keyword, setKeyword] = useState<string>("");
  const [bookList, setBookList] = useState<Book[]>();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchListHeight = useRef<number>(350);
  const currentPage = useRef<number>(1);
  const isLoading = useRef<boolean>(false);
  const searchBookListTotalCnt = useRef<number>(0);

  const searchHandler = () => {
    inputRef.current?.focus();
    search();
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const search = async () => {
    const _bookList = await fetch(`${server}/api/db/getBookListForTitle`, {
      method: "POST",
      body: JSON.stringify({ keyword, currentPage: currentPage.current }),
    }).then((res) => res.json());
    searchBookListTotalCnt.current = _bookList.count ?? 0;

    setBookList((cur) => {
      const result = [...(cur ?? []), ...(_bookList?.data ?? [])];
      searchListHeight.current =
        result.length === 0 ? 110 : result.length * 110;

      isLoading.current = false;
      return result;
    });
  };

  const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
    const now = e.currentTarget.scrollTop;
    const percent = now / searchListHeight.current;

    if (
      (bookList?.length ?? 1) < searchBookListTotalCnt.current &&
      percent >= 0.6 &&
      !isLoading.current
    ) {
      currentPage.current = currentPage.current + 1;
      isLoading.current = true;
      search();
    }
  };

  const resultClicedHandler = () => {
    setKeyword("");
    setBookList(undefined);
    inputRef.current?.blur();
    containerRef.current?.blur();
  };

  return (
    <div className="flex flex-col items-end group" ref={containerRef}>
      <div className="relative">
        <div className="cursor-pointer" onClick={searchHandler}>
          <ReadingGlassesSvg />
        </div>
        <input
          ref={inputRef}
          type={"text"}
          value={keyword}
          maxLength={50}
          onChange={(e) => {
            setKeyword(e.target.value);
            setBookList(undefined);
            currentPage.current = 1;
          }}
          onKeyDown={keyDownHandler}
          className="bg-gray-200 h-full pl-8 py-2 shadow-sm rounded-lg w-[220px] outline-none focus:ring-offset-1 focus:ring-2 focus:ring-blue-500 group-focus-within:w-[300px] delay-75 duration-150 ease-in"
        />
      </div>
      <div
        className={
          "absolute top-[95px] flex-col z-10 max-h-[380px] overflow-y-scroll w-[300px] space-y-3 bg-slate-50 rounded-md shadow-md px-1 transition delay-50 duration-100 ease-in-out group-focus-within:flex hidden"
        }
        onScroll={scrollHandler}
      >
        {bookList === undefined ? null : bookList.length <= 0 ? (
          <div>검색결과 없음</div>
        ) : (
          <SearchResultList
            bookList={bookList}
            resultClicedHandler={resultClicedHandler}
          />
        )}
      </div>
    </div>
  );
}
