import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { GlobalContext } from "pages/_app";
import { useContext } from "react";

interface ItemProps {
  index: number;
  item: any;
  btnHandler?: any;
  type?: string;
}

export default function Item({ index = 1, item, btnHandler, type }: ItemProps) {
  const { removeItem } = useContext(GlobalContext);
  const i = index % 4;
  const image = require(`../images/cat${i}.jpg`);

  return (
    <>
      <Script src="https://nsp.pay.naver.com/sdk/js/naverpay.min.js"></Script>
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

      {type === "buy" ? (
        <>
          <button
            type="button"
            onClick={() => {}}
            style={{ backgroundColor: "purple", color: "white" }}
          >
            구매
          </button>
          <button
            type="button"
            onClick={() => removeItem && removeItem(item.id + "")}
            style={{
              backgroundColor: "orange",
              color: "white",
              marginLeft: "5px",
            }}
          >
            삭제
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={btnHandler}
          style={{ backgroundColor: "purple", color: "white" }}
        >
          장바구니
        </button>
      )}
    </>
  );
}
