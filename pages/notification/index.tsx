import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Container, ContentsContainer } from "styles/common";

export default function Notification() {
  return (
    <Container>
      <ContentsContainer className="min-h-[71vh]">
        <Head>
          <title>알림 | 흑우냥이</title>
        </Head>

        <h1 className="font-extrabold text-2xl pb-1 border-b-2 mb-2 w-fit border-blue-300 text-gray-700">
          알림
        </h1>
        <div className="space-y-4">
          {new Array(9).fill(1).map((_, idx) => {
            return (
              <Link key={idx} href={`/bookInfo/1`}>
                <a className="h-[180px] flex items-center px-2 hover:bg-slate-100 rounded-md">
                  <div className="overflow-hidden rounded-md h-[160px]">
                    <Image
                      src={"/empty.jpg"}
                      height={160}
                      width={115}
                      alt={"default"}
                    />
                  </div>

                  <div className="flex flex-col ml-4">
                    <p>test</p>
                    <p>test</p>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </ContentsContainer>
    </Container>
  );
}
