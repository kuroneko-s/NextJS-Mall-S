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

  const writer = await prismaClient.writer.findUnique({
    where: {
      id: Number(id.toString()),
    },
  });

  if (writer === null) {
    return res.json({ ok: false, error: "writer not found id: " + id });
  }

  return res.json({
    ok: true,
    data: writer,
  });
}
