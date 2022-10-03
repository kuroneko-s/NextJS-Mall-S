import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "@lib/server/session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session?.user;

  if (!user) {
    return res.json({ ok: false, error: "not foudn user info" });
  }

  return res.json({
    ok: true,
    data: {
      id: user?.id,
      name: user?.name,
    },
  });
}

export default withIronSession(handler);
