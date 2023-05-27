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

  const id = req.query?.id ?? "";

  const category = await prismaClient.category.findUnique({
    where: {
      id: Number(id.toString()),
    },
  });

  if (category === null) {
    return res.json({ ok: false, error: "category not found id: " + id });
  }

  return res.json({
    ok: true,
    data: category,
  });
}
