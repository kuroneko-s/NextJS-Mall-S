import { useRouter } from "next/router";
import React, { useState } from "react";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import {
  InnerContainer,
  SideMenuContainer,
  Container,
  MainContentsBox,
} from "./bookInfo.style";
import IsLoading from "@components/IsLoading";
import BookMainInfo from "@components/bookinfo/BookMainInfo";
import BookSubInfo from "@components/bookinfo/BookSubInfo";
import BookContents from "@components/bookinfo/BookContents";

export default function BookInfoIndex() {
  const [profileSelect, setProfileSelect] = useState<boolean>(true);

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
      translatorInfoIsLoading ? (
        <IsLoading />
      ) : (
        <Container>
          <InnerContainer className="space-x-4">
            <MainContentsBox className="space-y-6">
              <BookMainInfo
                bookInfo={bookInfoResult?.data!}
                seriesInfo={seriesInfoResult?.data}
              />

              <BookSubInfo bookInfo={bookInfoResult?.data} />
              <BookContents
                bookInfoProps={{
                  bookInfo: bookInfoResult?.data,
                  seriesInfo: seriesInfoResult?.data,
                  writerInfo: writerInfoResult?.data,
                  translatorInfo: translatorInfoResult?.data,
                }}
                profileClickHandler={profileClickHandler}
                profileSelect={profileSelect}
              />

              <div>리뷰</div>

              <div>비슷한 장르의 책들 추천 </div>
            </MainContentsBox>
            <SideMenuContainer className="border-l-2 border-gray-200"></SideMenuContainer>
          </InnerContainer>
        </Container>
      )}
    </>
  );
}
