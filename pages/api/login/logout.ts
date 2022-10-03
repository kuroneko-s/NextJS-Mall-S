import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "@lib/server/session";

function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.redirect(302, "/");
}

export default withIronSession(handler);
