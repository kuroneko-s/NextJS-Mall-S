import { server } from "@lib/common";
import prismaClient from "@lib/server/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { PaymentResult } from "./interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pg_token, params } = req.query!;

  const splitedParams = params!.toString().split("===");
  const id = splitedParams[3].split("=")[1]; // db id
  const userId = splitedParams[4].split("=")[1]; // user id

  const buyHistory = await prismaClient.buyHistory.findUnique({
    where: {
      id: +id,
    },
  });

  if (
    buyHistory === null ||
    buyHistory.tid === null ||
    pg_token === undefined
  ) {
    const encode = encodeURIComponent("요청이_유효하지_않습니다.");
    return res.redirect(302, `${server}/kakao/fail?message=${encode}`);
  }

  const paramArr = [...splitedParams.slice(0, 3)];
  paramArr.push(`tid=${buyHistory.tid}`);
  paramArr.push(`total_amount=${buyHistory.totalAmount}`);
  paramArr.push(`pg_token=${pg_token.toString()}`);

  const json: PaymentResult = await (
    await fetch("https://kapi.kakao.com/v1/payment/approve", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
      },
      body: paramArr.join("&"),
    })
  ).json();

  let body = {};

  if (json.hasOwnProperty("code")) {
    body = {
      id: id,
      data: {
        errorCode: json.code + "",
        errorMsg: json.msg,
        success: false,
        updateUser: userId,
      },
    };
  } else {
    body = {
      id: id,
      data: {
        aid: json.aid,
        paymentType: json.payment_method_type,
        vatAmount: json.amount.vat,
        paymentCreated: json.created_at,
        paymentApproved: json.approved_at,
        updateUser: userId,
        success: true,
      },
    };
  }

  // buyHistory 갱신
  const updateResult = await fetch(`${server}/api/kakao/updateBuyHistory`, {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });

  if (!updateResult.ok) {
    const encode = encodeURIComponent("결제_실패.");
    return res.redirect(302, `/kakao/fail?message=${encode}`);
  }

  return res.redirect(302, "/kakao/success");
}
