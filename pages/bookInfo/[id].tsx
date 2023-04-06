import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalContext } from "pages/_app";
import React, { useContext, useRef } from "react";
import Category from "@components/bookinfo/Category";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import {
  BookInfoBox,
  BookTitle,
  ImageBox,
  InnerContainer,
  StarBox,
  EmptyStar,
  Star,
  SideMenuContainer,
  Container,
  MainContentsBox,
  BookTopInfoBox,
  ScoreText,
  WrtierInfoBox,
  ServiceInfoTitle,
  ServiceInfoContents,
} from "./bookInfo.style";
import IsLoading from "@components/IsLoading";
import { BookInfo } from "@lib/interface/tables";
import AndroidSvg from "@components/svg/Android";
import AppleSvg from "@components/svg/Apple";
import HeadPhoneSvg from "@components/svg/HeadPhone";
import WindowSvg from "@components/svg/Window";
import MacSvg from "@components/svg/Mac";

export default function BookInfoIndex() {
  const { appendItems } = useContext(GlobalContext);
  const bookInfoResultRef = useRef<BookInfo | undefined>();

  const route = useRouter();
  const id = route?.query?.id ?? "";

  const { queryResult: bookInfoResult, isLoading: bookInfoIsLoading } =
    mySqlUtil.getBookInfo(id!.toString());

  bookInfoResultRef.current = bookInfoResult?.data;

  const seriesInfo = mySqlUtil.getBookSeries(id!.toString());

  const imageUrl = require(`../../images/${
    bookInfoResultRef.current?.isbn === undefined
      ? "sample"
      : "cat" + bookInfoResultRef.current?.isbn.split("_")[1]
  }.jpg`);

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return (
    <>
      {bookInfoIsLoading || seriesInfo.isLoading ? (
        <IsLoading />
      ) : (
        <Container>
          <InnerContainer>
            <MainContentsBox className="space-y-4">
              <BookTopInfoBox>
                <ImageBox>
                  <Image
                    src={imageUrl}
                    alt={"cat" + bookInfoResultRef.current?.isbn}
                    quality="100"
                    placeholder="blur"
                    height={280}
                    width={200}
                  />
                  <div className="mx-auto">미리보기</div>
                </ImageBox>

                <BookInfoBox>
                  <Category
                    categoryId={bookInfoResultRef.current?.category_id!}
                  />
                  <BookTitle>{bookInfoResultRef.current?.title}</BookTitle>
                  <StarBox className="space-x-1">
                    <EmptyStar>
                      <Star w={+(bookInfoResultRef.current?.score ?? 0) * 20} />
                    </EmptyStar>
                    <ScoreText>
                      {bookInfoResultRef.current?.score ?? 0}점
                    </ScoreText>
                    <span className="text-sm">(100명)</span>
                  </StarBox>

                  <WrtierInfoBox>
                    <Link
                      href={`/people/${bookInfoResultRef.current?.writer_id}`}
                    >
                      <a className="font-bold hover:text-gray-500">
                        {bookInfoResultRef.current?.writer_id}
                      </a>
                    </Link>{" "}
                    글<span className="text-gray-500"> | </span>
                    <Link
                      href={`/people/${bookInfoResultRef.current?.artist_id}`}
                    >
                      <a className="font-bold hover:text-gray-500">
                        {bookInfoResultRef.current?.artist_id}
                      </a>
                    </Link>
                    그림
                    <span className="text-gray-500"> | </span>
                    <Link
                      href={`/people/${bookInfoResultRef.current?.translator_id}`}
                    >
                      <a className="font-bold hover:text-gray-500">
                        {bookInfoResultRef.current?.translator_id}
                      </a>
                    </Link>{" "}
                    역
                  </WrtierInfoBox>

                  <p>{bookInfoResultRef.current?.publisher}</p>
                  {seriesInfo.queryResult?.data ? (
                    <p className="space-x-2">
                      <span>시리즈명: {seriesInfo.queryResult.data.id}</span>
                      <span>총{seriesInfo.queryResult.data.count}권</span>
                    </p>
                  ) : null}
                  <div className="border-b-2 border-t-2 w-full py-4 my-2">
                    <div className="flex flex-col">
                      <div className="flex">
                        <p>이벤트 큰 제목</p>
                        <p className="flex-1 text-right">이벤트 내용</p>
                      </div>
                      <div className="flex">
                        <p></p>
                        <p className="flex-1 text-right">이벤트 내용</p>
                      </div>
                      <small className="text-right">이벤트 기간</small>
                    </div>
                  </div>

                  <div className="flex flex-col items-center w-full">
                    <div className="flex w-full items-center">
                      <div className="px-6">구성</div>
                      <div className="flex flex-col flex-1 items-end">
                        <p>종이책 정가</p>
                        <p>전자책 정가</p>
                        <p>{bookInfoResultRef.current?.price}</p>
                      </div>
                    </div>
                    <small className="self-end">할인 기간</small>
                  </div>
                  <Link href={"/"}>
                    <a>구매버튼(바로 결제화면으로 이동)</a>
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      appendItems &&
                      appendItems(bookInfoResultRef.current?.isbn + "")
                    }
                    style={{ backgroundColor: "purple", color: "white" }}
                  >
                    장바구니
                  </button>
                </BookInfoBox>
              </BookTopInfoBox>

              <div className="border-gray-150 border-4 py-4 px-10 flex space-x-8 text-sm text-gray-800">
                <div className="flex flex-col">
                  <p>
                    <ServiceInfoTitle>출간정보</ServiceInfoTitle> :{" "}
                    <ServiceInfoContents>
                      {bookInfoResultRef.current?.publisher}
                    </ServiceInfoContents>
                  </p>
                  <p>
                    <ServiceInfoTitle>파일정보</ServiceInfoTitle>:{" "}
                    <ServiceInfoContents>
                      {bookInfoResultRef.current?.file_type} |{" "}
                      {bookInfoResultRef.current?.file_size}MB |{" "}
                      {bookInfoResultRef.current?.text_count}
                    </ServiceInfoContents>
                  </p>
                  <p>
                    <ServiceInfoTitle>ISBN</ServiceInfoTitle> :{" "}
                    <ServiceInfoContents>
                      {bookInfoResultRef.current?.isbn}
                    </ServiceInfoContents>
                  </p>
                </div>
                <div className="flex flex-col flex-1">
                  <p>
                    <ServiceInfoTitle>듣기기능</ServiceInfoTitle>:{" "}
                    {bookInfoResultRef.current?.listening_yn === "Y" ? (
                      <ServiceInfoContents className="space-x-1">
                        <HeadPhoneSvg width={15} height={15} />
                        <span>듣기 가능</span>{" "}
                      </ServiceInfoContents>
                    ) : (
                      "미지원"
                    )}
                  </p>
                  <div>
                    <p className="flex items-center space-x-1">
                      <ServiceInfoTitle>지원기기</ServiceInfoTitle>:{" "}
                      <ServiceInfoContents>
                        {bookInfoResultRef.current?.android_yn === "Y" ? (
                          <span className="space-x-1">
                            <AndroidSvg width={15} height={15} />
                            <span className="text-sm">Android</span>
                          </span>
                        ) : null}
                      </ServiceInfoContents>
                      {bookInfoResultRef.current?.ios_yn === "Y" ? (
                        <ServiceInfoContents className="space-x-1">
                          <AppleSvg width={20} height={20} />
                          <span className="text-sm">Android</span>
                        </ServiceInfoContents>
                      ) : null}
                      {bookInfoResultRef.current?.window_yn === "Y" ? (
                        <ServiceInfoContents className="space-x-1">
                          <WindowSvg width={15} height={15} />
                          <span className="text-sm">Android</span>
                        </ServiceInfoContents>
                      ) : null}
                      {bookInfoResultRef.current?.mac_yn === "Y" ? (
                        <ServiceInfoContents className="space-x-1">
                          <MacSvg width={15} height={15} />
                          <span className="text-sm">Android</span>
                        </ServiceInfoContents>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>

              <div className="cursor-pointer" onClick={clickHandler}>
                <div className="bg-slate-200 h-[800px]">Image~</div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => (
                  <p key={v}>
                    description: {bookInfoResultRef.current?.book_description}
                  </p>
                ))}
                <p>접기</p>
              </div>

              <div>저자 프로필</div>

              <div>저자 대표 저서</div>

              <div>저자 소개</div>

              <div>목차</div>

              <div>리뷰</div>

              <div>비슷한 장르의 책들 추천 </div>
            </MainContentsBox>
            <SideMenuContainer></SideMenuContainer>
          </InnerContainer>
        </Container>
      )}
    </>
  );
}
