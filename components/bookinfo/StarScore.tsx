import StarSvg from "svg/Star";
import React from "react";

interface StarScoreProps {
  handler: (e: React.MouseEvent<HTMLElement>) => void;
  mouseOutHandler: () => void;
  activeNum: number;
  clickHandler: (e: React.MouseEvent<HTMLElement>) => void;
  clickedScore: number;
  setClickedScoure: React.Dispatch<React.SetStateAction<number>>;
  setActiveMessage: React.Dispatch<React.SetStateAction<string>>;
  bindActiveMessage: (num: number) => void;
}

export default function StarScore({
  handler,
  mouseOutHandler,
  clickHandler,
  clickedScore,
  activeNum,
  setClickedScoure,
  setActiveMessage,
  bindActiveMessage,
}: StarScoreProps) {
  const activedClickHandler = () => {
    setClickedScoure(-1);
    setActiveMessage("취소하기");
  };

  const activedHoverHandler = () => {
    setActiveMessage("취소하기");
  };

  const activedOutHandler = () => {
    bindActiveMessage(activeNum);
  };

  return (
    <div className="flex justify-center items-center">
      {clickedScore === -1 ? (
        <div className="flex justify-center items-center">
          <span
            data-index="1"
            className="pr-2 border-r-2 border-gray-100 cursor-pointer"
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
            className="px-2 border-r-2 border-gray-100 cursor-pointer"
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
            className="px-2 border-r-2 border-gray-100 cursor-pointer"
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
            className="px-2 border-r-2 border-gray-100 cursor-pointer"
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
            className="pl-2 cursor-pointer"
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
        </div>
      ) : (
        <div
          className="flex justify-center items-center"
          onClick={activedClickHandler}
          onMouseOver={activedHoverHandler}
          onMouseOut={activedOutHandler}
        >
          <span
            data-index="1"
            className="pr-2 border-r-2 border-gray-100 cursor-pointer"
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
            className="px-2 border-r-2 border-gray-100 cursor-pointer"
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
            className="px-2 border-r-2 border-gray-100 cursor-pointer"
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
            className="px-2 border-r-2 border-gray-100 cursor-pointer"
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
            className="pl-2 cursor-pointer"
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
        </div>
      )}
    </div>
  );
}
