import { useEffect, useState } from "react";
import { Item } from "./interface/tables";

function sampleCreator() {
  return new Array(10).fill(1).map((_, i) => {
    return {
      price: (i + 1000) * 10000,
      name: "sample" + i,
      id: i,
      description: "sample description_" + i,
    };
  });
}

export default function useItem() {
  const [item, setItem] = useState<Item[]>();

  useEffect(() => {
    setItem(sampleCreator());
  }, []);
  return item;
}
