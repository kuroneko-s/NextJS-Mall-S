import styled from "styled-components";
import { ArrowProps, SlideProps } from "./interface";

export const SlideContainer = styled.div<SlideProps>`
  display: flex;
  position: relative;
  height: 360px;
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

export const SlideBox = styled.div<SlideProps>`
  position: relative;
  width: ${(props) => props.width}px;
  height: 100%;
  border-radius: 0.375rem;
  background-image: url(${(props) => props.imagePath});
  background-size: 70%;
  background-position: center;
`;

export const SlideTitleBox = styled.div`
  position: absolute;
  bottom: 30px;
  left: 25px;

  max-width: 300px;
`;

export const SlideTitle = styled.p`
  font-weight: 700;
  font-size: 1.5rem;
`;

export const SlideSubTitle = styled.p`
  font-weight: 600;
  font-size: 1.1rem;
`;

export const ArrowButton = styled.div<ArrowProps>`
  position: absolute;
  cursor: pointer;
  /* background-color: rgb(148 163 184); */
  padding: 8px 12px;
  border-radius: 6px;
  ${(props) => (props.isLeft ? "left: 0px;" : "right: 0px;")}
  top: 156px;

  &:hover {
    background-color: rgba(241, 245, 249, 0.5);
    fill: rgba(241, 245, 249, 0.5);
  }
`;
