import styled from "styled-components";

export const StarScoreBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  flex: 1;
  height: 100%;
`;

export const EmptyScoreBox = styled.span`
  position: relative;
  margin-top: -1px;
  margin-right: 1px;
  width: 70px;
  height: 10px;
  vertical-align: -11%;
  display: inline-block;
  text-indent: -444px;
  font-size: 0;
  overflow: hidden;
  background-color: whitesmoke;
  background-size: 100% 100%;
`;

export const ScoreBox = styled.span<{ w: number }>`
  display: block;
  position: relative;
  overflow-x: hidden;
  height: 10px;
  width: ${(props) => props.w}%;

  &::after {
    display: inline-block;
    text-indent: -444px;
    font-size: 0;
    overflow: hidden;
    background-color: gray;
    background-size: 100% 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 70px;
    height: 10px;
    content: "";
  }
`;
