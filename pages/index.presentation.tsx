import React, { Dispatch, SetStateAction } from "react";
import { Container, ContentsContainer } from "styles/common";
import Head from "next/head";
import { cls } from "@lib/client/common";
import Recommendation from "@components/organisms/main/recommendation";
import Event from "@components/organisms/main/event";

interface IndexProps {
  setSwapping: Dispatch<SetStateAction<"recommendation" | "event">>;
  swapping: "recommendation" | "event";
}

// Presentation Component
export default function IndexPresentation({
  swapping,
  setSwapping,
}: IndexProps) {
  return (
    <Container>
      <Head>
        <title>도서 | 흑우냥이</title>
        {/* <meta /> */}
      </Head>
      <ContentsContainer>
        <div className="flex space-x-3 mb-5">
          <button
            className={cls(
              "font-bold text-base px-3 py-1",
              swapping === "recommendation"
                ? "bg-blue-400 text-white rounded-lg"
                : ""
            )}
            type="button"
            onClick={() => setSwapping("recommendation")}
          >
            도서
          </button>
          <button
            className={cls(
              "font-bold text-base px-3 py-1",
              swapping === "event" ? "bg-blue-400 text-white rounded-lg" : ""
            )}
            type="button"
            onClick={() => setSwapping("event")}
          >
            기획전
          </button>
        </div>

        {swapping === "recommendation" ? <Recommendation /> : <Event />}
      </ContentsContainer>
    </Container>
  );
}
