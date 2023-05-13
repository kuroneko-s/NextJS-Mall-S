import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "@lib/server/session";
import prismaClient from "@lib/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  const { verifying, email } = req.body;

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user === null) {
    return res.json({
      ok: false,
      message: "이메일에 해당하는 회원가입 이력이 없습니다. 다시 시도해주세요.",
      url: "/signup",
    });
  }

  if (user.token !== verifying) {
    return res.json({
      ok: false,
      message: "옳바른 인증번호가 아니에요! 다시확인해주세요!",
    });
  }

  await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      token: null,
    },
  });

  return res.json({
    ok: true,
    message: "회원가입이 되셨어요!",
    url: "/signup/success",
  });
}

export default withIronSession(handler);
