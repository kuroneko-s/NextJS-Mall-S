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

  const user = await prismaClient.user.findFirst();

  if (user === null) {
    return res.json({ ok: false, error: "User Not Found" });
  }

  return res.json({
    ok: true,
    data: user,
  });
}
