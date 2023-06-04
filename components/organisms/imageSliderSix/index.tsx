import { BookWithWriter } from "@lib/interface/db";
import LeftCaretArrowSvg from "@svg/LeftCaretArrow";
import RightCaretArrowSvg from "@svg/RightCaretArrow";
import StarSvg from "@svg/Star";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ArrowButton } from "./index.style";
import { SliderOfSixProps } from "./interface";

export default function ImageSliderSix({ bookList, title }: SliderOfSixProps) {
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const leftArrowHandler = () => {
    setIsFirst((cur) => !cur);
  };

  const rightArrowHandler = () => {
    setIsFirst((cur) => !cur);
  };

  return (
    <div className="mb-6 relative overflow-hidden min-w-[1280px]">
      <div className="flex justify-between ">
        <p className="font-bold text-2xl mb-4">{title}</p>
      </div>
      <div className="relative w-full h-[330px]">
        <div
          className="absolute top-0 flex space-x-4 w-[200%] h-full transition-all duration-500 ease-in-out"
          style={{
            left: isFirst ? "0px" : "-1288px",
          }}
        >
          {bookList.slice(0, 12).map((bookInfo, idx) => {
            return (
              <Link key={idx} href={`/bookInfo/${bookInfo.isbn}`}>
                <a className="hover:bg-slate-100 rounded-md">
                  <div className="h-[260px] w-[200px] overflow-hidden rounded-md">
                    <Image
                      src={bookInfo.imagePath}
                      alt={bookInfo.title}
                      height={260}
                      width={200}
                    />
                  </div>
                  <p className="text-gray-800 font-bold">{bookInfo.title}</p>
                  <Link href={`/writer/${bookInfo.writerId}`}>
                    <a className="text-gray-600 hover:text-gray-400">
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
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      {isFirst ? (
        <ArrowButton isLeft={false} onClick={rightArrowHandler}>
          <RightCaretArrowSvg />
        </ArrowButton>
      ) : (
        <ArrowButton isLeft={true} onClick={leftArrowHandler}>
          <LeftCaretArrowSvg />
        </ArrowButton>
      )}
    </div>
  );
}
