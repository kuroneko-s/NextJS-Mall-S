import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "@lib/server/session";
import prismaClient from "@lib/server/prismaClient";
import nodemailer from "nodemailer";
import { Mail } from "@lib/server/mail";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state, error, error_description } = req.query;

  // https://nid.naver.com/oauth2.0/token?client_id={클라이언트 아이디}&client_secret={클라이언트 시크릿}&grant_type=authorization_code&state={상태 토큰}&code={인증 코드}

  const json = await (
    await fetch(
      `https://nid.naver.com/oauth2.0/token?client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&grant_type=authorization_code&state=${state}&code=${code}`
    )
  ).json();

  const { response } = await (
    await fetch(`https://openapi.naver.com/v1/nid/me`, {
      headers: {
        Authorization: `${json.token_type} ${json.access_token}`,
      },
    })
  ).json();

  let user = await prismaClient.user.findUnique({
    where: {
      id: response.id,
    },
  });

  if (user === null) {
    user = await prismaClient.user.create({
      data: {
        id: response.id,
        email: "",
        role: "USER",
        password: "",
        type: "NAVER",
        name: response.nickname,
        createUser: response.id,
        updateUser: response.id,
      },
    });
  } else {
    user = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        loginCount: user.loginCount + 1,
        updateUser: response.id,
      },
    });
  }

  const mailResponse = Mail({
    to: "drivespublic@gmail.com",
    subject: "회원가입 인증 메일",
    htmlMsg: `<h1>안녕하세요. 회원가입 인증 메일입니다.</h1><p>1234</p>`,
  });

  console.log(mailResponse);

  req.session.user = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  await req.session.save();

  return res.redirect(302, "/");
}

export default withIronSession(handler);
