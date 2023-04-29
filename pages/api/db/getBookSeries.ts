import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@lib/server/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query?.id ?? "";

  const bookdAndBookSeries = await prismaClient.bookAndBookSeries.findFirst({
    where: {
      bookId: Number(id.toString()),
    },
  });

  if (bookdAndBookSeries === null) {
    return res.json({
      ok: false,
      error: "bookdAndBookSeries not found id: " + id,
    });
  }

  const bookSeries = await prismaClient.bookSeries.findUnique({
    where: {
      id: bookdAndBookSeries.bookseriesId,
    },
  });

  if (bookSeries === null) {
    return res.json({ ok: false, error: "bookSeries not found id: " + id });
  }

  return res.json({
    ok: true,
    data: bookSeries,
  });
}
