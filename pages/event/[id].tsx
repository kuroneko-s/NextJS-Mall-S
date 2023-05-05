import SliderOfSix from "@components/common/SliderOfSix";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Container, ContentsContainer } from "styles/common";
import Image from "next/image";

export default function Event() {
  const router = useRouter();
  const id = router.query?.id ?? "";

  // get Book
  const { queryResult: bookListQueryResult, isLoading: bookListIsLoading } =
    mySqlUtil.getEventInfo(id.toString());
  console.log(bookListQueryResult);

  return (
    <Container>
      <Head>
        <title>Event | 흑우냥이</title>
        {/* <meta /> */}
      </Head>
      <ContentsContainer className="min-h-[71vh] space-y-4">
        <div className="w-fit mx-auto">
          <Image
            src={"/eventDefault.jpg"}
            alt="evnet image"
            width={884}
            height={7985}
          />
        </div>
        <div>
          {bookListQueryResult?.data !== undefined ? (
            <SliderOfSix
              bookList={bookListQueryResult.data.Books}
              title="이벤트 추천작!"
            />
          ) : null}
        </div>
      </ContentsContainer>
    </Container>
  );
}
