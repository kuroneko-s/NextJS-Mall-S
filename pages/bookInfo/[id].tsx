import useBook from "@lib/client/useBook";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalContext } from "pages/_app";
import React, { useContext } from "react";
import styled from "styled-components";

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;
  padding: 2.5rem 5rem;
`;

const ImageBox = styled.div``;
const BookInfoBox = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-end;
  flex: 1;
`;

const SideMenuContainer = styled.div`
  width: 350px;
`;

export default function BookInfo() {
  const { appendItems } = useContext(GlobalContext);

  const route = useRouter();
  const id = route?.query?.id ?? "";
  const bookInfoResult = useBook({ id: id!.toString() });

  const bookInfo = bookInfoResult.queryResult?.data;

  const imageUrl = require(`../../images/${
    bookInfo?.isbn === undefined ? "sample" : "cat" + bookInfo.isbn
  }.jpg`);

  return (
    <div className="px-16 bg-red-200 w-full min-h-screen">
      <InnerContainer>
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
            <p>카테고리</p>
            <p>책제목</p>
            <p>별점</p>
            <p>정보</p>
            <p>출판</p>
            <p>책 시리즈</p>
            <p>이벤트 내용</p>
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
