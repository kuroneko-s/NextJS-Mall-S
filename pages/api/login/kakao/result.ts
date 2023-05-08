import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "@lib/server/session";
import prismaClient from "@lib/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, error, error_description } = req.query;

  if (error) {
    res.status(404).json({ ok: false, error_message: error_description });
  }

  if (code) {
    const formData: string[] = [];
    formData.push("grant_type=authorization_code");
    formData.push(`client_id=${process.env.KAKAO_API_KEY}`);
    formData.push(`redirect_uri=http://localhost:3000/api/login/kakao/result`);
    formData.push(`code=${code}`);

    const formBody = formData.join("&");

    const json = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    })
      .then((res) =>
        res.json().catch((err) => {
          console.error("json parse error");
          console.error(err);
        })
      )
      .catch((err) => {
        console.error(err);
        res.redirect(404, "/404?message=API_ERROR");
      });

    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `${json.token_type} ${json.access_token}`,
      },
    })
      .then((res) =>
        res.json().catch((err) => {
          console.error("json parse error");
          console.error(err);
        })
      )
      .catch((err) => {
        console.error("kakao info profile 가져오기 실패");
        console.error(err);
        res
          .status(404)
          .json({ ok: false, message: "kakao info profile 가져오기 실패" });
      });

    console.log("login user info - ", response);

    req.session.user = {
      id: response.id,
      name: response.kakao_account.profile.nickname,
      role: "USER",
    };

    await req.session.save();

    return res.redirect(302, "/");
  }
}

export default withIronSession(handler);
