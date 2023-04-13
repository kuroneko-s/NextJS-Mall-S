import React from "react";
import { Body } from "styles/common";

interface LayoutProps {
  children: any;
}

export default function Layout({ children }: LayoutProps) {
  return <Body>{children}</Body>;
}
