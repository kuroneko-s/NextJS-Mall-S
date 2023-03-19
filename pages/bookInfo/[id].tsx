import { useRouter } from "next/router";
import React from "react";

export default function BookInfo() {
  const route = useRouter();
  const { id } = route?.query;

  return <div className="w-full min-h-screen">BookInfo id-{id}</div>;
}
