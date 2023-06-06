import React, { useState } from "react";
import { cls } from "@lib/client/common";

interface DescriptionSummaryProps {
  title: string;
  description: string;
}

export default function DescriptionSummary({
  title,
  description,
}: DescriptionSummaryProps) {
  const [show, setShow] = useState<boolean>(false);

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    setShow((cur) => !cur);
  };

  return (
    <div className="cursor-pointer" onClick={clickHandler}>
      <p className="text-xl font-bold text-gray-800 pb-2 border-b-2 mb-2 border-gray-500">
        {title}
      </p>
      <div className={cls("overflow-hidden", show ? "h-auto" : "h-[150px]")}>
        <div className="bg-slate-200 h-[800px]">Image~</div>
        <p>{description}</p>
      </div>
      <div>
        <p className="text-right">접기</p>
      </div>
    </div>
  );
}
