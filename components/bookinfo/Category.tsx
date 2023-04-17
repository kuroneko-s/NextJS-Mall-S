import IsLoading from "@components/common/IsLoading";
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
  const categoryName = categoryInfo?.name; // category 이름
  const parentCategoryName = categoryInfo?.parent_name ?? "#"; // 상위 category 이름

  return (
    <div>
      {parentCategoryName !== "#" ? (
        <div className="flex justify-center items-center space-x-1">
          <Link href={`/category/${parentCategoryName}`}>
            <a className="text-sm text-gray-700 hover:text-gray-500">
              {parentCategoryName}
            </a>
          </Link>
          <RightArrow />
          <Link href={`/category/${categoryName}`}>
            <a className="text-sm text-gray-700 hover:text-gray-500">
              {categoryName}
            </a>
          </Link>
        </div>
      ) : (
        <Link href={`/category/${categoryName}`}>
          <a className="text-sm text-gray-700 hover:text-gray-500">
            {categoryName}
          </a>
        </Link>
      )}
    </div>
  );
}
