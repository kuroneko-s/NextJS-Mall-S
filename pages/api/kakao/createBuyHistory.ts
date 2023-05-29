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

  const body = JSON.parse(req.body);
  let buyHistory = null;

  try {
    buyHistory = await prismaClient.buyHistory.create({
      data: {
        userId: body.userId,
        itemCode: body.itemCode,
        cid: body.cid,
        partnerOrderId: body.partnerOrderId,
        partnerUserId: body.partnerUserId,
        itemName: body.itemName,
        quantity: body.quantity,
        totalAmount: body.totalAmount,
        createUser: body.userId,
        updateUser: body.userId,
      },
    });
  } catch (err) {
    return res.json({
      ok: false,
    });
  }

  if (buyHistory === null) {
    return res.json({
      ok: false,
    });
  }

  return res.json({
    ok: true,
    data: buyHistory,
  });
}
