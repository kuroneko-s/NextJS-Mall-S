import prismaClient from "@lib/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query?.id?.toString() ?? "";

  if (id === "") {
    return res.json({
      ok: false,
    });
  }

  const bookList = await prismaClient.book.findMany({
    where: {
      artistId: +id,
    },
  });

  return res.json({
    ok: true,
    data: bookList,
  });
}
