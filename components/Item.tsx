import Image from "next/image";
import type { Item } from "../lib/itemSample";

interface ItemProps {
  index: number;
  item: Item;
  btnHandler: any;
}

export default function Item({ index = 1, item, btnHandler }: ItemProps) {
  const i = index % 4;
  const image = require(`../images/cat${i}.jpg`);

  return (
    <div style={{ cursor: "pointer" }}>
      <Image src={image} alt={"cat" + index} quality="100" placeholder="blur" />
      <p>name: {item.name}</p>
      <p>price: {item.price}</p>
      <p>description: {item.description}</p>
      <button
        type="button"
        onClick={btnHandler}
        style={{ backgroundColor: "purple", color: "white" }}
      >
        장바구니
      </button>
    </div>
  );
}
