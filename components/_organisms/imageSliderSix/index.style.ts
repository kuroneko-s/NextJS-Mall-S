import styled from "styled-components";
import { ArrowProps } from "./interface";

export const ArrowButton = styled.div<ArrowProps>`
  position: absolute;
  cursor: pointer;
  margin: ${(props) => (props.isLeft ? "0px;" : "0px 6px 0px 0px;")} !important;
  padding: 4.5px;
  border-radius: 6px;
  top: 156px;
  ${(props) => (props.isLeft ? "left: 0px;" : "right: 0px;")}

  &:hover {
    background-color: rgba(241, 245, 249, 0.5);
    fill: rgba(241, 245, 249, 0.5);
  }
`;
