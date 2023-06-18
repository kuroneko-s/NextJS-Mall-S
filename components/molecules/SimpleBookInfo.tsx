import Image from "next/image";
import Link from "next/link";
import React from "react";
import StarSvg from "../atoms/svg/Star";
import emptyImg from "@images/empty.jpg";
import { cls } from "@lib/client/common";
import { useRouter } from "next/router";

interface SimpleBookInfoProps {
  isbn: number;
  imagePath?: string;
  title: string;
  writerId: number;
  writerName: string;
  score: string;
  width: number;
  height: number;
  index?: number;
  isRotate: boolean;
}

export default function SimpleBookInfo({
  isbn,
  imagePath,
  title,
  writerId,
  writerName,
  score,
  width,
  height,
  index = 0,
  isRotate,
}: SimpleBookInfoProps) {
  const router = useRouter();
  return (
    <div
      className={cls(
        "hover:bg-slate-100 rounded-md cursor-pointer",
        isRotate ? "flex justify-between items-center mr-2" : ""
      )}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        router.push(`/bookInfo/${isbn}`);
      }}
    >
      <div
        className="overflow-hidden rounded-md"
        style={{
          width: width,
          height: height,
        }}
      >
        <Image
          src={imagePath ?? emptyImg}
          alt={title}
          height={height}
          width={width}
        />
      </div>

      {isRotate ? (
        <>
          <p className="flex-grow-[0.5] text-center font-bold">{index}</p>
          <div className="flex-grow text-start">
            <p className="text-gray-800 font-bold">{title}</p>
            <Link href={`/writer/${writerId}`}>
              <a
                className="text-gray-600 hover:text-gray-400"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.stopPropagation();
                }}
              >
                <p>{writerName}</p>
              </a>
            </Link>
            <div className="flex items-center space-x-1 text-gray-500 text-xs">
              <StarSvg
                fill={score !== "0" ? "red" : "none"}
                stroke={score !== "0" ? "red" : "gray"}
              />
              <p>{score}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-800 font-bold">{title}</p>
          <Link href={`/writer/${writerId}`}>
            <a className="text-gray-600 hover:text-gray-400">
              <p>{writerName}</p>
            </a>
          </Link>
          <div className="flex items-center space-x-1 text-gray-500 text-xs">
            <StarSvg
              fill={score !== "0" ? "red" : "none"}
              stroke={score !== "0" ? "red" : "gray"}
            />
            <p>{score}</p>
          </div>
        </>
      )}
    </div>
  );
}
