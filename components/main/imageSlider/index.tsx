import { throttle } from "@lib/client/common";
import React, { useState, useRef, useEffect } from "react";
import { eventBox } from "./interface";
import {
  ArrowButton,
  ArrowButtonContainer,
  SlideBox,
  SlideContainer,
  SlideSubTitle,
  SlideTitle,
  SlideTitleBox,
} from "./index.style";
import RightCaretArrowSvg from "@svg/RightCaretArrow";
import LeftCaretArrowSvg from "@svg/LeftCaretArrow";

const eventBoxSample: eventBox[] = new Array(9).fill(1).map((_, idx) => {
  return {
    path: `/event_${idx + 1}.png`,
    title: `고양이 ${idx + 1}`,
    subTitle: "냐용냐옹".repeat(idx + 1),
  } as eventBox;
});

export default function ImageSlider() {
  const FLAG_ELEMENT = useRef<HTMLDivElement>(null);
  // const TIMEOUT_KEY = useRef<null | NodeJS.Timeout>(null);

  const [defaultWith, setDefaultWith] = useState<number>(1280);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [left, setLeft] = useState<number>(defaultWith * -1);
  const [transitionSwitch, setTransitionSwitch] = useState<boolean>(true);
  const MAXIMUM_LEFT = defaultWith * -9;
  const MAX_PAGE = 9;
  const MIN_PAGE = 1;

  // TODO: useState & event 간의 충돌로 인해서 정삭작동하지 않음. 추후 적용.
  /* const resizeHandler = () => {
    if (TIMEOUT_KEY.current === null) {
      TIMEOUT_KEY.current = setTimeout(() => {
        if (FLAG_ELEMENT.current !== null) {
          setDefaultWith(FLAG_ELEMENT.current.offsetWidth * currentPage);
        }
        TIMEOUT_KEY.current = null;
      }, 150);
    }
  }; */

  useEffect(() => {
    if (FLAG_ELEMENT.current !== null) {
      setDefaultWith(FLAG_ELEMENT.current.offsetWidth);
      setLeft(defaultWith * -1);
    }
  }, [defaultWith]);

  const nextBtnHandler = () => {
    // TODO: 클릭 동작에 throttle 적용 여부 판단
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
    // TODO: 클릭 동작에 throttle 적용 여부 판단
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
      className="w-full h-[360px] overflow-hidden relative "
      ref={FLAG_ELEMENT}
    >
      <SlideContainer
        left={left}
        transitionSwitch={transitionSwitch}
        width={defaultWith * 11}
      >
        <SlideBox
          width={defaultWith}
          imagePath={eventBoxSample[eventBoxSample.length - 1].path}
        >
          <SlideTitleBox>
            <SlideTitle>
              {eventBoxSample[eventBoxSample.length - 1].title}
            </SlideTitle>
            {eventBoxSample[eventBoxSample.length - 1]?.subTitle !==
            undefined ? (
              <SlideSubTitle>
                {eventBoxSample[eventBoxSample.length - 1].subTitle}
              </SlideSubTitle>
            ) : null}
          </SlideTitleBox>
        </SlideBox>
        {eventBoxSample.map((eventBox, idx) => {
          return (
            <SlideBox key={idx} width={defaultWith} imagePath={eventBox.path}>
              <SlideTitleBox>
                <SlideTitle>{eventBox.title}</SlideTitle>
                {eventBox?.subTitle !== undefined ? (
                  <SlideSubTitle>{eventBox.subTitle}</SlideSubTitle>
                ) : null}
              </SlideTitleBox>
            </SlideBox>
          );
        })}
        <SlideBox width={defaultWith} imagePath={eventBoxSample[0].path}>
          <SlideTitleBox>
            <SlideTitle>{eventBoxSample[0].title}</SlideTitle>
            {eventBoxSample[0]?.subTitle !== undefined ? (
              <SlideSubTitle>{eventBoxSample[0].subTitle}</SlideSubTitle>
            ) : null}
          </SlideTitleBox>
        </SlideBox>
      </SlideContainer>

      <ArrowButtonContainer>
        <ArrowButton onClick={throttle(previousBtnHandler, 710)}>
          <LeftCaretArrowSvg />
        </ArrowButton>
        <ArrowButton onClick={throttle(nextBtnHandler, 710)}>
          <RightCaretArrowSvg />
        </ArrowButton>
      </ArrowButtonContainer>
    </div>
  );
}
