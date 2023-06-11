import prismaClient from "@lib/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

type QueryType = "TODAY" | "MONTH" | "YEAR";

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

  if (!body || body.hasOwnProperty("startDt") || body.hasOwnProperty("endDt")) {
    return res.json({
      ok: false,
    });
  }

  const buyHistory = await prismaClient.buyHistory.findMany({
    where: {
      success: true,
      AND: {
        updateDt: {
          lte: body.startDt /* new Date("2022-01-30").toISOString() */,
          gte: body.endDt /* new Date("2022-01-31").toISOString() */,
        },
      },
    },
  });

  return res.json({
    ok: true,
    data: buyHistory,
  });
}
