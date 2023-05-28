import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);
  const { pg_token, params } = req.query!;
  const splitedParams = params!.toString().split("===");
  splitedParams.push("pg_token", pg_token!.toString());

  const bodyParams = splitedParams.join("&");

  const json = await (
    await fetch("https://kapi.kakao.com/v1/payment/approve", {
      method: "POST",
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: bodyParams,
    })
  ).json();

  console.log("🚀 ~ file: success.ts:23 ~ json:", json);

  return null; /* res.redirect(302, "/kakao/success"); */
}
