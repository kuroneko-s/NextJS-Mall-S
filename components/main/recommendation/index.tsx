import React from "react";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import IsLoading from "@components/common/IsLoading";
import ImageSlider from "../ImageSlider";
import Link from "next/link";
import {
  Button,
  ButtonText,
  Container,
  Contents,
  ImageBox,
  ImageItem,
  Item,
  Items,
} from "./index.style";
import StarSvg from "@svg/Star";

export default function Recommendation() {
  const bookInfoResult = mySqlUtil.getBookList();
  const bookList = bookInfoResult.queryResult?.data ?? [];

  return (
    <>
      {bookList.length === 0 ? (
        <IsLoading />
      ) : (
        <div className="w-full min-h-screen">
          <ImageSlider />
          <div className="mb-8 flex justify-center space-x-6">
            <Link href={"/event"}>
              <a className="space-y-1 cursor-pointer">
                <Button className="font-extrabold text-2xl">E</Button>
                <ButtonText>행사</ButtonText>
              </a>
            </Link>
          </div>
          <div className="w-full mb-6">
            <div className="flex justify-between ">
              <p className="font-bold text-2xl mb-4">신간 서적</p>
              <p className="font-bold text-lg text-gray-500 cursor-pointer hover:text-gray-400">
                더보기
              </p>
            </div>
            <div className="flex space-x-4 w-full h-full">
              {bookList.slice(0, 6).map((bookInfo, idx) => {
                return (
                  <div className="w-full" key={idx}>
                    <Link href={`/bookInfo/${bookInfo.isbn}`}>
                      <ImageBox image={bookInfo.image_path ? "red" : "blue"} />
                    </Link>
                    <Link href={`/bookInfo/${bookInfo.title}`}>
                      <a className="text-gray-800 font-bold">
                        <p>{bookInfo.title}</p>
                      </a>
                    </Link>
                    <Link href={`/author/${bookInfo.writer_id}`}>
                      <a className="text-gray-500 hover:text-gray-400">
                        <p>{bookInfo.writer_id}</p>
                      </a>
                    </Link>
                    <div className="flex items-center space-x-1 text-gray-500 text-xs">
                      <StarSvg
                        fill={bookInfo.score !== "0" ? "red" : "none"}
                        stroke={bookInfo.score !== "0" ? "red" : "gray"}
                      />
                      <p>{bookInfo.score}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Container className="mb-6">
            <div>
              <p className="font-bold text-2xl mb-4">
                지금 많이 읽고 있는 작품
              </p>
            </div>
            <Contents>
              {[1, 2, 3].map((_, idx) => {
                idx *= 3;
                return (
                  <Items key={idx} className="space-y-2">
                    {[idx, idx + 1, idx + 2].map((v, idx) => {
                      return (
                        <Item key={idx}>
                          <ImageItem
                            imageUrl={bookList[v].image_path ? "red" : "blue"}
                          />
                          <p className="flex-grow-[0.5] text-center">{v + 1}</p>
                          <div className="flex-grow text-start">
                            <Link href={`/bookInfo/${bookList[v].title}`}>
                              <a className="text-gray-800 font-bold">
                                <p>{bookList[v].title}</p>
                              </a>
                            </Link>
                            <Link href={`/author/${bookList[v].writer_id}`}>
                              <a className="text-gray-500 hover:text-gray-400">
                                <p>{bookList[v].writer_id}</p>
                              </a>
                            </Link>
                            <div className="flex items-center space-x-1 text-gray-500 text-xs">
                              <StarSvg
                                fill={
                                  bookList[v].score !== "0" ? "red" : "none"
                                }
                                stroke={
                                  bookList[v].score !== "0" ? "red" : "gray"
                                }
                              />
                              <p>{bookList[v].score}</p>
                            </div>
                          </div>
                        </Item>
                      );
                    })}
                  </Items>
                );
              })}
            </Contents>
          </Container>
        </div>
      )}
    </>
  );
}
