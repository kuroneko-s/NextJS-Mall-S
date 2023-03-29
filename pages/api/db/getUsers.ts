import { executeQuery } from "@lib/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await executeQuery({
    query: "select * from user",
    values: [],
  });

  if (result.hasOwnProperty("error")) {
    return res.json({ ok: false, error: result.error });
  }

  return res.json({
    ok: true,
    data: result.result,
  });
}
