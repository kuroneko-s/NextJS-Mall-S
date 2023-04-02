import IsLoading from "@components/IsLoading";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import Link from "next/link";
import React from "react";

interface CategoryProps {
  categoryId: string;
}

export default function Category({ categoryId }: CategoryProps) {
  const categoriInfoResult = mySqlUtil.getCategoryInfo(categoryId);

  const categoryInfo = categoriInfoResult.queryResult?.data;

  const categoryName = categoryInfo?.name; // category 이름
  const parentCategoryName = categoryInfo?.parent; // 상위 category 이름

  return (
    <>
      {categoriInfoResult.isLoading ? (
        <IsLoading />
      ) : (
        <div>
          {parentCategoryName !== "#" ? (
            <div className="flex justify-center items-center space-x-1">
              <Link href={`/category/${parentCategoryName}`}>
                <a className="text-sm text-gray-700 hover:text-gray-500">
                  {parentCategoryName}
                </a>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
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
      )}
    </>
  );
}
