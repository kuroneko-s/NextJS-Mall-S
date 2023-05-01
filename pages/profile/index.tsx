import Image from "next/image";
import React, { useContext } from "react";
import { Container, ContentsContainer } from "styles/common";
import empty from "@images/empty.jpg";
import Book from "@svg/Book";
import { GlobalContext } from "pages/_app";

export default function Profile() {
  const { userInfo } = useContext(GlobalContext);
  console.log(userInfo);

  const id =
    (userInfo?.id + "").slice(0, 6) +
    "*".repeat((userInfo?.id + "").length - 6);

  return (
    <Container>
      <ContentsContainer className="h-[71vh]">
        <div className="flex">
          <div className="flex mr-4 w-full h-72 rounded-lg">
            <div className="w-1/3 py-4 px-4">
              <div className="h-full bg-slate-200 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={empty}
                  alt={"profile"}
                  quality="100"
                  placeholder="blur"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center flex-1">
              <p>ID: {id}</p>
              <p>이름: {userInfo?.name}</p>
              <p>이메일: email@email.com</p>
            </div>
          </div>
          <div className="w-full h-72 rounded-lg">
            <div className="w-full h-full grid grid-cols-3 grid-rows-2 p-2">
              <div className="flex flex-col items-center justify-center cursor-pointer p-3 hover:bg-slate-50 rounded-lg">
                <Book />
                <p className="mt-2 font-bold text-sm">구매이력</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[360px] w-full mt-6 border-2 rounded-md border-blue-200 shadow-md ring-offset-2 ring-blue-200 ring-2"></div>
      </ContentsContainer>
    </Container>
  );
}
