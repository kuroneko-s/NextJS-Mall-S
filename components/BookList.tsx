import React from "react";
import styled from "styled-components";
import { Book } from "@lib/client/common";
import Link from "next/link";

interface BookListProps {
  bookInfoList: Book[];
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
export default function BookList({ bookInfoList }: BookListProps) {
  return (
    <ContentsContainer className="mb-6">
      <div className="flex justify-between ">
        <p className="font-bold text-2xl mb-4">신간 서적 베스트셀러</p>
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
              <div>
                <p className="font-semibold">{bookInfo.title}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">{bookInfo.author}</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-500 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={bookInfo.score !== "0" ? "red" : "none"}
                  stroke={bookInfo.score !== "0" ? "red" : "gray"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                <p>{bookInfo.score}</p>
              </div>
            </div>
          );
        })}
      </div>
    </ContentsContainer>
  );
}
