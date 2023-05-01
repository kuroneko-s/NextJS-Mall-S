import { BookInfoProps } from "pages/bookInfo/info.type";
import React from "react";
import { cls } from "@lib/client/common";
import Contents from "./Contents";
import { ContentsTitle } from "../index.style";

interface DescriptionProps {
  bookInfoProps: BookInfoProps;
  profileClickHandler: (e: React.MouseEvent<HTMLElement>) => void;
  profileSelect: boolean;
}

export default function Description({
  bookInfoProps: { bookInfo, writerInfo, translatorInfo },
  profileClickHandler,
  profileSelect,
}: DescriptionProps) {
  return (
    <>
      {bookInfo === undefined ? (
        <div>정보가 없습니다</div>
      ) : (
        <Contents title="작품 소개" description={bookInfo.bookDescription} />
      )}

      {bookInfo === undefined ? (
        <div>정보가 없습니다</div>
      ) : (
        <Contents title="출판사 서평" description={bookInfo.bookDescription} />
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
          <div>
            <div>
              <p>{writerInfo?.name}</p>
              {writerInfo?.birth !== undefined && (
                <p>
                  <span>출생: </span> <span>{writerInfo?.birth}</span>
                </p>
              )}
              {writerInfo?.nationality !== undefined && (
                <p>
                  <span>국적: </span> <span>{writerInfo?.nationality}</span>
                </p>
              )}
              {writerInfo?.education !== undefined && (
                <p>
                  <span>학력: </span> <span>{writerInfo?.education}</span>
                </p>
              )}
              {writerInfo?.career !== undefined && (
                <p>
                  <span>경력: </span> <span>{writerInfo?.career}</span>
                </p>
              )}
              {writerInfo?.awards !== undefined && (
                <p>
                  <span>수상: </span> <span>{writerInfo?.awards}</span>
                </p>
              )}
              {writerInfo?.description !== undefined && (
                <p>
                  <span>소개: </span> <span>{writerInfo?.description}</span>
                </p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div>
              <p>{translatorInfo?.name}</p>
              {translatorInfo?.birth !== undefined && (
                <p>
                  <span>출생: </span> <span>{translatorInfo?.birth}</span>
                </p>
              )}

              {translatorInfo?.nationality !== undefined && (
                <p>
                  <span>국적: </span> <span>{translatorInfo?.nationality}</span>
                </p>
              )}
              {translatorInfo?.education !== undefined && (
                <p>
                  <span>학력: </span> <span>{translatorInfo?.education}</span>
                </p>
              )}
              {translatorInfo?.career !== undefined && (
                <p>
                  <span>경력: </span> <span>{translatorInfo?.career}</span>
                </p>
              )}
              {translatorInfo?.awards !== undefined && (
                <p>
                  <span>수상: </span> <span>{translatorInfo?.awards}</span>
                </p>
              )}
              {translatorInfo?.description !== undefined && (
                <p>
                  <span>소개: </span> <span>{translatorInfo?.description}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {writerInfo === undefined ? (
        <div>정보가 없습니다</div>
      ) : (
        <Contents title="저자 소개" description={writerInfo.description} />
      )}

      {bookInfo === undefined ? (
        <div>정보가 없습니다</div>
      ) : (
        <Contents title="목차" description={bookInfo.bookDescription} />
      )}
    </>
  );
}
