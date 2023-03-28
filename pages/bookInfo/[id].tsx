import useItem, { Item } from "@lib/itemSample";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalContext } from "pages/_app";
import React, { useContext, useState, useEffect } from "react";

export default function BookInfo() {
  const route = useRouter();
  const { id } = route?.query;

  const { appendItems } = useContext(GlobalContext);
  const [item, setItem] = useState<Item>();
  const sampleItemArr = useItem();

  useEffect(() => {
    // @ts-ignore
    const item = sampleItemArr && sampleItemArr[+id?.toString()];
    setItem(item);
  }, [setItem, id, sampleItemArr]);

  let idx;
  let image = "";

  if (id != undefined) {
    idx = +id % 4;
    image = require(`../../images/cat${idx}.jpg`);
  }

  return (
    <div className="min-h-[80.9vh]">
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
            onClick={() => appendItems && appendItems(item?.id + "")}
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
}
