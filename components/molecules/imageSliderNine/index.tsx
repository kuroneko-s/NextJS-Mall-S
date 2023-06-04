import React, { useRef, useState } from "react";
import { ArrowButton } from "./index.style";
import Image from "next/image";
import Link from "next/link";
import StarSvg from "@components/atoms/svg/Star";
import emptyImg from "@images/empty.jpg";
import RightCaretArrowSvg from "@components/atoms/svg/RightCaretArrow";
import LeftCaretArrowSvg from "@components/atoms/svg/LeftCaretArrow";
import { ImageSliderNineProps } from "./interface";
import SimpleBookInfo from "@components/molecules/SimpleBookInfo";

export default function ImageSliderNine({ list, title }: ImageSliderNineProps) {
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
        <p className="font-bold text-2xl mb-4">{title}</p>
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
                    <SimpleBookInfo
                      key={idx}
                      isbn={list[v].isbn}
                      imagePath={list[v].imagePath}
                      title={list[v].title}
                      writerId={list[v].writerId}
                      writerName={list[v].writer.name}
                      score={list[v].score}
                      index={v + 1}
                      isRotate={true}
                      width={120}
                      height={160}
                    />
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
