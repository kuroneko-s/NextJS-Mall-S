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

  const startDt = req.query?.startDt?.toString() || "";
  const endDt = req.query?.endDt?.toString() || "";

  if (startDt === "" || endDt === "") {
    return res.json({
      ok: false,
    });
  }

  const buyHistory = await prismaClient.buyHistory.findMany({
    where: {
      success: true,
      AND: {
        updateDt: {
          gte: new Date(
            startDt
          ).toISOString() /* new Date(startDt).toISOString() */,
          lte: new Date(
            endDt
          ).toISOString() /* new Date(endDt).toISOString() */,
        },
      },
    },
  });

  return res.json({
    ok: true,
    data: buyHistory,
  });
}
