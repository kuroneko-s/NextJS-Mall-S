import IsLoading from "@components/common/IsLoading";
import SliderOfSix from "@components/common/SliderOfSix";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import { BookWithWriter } from "@lib/interface/db";
import { useRouter } from "next/router";
import React from "react";
import { Container, ContentsContainer } from "styles/common";

export default function Writer() {
  const route = useRouter();
  const { id } = route?.query;

  const { queryResult: result, isLoading: writerIsLoading } =
    mySqlUtil.getWriterInfo(id?.toString() ?? "");
  const { queryResult: bookResult, isLoading: bookIsLoading } =
    mySqlUtil.getBookListForWriter(id?.toString() ?? "");

  console.log(result);
  console.log(bookResult);

  const bookList = bookResult?.data;

  return (
    <>
      {bookIsLoading || writerIsLoading || bookResult?.data === undefined ? (
        <IsLoading />
      ) : (
        <Container>
          <ContentsContainer>
            <div className="border-2 border-dashed border-blue-300 mb-6 py-4 px-1">
              <p>이름: {result?.data.name}</p>
              <p>국적: {result?.data.nationality}</p>
              <p>생년: {result?.data.birth}</p>
              <p>경력: {result?.data.career}</p>
              <p className="whitespace-pre-wrap">
                학력: <br /> {result?.data.education}
              </p>
              <p>
                소개: <br /> {result?.data.description}
              </p>
            </div>
            <SliderOfSix
              title="해당 작가가 쓴 글이에요!"
              bookList={bookList!.map((book) => {
                return {
                  ...book,
                  writer: {
                    id: result?.data.id!,
                    name: result?.data.name!,
                  },
                };
              })}
            />
          </ContentsContainer>
        </Container>
      )}
    </>
  );
}
