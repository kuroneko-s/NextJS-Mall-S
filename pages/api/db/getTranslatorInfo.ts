import prismaClient from "@lib/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query?.id ?? "";

  const translator = await prismaClient.translator.findUnique({
    where: {
      id: Number(id.toString()),
    },
  });

  if (translator === null) {
    return res.json({ ok: false, error: "category not found id: " + id });
  }

  return res.json({
    ok: true,
    data: translator,
  });
}
