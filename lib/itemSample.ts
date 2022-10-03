export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
}

function sampleCreator() {
  console.log("run");
  return new Array(10).fill(1).map((_, i) => {
    return {
      price: (i + 1000) * 10000,
      name: "sample" + i,
      id: i,
      description: "sample description_" + i,
    };
  });
}

export const itemArr: Item[] = sampleCreator();
