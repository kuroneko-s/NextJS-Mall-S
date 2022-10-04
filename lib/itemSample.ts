import { useEffect, useState } from "react";

export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
}

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
