import { executeQuery } from "@lib/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query?.id ?? "";

  const queryResult = await executeQuery({
    query: `select * from writer where name = ?`,
    values: [id.toString()],
  });

  if (queryResult.hasOwnProperty("error")) {
    return res.json({ ok: false, error: queryResult.error });
  }

  const writerInfoArr = queryResult.result ?? [];

  if (writerInfoArr?.length > 1) {
    return res.json({ ok: false, error: "조회 실패 - UnUnique Key" });
  }

  return res.json({
    ok: true,
    data: writerInfoArr[0],
  });
}
