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

  const keyword = JSON.parse(req.body)?.keyword ?? "";

  if (keyword === "") {
    return res.json({
      ok: false,
    });
  }

  const bookList = await prismaClient.$queryRawUnsafe(
    `SELECT * FROM Book WHERE title LIKE '%${keyword}%'`
  );

  return res.json({
    ok: true,
    data: bookList,
  });
}
