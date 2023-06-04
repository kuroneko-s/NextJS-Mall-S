import React from "react";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import IsLoading from "@components/common/IsLoading";
import ImageSlider from "../imageSlider";
import Link from "next/link";
import { Button, ButtonText } from "./index.style";
import ImageSliderSix from "../../organisms/imageSliderSix";
import ImageSliderNine from "../../organisms/imageSliderNine";

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
          <div className="my-4 flex justify-center space-x-6">
            <Link href={"/event"}>
              <a className="space-y-1 cursor-pointer">
                <Button className="font-extrabold text-2xl">E</Button>
                <ButtonText>행사</ButtonText>
              </a>
            </Link>
          </div>

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
