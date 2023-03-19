import BookList from "components/BookList";
import React from "react";
import styled from "styled-components";
import { Book } from "@lib/client/common";

const ImageContainer = styled.div`
  width: 100%;
  height: 280px;
  position: relative;
  border-radius: 0.375rem;

  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
    0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`;

const BookSample: Book[] = [
  {
    imageUrl: "red",
    author: "test",
    score: "0",
    title: "test 서적 1",
  },
  {
    imageUrl: "blue",
    author: "test",
    score: "5",
    title: "test 서적 1",
  },
  {
    imageUrl: "pink",
    author: "test",
    score: "5",
    title: "test 서적 1",
  },
  {
    imageUrl: "yellow",
    author: "test",
    score: "5",
    title: "test 서적 1",
  },
  {
    imageUrl: "green",
    author: "test",
    score: "5",
    title: "test 서적 1",
  },
  {
    imageUrl: "gray",
    author: "test",
    score: "5",
    title: "test 서적 1",
  },
];

export default function Event() {
  return (
    <div className="w-full min-h-screen space-y-14">
      <ImageContainer>
        <div className="w-full h-full bg-red-300 rounded-md"></div>
      </ImageContainer>

      <BookList bookInfoList={BookSample} />
      <BookList bookInfoList={BookSample} />
      <BookList bookInfoList={BookSample} />
    </div>
  );
}
