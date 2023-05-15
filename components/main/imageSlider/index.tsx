import { throttle } from "@lib/client/common";
import React, { useState, useRef, useEffect } from "react";
import {
  ArrowButton,
  SlideBox,
  SlideContainer,
  SlideSubTitle,
  SlideTitle,
  SlideTitleBox,
} from "./index.style";
import RightCaretArrowSvg from "@svg/RightCaretArrow";
import LeftCaretArrowSvg from "@svg/LeftCaretArrow";
import Link from "next/link";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import IsLoading from "@components/common/IsLoading";

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

  const { queryResult: eventListQueryResult, isLoading } =
    mySqlUtil.getEventList();

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
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
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
              imagePath={
                eventListQueryResult?.data[eventListQueryResult.data.length - 1]
                  .filePath
              }
            >
              <SlideTitleBox>
                <SlideTitle>
                  {
                    eventListQueryResult?.data[
                      eventListQueryResult?.data.length - 1
                    ].title
                  }
                </SlideTitle>
                {eventListQueryResult?.data[
                  eventListQueryResult?.data.length - 1
                ]?.contents !== undefined ? (
                  <SlideSubTitle>
                    {
                      eventListQueryResult?.data[
                        eventListQueryResult?.data.length - 1
                      ].contents
                    }
                  </SlideSubTitle>
                ) : null}
              </SlideTitleBox>
            </SlideBox>
            {eventListQueryResult?.data.map((event, idx) => {
              return (
                <Link key={event.id} href={`/event/${event.id}`}>
                  <a>
                    <SlideBox width={defaultWith} imagePath={event.filePath}>
                      <SlideTitleBox>
                        <SlideTitle>{event.title}</SlideTitle>
                        {event?.contents !== undefined ? (
                          <SlideSubTitle>{event.contents}</SlideSubTitle>
                        ) : null}
                      </SlideTitleBox>
                    </SlideBox>
                  </a>
                </Link>
              );
            })}
            <SlideBox
              width={defaultWith}
              imagePath={eventListQueryResult?.data[0].filePath}
            >
              <SlideTitleBox>
                <SlideTitle>{eventListQueryResult?.data[0].title}</SlideTitle>
                {eventListQueryResult?.data[0]?.contents !== undefined ? (
                  <SlideSubTitle>
                    {eventListQueryResult?.data[0].contents}
                  </SlideSubTitle>
                ) : null}
              </SlideTitleBox>
            </SlideBox>
          </SlideContainer>

          <ArrowButton
            onClick={throttle(previousBtnHandler, 710)}
            isLeft={true}
          >
            <LeftCaretArrowSvg />
          </ArrowButton>
          <ArrowButton onClick={throttle(nextBtnHandler, 710)} isLeft={false}>
            <RightCaretArrowSvg />
          </ArrowButton>
        </div>
      )}
    </>
  );
}
