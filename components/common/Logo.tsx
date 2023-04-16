import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Logo() {
  const router = useRouter();

  return (
    <div className="text-3xl font-extrabold cursor-pointer">
      <Link href={"/"}>
        <p>
          <span className="text-blue-500">RIDI</span>
          {router.asPath === "/" ? <span>BOOKS</span> : null}
        </p>
      </Link>
    </div>
  );
}
