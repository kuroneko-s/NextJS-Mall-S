import { executeQuery } from "@lib/server/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { hasError } from "./Common";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query?.id ?? "";

  const queryResult = await executeQuery({
    query: `select * from bookandbookseries where book_id = ?`,
    values: [id.toString()],
  });

  if (hasError(queryResult)) {
    return res.json({ ok: false, error: queryResult.error });
  }

  const bookInfoArr = queryResult.result ?? [];

  if (bookInfoArr?.length > 1) {
    return res.json({ ok: false, error: "조회 실패 - UnUnique Key" });
  }

  const bookSeriesId = bookInfoArr[0]?.bookseries_id;

  const seriesQueryResult = await executeQuery({
    query: `select * from bookseries where id = ?`,
    values: [bookSeriesId],
  });

  if (hasError(seriesQueryResult)) {
    return res.json({ ok: false, error: queryResult.error });
  }

  const seriesArr = seriesQueryResult.result ?? [];

  if (seriesArr?.length > 1) {
    return res.json({ ok: false, error: "조회 실패 - UnUnique Key" });
  }

  return res.json({
    ok: true,
    data: seriesArr[0],
  });
}
