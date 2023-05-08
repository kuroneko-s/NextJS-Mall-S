import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "@lib/server/session";
import prismaClient from "@lib/server/prismaClient";
import { Mail } from "@lib/server/mail";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const mailResponse = Mail({
    to: "drivespublic@gmail.com",
    subject: "회원가입 인증 메일",
    htmlMsg: `<h1>안녕하세요. 회원가입 인증 메일입니다.</h1><p>1234</p>`,
  });

  console.log(mailResponse);

  return res.redirect(302, "/");
}

export default withIronSession(handler);
