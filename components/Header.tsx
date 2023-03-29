import { useRouter } from "next/router";
import React from "react";
import Header1 from "./header/Header1";
import Header2 from "./header/Header2";
import Header3 from "./header/Header3";

export default function Header() {
  const router = useRouter();

  return (
    <div className="mb-6">
      <Header1 />
      <Header2 />
      {router.asPath === "/" ? <Header3 /> : null}
    </div>
  );
}
