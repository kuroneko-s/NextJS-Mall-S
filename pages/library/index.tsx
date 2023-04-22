import { GlobalContext } from "pages/_app";
import React, { useContext } from "react";
import { Container, ContentsContainer } from "styles/common";
import cat3 from "@images/cat3.jpg";
import Image from "next/image";

export default function Library() {
  const { userInfo } = useContext(GlobalContext);

  return (
    <Container>
      <ContentsContainer>
        <div className="w-full bg-slate-200 grid grid-cols-2">
          <div className="bg-red-300 p-2 w-full flex flex-row">
            <Image
              src={cat3}
              alt={"profile"}
              quality="100"
              placeholder="blur"
              height={180}
              width={140}
            />
            <div className="flex flex-row w-full justify-center items-center">
              <div className="px-4 w-1/3">
                <p>책제목</p>
                <p>글쓴이</p>
                <p>번역가</p>
              </div>
              <div className="w-1/3">구매일시</div>
              <div className="w-1/3">가격</div>
            </div>
          </div>
        </div>
      </ContentsContainer>
    </Container>
  );
}
