import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-left: 4rem /* 72px */;
  padding-right: 4rem /* 72px */;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;

  max-width: 1280px;
  width: 100%;
  height: 100%;
  padding: 2.5rem 5rem;
  margin-left: auto;
  margin-right: auto;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;

export const BookTopInfoBox = styled.div`
  display: flex;
`;

export const ImageBox = styled.div`
  min-width: 200px;
`;

export const BookInfoBox = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  flex: 1;
  padding-left: 3rem;
`;

export const RightContainer = styled.div`
  width: 100%;
  max-width: 300px;
`;

export const BookTitle = styled.p`
  font-weight: 800;
  font-size: 2rem;
`;

export const ScoreText = styled.span`
  font-size: 0.875rem /* 15.75px */;
  line-height: 1.25rem /* 22.5px */;
  color: #fa722e;
  font-weight: 700;
`;

export const WrtierInfoBox = styled.div`
  font-size: 0.875rem /* 15.75px */;
  line-height: 1.25rem /* 22.5px */;
`;

export const ServiceInfoTitle = styled.span`
  font-weight: 700;
`;

export const ServiceInfoContents = styled.span`
  color: rgb(75 85 99);
`;
