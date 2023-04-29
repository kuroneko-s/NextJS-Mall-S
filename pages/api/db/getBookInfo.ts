import prismaClient from "@lib/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query?.id ?? "";

  const book = await prismaClient.book.findUnique({
    where: {
      isbn: Number(id.toString()),
    },
  });

  console.log("bookList - ", book);

  if (book === null) {
    return res.json({ ok: false, error: "Not Found Book Id: " + id });
  }

  return res.json({
    ok: true,
    data: book,
  });
}
