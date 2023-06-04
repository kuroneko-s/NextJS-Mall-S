import LeftCaretArrowSvg from "@components/atoms/svg/LeftCaretArrow";
import RightCaretArrowSvg from "@components/atoms/svg/RightCaretArrow";
import React, { useState } from "react";
import { ArrowButton } from "./index.style";
import { SliderOfSixProps } from "./interface";
import SimpleBookInfo from "@components/molecules/SimpleBookInfo";

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
              <SimpleBookInfo
                key={idx}
                isbn={bookInfo.isbn}
                imagePath={bookInfo.imagePath}
                title={bookInfo.title}
                writerId={bookInfo.writerId}
                writerName={bookInfo.writer.name}
                score={bookInfo.score}
                isRotate={false}
                width={200}
                height={260}
              />
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
