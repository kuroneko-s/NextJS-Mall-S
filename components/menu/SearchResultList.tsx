import React from "react";
import { SearchResultListProps } from "./interface";
import Link from "next/link";
import Image from "next/image";
import emptyImg from "@images/empty.jpg";

export default function SearchResultList({
  bookList,
  resultClicedHandler,
}: SearchResultListProps) {
  return (
    <>
      {bookList.map((book) => {
        return (
          <Link key={book.isbn} href={`/bookInfo/${book.isbn}`}>
            <a
              className="hover:bg-slate-200 flex"
              onClick={resultClicedHandler}
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
      })}
    </>
  );
}
