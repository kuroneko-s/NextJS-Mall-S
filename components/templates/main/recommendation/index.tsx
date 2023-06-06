import React from "react";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import IsLoading from "@components/molecules/IsLoading";
import ImageSlider from "@components/molecules/imageSlider";
import EventButtonList from "@components/molecules/eventButtonList";
import ImageSliderSix from "@components/molecules/imageSliderSix";
import ImageSliderNine from "@components/molecules/imageSliderNine";

export default function Recommendation() {
  const { queryResult: bookListQueryResult, isLoading: bookListIsLoading } =
    mySqlUtil.getBookListWithWriter("18");

  return (
    <>
      {bookListIsLoading ? (
        <IsLoading />
      ) : (
        <div className="w-full min-h-screen">
          <ImageSlider />

          <EventButtonList />

          {bookListQueryResult?.data !== undefined ? (
            <ImageSliderSix
              bookList={bookListQueryResult?.data}
              title="신간 서적"
            />
          ) : null}

          {bookListQueryResult?.data !== undefined ? (
            <ImageSliderNine
              list={bookListQueryResult.data}
              title={"지금 많이 읽고있는 책"}
            />
          ) : null}
        </div>
      )}
    </>
  );
}
