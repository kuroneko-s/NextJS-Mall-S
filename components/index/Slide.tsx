import React from "react";
import styled from "styled-components";

interface SlideItemProps {
  bgColor: string;
  isActive: boolean;
  isSecond: boolean;
}

interface SlideProps {
  container: React.RefObject<HTMLDivElement>;
  activeIdx: number;
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
  transition: all 0.7s ease-in-out;
`;

const SlideContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  overflow: hidden;
`;

export default function Slide({ container, activeIdx }: SlideProps) {
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

  const second =
    items.length - 1 < activeIdx + 1
      ? activeIdx + 1 - items.length - 1
      : activeIdx + 1;
  const third =
    items.length - 1 < activeIdx + 2
      ? activeIdx + 2 - items.length - 1
      : activeIdx + 2;

  return (
    <SlideContainer ref={container}>
      <SlideItem
        bgColor={items[items.length - 1].color}
        isActive={activeIdx === -1}
        isSecond={second === -1 || third === -1}
      />
      {items.map((item, idx) => {
        return (
          <SlideItem
            bgColor={item.color}
            key={idx}
            isActive={activeIdx === idx}
            isSecond={second === idx || third === idx}
          />
        );
      })}
      <SlideItem
        bgColor={items[0].color}
        isActive={activeIdx === -1}
        isSecond={second === -1 || third === -1}
      />
    </SlideContainer>
  );
}
