import { useRouter } from "next/router";
import React, { useState } from "react";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import {
  InnerContainer,
  RightContainer,
  Container,
  LeftContainer,
} from "./bookInfo.style";
import Link from "next/link";
import Head from "next/head";
import IsLoading from "@components/molecules/IsLoading";
import Information from "@components/templates/bookinfo/information";
import Description from "@components/templates/bookinfo/description";
import Review from "@components/templates/bookinfo/Review";

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

  const { queryResult: newBookResult, isLoading: newBookResultIsLoading } =
    mySqlUtil.getNewBookList();

  const { queryResult: seriesInfoResult, isLoading: seriesInfoIsLoading } =
    mySqlUtil.getBookSeries(id!.toString());

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

  return (
    <>
      {bookInfoIsLoading ||
      seriesInfoIsLoading ||
      newBookResultIsLoading ||
      bookInfoResult?.data == undefined ? (
        <IsLoading />
      ) : (
        <Container>
          <Head>
            <title>{bookInfoResult.data.title} | 흑우냥이</title>
          </Head>
          <InnerContainer className="space-x-4">
            <LeftContainer className="space-y-6">
              <Information
                bookInfo={bookInfoResult.data}
                seriesInfo={seriesInfoResult?.data}
                categoryInfo={bookInfoResult.data.Category}
                artistInfo={bookInfoResult.data.Artist}
                publisherInfo={bookInfoResult.data.Publisher}
                translatorInfo={bookInfoResult.data.Translator}
                writerInfo={bookInfoResult.data.writer}
              />

              <Description
                bookInfoProps={{
                  bookInfo: bookInfoResult.data,
                  seriesInfo: seriesInfoResult?.data,
                  writerInfo: bookInfoResult.data.writer,
                  translatorInfo: bookInfoResult.data.Translator,
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

            <RightContainer>
              <div>
                <h1 className="text-blue-500 font-bold text-lg border-b-[1px] w-2/3 mb-2 pb-1">
                  신간 책
                </h1>
                <div>
                  {newBookResult?.data.map((book, idx) => {
                    return (
                      <p key={book.isbn} className="space-x-2">
                        <span className="text-gray-700 text-center w-[18px] inline-block">
                          {idx + 1}
                        </span>
                        <Link href={`/bookInfo/${book.isbn}`}>
                          <a className="text-gray-700 hover:text-blue-400">
                            {book.title}
                          </a>
                        </Link>
                      </p>
                    );
                  })}
                </div>
              </div>
            </RightContainer>
          </InnerContainer>
        </Container>
      )}
    </>
  );
}
