import StarSvg from "@components/svg/Star";
import React from "react";

interface StarScoreProps {
  handler: (e: React.MouseEvent<HTMLElement>) => void;
  mouseOutHandler: () => void;
  activeNum: number;
  clickHandler: (e: React.MouseEvent<HTMLElement>) => void;
  clickedScore: number;
}

export default function StarScore({
  handler,
  mouseOutHandler,
  clickHandler,
  clickedScore,
  activeNum,
}: StarScoreProps) {
  return (
    <div className="flex justify-center items-center">
      {clickedScore === -1 ? (
        <>
          <span
            data-index="1"
            className="pr-2 border-r-2 border-gray-100"
            onMouseOver={handler}
            onMouseOut={mouseOutHandler}
            onClick={clickHandler}
          >
            <StarSvg
              fill="#e5e7eb"
              stroke="#e5e7eb"
              width={44}
              height={44}
              hover={activeNum >= 1}
            />
          </span>
          <span
            data-index="2"
            className="px-2 border-r-2 border-gray-100"
            onMouseOver={handler}
            onMouseOut={mouseOutHandler}
            onClick={clickHandler}
          >
            <StarSvg
              fill="#e5e7eb"
              stroke="#e5e7eb"
              width={44}
              height={44}
              hover={activeNum >= 2}
            />
          </span>
          <span
            data-index="3"
            className="px-2 border-r-2 border-gray-100"
            onMouseOver={handler}
            onMouseOut={mouseOutHandler}
            onClick={clickHandler}
          >
            <StarSvg
              fill="#e5e7eb"
              stroke="#e5e7eb"
              width={44}
              height={44}
              hover={activeNum >= 3}
            />
          </span>
          <span
            data-index="4"
            className="px-2 border-r-2 border-gray-100"
            onMouseOver={handler}
            onMouseOut={mouseOutHandler}
            onClick={clickHandler}
          >
            <StarSvg
              fill="#e5e7eb"
              stroke="#e5e7eb"
              width={44}
              height={44}
              hover={activeNum >= 4}
            />
          </span>
          <span
            data-index="5"
            className="pl-2"
            onMouseOver={handler}
            onMouseOut={mouseOutHandler}
            onClick={clickHandler}
          >
            <StarSvg
              fill="#e5e7eb"
              stroke="#e5e7eb"
              width={44}
              height={44}
              hover={activeNum >= 5}
            />
          </span>
        </>
      ) : (
        <>
          <span
            data-index="1"
            className="pr-2 border-r-2 border-gray-100"
            onClick={clickHandler}
          >
            <StarSvg
              fill="#e5e7eb"
              stroke="#e5e7eb"
              width={44}
              height={44}
              hover={activeNum >= 1}
            />
          </span>
          <span
            data-index="2"
            className="px-2 border-r-2 border-gray-100"
            onClick={clickHandler}
          >
            <StarSvg
              fill="#e5e7eb"
              stroke="#e5e7eb"
              width={44}
              height={44}
              hover={activeNum >= 2}
            />
          </span>
          <span
            data-index="3"
            className="px-2 border-r-2 border-gray-100"
            onClick={clickHandler}
          >
            <StarSvg
              fill="#e5e7eb"
              stroke="#e5e7eb"
              width={44}
              height={44}
              hover={activeNum >= 3}
            />
          </span>
          <span
            data-index="4"
            className="px-2 border-r-2 border-gray-100"
            onClick={clickHandler}
          >
            <StarSvg
              fill="#e5e7eb"
              stroke="#e5e7eb"
              width={44}
              height={44}
              hover={activeNum >= 4}
            />
          </span>
          <span data-index="5" className="pl-2" onClick={clickHandler}>
            <StarSvg
              fill="#e5e7eb"
              stroke="#e5e7eb"
              width={44}
              height={44}
              hover={activeNum >= 5}
            />
          </span>
        </>
      )}
    </div>
  );
}
