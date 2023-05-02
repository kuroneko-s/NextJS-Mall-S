import { cls } from "@lib/client/common";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface SlideProps {
  width: number;
  transitionSwitch?: boolean;
  left?: number;
}

const SlideContainer = styled.div<SlideProps>`
  display: flex;
  position: relative;
  height: 280px;
  width: ${(props) => props.width}px;
  left: ${(props) => props.left}px;

  ${(props) =>
    props.transitionSwitch
      ? `transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transition-duration: 700ms;`
      : ""}
`;

const SlideBox = styled.div<SlideProps>`
  width: ${(props) => props.width}px;
  height: 100%;
  background-color: rgb(252 165 165);
  border-radius: 0.375rem;
`;

export default function Event() {
  // const defaultWith = useRef(1280);
  const FLAG_ELEMENT = useRef<HTMLDivElement>(null);
  const MAX_PAGE = 9;
  const MIN_PAGE = 1;

  const [defaultWith, setDefaultWith] = useState<number>(1280);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [left, setLeft] = useState<number>(defaultWith * -1);
  const [transitionSwitch, setTransitionSwitch] = useState<boolean>(true);

  const MAXIMUM_LEFT = defaultWith * -9;

  useEffect(() => {
    if (FLAG_ELEMENT.current !== null) {
      setDefaultWith(FLAG_ELEMENT.current.offsetWidth);
      setLeft(defaultWith * -1);
    }

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [defaultWith]);

  const resizeHandler = () => {
    if (FLAG_ELEMENT.current !== null) {
      setDefaultWith(FLAG_ELEMENT.current.offsetWidth);
    }
  };

  const nextBtnHandler = () => {
    if (currentPage !== MAX_PAGE) {
      setLeft((cur) => cur - defaultWith);
      setCurrentPage((cur) => ++cur);
    } else if (currentPage === MAX_PAGE) {
      setLeft((cur) => cur - defaultWith);
      setCurrentPage((cur) => ++cur);

      setTimeout(() => {
        setTransitionSwitch(false);
        setLeft(defaultWith * -1);
        setCurrentPage(1);
      }, 700);

      setTimeout(() => {
        setTransitionSwitch(true);
      }, 800);
    }
  };

  const previousBtnHandler = () => {
    if (currentPage !== MIN_PAGE) {
      setLeft((cur) => cur + defaultWith);
      setCurrentPage((cur) => --cur);
    } else if (currentPage === MIN_PAGE) {
      setLeft((cur) => cur + defaultWith);
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
    <div
      className="w-full min-h-screen space-y-14 overflow-hidden"
      ref={FLAG_ELEMENT}
    >
      <SlideContainer
        left={left}
        transitionSwitch={transitionSwitch}
        width={defaultWith * 11}
      >
        <SlideBox width={defaultWith}>0</SlideBox>
        {new Array(9).fill(1).map((_, idx) => {
          return (
            <SlideBox key={idx} width={defaultWith}>
              {idx + 1}
            </SlideBox>
          );
        })}
        <SlideBox width={defaultWith}>10</SlideBox>
      </SlideContainer>
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
