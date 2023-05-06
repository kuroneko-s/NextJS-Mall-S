import Head from "next/head";
import React from "react";
import { Container, ContentsContainer } from "styles/common";
import Image from "next/image";
import Link from "next/link";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import IsLoading from "@components/common/IsLoading";

export default function Event() {
  const { queryResult: eventListQueryResult, isLoading: eventListIsLoading } =
    mySqlUtil.getEventList();

  console.log(eventListQueryResult);

  return (
    <>
      {eventListIsLoading ? (
        <IsLoading />
      ) : (
        <Container>
          <Head>
            <title>Event | 흑우냥이</title>
          </Head>
          <ContentsContainer className="min-h-[71vh] space-y-4">
            <Link href={"/event"}>
              <a className="font-extrabold text-2xl border-b-2 mb-2 w-fit border-blue-300 text-gray-700 hover:text-gray-500">
                이벤트
              </a>
            </Link>

            <div className="space-y-4">
              {eventListQueryResult?.data === undefined ? (
                <div>Is Empty Design</div>
              ) : (
                eventListQueryResult?.data.map((event, idx) => {
                  return (
                    <Link key={idx} href={`/event/${event.id}`}>
                      <a className="h-[180px] flex items-center px-2 hover:bg-slate-100 rounded-md">
                        <div className="overflow-hidden rounded-md h-[160px]">
                          <Image
                            src={event.filePath}
                            height={160}
                            width={115}
                            alt={event.title}
                          />
                        </div>

                        <div className="flex flex-col ml-4">
                          <p>{event.title}</p>
                          <p>{event.contents}</p>
                        </div>
                      </a>
                    </Link>
                  );
                })
              )}
            </div>
          </ContentsContainer>
        </Container>
      )}
    </>
  );
}
