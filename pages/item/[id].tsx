import { appendCookie } from "@lib/cookies";
import { Item, itemArr } from "@lib/itemSample";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Item: NextPage = () => {
  const route = useRouter();
  const { id } = route?.query;
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    // @ts-ignore
    const item = itemArr[+id?.toString()];
    setItem(item);
  }, [setItem, id]);

  let idx;
  let image = "";

  if (id != undefined) {
    idx = +id % 4;
    image = require(`../../images/cat${idx}.jpg`);
  }

  return (
    <div>
      <h1>품목 상세</h1>
      <h4>{id}</h4>
      {!item ? (
        <p>Loading...</p>
      ) : (
        <>
          <Image
            src={image}
            alt={"cat" + idx}
            quality="100"
            placeholder="blur"
          />
          <p>name: {item?.name}</p>
          <p>price: {item?.price}</p>
          <p>description: {item?.description}</p>
          <button
            type="button"
            onClick={() =>
              appendCookie({
                cookieName: "checked-item",
                value: item?.id + "",
              })
            }
            style={{ backgroundColor: "purple", color: "white" }}
          >
            장바구니
          </button>

          <Link href={"/"}>
            <a style={{ marginLeft: "5px" }}>
              <button type="button">Home</button>
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Item;
