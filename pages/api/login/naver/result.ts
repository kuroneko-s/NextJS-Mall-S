import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "@lib/server/session";
import prismaClient from "@lib/server/prismaClient";
import { Mail } from "@lib/server/mail";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state, error, error_description } = req.query;

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

  const user = await prismaClient.user.upsert({
    where: {
      email: response.email,
    },
    update: {
      id: response.id,
      name: response.name,
      updateUser: response.id,
    },
    create: {
      id: response.id,
      email: response.email,
      password: "",
      name: response.name,
      type: "NAVER",
      role: "USER",
      createUser: response.id,
      updateUser: response.id,
    },
  });

  req.session.user = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  await req.session.save();

  return res.redirect(302, "/");
}

export default withIronSession(handler);
