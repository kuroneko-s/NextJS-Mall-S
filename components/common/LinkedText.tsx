import Link from "next/link";
import React from "react";

interface LinkedTextProps {
  url: string;
  context: string;
  size: "sm" | "md" | "xl";
}

export default function LinkedText({ url, context, size }: LinkedTextProps) {
  return (
    <Link href={url}>
      <a className={`text-gray-700 hover:text-gray-500 text-${size}`}>
        {context}
      </a>
    </Link>
  );
}
