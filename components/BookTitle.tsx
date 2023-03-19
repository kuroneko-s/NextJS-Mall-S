import Link from "next/link";
import React from "react";

interface BookTitleProps {
  id: string;
  title: string;
}

export default function BookTitle({ id, title }: BookTitleProps) {
  return (
    <Link href={`/bookInfo/${id}`}>
      <a className="text-gray-800 font-bold">
        <p>{title}</p>
      </a>
    </Link>
  );
}
