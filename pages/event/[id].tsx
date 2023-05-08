import SliderOfSix from "@components/common/SliderOfSix";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Container, ContentsContainer } from "styles/common";
import Image from "next/image";
import Link from "next/link";

export default function Event() {
  const router = useRouter();
  const id = router.query?.id ?? "";

  // get Book
  const { queryResult: bookListQueryResult, isLoading: bookListIsLoading } =
    mySqlUtil.getEventInfo(id.toString());

  return (
    <Container>
      <Head>
        <title>Event | 흑우냥이</title>
        {/* <meta /> */}
      </Head>
      <ContentsContainer className="min-h-[71vh] space-y-4">
        <Link href={"/event"}>
          <a className="font-extrabold text-2xl pb-1 border-b-2 w-fit border-blue-300 text-gray-700 hover:text-gray-500">
            이벤트
          </a>
        </Link>
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
