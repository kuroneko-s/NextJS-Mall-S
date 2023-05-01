import { server } from "@lib/common";

interface KakaoPayProps {
  /** 상품명, 최대 100자 */
  item_name: string;
  /** 수량 */
  quantity: number;
  /** 총액 */
  total_amount: number;
  /** 상품 비과세 금액 */
  tax_free_amount: number;
}

// https://developers.kakao.com/docs/latest/ko/kakaopay/single-payment
export default async function kakaoPay(props: KakaoPayProps) {
  const user = await (await fetch(`${server}/api/user/info`)).json();

  const formBody = [];
  const cid = "TC0ONETIME";
  const partnerOrderId = "kakaopayinnernextJsexample";
  const partnerUserId = user.data.id + "kakaopayinnernextJsexample";
  const redirectParams = `cid=${cid}===partnerOrderId=${partnerOrderId}===partnerUserId=${partnerUserId}`;

  formBody.push(`cid=${cid}`);
  formBody.push(`partner_order_id=${partnerOrderId}`);
  formBody.push(`partner_user_id=${partnerUserId}`);
  formBody.push(
    `approval_url=http://localhost:3000/api/kakao/success?params=${redirectParams}`
  );
  formBody.push("cancel_url=http://localhost:3000/kakao/cancel");
  formBody.push("fail_url=http://localhost:3000/kakao/fail");

  for (const key in props) {
    // @ts-ignore
    formBody.push(`${key}=${props[key]}`);
  }

  const json = await (
    await fetch("https://kapi.kakao.com/v1/payment/ready", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
      },
      body: formBody.join("&"),
    })
  ).json();

  // 이부분 DB로 동작해야하는데 지금은 DB 안쓰고 있어서 session에다가 저장함.
  // 확장할떈 반드시 DB로 tid값 유니크 잡아줘서 저장해서 써야함 ...
  // req.session.user = {
  //   id: info.id,
  //   name: info.kakao_account.profile.nickname,
  // };

  // await req.session.save();

  return json.next_redirect_pc_url;
}
