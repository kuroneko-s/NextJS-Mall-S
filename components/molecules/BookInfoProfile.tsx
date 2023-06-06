import { cls } from "@lib/client/common";
import React from "react";

interface BookInfoProfileProps {
  profileClickHandler: (e: React.MouseEvent<HTMLElement>) => void;
  profileSelect: boolean;
  title: string;
  context: string;
  dataIndex: number;
}

export default function BookInfoProfile({
  profileSelect,
  profileClickHandler,
  title,
  context,
  dataIndex,
}: BookInfoProfileProps) {
  return (
    <p className="flex items-center space-x-2 pb-2">
      <span className="font-bold text-lg">{title}</span>{" "}
      <span
        className={cls(
          "font text-gray-600 pt-1 pb-1 hover:text-gray-400 cursor-pointer",
          profileSelect ? "border-gray-800 border-b-[1px]" : ""
        )}
        onClick={profileClickHandler}
        data-index={dataIndex}
      >
        {context}
      </span>
    </p>
  );
}
