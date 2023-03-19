import { useRouter } from "next/router";
import React from "react";

export default function Author() {
  const route = useRouter();
  const { id } = route?.query;

  return <div className="w-full min-h-screen">Author id-{id}</div>;
}
