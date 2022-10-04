import { COOKIE_NAME } from "@lib/common";
import { getCookie, removeCookieAll } from "@lib/cookies";
import useItem from "@lib/itemSample";
import { NextPage } from "next";
import Item from "components/Item";
import Link from "next/link";
import { useEffect } from "react";

const Buy: NextPage = () => {
  const cookie = getCookie(COOKIE_NAME);
  const itemArr = useItem();
  const newArr =
    itemArr && itemArr.filter((v) => cookie && cookie.includes(v.id + ""));

  useEffect(() => {}, [cookie]);

  return (
    <div>
      <h1>살 목록들</h1>
      <div>
        <button
          type="button"
          onClick={() => {
            removeCookieAll(COOKIE_NAME);
          }}
        >
          전체 비우기
        </button>
      </div>
      <Link href="/">
        <a>
          <div>
            <button
              type="button"
              onClick={() => {
                removeCookieAll(COOKIE_NAME);
              }}
            >
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
};

export default Buy;
