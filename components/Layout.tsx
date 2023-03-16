import React from "react";

interface LayoutProps {
  children: any;
}

export default function Layout({ children }: LayoutProps) {
  return <div className="mx-auto h-full min-h-screen">{children}</div>;
}
