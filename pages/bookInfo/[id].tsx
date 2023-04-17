import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import {
  InnerContainer,
  RightContainer,
  Container,
  LeftContainer,
} from "./bookInfo.style";
import IsLoading from "@components/common/IsLoading";
import Description from "@components/bookinfo/Description";
import StarSvg from "svg/Star";
import Information from "@components/bookinfo/Information";
import Review from "@components/bookinfo/Review";

export default function BookInfoIndex() {
  const [profileSelect, setProfileSelect] = useState<boolean>(true);
  const [activeScore, setActiveScore] = useState<number>(-1); // mouseOver
  const [clickedScore, setClickedScore] = useState<number>(-1); // Click
  const [activeMessage, setActiveMessage] =
    useState<string>("이 책을 평가해주세요!");

  const route = useRouter();
  const id = route?.query?.id ?? "";

  const { queryResult: bookInfoResult, isLoading: bookInfoIsLoading } =
    mySqlUtil.getBookInfo(id!.toString());

  const { queryResult: seriesInfoResult, isLoading: seriesInfoIsLoading } =
    mySqlUtil.getBookSeries(id!.toString());

  const { queryResult: writerInfoResult, isLoading: writerInfoIsLoading } =
    mySqlUtil.getWriterInfo(bookInfoResult?.data?.writer_id ?? "");

  const {
    queryResult: translatorInfoResult,
    isLoading: translatorInfoIsLoading,
  } = mySqlUtil.getWriterInfo(bookInfoResult?.data?.translator_id ?? "");

  const profileClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const index = e.currentTarget.dataset?.index;

    switch (index) {
      case "1":
        setProfileSelect((cur) => {
          return cur ? cur : !cur;
        });
        break;
      case "2":
        setProfileSelect((cur) => {
          return !cur ? cur : !cur;
        });
        break;
    }
  };

  // TODO: 값이 없을 경우 어떻게 해줘야함
  return (
    <>
      {bookInfoIsLoading ||
      seriesInfoIsLoading ||
      writerInfoIsLoading ||
      translatorInfoIsLoading ||
      bookInfoResult?.data == undefined ? (
        <IsLoading />
      ) : (
        <Container>
          <InnerContainer className="space-x-4">
            <LeftContainer className="space-y-6">
              <Information
                bookInfo={bookInfoResult?.data!}
                seriesInfo={seriesInfoResult?.data}
              />

              <Description
                bookInfoProps={{
                  bookInfo: bookInfoResult?.data,
                  seriesInfo: seriesInfoResult?.data,
                  writerInfo: writerInfoResult?.data,
                  translatorInfo: translatorInfoResult?.data,
                }}
                profileClickHandler={profileClickHandler}
                profileSelect={profileSelect}
              />

              <Review
                activeScore={activeScore}
                setActiveMessage={setActiveMessage}
                setActiveScore={setActiveScore}
                setClickedScore={setClickedScore}
                bookInfo={bookInfoResult?.data}
                activeMessage={activeMessage}
                clickedScore={clickedScore}
              />

              <div>
                <div className="flex items-center justify-between border-b-[1px] border-gray-500 py-2"></div>
              </div>
            </LeftContainer>
            <RightContainer className="border-l-2 border-gray-200"></RightContainer>
          </InnerContainer>
        </Container>
      )}
    </>
  );
}
