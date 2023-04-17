import IsLoading from "@components/common/IsLoading";
import LinkedText from "@components/common/LinkedText";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import RightArrow from "@svg/RightArrow";
import Link from "next/link";
import React from "react";

interface CategoryProps {
  categoryId: string;
}

export default function Category({ categoryId }: CategoryProps) {
  const categoriInfoResult = mySqlUtil.getCategoryInfo(categoryId);
  const categoryInfo = categoriInfoResult.queryResult?.data;
  const categoryName = categoryInfo?.name ?? "root"; // category 이름
  const parentCategoryName = categoryInfo?.parent_name ?? "#"; // 상위 category 이름

  return (
    <div>
      {parentCategoryName !== "#" ? (
        <div className="flex justify-center items-center space-x-1">
          <LinkedText
            url={`/category/${parentCategoryName}`}
            context={parentCategoryName}
            size="sm"
          />
          <RightArrow />
          <LinkedText
            url={`/category/${categoryName}`}
            context={parentCategoryName}
            size="sm"
          />
        </div>
      ) : (
        <LinkedText
          url={`/category/${categoryName}`}
          context={categoryName}
          size="sm"
        />
      )}
    </div>
  );
}
