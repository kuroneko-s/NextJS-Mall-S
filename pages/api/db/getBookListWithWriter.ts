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

  const limit = req.query?.limit ?? "18";

  const bookList = await prismaClient.book.findMany({
    include: {
      writer: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: +limit,
  });

  return res.json({
    ok: true,
    data: bookList,
  });
}
