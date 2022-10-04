import { COOKIE_NAME } from "@lib/common";
import { removeCookieValue } from "@lib/cookies";
import Image from "next/image";
import Link from "next/link";
import type { Item } from "../lib/itemSample";

interface ItemProps {
  index: number;
  item: Item;
  btnHandler?: any;
  type?: string;
}

export default function Item({ index = 1, item, btnHandler, type }: ItemProps) {
  const i = index % 4;
  const image = require(`../images/cat${i}.jpg`);

  return (
    <>
      <Link href={`/item/${item.id}`}>
        <a>
          <div style={{ cursor: "pointer" }}>
            <Image
              src={image}
              alt={"cat" + index}
              quality="100"
              placeholder="blur"
            />
            <p>name: {item.name}</p>
            <p>price: {item.price}</p>
            <p>description: {item.description}</p>
          </div>
        </a>
      </Link>
      <button
        type="button"
        onClick={btnHandler}
        style={{ backgroundColor: "purple", color: "white" }}
      >
        {type === "buy" ? "구매" : "장바구니"}
      </button>

      {type === "buy" ? (
        <button
          type="button"
          onClick={() =>
            removeCookieValue({ cookieName: COOKIE_NAME, value: item.id + "" })
          }
          style={{
            backgroundColor: "orange",
            color: "white",
            marginLeft: "5px",
          }}
        >
          삭제
        </button>
      ) : null}
    </>
  );
}
