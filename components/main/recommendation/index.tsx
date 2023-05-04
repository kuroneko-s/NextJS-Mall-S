import React from "react";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import IsLoading from "@components/common/IsLoading";
import ImageSlider from "../imageSlider";
import Link from "next/link";
import {
  Button,
  ButtonText,
  Container,
  Contents,
  Item,
  Items,
} from "./index.style";
import StarSvg from "@svg/Star";
import Image from "next/image";
import emptyImg from "@images/empty.jpg";

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
              {bookListQueryResult?.data.slice(0, 6).map((bookInfo, idx) => {
                return (
                  <div className="w-full" key={idx}>
                    <Link href={`/bookInfo/${bookInfo.isbn}`}>
                      <a>
                        <Image
                          src={bookInfo.imagePath}
                          alt={bookInfo.title}
                          height={260}
                          width={200}
                        />
                      </a>
                    </Link>
                    <Link href={`/bookInfo/${bookInfo.isbn}`}>
                      <a className="text-gray-800 font-bold">
                        <p>{bookInfo.title}</p>
                      </a>
                    </Link>
                    <Link href={`/author/${bookInfo.writerId}`}>
                      <a className="text-gray-500 hover:text-gray-400">
                        <p>{bookInfo.writer.name}</p>
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
                          <Image
                            src={
                              bookListQueryResult?.data[v].imagePath ?? emptyImg
                            }
                            alt={bookListQueryResult?.data[v].title}
                            width={110}
                            height={140}
                          />
                          <p className="flex-grow-[0.5] text-center">{v + 1}</p>
                          <div className="flex-grow text-start">
                            <Link
                              href={`/bookInfo/${bookListQueryResult?.data[v].isbn}`}
                            >
                              <a className="text-gray-800 font-bold">
                                <p>{bookListQueryResult?.data[v].title}</p>
                              </a>
                            </Link>
                            <Link
                              href={`/author/${bookListQueryResult?.data[v].writerId}`}
                            >
                              <a className="text-gray-500 hover:text-gray-400">
                                <p>
                                  {bookListQueryResult?.data[v].writer.name}
                                </p>
                              </a>
                            </Link>
                            <div className="flex items-center space-x-1 text-gray-500 text-xs">
                              <StarSvg
                                fill={
                                  bookListQueryResult?.data[v].score !== "0"
                                    ? "red"
                                    : "none"
                                }
                                stroke={
                                  bookListQueryResult?.data[v].score !== "0"
                                    ? "red"
                                    : "gray"
                                }
                              />
                              <p>{bookListQueryResult?.data[v].score}</p>
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
