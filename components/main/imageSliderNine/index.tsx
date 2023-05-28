import React, { useEffect, useRef, useState } from "react";
import { ArrowButton } from "./index.style";
import Image from "next/image";
import Link from "next/link";
import StarSvg from "@svg/Star";
import { BookWithWriter } from "@lib/interface/db";
import emptyImg from "@images/empty.jpg";
import RightCaretArrowSvg from "@svg/RightCaretArrow";
import LeftCaretArrowSvg from "@svg/LeftCaretArrow";

interface ImageSliderNineProps {
  list: BookWithWriter[];
}

export default function ImageSliderNine({ list }: ImageSliderNineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isFirst, setIsFirst] = useState<boolean>(true);
  const leftArrowHandler = () => {
    setIsFirst((cur) => !cur);
  };

  const rightArrowHandler = () => {
    setIsFirst((cur) => !cur);
  };

  return (
    <div
      className="relative w-full mb-6 overflow-hidden min-w-[1280px]"
      ref={containerRef}
    >
      <div>
        <p className="font-bold text-2xl mb-4">지금 많이 읽고 있는 작품</p>
      </div>
      <div className="relative h-[480px]">
        <div
          className="absolute flex w-[200%] transition-all duration-500 ease-in-out"
          style={{
            left: isFirst ? "0px" : "-1280px",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((_, idx) => {
            idx *= 3;
            return (
              <div key={idx} className="space-y-2 w-full">
                {[idx, idx + 1, idx + 2].map((v, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <Link href={`/bookInfo/${list[v].isbn}`}>
                        <a>
                          <Image
                            src={list[v].imagePath ?? emptyImg}
                            alt={list[v].title}
                            width={110}
                            height={140}
                          />
                        </a>
                      </Link>

                      <p className="flex-grow-[0.5] text-center">{v + 1}</p>
                      <div className="flex-grow text-start">
                        <Link href={`/bookInfo/${list[v].isbn}`}>
                          <a className="text-gray-800 font-bold">
                            <p>{list[v].title}</p>
                          </a>
                        </Link>
                        <Link href={`/writer/${list[v].writerId}`}>
                          <a className="text-gray-500 hover:text-gray-400">
                            <p>{list[v].writer.name}</p>
                          </a>
                        </Link>
                        <div className="flex items-center space-x-1 text-gray-500 text-xs">
                          <StarSvg
                            fill={list[v].score !== "0" ? "red" : "none"}
                            stroke={list[v].score !== "0" ? "red" : "gray"}
                          />
                          <p>{list[v].score}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
