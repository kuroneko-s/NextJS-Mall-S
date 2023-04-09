import { BookInfoProps } from "pages/bookInfo/info.type";
import React from "react";
import ContentsBox from "./ContentsBox";
import { ContentsTitle } from "pages/bookInfo/bookInfo.style";
import { cls } from "@lib/client/common";
import PeopleInfo from "./PeopleInfo";

interface BookContents {
  bookInfoProps: BookInfoProps;
  profileClickHandler: (e: React.MouseEvent<HTMLElement>) => void;
  profileSelect: boolean;
}

export default function BookContents({
  bookInfoProps: { bookInfo, writerInfo, translatorInfo },
  profileClickHandler,
  profileSelect,
}: BookContents) {
  return (
    <>
      {bookInfo === undefined ? (
        <div>정보가 없습니다</div>
      ) : (
        <ContentsBox
          title="작품 소개"
          description={bookInfo.book_description}
        />
      )}

      {bookInfo === undefined ? (
        <div>정보가 없습니다</div>
      ) : (
        <ContentsBox
          title="출판사 서평"
          description={bookInfo.book_description}
        />
      )}

      <div>
        <ContentsTitle>저자 프로필</ContentsTitle>
        <div className="flex space-x-2 text-sm text-gray-700 border-b-[1px]">
          <p className="pb-2">
            저자{" "}
            <span
              className={cls(
                "font text-gray-600 pb-2 hover:text-gray-400 cursor-pointer",
                profileSelect ? "border-gray-800 border-b-[1px]" : ""
              )}
              onClick={profileClickHandler}
              data-index={"1"}
            >
              글쓴사람이름
            </span>
          </p>
          <span className="font text-gray-600 hover:text-gray-400 cursor-pointer">
            |
          </span>
          <p>
            번역{" "}
            <span
              className={cls(
                "font text-gray-600 pb-2 hover:text-gray-400 cursor-pointer",
                !profileSelect ? "border-gray-800 border-b-[1px]" : ""
              )}
              onClick={profileClickHandler}
              data-index={"2"}
            >
              번역한사람이름
            </span>
          </p>
        </div>
        {profileSelect ? (
          <PeopleInfo {...writerInfo} />
        ) : (
          <PeopleInfo {...translatorInfo} />
        )}
      </div>

      {writerInfo === undefined ? (
        <div>정보가 없습니다</div>
      ) : (
        <ContentsBox title="저자 소개" description={writerInfo.description} />
      )}

      {bookInfo === undefined ? (
        <div>정보가 없습니다</div>
      ) : (
        <ContentsBox title="목차" description={bookInfo.book_description} />
      )}
    </>
  );
}
