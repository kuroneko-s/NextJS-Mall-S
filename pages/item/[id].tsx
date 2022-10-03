import type { NextPage } from "next";
import { useRouter } from "next/router";

const Item: NextPage = () => {
  const route = useRouter();
  const { id } = route?.query;

  return (
    <div>
      <h1>품목 상세</h1>
      <h4>{id}</h4>
    </div>
  );
};

export default Item;
