import prismaClient from "@lib/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query?.id ?? "";

  const artist = await prismaClient.artist.findUnique({
    where: {
      id: Number(id.toString()),
    },
  });

  if (artist === null) {
    return res.json({ ok: false, error: "artist not found id: " + id });
  }

  return res.json({
    ok: true,
    data: artist,
  });
}
