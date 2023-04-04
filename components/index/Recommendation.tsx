import BookList from "components/BookList";
import BookListGrid from "components/BookListGrid";
import React from "react";
import ImageButton from "./ImageButton";
import ImageSlider from "./ImageSlider";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import IsLoading from "@components/IsLoading";

export default function Recommendation() {
  const bookInfoResult = mySqlUtil.getBookList();
  console.log(
    "🚀 ~ file: Recommendation.tsx:10 ~ Recommendation ~ bookInfoResult:",
    bookInfoResult
  );
  const bookList = bookInfoResult.queryResult?.data ?? [];
  console.log(
    "🚀 ~ file: Recommendation.tsx:15 ~ Recommendation ~ bookList:",
    bookList
  );

  return (
    <>
      {bookList.length === 0 ? (
        <IsLoading />
      ) : (
        <div className="w-full min-h-screen">
          <ImageSlider />
          <ImageButton />
          <BookList bookInfoList={bookList} title={"신간 서적"} />
          <BookListGrid
            bookInfoList={bookList}
            title={"지금 많이 읽고 있는 작품"}
          />
        </div>
      )}
    </>
  );
}
