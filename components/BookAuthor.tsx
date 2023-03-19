import Link from "next/link";
import React from "react";

interface BookAuthorProps {
  id: string;
  title: string;
}

export default function BookAuthor({ id, title }: BookAuthorProps) {
  return (
    <Link href={`/author/${id}`}>
      <a className="text-gray-500 hover:text-gray-400">
        <p>{title}</p>
      </a>
    </Link>
  );
}
