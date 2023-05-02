import React, { useState, useRef, useEffect } from "react";

export default function Event() {
  const [left, setLeft] = useState<number>(-875);

  const nextBtnHandler = () => {
    setLeft((cur) => {
      if (cur === -8750) {
        return cur;
      } else {
        return cur - 875;
      }
    });
  };

  const previousBtnHandler = () => {
    setLeft((cur) => {
      if (cur === 0) {
        return cur;
      } else {
        return cur + 875;
      }
    });
  };

  console.log("left - ", left);

  return (
    <div className="w-full min-h-screen space-y-14 ">
      <div
        className={`flex relative w-[9625px] h-[280px]`}
        style={{
          left: `${left}px`,
        }}
      >
        <div className="w-[875px] h-full bg-red-300 rounded-md">0</div>
        {new Array(9).fill(1).map((_, idx) => {
          return (
            <div key={idx} className="w-[875px] h-full bg-red-300 rounded-md">
              {idx + 1}
            </div>
          );
        })}
        <div className="w-[875px] h-full bg-red-300 rounded-md">10</div>
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
