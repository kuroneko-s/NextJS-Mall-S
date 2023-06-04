import Link from "next/link";
import React from "react";

interface EventButtonProps {
  symbol: string;
  title: string;
  url: string;
}

export default function EventButton({ symbol, title, url }: EventButtonProps) {
  return (
    <Link href={url}>
      <a className="space-y-1 cursor-pointer group">
        <div className="flex justify-center items-center rounded-full w-16 h-16 font-extrabold text-2xl bg-slate-200 group-hover:bg-blue-400 group-hover:text-white">
          {symbol}
        </div>
        <p className="text-sm font-bold text-center">{title}</p>
      </a>
    </Link>
  );
}
