import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "@lib/server/session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json({
    ok: true,
  });
}

export default withIronSession(handler);
