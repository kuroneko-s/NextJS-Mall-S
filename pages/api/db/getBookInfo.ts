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

  const id = req.query?.id ?? "";

  if (id === "") {
    return res.json({
      ok: false,
    });
  }

  // 모든 데이터 첨부해서 가져오기
  const book = await prismaClient.book.findUnique({
    where: {
      isbn: Number(id.toString()),
    },
    include: {
      Artist: true,
      Category: true,
      Publisher: true,
      Translator: true,
      writer: true,
    },
  });

  if (book === null) {
    return res.json({ ok: false, error: "Not Found Book Id: " + id });
  }

  return res.json({
    ok: true,
    data: book,
  });
}
