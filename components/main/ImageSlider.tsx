import React, { useRef, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import styled from "styled-components";

const ImageContainer = styled.div`
  width: 100%;
  height: 480px;
  position: relative;
  border-radius: 0.375rem;

  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
    0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(0 0 #0000, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
`;

interface SlideItemProps {
  bgColor: string;
  isActive: boolean;
  isSecond: boolean;
  test?: boolean;
}

interface Item {
  color: string;
}

const SlideItem = styled.div<SlideItemProps>`
  height: 100%;
  display: inline-block;
  flex-grow: ${(props) => (props.isActive ? 1 : 0)};
  flex-basis: ${(props) => (props.isSecond ? "3.5rem" : 0)};
  background-color: ${(props) => props.bgColor};
  transition: ${(props) => (props.test ? "" : "all 0.7s ease-in-out")};
  font-size: ${(props) => (props.isActive || props.isSecond ? "1rem" : "0rem")};
  color: yellow;
  text-align: center;
`;

const SlideContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const items: Item[] = [
  {
    color: "rgb(254 202 202)",
  },
  {
    color: "rgb(187 247 208)",
  },
  {
    color: "rgb(229 231 235)",
  },
  {
    color: "rgb(248 113 113)",
  },
  {
    color: "rgb(74 222 128)",
  },
  {
    color: "rgb(156 163 175)",
  },
  {
    color: "rgb(153 27 27)",
  },
  {
    color: "rgb(22 101 52)",
  },
  {
    color: "rgb(31 41 55)",
  },
];

export default function ImageSlider() {
  const animationDelay = useRef(700);
  const second = useRef(1);
  const third = useRef(2);
  const startDummy = useRef(false);
  const lastDummy = useRef(false);
  const container = useRef<HTMLDivElement>(null);

  const [test, setTest] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  const childrenLen = container.current?.children.length ?? 0;

  if (activeIdx === 7) {
    lastDummy.current = true;
    startDummy.current = false;
  } else if (activeIdx === 8) {
    lastDummy.current = true;
    startDummy.current = true;
  } else {
    lastDummy.current = false;
    startDummy.current = false;
  }

  if (childrenLen !== 0) {
    second.current = activeIdx > childrenLen - 3 ? -1 : activeIdx + 1;
    third.current = activeIdx > childrenLen - 4 ? -1 : activeIdx + 2;
  }

  const leftHandler = () => {
    if (timeoutId === undefined) {
      setActiveIdx((cur) => {
        return cur <= 0
          ? (container.current?.children.length ?? 1) - 3
          : cur - 1;
      });

      console.log("activeIdx - ", activeIdx);
      console.log("activeIdx - ", container.current?.children[activeIdx]);

      const _timeoutId = setTimeout(() => {
        setTimeoutId(undefined);
      }, animationDelay.current);

      setTimeoutId(_timeoutId);
    }
  };

  const rightHandler = () => {
    if (timeoutId === undefined) {
      setActiveIdx((cur) => {
        return cur >= (container.current?.children.length ?? 0) - 2
          ? 0
          : cur + 1;
      });

      console.log("activeIdx - ", activeIdx);
      console.log("activeIdx - ", container.current?.children[activeIdx]);

      if (activeIdx === 8) {
        startDummy.current = true;

        setTimeout(() => {
          startDummy.current = false;
          setActiveIdx(0);
          setTest(true);
          return () => setTest(false);
        }, animationDelay.current);
      }

      const _timeoutId = setTimeout(() => {
        setTimeoutId(undefined);
      }, animationDelay.current);

      setTimeoutId(_timeoutId);
    }
  };

  // https://velog.io/@sweet_pumpkin/Megabyte-School-%EB%AC%B4%ED%95%9C%EC%9C%BC%EB%A1%9C-%EC%A6%90%EA%B8%B0%EB%8A%94-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%AC%B4%ED%95%9C%EB%A3%A8%ED%94%84%EC%9E%90%EB%8F%99%EB%B3%80%ED%99%98
  return (
    <ImageContainer className="mb-8">
      <div
        className="absolute p-2 left-0 top-0 bg-white rounded-full shadow-xl ring-1 ring-gray-300 cursor-pointer hover:text-gray-400"
        onClick={leftHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      <SlideContainer ref={container}>
        {items.map((item, idx) => {
          return (
            <SlideItem
              key={idx}
              data-index={idx}
              bgColor={item.color}
              isActive={activeIdx === idx}
              isSecond={second.current === idx || third.current === idx}
              test={idx <= 2 ? test : false}
            >
              {idx}
            </SlideItem>
          );
        })}
        <SlideItem
          bgColor={items[0].color}
          isActive={activeIdx === 9}
          isSecond={lastDummy.current}
          data-index={-1}
        >
          9
        </SlideItem>
        <SlideItem
          bgColor={items[items.length - 1].color}
          isActive={activeIdx === -1}
          isSecond={startDummy.current}
          data-index={-1}
        />
      </SlideContainer>

      <div
        className="absolute p-2 right-0 top-0 bg-white rounded-full shadow-xl ring-1 ring-gray-300 cursor-pointer hover:text-gray-400"
        onClick={rightHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </ImageContainer>
  );
}
