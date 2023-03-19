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
      <BookList bookInfoList={BookSample} />
      <BookList bookInfoList={BookSample} />
      <BookListGrid bookInfoList={BookSample} />
      <BookList bookInfoList={BookSample} />
    </div>
  );
}
