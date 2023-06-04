import styled from "styled-components";
import { ArrowProps } from "./interface";

export const ArrowButton = styled.div<ArrowProps>`
  position: absolute;
  cursor: pointer;
  padding: 4.5px;
  border-radius: 6px;
  top: 50%;
  ${(props) => (props.isLeft ? "left: 0px;" : "right: 0px;")}

  &:hover {
    background-color: rgba(241, 245, 249, 0.5);
    fill: rgba(241, 245, 249, 0.5);
  }
`;
