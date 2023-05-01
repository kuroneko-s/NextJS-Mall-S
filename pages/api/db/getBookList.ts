import prismaClient from "@lib/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookList = await prismaClient.book.findMany();

  return res.json({
    ok: true,
    data: bookList,
  });
}
