import React, { useEffect, useRef, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styled from "styled-components";

const SlideBox = styled.div`
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    height: 480px;
    width: 100%;

    animation-duration: 100ms;
    transition-duration: 100ms;
  }
`;

const properties = {
  prevArrow: (
    <div className="p-2 bg-white rounded-full shadow-xl ring-1 ring-gray-300 cursor-pointer hover:text-gray-400">
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
  ),
  nextArrow: (
    <div className="p-2 bg-white rounded-full shadow-xl ring-1 ring-gray-300 cursor-pointer hover:text-gray-400">
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
  ),
};

export default function ImageSlider() {
  return (
    <div className="w-full h-[480px] relative rounded-md shadow-md">
      <Slide {...properties}>
        <SlideBox className="each-slide-effect">
          <div style={{ backgroundColor: "red" }}>
            <span>Slide 1</span>
          </div>
        </SlideBox>
        <SlideBox className="each-slide-effect">
          <div style={{ backgroundColor: "yellow" }}>
            <span>Slide 2</span>
          </div>
        </SlideBox>
        <SlideBox className="each-slide-effect">
          <div style={{ backgroundColor: "green" }}>
            <span>Slide 3</span>
          </div>
        </SlideBox>
      </Slide>
    </div>
  );
}
