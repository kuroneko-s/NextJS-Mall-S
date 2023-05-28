import Image from "next/image";
import Link from "next/link";
import { GlobalContext } from "pages/_app";
import { useContext } from "react";
import { Book } from "@prisma/client";
import TranshCanSvg from "@svg/TranshCan";

interface BookProps {
  book: Book;
  buyDirect: string | string[] | undefined;
}

export default function BookItem({ book, buyDirect }: BookProps) {
  const { removeBook } = useContext(GlobalContext);

  const removeButtonHandler = () => {
    removeBook && removeBook(book.isbn + "");
  };

  return (
    <div className="flex w-full space-x-8 rounded-md shadow-md py-4 px-2 bg-slate-50">
      <Link href={`/bookInfo/${book.isbn}`}>
        <a className="flex cursor-pointer rounded-md overflow-hidden">
          <Image
            src={book.imagePath}
            alt={book.title}
            quality="100"
            width={120}
            height={180}
          />
        </a>
      </Link>

      <Link href={`/bookInfo/${book.isbn}`}>
        <a className="flex flex-col justify-center space-y-2 cursor-pointer flex-1 hover:text-gray-400 text-gray-900">
          <p className="space-x-2 flex items-center">
            <span className="font-semibold text-lg">제목:</span>{" "}
            <span>{book.title}</span>
          </p>
          <p className="space-x-2 flex items-center">
            <span className="font-semibold text-lg">가격:</span>{" "}
            <span>{new Intl.NumberFormat("ko-KR").format(book.price)}원</span>
          </p>
        </a>
      </Link>

      {buyDirect !== undefined ? null : (
        <button
          type="button"
          onClick={removeButtonHandler}
          className="right-0 px-9 hover:bg-slate-200 rounded-md"
        >
          <TranshCanSvg />
        </button>
      )}
    </div>
  );
}
