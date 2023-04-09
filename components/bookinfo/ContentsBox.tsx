import { cls } from "@lib/client/common";
import { BookInfo } from "@lib/interface/tables";
import { ContentsTitle } from "pages/bookInfo/bookInfo.style";
import React, { useState } from "react";

interface ContentsBoxProps {
  title: string;
  description: string;
}

export default function ContentsBox({ title, description }: ContentsBoxProps) {
  const [show, setShow] = useState<boolean>(false);

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    setShow((cur) => !cur);
  };

  return (
    <div className="cursor-pointer" onClick={clickHandler}>
      <ContentsTitle>{title}</ContentsTitle>
      <div className={cls("overflow-hidden", show ? "h-auto" : "h-[150px]")}>
        <div className="bg-slate-200 h-[800px]">Image~</div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => (
          <p key={v}>description: {description}</p>
        ))}
      </div>
      <div>
        <p className="text-right">접기</p>
      </div>
    </div>
  );
}
