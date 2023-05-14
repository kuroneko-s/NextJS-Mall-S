import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "@lib/server/session";
import prismaClient from "@lib/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = JSON.parse(req.body);

  const user = await prismaClient.user.findUnique({
    where: {
      email: email === undefined ? "" : email.toString(),
    },
  });

  if (user === null) {
    return res.json({
      ok: false,
      type: "email",
      message: "이메일을 찾을 수가 없어요!",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.json({
      ok: false,
      type: "password",
      message: "비밀번호를 잘못입력하셨어요!",
    });
  }

  req.session.user = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  await req.session.save();

  return res.json({
    ok: true,
  });
}

export default withIronSession(handler);
