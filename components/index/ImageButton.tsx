import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(243 243 243);
  border-radius: 9999px;
  width: 4rem;
  height: 4rem;
`;

const ButtonText = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  text-align: center;
`;

export default function ImageButton() {
  return (
    <div className="mb-8 flex justify-center space-x-6">
      <Link href={"/new"}>
        <a className="space-y-1 cursor-pointer">
          <Button className="font-extrabold text-2xl">N</Button>
          <ButtonText>신간</ButtonText>
        </a>
      </Link>
      <Link href={"/best"}>
        <a className="space-y-1 cursor-pointer">
          <Button className="font-extrabold text-2xl">B</Button>
          <ButtonText>순위</ButtonText>
        </a>
      </Link>
      <Link href={"/event"}>
        <a className="space-y-1 cursor-pointer">
          <Button className="font-extrabold text-2xl">E</Button>
          <ButtonText>행사</ButtonText>
        </a>
      </Link>
      <Link href={"/coupon"}>
        <a className="space-y-1 cursor-pointer">
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              />
            </svg>
          </Button>
          <ButtonText>할인</ButtonText>
        </a>
      </Link>
      <Link href={"/calendar"}>
        <a className="space-y-1 cursor-pointer">
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </Button>
          <ButtonText>달력</ButtonText>
        </a>
      </Link>
    </div>
  );
}
