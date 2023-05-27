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
