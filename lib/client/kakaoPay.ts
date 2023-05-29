import { server } from "@lib/common";
import { SessionUser } from "@lib/interface/db";

interface KakaoPayProps {
  /** 상품명, 최대 100자 */
  item_name: string;
  // 상품코드, 최대 100자, book id,id,id 형식
  item_code: string;
  /** 수량 */
  quantity: number;
  /** 총액 */
  total_amount: number;
  /** 상품 비과세 금액 */
  tax_free_amount: number;
}

// API - https://developers.kakao.com/docs/latest/ko/kakaopay/single-payment
export default async function kakaoPay(props: KakaoPayProps) {
  const user: SessionUser = await fetch(`${server}/api/user/info`)
    .then((res) => res.json())
    .then((json) => json.data);

  const cid = "TC0ONETIME"; // TEST 결제. 정식 결제는 제휴필요.
  const partnerOrderId = `RIDI0CLONEITEMS${props.item_code}`.substring(0, 100);
  const partnerUserId = `RIDI0CLONEUSER${user.id}`.substring(0, 100);

  const params = {
    userId: user.id,
    itemCode: props.item_code,
    cid: cid,
    partnerOrderId: partnerOrderId,
    partnerUserId: partnerUserId,
    itemName: props.item_name,
    quantity: props.quantity,
    totalAmount: props.total_amount,
  };

  // buyHistory 저장
  const createResult = await fetch(`${server}/api/kakao/createBuyHistory`, {
    method: "POST",
    body: JSON.stringify(params),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });

  if (!createResult.ok) {
    return `${server}/kakao/fail?message=잘못된_정보입니다.`;
  }

  const redirectParams = `cid=${cid}===partner_order_id=${partnerOrderId}===partner_user_id=${partnerUserId}===id=${createResult.data.id}===userId=${user.id}`;

  const formBody = [];
  formBody.push(`cid=${cid}`);
  formBody.push(`partner_order_id=${partnerOrderId}`);
  formBody.push(`partner_user_id=${partnerUserId}`);
  formBody.push(
    `approval_url=${server}/api/kakao/success?params=${redirectParams}`
  );
  formBody.push(`cancel_url=${server}/kakao/cancel`);
  formBody.push(`fail_url=${server}/kakao/fail`);

  for (const key in props) {
    // @ts-ignore
    formBody.push(`${key}=${props[key]}`);
  }

  // 결제 요청
  const kakaoResult = await (
    await fetch("https://kapi.kakao.com/v1/payment/ready", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
      },
      body: formBody.join("&"),
    })
  ).json();

  const body = {
    id: createResult.data.id,
    data: {
      tid: kakaoResult.tid,
      expirationPeriod: kakaoResult.created_at,
      redirectMobile: kakaoResult.next_redirect_mobile_url,
      redirectApp: kakaoResult.next_redirect_app_url,
      redirectPc: kakaoResult.next_redirect_pc_url,
    },
  };

  // buyHistory 갱신
  const updateResult = await fetch(`${server}/api/kakao/updateBuyHistory`, {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });

  if (!updateResult.ok) {
    return `${server}/kakao/fail?message=결제_실패`;
  }

  return kakaoResult.next_redirect_pc_url;
}
