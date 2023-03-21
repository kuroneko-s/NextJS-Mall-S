import React from "react";
import styled from "styled-components";
import { Book } from "@lib/client/common";
import Link from "next/link";
import BookScore from "./BookScore";
import BookTitle from "./BookTitle";
import BookAuthor from "./BookAuthor";

interface BookListProps {
  bookInfoList: Book[];
  title: String;
}

interface ImageBoxProps {
  image: string;
}

const ContentsContainer = styled.div`
  width: 100%;
  /* background-color: rgb(241 245 249); */
`;

const ImageBox = styled.div<ImageBoxProps>`
  width: 100%;
  height: 260px;
  background-color: ${(props) => props.image};
  border-radius: 0.375rem;
  cursor: pointer;
`;

// ImageSlide 처럼 좌우 이동 가능해져야함
export default function BookList({ bookInfoList, title }: BookListProps) {
  return (
    <ContentsContainer className="mb-6">
      <div className="flex justify-between ">
        <p className="font-bold text-2xl mb-4">{title}</p>
        <p className="font-bold text-lg text-gray-500 cursor-pointer hover:text-gray-400">
          더보기
        </p>
      </div>
      <div className="flex space-x-4 w-full h-full">
        {bookInfoList.map((bookInfo, idx) => {
          return (
            <div className="w-full" key={idx}>
              <Link href={`/bookInfo/${bookInfo.id}`}>
                <ImageBox image={bookInfo.imageUrl} />
              </Link>
              <BookTitle title={bookInfo.title} id={bookInfo.title} />
              <BookAuthor title={bookInfo.author} id={bookInfo.author} />
              <BookScore score={bookInfo.score} />
            </div>
          );
        })}
      </div>
    </ContentsContainer>
  );
}