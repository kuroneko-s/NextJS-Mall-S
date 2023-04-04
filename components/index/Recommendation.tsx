import { BookSample } from "@lib/client/common";
import BookList from "components/BookList";
import BookListGrid from "components/BookListGrid";
import React from "react";
import ImageButton from "./ImageButton";
import ImageSlider from "./ImageSlider";

export default function Recommendation() {
  return (
    <div className="w-full min-h-screen">
      <ImageSlider />
      <ImageButton />
      <BookList bookInfoList={BookSample} title={"신간 서적"} />
      <BookListGrid
        bookInfoList={BookSample}
        title={"지금 많이 읽고 있는 작품"}
      />
    </div>
  );
}
