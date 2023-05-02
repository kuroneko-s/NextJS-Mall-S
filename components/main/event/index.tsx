import { cls } from "@lib/client/common";
import React, { useState, useRef, useEffect } from "react";

export default function Event() {
  const defaultWith = useRef(1280);
  const MAX_PAGE = 9;
  const MIN_PAGE = 1;
  const MAXIMUM_LEFT = defaultWith.current * -9;
  const [currentPage, setCurrentPage] = useState(1);
  const [left, setLeft] = useState<number>(defaultWith.current * -1);
  const [transitionSwitch, setTransitionSwitch] = useState<boolean>(true);

  const nextBtnHandler = () => {
    if (currentPage !== MAX_PAGE) {
      setLeft((cur) => cur - defaultWith.current);
      setCurrentPage((cur) => ++cur);
    } else if (currentPage === MAX_PAGE) {
      setLeft((cur) => cur - defaultWith.current);
      setCurrentPage((cur) => ++cur);

      setTimeout(() => {
        setTransitionSwitch(false);
        setLeft(defaultWith.current * -1);
        setCurrentPage(1);
      }, 700);

      setTimeout(() => {
        setTransitionSwitch(true);
      }, 800);
    }
  };

  const previousBtnHandler = () => {
    if (currentPage !== MIN_PAGE) {
      setLeft((cur) => cur + defaultWith.current);
      setCurrentPage((cur) => --cur);
    } else if (currentPage === MIN_PAGE) {
      setLeft((cur) => cur + defaultWith.current);
      setCurrentPage((cur) => --cur);

      setTimeout(() => {
        setTransitionSwitch(false);
        setLeft(MAXIMUM_LEFT);
        setCurrentPage(MAX_PAGE);
      }, 700);

      setTimeout(() => {
        setTransitionSwitch(true);
      }, 800);
    }
  };

  return (
    <div className="w-full min-h-screen space-y-14 overflow-hidden">
      <div
        className={cls(
          "flex relative w-[14080px] h-[280px]",
          transitionSwitch ? "transition-all duration-700" : ""
        )}
        style={{
          left: `${left}px`,
        }}
      >
        <div className="w-[1280px] h-full bg-red-300 rounded-md">0</div>
        {new Array(9).fill(1).map((_, idx) => {
          return (
            <div key={idx} className="w-[1280px] h-full bg-red-300 rounded-md">
              {idx + 1}
            </div>
          );
        })}
        <div className="w-[1280px] h-full bg-red-300 rounded-md">10</div>
      </div>
      <div className="flex justify-between">
        <button className="bg-slate-400 py-3 px-6" onClick={previousBtnHandler}>
          이전
        </button>
        <button className="bg-slate-400 py-3 px-6" onClick={nextBtnHandler}>
          다음
        </button>
      </div>

      {/* <BookList bookInfoList={BookSample} title={"가장 많이 본 책"} /> */}
      <div className=""></div>
    </div>
  );
}
