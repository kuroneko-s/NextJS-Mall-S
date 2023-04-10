import Image from "next/image";
import {
  BookInfoBox,
  BookTopInfoBox,
  ImageBox,
  BookTitle,
  StarBox,
  EmptyStar,
  Star,
  ScoreText,
  WrtierInfoBox,
} from "pages/bookInfo/bookInfo.style";
import React, { useContext } from "react";
import Category from "./Category";
import Link from "next/link";
import { GlobalContext } from "pages/_app";
import { BookInfoProps } from "pages/bookInfo/info.type";
import CartSvg from "@components/svg/Cart";

export default function BookMainInfo({ bookInfo, seriesInfo }: BookInfoProps) {
  const { appendItems } = useContext(GlobalContext);

  const imageUrl = require(`../../images/${
    bookInfo?.isbn === undefined
      ? "sample"
      : "cat" + bookInfo?.isbn.split("_")[1]
  }.jpg`);

  return (
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
  );
}
