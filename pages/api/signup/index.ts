import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "@lib/server/session";
import prismaClient from "@lib/server/prismaClient";
import { Mail } from "@lib/server/mail";
import bcrypt from "bcrypt";
import { signUp } from "@lib/MailTemplate";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const saltRounds = 10;
  const { email, password } = req.body;

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user !== null) {
    return res.json({
      ok: false,
      message: "해당 이메일로 가입되어있는 계정이 있습니다.",
    });
  }

  const verifyingMsg = Math.floor(Math.random() * 1000000);

  Mail({
    to: email,
    subject: "회원가입 인증 메일",
    htmlMsg: signUp(verifyingMsg.toString()),
  });

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    await prismaClient.user.create({
      data: {
        id: email,
        email: email,
        type: "EMAIL",
        role: "USER",
        password: hash,
        name: email,
        token: verifyingMsg.toString(),
        createUser: email,
        updateUser: email,
      },
    });
  });

  return res.json({
    ok: true,
    message: "성공",
    url: `/signup/verifying?email=${email}`,
  });
}

export default withIronSession(handler);
