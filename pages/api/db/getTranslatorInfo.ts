import { executeQuery } from "@lib/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query?.id ?? "";

  const queryResult = await executeQuery({
    query: `select * from translator where name = ?`,
    values: [id.toString()],
  });

  if (queryResult.hasOwnProperty("error")) {
    return res.json({ ok: false, error: queryResult.error });
  }

  const translatorInfoArr = queryResult.result ?? [];

  if (translatorInfoArr?.length > 1) {
    return res.json({ ok: false, error: "조회 실패 - UnUnique Key" });
  }

  return res.json({
    ok: true,
    data: translatorInfoArr[0],
  });
}
