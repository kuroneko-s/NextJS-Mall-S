import { COOKIE_NAME } from "@lib/common";
import { getCookie } from "@lib/cookies";
import useItem from "@lib/itemSample";
import kakaoPay from "@lib/server/kakaoPay";
import Link from "next/link";
import { GlobalContext } from "pages/_app";
import React, { useEffect, useContext } from "react";
import Item from "components/Item";

export default function Cart() {
  const { baskets, appendItems, removeAll } = useContext(GlobalContext);

  // cookie 적용
  useEffect(() => {
    const cookie = getCookie(COOKIE_NAME);
    if (!baskets || (baskets && baskets.length <= 0)) {
      if (cookie && cookie.length >= 1) {
        appendItems && appendItems(...cookie);
      }
    }
  }, [baskets, appendItems]);

  const sampelItems = useItem();
  const newArr =
    sampelItems &&
    sampelItems.filter((v) => baskets && baskets.includes(v.id + ""));

  const kakaoPayHandler = async () => {
    const result = await kakaoPay({
      item_name: "Test 외 결제",
      quantity: 1,
      tax_free_amount: 1,
      total_amount: 1,
    });

    window.location.href = result;
  };

  return (
    <div>
      <h1>살 목록들</h1>
      <div>
        <button
          className="bg-yellow-500"
          style={{ marginRight: "5px" }}
          type="button"
          onClick={() => {
            removeAll && removeAll();
          }}
        >
          전체 비우기
        </button>
        <button
          className="bg-yellow-500"
          type="button"
          onClick={kakaoPayHandler}
        >
          카카오 페이 결제
        </button>
      </div>
      <Link href="/">
        <a>
          <div>
            <button className="bg-yellow-500" type="button">
              Home
            </button>
          </div>
        </a>
      </Link>
      <div>
        {newArr &&
          newArr.length > 0 &&
          newArr.map((item) => (
            <Item index={item.id} key={item.id} item={item} type={"buy"} />
          ))}
      </div>
    </div>
  );
}
