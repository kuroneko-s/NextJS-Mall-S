import { useRouter } from "next/router";
import React, { useState } from "react";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import {
  InnerContainer,
  RightContainer,
  Container,
  LeftContainer,
} from "./bookInfo.style";
import IsLoading from "@components/common/IsLoading";
import Description from "@components/bookinfo/description";
import Information from "@components/bookinfo/information";
import Review from "@components/bookinfo/Review";
import Link from "next/link";
import Head from "next/head";

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

  const { queryResult: writerInfoResult, isLoading: writerInfoIsLoading } =
    mySqlUtil.getWriterInfo((bookInfoResult?.data?.writerId ?? "") + "");

  const { queryResult: categoryInfoResult, isLoading: categoryInfoIsLoading } =
    mySqlUtil.getCategoryInfo((bookInfoResult?.data?.categoryId ?? "") + "");

  const {
    queryResult: translatorInfoResult,
    isLoading: translatorInfoIsLoading,
  } = mySqlUtil.getWriterInfo((bookInfoResult?.data?.translatorId ?? "") + "");

  const { queryResult: artistInfoResult, isLoading: artistInfoIsLoading } =
    mySqlUtil.getArtistInfo((bookInfoResult?.data.artistId ?? "") + "");

  const {
    queryResult: publisherInfoResult,
    isLoading: publisherInfoIsLoading,
  } = mySqlUtil.getArtistInfo((bookInfoResult?.data.publisherId ?? "") + "");

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
      writerInfoIsLoading ||
      translatorInfoIsLoading ||
      newBookResultIsLoading ||
      categoryInfoIsLoading ||
      artistInfoIsLoading ||
      publisherInfoIsLoading ||
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
                bookInfo={bookInfoResult?.data!}
                seriesInfo={seriesInfoResult?.data}
                categoryInfo={categoryInfoResult?.data}
                artistInfo={artistInfoResult?.data}
                publisherInfo={publisherInfoResult?.data}
                translatorInfo={translatorInfoResult?.data}
                writerInfo={writerInfoResult?.data}
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
