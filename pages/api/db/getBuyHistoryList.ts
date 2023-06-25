import { BuyHistoryAggregation } from "@lib/interface/db";
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

  const startDt = req.query?.startDt?.toString() || "";
  const endDt = req.query?.endDt?.toString() || "";
  if (startDt === "" || endDt === "") {
    return res.json({
      ok: false,
    });
  }

  const buyHistoryList: BuyHistoryAggregation[] =
    await prismaClient.$queryRawUnsafe(`
        SELECT 
          yyyymmdd AS DT
          , (
            SELECT SUM(totalAmount)
            FROM BuyHistory
            WHERE 1=1 
            AND success = true
            AND DATE_FORMAT(paymentApproved, '%Y%m%d') = A.yyyymmdd
          ) AS TOTAL_AMOUNT
          , (
            SELECT SUM(1)
            FROM BuyHistory
            WHERE 1=1 
            AND success = true
            AND DATE_FORMAT(paymentApproved, '%Y%m%d') = A.yyyymmdd
          ) AS TOTAL
        FROM Date_v AS A
        WHERE yyyymmdd BETWEEN ${startDt.replaceAll("-", "")} 
        AND ${endDt.replaceAll("-", "")}
    `);

  const result = buyHistoryList.map((buyHistory: BuyHistoryAggregation) => {
    if (buyHistory.TOTAL === null) {
      buyHistory.TOTAL = 0;
    }

    if (buyHistory.TOTAL_AMOUNT === null) {
      buyHistory.TOTAL_AMOUNT = 0;
    }

    return buyHistory;
  });

  return res.json({
    ok: true,
    data: result,
  });
}
