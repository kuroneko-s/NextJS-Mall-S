import { BookWithWriter } from "@lib/interface/db";
import StarSvg from "@svg/Star";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SliderOfSixProps {
  bookList: BookWithWriter[];
  title?: string;
}

export default function SliderOfSix({
  bookList,
  title = "신간 서적",
}: SliderOfSixProps) {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between ">
        <p className="font-bold text-2xl mb-4">{title}</p>
      </div>
      <div className="flex space-x-4 w-full h-full">
        {bookList.slice(0, 6).map((bookInfo, idx) => {
          return (
            <div className="w-full" key={idx}>
              <Link href={`/bookInfo/${bookInfo.isbn}`}>
                <a>
                  <Image
                    src={bookInfo.imagePath}
                    alt={bookInfo.title}
                    height={260}
                    width={200}
                  />
                </a>
              </Link>
              <Link href={`/bookInfo/${bookInfo.isbn}`}>
                <a className="text-gray-800 font-bold">
                  <p>{bookInfo.title}</p>
                </a>
              </Link>
              <Link href={`/writer/${bookInfo.writerId}`}>
                <a className="text-gray-500 hover:text-gray-400">
                  <p>{bookInfo.writer.name}</p>
                </a>
              </Link>
              <div className="flex items-center space-x-1 text-gray-500 text-xs">
                <StarSvg
                  fill={bookInfo.score !== "0" ? "red" : "none"}
                  stroke={bookInfo.score !== "0" ? "red" : "gray"}
                />
                <p>{bookInfo.score}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
