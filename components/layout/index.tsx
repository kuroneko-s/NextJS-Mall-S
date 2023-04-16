import React from "react";
import { Body } from "styles/common";
import { LayoutProps } from "./interface";

export default function Layout({ children }: LayoutProps) {
  return <Body>{children}</Body>;
}
