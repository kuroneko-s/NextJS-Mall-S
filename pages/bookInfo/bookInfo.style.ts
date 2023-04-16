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

export const StarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

export const EmptyStar = styled.span`
  position: relative;
  margin-top: -1px;
  margin-right: 1px;
  width: 70px;
  height: 14px;
  vertical-align: -11%;
  display: inline-block;
  text-indent: -444px;
  font-size: 0;
  overflow: hidden;
  background: url(data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2050%2010%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20fill%3D%22%23e6e6e6%22%3E%3Cpath%20d%3D%22M8.089,9.755L5,8.308L1.91,9.755l0.423-3.387L0,3.876l3.352-0.645L5,0.245l1.647,2.987L10,3.876L7.666,6.368L8.089,9.755z%20M28.09,9.755L25,8.308l-3.09,1.447l0.423-3.387L20,3.876l3.352-0.645L25,0.245l1.647,2.987L30,3.876l-2.334,2.492L28.09,9.755z%20M18.09,9.755L15,8.308l-3.09,1.447l0.423-3.387L10,3.876l3.352-0.645L15,0.245l1.647,2.987L20,3.876l-2.334,2.492L18.09,9.755z%20M38.09,9.755L35,8.308l-3.09,1.447l0.422-3.387L30,3.876l3.352-0.645L35,0.245l1.647,2.987L40,3.876l-2.334,2.492L38.09,9.755z%20M48.09,9.755L45,8.308l-3.09,1.447l0.422-3.387L40,3.876l3.352-0.645L45,0.245l1.647,2.987L50,3.876l-2.334,2.492L48.09,9.755z%22/%3E%3C/svg%3E)
    center center no-repeat;
  background-size: 100% 100%;
`;

export const Star = styled.span<{ w: number }>`
  display: block;
  position: relative;
  overflow-x: hidden;
  height: 14px;
  width: ${(props) => props.w}%;

  &::after {
    display: inline-block;
    text-indent: -444px;
    font-size: 0;
    overflow: hidden;
    background: url(data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2050%2010%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20fill%3D%22%23fa722e%22%3E%3Cpath%20d%3D%22M8.089,9.755L5,8.308L1.91,9.755l0.423-3.387L0,3.876l3.352-0.645L5,0.245l1.647,2.987L10,3.876L7.666,6.368L8.089,9.755z%20M28.09,9.755L25,8.308l-3.09,1.447l0.423-3.387L20,3.876l3.352-0.645L25,0.245l1.647,2.987L30,3.876l-2.334,2.492L28.09,9.755z%20M18.09,9.755L15,8.308l-3.09,1.447l0.423-3.387L10,3.876l3.352-0.645L15,0.245l1.647,2.987L20,3.876l-2.334,2.492L18.09,9.755z%20M38.09,9.755L35,8.308l-3.09,1.447l0.422-3.387L30,3.876l3.352-0.645L35,0.245l1.647,2.987L40,3.876l-2.334,2.492L38.09,9.755z%20M48.09,9.755L45,8.308l-3.09,1.447l0.422-3.387L40,3.876l3.352-0.645L45,0.245l1.647,2.987L50,3.876l-2.334,2.492L48.09,9.755z%22/%3E%3C/svg%3E)
      center center no-repeat;
    background-size: 100% 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 70px;
    height: 14px;
    content: "";
  }
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

export const ContentsTitle = styled.p`
  font-size: 1.25rem /* 22.5px */;
  line-height: 1.75rem /* 31.5px */;
  font-weight: 700;
  color: rgb(75 85 99);
  padding-bottom: 0.375rem;
  border-bottom-width: 2px;
  margin-bottom: 0.575rem;
  border-color: rgb(107 114 128);
`;

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
