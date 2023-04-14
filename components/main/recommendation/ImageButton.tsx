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
      <Link href={"/event"}>
        <a className="space-y-1 cursor-pointer">
          <Button className="font-extrabold text-2xl">E</Button>
          <ButtonText>행사</ButtonText>
        </a>
      </Link>
    </div>
  );
}
