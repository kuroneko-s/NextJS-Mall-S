import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "@lib/server/session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state, error, error_description } = req.query;
  console.log(code, state, error, error_description);

  // https://nid.naver.com/oauth2.0/token?client_id={클라이언트 아이디}&client_secret={클라이언트 시크릿}&grant_type=authorization_code&state={상태 토큰}&code={인증 코드}

  const json = await (
    await fetch(
      `https://nid.naver.com/oauth2.0/token?client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&grant_type=authorization_code&state=${state}&code=${code}`
    )
  ).json();

  console.log(json);

  const { response } = await (
    await fetch(`https://openapi.naver.com/v1/nid/me`, {
      headers: {
        Authorization: `${json.token_type} ${json.access_token}`,
      },
    })
  ).json();

  req.session.user = {
    id: response.id,
    name: response.nickname,
  };

  console.log("naver login - ", req.session.user);

  await req.session.save();

  return res.redirect(302, "/");
}

export default withIronSession(handler);
