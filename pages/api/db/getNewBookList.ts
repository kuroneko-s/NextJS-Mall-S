import prismaClient from "@lib/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.json({
      ok: false,
    });
  }

  const newBookList = await prismaClient.book.findMany({
    take: 10,
    orderBy: [
      {
        createDt: "desc",
      },
    ],
  });

  return res.json({
    ok: true,
    data: newBookList,
  });
}
