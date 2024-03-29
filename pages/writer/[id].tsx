import IsLoading from "@components/molecules/IsLoading";
import ImageSliderSix from "@components/molecules/imageSliderSix";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import Head from "next/head";
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

  return (
    <>
      {bookIsLoading || writerIsLoading || bookResult?.data === undefined ? (
        <IsLoading />
      ) : (
        <Container>
          <Head>
            <title>{result?.data.name} | 흑우냥이</title>
          </Head>
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
            <ImageSliderSix
              title="해당 작가가 쓴 글이에요!"
              bookList={bookResult?.data!.map((book) => {
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
