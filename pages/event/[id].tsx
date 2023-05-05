import SliderOfSix from "@components/common/SliderOfSix";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Container, ContentsContainer } from "styles/common";
import eventDefault from "@images/eventDefault.jpg";
import Image from "next/image";

export default function Event() {
  const router = useRouter();
  const id = router.query?.id ?? "";

  // get Book
  const { queryResult: bookListQueryResult, isLoading: bookListIsLoading } =
    mySqlUtil.getBookListWithWriter("18");
  console.log(id);

  return (
    <Container>
      <Head>
        <title>Event | 흑우냥이</title>
        {/* <meta /> */}
      </Head>
      <ContentsContainer className="min-h-[71vh] space-y-4">
        <div className="w-fit mx-auto">
          <Image src={eventDefault} alt="evnet image" placeholder="blur" />
        </div>
        <div>
          {bookListQueryResult?.data !== undefined ? (
            <SliderOfSix
              bookList={bookListQueryResult.data}
              title="이벤트 추천작!"
            />
          ) : null}
        </div>
      </ContentsContainer>
    </Container>
  );
}
