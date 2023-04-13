import { useRouter } from "next/router";
import React from "react";
import MainMenu from "./MainMenu";
import SubMenu from "./SubMenu";

export default function Menu() {
  const router = useRouter();

  return (
    <>
      <MainMenu />
      {router.asPath === "/" ? <SubMenu /> : null}
    </>
  );
}
