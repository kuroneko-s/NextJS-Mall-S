import prismaClient from "@lib/server/prismaClient";
import { Book } from "@prisma/client";
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

  const body = JSON.parse(req.body);
  const keyword = body?.keyword ?? "";
  const currentPage = body.currentPage ?? "1";

  if (keyword === "") {
    return res.json({
      ok: false,
    });
  }

  const limitStart = (currentPage - 1) * 10;
  const limitEnd = 10;

  const bookList: Book[] = await prismaClient.$queryRawUnsafe(
    `SELECT * FROM Book WHERE title LIKE '%${keyword}%' ORDER BY createDt LIMIT ${limitStart}, ${limitEnd}`
  );

  // TODO : Prisma 기능으로 LIKE 지원하는게 없어서queryRawUnsafe 사용중인데 count 값을 못가져옴. 다른 방법 있는지 확인 필요.
  const allBookList: Book[] = await prismaClient.$queryRawUnsafe(
    `SELECT * FROM Book WHERE title LIKE '%${keyword}%'`
  );

  return res.json({
    ok: true,
    data: bookList,
    count: allBookList.length,
  });
}
