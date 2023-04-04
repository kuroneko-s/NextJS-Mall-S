import { executeQuery } from "@lib/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryResult = await executeQuery({
    query: `select * from book order by create_dt limit 10`,
    values: [],
  });

  if (queryResult.hasOwnProperty("error")) {
    return res.json({ ok: false, error: queryResult.error });
  }

  console.log(queryResult);

  return res.json({
    ok: true,
    data: queryResult.result,
  });
}
