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

  const eventMany = await prismaClient.event.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return res.json({
    ok: true,
    data: eventMany,
  });
}
