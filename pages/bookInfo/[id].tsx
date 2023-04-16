import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import {
  InnerContainer,
  RightContainer,
  Container,
  LeftContainer,
  ContentsTitle,
  StarBox,
  EmptyStar,
  Star,
  StarScoreBox,
  EmptyScoreBox,
  ScoreBox,
} from "./bookInfo.style";
import IsLoading from "@components/common/IsLoading";
import Profile from "@components/bookinfo/Profile";
import StarSvg from "svg/Star";
import Information from "@components/bookinfo/Information";

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

  const starMouseOverHandler = (e: React.MouseEvent<HTMLElement>) => {
    const { index } = e.currentTarget.dataset;
    setActiveScore(index === undefined ? -1 : +index);
    bindActiveMessage(index === undefined ? -1 : +index);
  };

  const starMouseOutHandler = () => {
    setActiveScore(-1);
    setActiveMessage("이 책을 평가해주세요!");
  };

  const starClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const { index } = e.currentTarget.dataset;
    setClickedScore(index === undefined ? -1 : +index);
  };

  const bindActiveMessage = (num: number) => {
    switch (num) {
      case 1:
        setActiveMessage("별로예요");
        break;
      case 2:
        setActiveMessage("그저 그래요");
        break;
      case 3:
        setActiveMessage("괜찮아요");
        break;
      case 4:
        setActiveMessage("재밌어요");
        break;
      case 5:
        setActiveMessage("최고에요");
        break;
    }
  };

  // TODO: 리뷰 쪽 테이블에 점수 스코어 준것들 필요함
  const reviewScoreSampleArr = [1, 2, 3, 4, 5].map((v) =>
    Math.floor(Math.random() * 100)
  );
  const reviewTotalCntSample = reviewScoreSampleArr.reduce(
    (acc, cur) => +acc + +cur,
    0
  );

  const activedClickHandler = () => {
    setClickedScore(-1);
    setActiveMessage("취소하기");
  };

  const activedHoverHandler = () => {
    setActiveMessage("취소하기");
  };

  const activedOutHandler = () => {
    bindActiveMessage(activeScore);
  };

  // TODO: 값이 없을 경우 어떻게 해줘야함
  return (
    <>
      {bookInfoIsLoading ||
      seriesInfoIsLoading ||
      writerInfoIsLoading ||
      translatorInfoIsLoading ? (
        <IsLoading />
      ) : (
        <Container>
          <InnerContainer className="space-x-4">
            <LeftContainer className="space-y-6">
              <Information
                bookInfo={bookInfoResult?.data!}
                seriesInfo={seriesInfoResult?.data}
              />

              <Profile
                bookInfoProps={{
                  bookInfo: bookInfoResult?.data,
                  seriesInfo: seriesInfoResult?.data,
                  writerInfo: writerInfoResult?.data,
                  translatorInfo: translatorInfoResult?.data,
                }}
                profileClickHandler={profileClickHandler}
                profileSelect={profileSelect}
              />

              <div>
                <ContentsTitle>리뷰</ContentsTitle>

                <div className="flex mt-6">
                  <div>
                    <div className="text-center text-sm text-gray-500">
                      구매자 평점
                    </div>
                    <div className="text-center text-3xl font-bold">
                      {bookInfoResult?.data?.score}
                    </div>
                    <StarBox className="space-x-1 mb-3">
                      <EmptyStar>
                        <Star w={+(bookInfoResult?.data?.score ?? 0) * 20} />
                      </EmptyStar>
                    </StarBox>

                    {reviewScoreSampleArr.map((score, index) => {
                      return (
                        <div
                          className="flex items-center space-x-1 text-sm"
                          key={index}
                        >
                          <StarSvg fill="gray" stroke="gray" />
                          <span>{5 - index}</span>
                          <StarScoreBox className="space-x-1">
                            <EmptyScoreBox>
                              <ScoreBox
                                w={(+score / reviewTotalCntSample) * 100}
                              />
                            </EmptyScoreBox>
                          </StarScoreBox>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col w-full space-y-3">
                    <div className="relative text-center font-bold text-2xl text-gray-500 h-[32px]">
                      <div className="absolute left-[28%] top-0 w-[250px]">
                        {activeMessage}
                      </div>
                    </div>

                    <div className="flex justify-center items-center">
                      {clickedScore === -1 ? (
                        <div className="flex justify-center items-center">
                          <span
                            data-index="1"
                            className="pr-2 border-r-2 border-gray-100 cursor-pointer"
                            onMouseOver={starMouseOverHandler}
                            onMouseOut={starMouseOutHandler}
                            onClick={starClickHandler}
                          >
                            <StarSvg
                              fill="#e5e7eb"
                              stroke="#e5e7eb"
                              width={44}
                              height={44}
                              hover={activeScore >= 1}
                            />
                          </span>
                          <span
                            data-index="2"
                            className="px-2 border-r-2 border-gray-100 cursor-pointer"
                            onMouseOver={starMouseOverHandler}
                            onMouseOut={starMouseOutHandler}
                            onClick={starClickHandler}
                          >
                            <StarSvg
                              fill="#e5e7eb"
                              stroke="#e5e7eb"
                              width={44}
                              height={44}
                              hover={activeScore >= 2}
                            />
                          </span>
                          <span
                            data-index="3"
                            className="px-2 border-r-2 border-gray-100 cursor-pointer"
                            onMouseOver={starMouseOverHandler}
                            onMouseOut={starMouseOutHandler}
                            onClick={starClickHandler}
                          >
                            <StarSvg
                              fill="#e5e7eb"
                              stroke="#e5e7eb"
                              width={44}
                              height={44}
                              hover={activeScore >= 3}
                            />
                          </span>
                          <span
                            data-index="4"
                            className="px-2 border-r-2 border-gray-100 cursor-pointer"
                            onMouseOver={starMouseOverHandler}
                            onMouseOut={starMouseOutHandler}
                            onClick={starClickHandler}
                          >
                            <StarSvg
                              fill="#e5e7eb"
                              stroke="#e5e7eb"
                              width={44}
                              height={44}
                              hover={activeScore >= 4}
                            />
                          </span>
                          <span
                            data-index="5"
                            className="pl-2 cursor-pointer"
                            onMouseOver={starMouseOverHandler}
                            onMouseOut={starMouseOutHandler}
                            onClick={starClickHandler}
                          >
                            <StarSvg
                              fill="#e5e7eb"
                              stroke="#e5e7eb"
                              width={44}
                              height={44}
                              hover={activeScore >= 5}
                            />
                          </span>
                        </div>
                      ) : (
                        <div
                          className="flex justify-center items-center"
                          onClick={activedClickHandler}
                          onMouseOver={activedHoverHandler}
                          onMouseOut={activedOutHandler}
                        >
                          <span
                            data-index="1"
                            className="pr-2 border-r-2 border-gray-100 cursor-pointer"
                            onClick={starClickHandler}
                          >
                            <StarSvg
                              fill="#e5e7eb"
                              stroke="#e5e7eb"
                              width={44}
                              height={44}
                              hover={activeScore >= 1}
                            />
                          </span>
                          <span
                            data-index="2"
                            className="px-2 border-r-2 border-gray-100 cursor-pointer"
                            onClick={starClickHandler}
                          >
                            <StarSvg
                              fill="#e5e7eb"
                              stroke="#e5e7eb"
                              width={44}
                              height={44}
                              hover={activeScore >= 2}
                            />
                          </span>
                          <span
                            data-index="3"
                            className="px-2 border-r-2 border-gray-100 cursor-pointer"
                            onClick={starClickHandler}
                          >
                            <StarSvg
                              fill="#e5e7eb"
                              stroke="#e5e7eb"
                              width={44}
                              height={44}
                              hover={activeScore >= 3}
                            />
                          </span>
                          <span
                            data-index="4"
                            className="px-2 border-r-2 border-gray-100 cursor-pointer"
                            onClick={starClickHandler}
                          >
                            <StarSvg
                              fill="#e5e7eb"
                              stroke="#e5e7eb"
                              width={44}
                              height={44}
                              hover={activeScore >= 4}
                            />
                          </span>
                          <span
                            data-index="5"
                            className="pl-2 cursor-pointer"
                            onClick={starClickHandler}
                          >
                            <StarSvg
                              fill="#e5e7eb"
                              stroke="#e5e7eb"
                              width={44}
                              height={44}
                              hover={activeScore >= 5}
                            />
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col px-2">
                      <textarea
                        className="border-2 border-gray-300 rounded-md outline-gray-400 text-xs min-h-[110px] break-words"
                        placeholder="리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를 사용하시면 비공개될 수 있습니다."
                      />
                      <div className="flex justify-between mt-2">
                        <button
                          className="shadow-sm py-1 px-2 border-2 text-sm text-gray-800 rounded-md"
                          type="button"
                        >
                          리뷰 주의사항
                        </button>

                        <button
                          className="flex items-center justify-center cursor-pointer bg-blue-500 text-gray-50 px-8 rounded-md shadow-md font-bold text-sm"
                          type="button"
                        >
                          작성
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
