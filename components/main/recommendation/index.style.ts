import styled from "styled-components";
import { ImageBoxProps, ImageItemProps } from "./interface";

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(243 243 243);
  border-radius: 9999px;
  width: 4rem;
  height: 4rem;
`;

export const ButtonText = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  text-align: center;
`;

export const ImageBox = styled.div<ImageBoxProps>`
  width: 100%;
  height: 260px;
  background-color: ${(props) => props.image};
  border-radius: 0.375rem;
  cursor: pointer;
`;

export const Container = styled.div`
  width: 100%;
`;

export const Contents = styled.div`
  display: flex;
`;

export const Items = styled.div`
  width: 100%;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ImageItem = styled.div<ImageItemProps>`
  width: 110px;
  height: 140px;
  background-color: ${(props) => props.imageUrl};
  border-radius: 0.35rem;
`;
