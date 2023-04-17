import Image from "next/image";
import {
  BookInfoBox,
  BookTopInfoBox,
  ImageBox,
  BookTitle,
  ScoreText,
  WrtierInfoBox,
  ServiceInfoContents,
  ServiceInfoTitle,
} from "pages/bookInfo/bookInfo.style";
import React, { useContext } from "react";
import Category from "./Category";
import Link from "next/link";
import { GlobalContext } from "pages/_app";
import CartSvg from "svg/Cart";
import {
  BookInfo,
  BookSeries,
  TranslatorInfo,
  WriterInfo,
} from "@lib/interface/tables";
import HeadPhoneSvg from "@svg/HeadPhone";
import AndroidSvg from "@svg/Android";
import AppleSvg from "@svg/Apple";
import WindowSvg from "@svg/Window";
import MacSvg from "@svg/Mac";
import { EmptyStar, Star, StarBox } from "./index.style";

export interface InformationProps {
  bookInfo?: BookInfo | undefined;
  seriesInfo?: BookSeries | undefined;
  writerInfo?: WriterInfo | undefined;
  translatorInfo?: TranslatorInfo | undefined;
}

export default function Information({
  bookInfo,
  seriesInfo,
}: InformationProps) {
  const { appendItems } = useContext(GlobalContext);

  const imageUrl = require(`../../images/${
    bookInfo?.isbn === undefined
      ? "sample"
      : "cat" + bookInfo?.isbn.split("_")[1]
  }.jpg`);

  return (
    <>
      <BookTopInfoBox>
        <ImageBox>
          <Image
            src={imageUrl}
            alt={"cat" + bookInfo?.isbn}
            quality="100"
            placeholder="blur"
            height={280}
            width={200}
          />
          <div className="mx-auto">미리보기</div>
        </ImageBox>

        <BookInfoBox>
          <Category categoryId={bookInfo?.category_id!} />
          <BookTitle>{bookInfo?.title}</BookTitle>
          <StarBox className="space-x-1">
            <EmptyStar>
              <Star w={+(bookInfo?.score ?? 0) * 20} />
            </EmptyStar>
            <ScoreText>{bookInfo?.score ?? 0}점</ScoreText>
            <span className="text-sm">(100명)</span>
          </StarBox>

          <WrtierInfoBox>
            <Link href={`/people/${bookInfo?.writer_id}`}>
              <a className="font-bold hover:text-gray-500">
                {bookInfo?.writer_id}
              </a>
            </Link>{" "}
            글<span className="text-gray-500"> | </span>
            <Link href={`/people/${bookInfo?.artist_id}`}>
              <a className="font-bold hover:text-gray-500">
                {bookInfo?.artist_id}
              </a>
            </Link>
            그림
            <span className="text-gray-500"> | </span>
            <Link href={`/people/${bookInfo?.translator_id}`}>
              <a className="font-bold hover:text-gray-500">
                {bookInfo?.translator_id}
              </a>
            </Link>{" "}
            역
          </WrtierInfoBox>

          <p>{bookInfo?.publisher}</p>
          {seriesInfo ? (
            <p className="space-x-2">
              <span>시리즈명: {seriesInfo.id}</span>
              <span>총{seriesInfo.count}권</span>
            </p>
          ) : null}
          <div className="border-b-2 border-t-2 w-full py-4 my-2 min-w-[400px]">
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
                <p>{bookInfo?.price}</p>
              </div>
            </div>
            <small className="self-end">할인 기간</small>
          </div>

          <div className="flex flex-row w-full mt-3 space-x-4 justify-end">
            <div
              className="flex justify-center items-center cursor-pointer border-[1px] text-gray-900 p-3 rounded-md shadow-md font-bold"
              onClick={() => appendItems && appendItems(bookInfo?.isbn + "")}
            >
              <CartSvg width={24} height={24} />
            </div>

            <div
              className="flex items-center justify-center cursor-pointer bg-blue-500 text-gray-50 py-3 px-8 rounded-md shadow-md font-bold"
              onClick={() => appendItems && appendItems(bookInfo?.isbn + "")}
            >
              구매버튼(바로 결제화면으로 이동)
            </div>
          </div>
        </BookInfoBox>
      </BookTopInfoBox>
      <div className="border-gray-150 border-4 py-4 px-10 flex space-x-8 text-sm text-gray-800">
        <div className="flex flex-col">
          <p>
            <ServiceInfoTitle>출간정보</ServiceInfoTitle> :{" "}
            <ServiceInfoContents>{bookInfo?.publisher}</ServiceInfoContents>
          </p>
          <p className="min-w-[250px]">
            <ServiceInfoTitle>파일정보</ServiceInfoTitle>:{" "}
            <ServiceInfoContents className="min-w-[180px] whitespace-nowrap">
              {bookInfo?.file_type} | {bookInfo?.file_size}MB |{" "}
              {bookInfo?.text_count}
            </ServiceInfoContents>
          </p>
          <p>
            <ServiceInfoTitle>ISBN</ServiceInfoTitle> :{" "}
            <ServiceInfoContents>{bookInfo?.isbn}</ServiceInfoContents>
          </p>
        </div>
        <div className="flex flex-col flex-1">
          <p>
            <ServiceInfoTitle>듣기기능</ServiceInfoTitle>:{" "}
            {bookInfo?.listening_yn === "Y" ? (
              <ServiceInfoContents className="space-x-1">
                <HeadPhoneSvg width={15} height={15} />
                <span>듣기 가능</span>{" "}
              </ServiceInfoContents>
            ) : (
              "미지원"
            )}
          </p>
          <div>
            <p className="flex items-center space-x-1 min-w-[310px]">
              <ServiceInfoTitle>지원기기</ServiceInfoTitle>:{" "}
              <ServiceInfoContents>
                {bookInfo?.android_yn === "Y" ? (
                  <span className="space-x-1">
                    <AndroidSvg width={15} height={15} />
                    <span className="text-sm">Android</span>
                  </span>
                ) : null}
              </ServiceInfoContents>
              {bookInfo?.ios_yn === "Y" ? (
                <ServiceInfoContents className="space-x-1">
                  <AppleSvg width={20} height={20} />
                  <span className="text-sm">IOS</span>
                </ServiceInfoContents>
              ) : null}
              {bookInfo?.window_yn === "Y" ? (
                <ServiceInfoContents className="space-x-1">
                  <WindowSvg width={15} height={15} />
                  <span className="text-sm">Window</span>
                </ServiceInfoContents>
              ) : null}
              {bookInfo?.mac_yn === "Y" ? (
                <ServiceInfoContents className="space-x-1">
                  <MacSvg width={15} height={15} />
                  <span className="text-sm">Mac</span>
                </ServiceInfoContents>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
