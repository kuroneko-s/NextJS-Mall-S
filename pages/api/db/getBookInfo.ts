import { executeQuery } from "@lib/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isbn = req.query?.isbn ?? "";

  const queryResult = await executeQuery({
    query: `select * from book where isbn = ?`,
    values: [isbn.toString()],
  });

  if (queryResult.hasOwnProperty("error")) {
    return res.json({ ok: false, error: queryResult.error });
  }

  const bookInfoArr = queryResult.result ?? [];

  if (bookInfoArr?.length > 1) {
    return res.json({ ok: false, error: "조회 실패 - UnUnique Key" });
  }

  return res.json({
    ok: true,
    data: bookInfoArr[0],
  });
}
