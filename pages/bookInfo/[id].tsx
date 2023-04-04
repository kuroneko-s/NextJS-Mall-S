import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalContext } from "pages/_app";
import React, { useContext } from "react";
import styled from "styled-components";
import Category from "@components/bookinfo/Category";
import { mySqlUtil } from "@lib/client/MySqlUtil";

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;

  max-width: 1280px;
  width: 100%;
  height: 100%;
  padding: 2.5rem 5rem;
`;

const ImageBox = styled.div``;
const BookInfoBox = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  flex: 1;
  padding-left: 3rem;
`;

const SideMenuContainer = styled.div`
  width: 350px;
`;

const BookTitle = styled.p`
  font-weight: 800;
  font-size: 2rem;
`;

const StarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const EmptyStar = styled.span`
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

const Star = styled.span<{ w: number }>`
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

export default function BookInfo() {
  const { appendItems } = useContext(GlobalContext);

  const route = useRouter();
  const id = route?.query?.id ?? "";

  const bookInfoResult = mySqlUtil.getBookInfo(id!.toString());

  const bookInfo = bookInfoResult.queryResult?.data;
  let seriesInfo;

  /* if (bookInfo?.series_yn === "Y") {
    seriesInfo = mySqlUtil.getBookAndBookSeries(bookInfo.isbn);
  } */

  console.log("🚀 ~ file: [id].tsx:96 ~ BookInfo ~ bookInfo:", bookInfo);

  const imageUrl = require(`../../images/${
    bookInfo?.isbn === undefined
      ? "sample"
      : "cat" + bookInfo.isbn.split("_")[1]
  }.jpg`);

  return (
    <div className="px-16 bg-red-200 w-full min-h-screen">
      <InnerContainer className="mx-auto">
        <div className="flex flex-1">
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
              <span className="text-sm text-[#fa722e] font-bold">
                {bookInfo?.score ?? 0}점
              </span>
              <span className="text-sm">(100명)</span>
            </StarBox>

            <div className="text-sm">
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
            </div>
            <p>{bookInfo?.publisher}</p>
            <p>책 시리즈</p>
            <div className="border-b-2 border-t-2 w-full py-4 my-2">
              <p>이벤트 내용</p>
            </div>

            <p>가격</p>
            <p>가격 이벤트 기간</p>
            <p>구매버튼</p>
            <p>name: {bookInfo?.title}</p>
            <p>price: {bookInfo?.price}</p>
            <p>description: {bookInfo?.book_description}</p>
            <button
              type="button"
              onClick={() => appendItems && appendItems(bookInfo?.isbn + "")}
              style={{ backgroundColor: "purple", color: "white" }}
            >
              장바구니
            </button>
          </BookInfoBox>
        </div>
        <SideMenuContainer></SideMenuContainer>
      </InnerContainer>
    </div>
  );
}
