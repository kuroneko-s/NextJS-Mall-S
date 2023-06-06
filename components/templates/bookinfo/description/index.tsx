import { BookInfoProps } from "pages/bookInfo/info.type";
import React from "react";
import { ContentsTitle } from "../index.style";
import DescriptionSummary from "@components/atoms/DescriptionSummary";
import BookInfoProfile from "@components/molecules/BookInfoProfile";

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
        <DescriptionSummary
          title="작품 소개"
          description={bookInfo.bookDescription}
        />
      )}

      {translatorInfo === undefined ? (
        <div>정보가 없습니다</div>
      ) : (
        <DescriptionSummary
          title="출판사 서평"
          description={translatorInfo.description}
        />
      )}

      <div>
        <ContentsTitle>저자 프로필</ContentsTitle>
        <div className="flex space-x-2 text-sm text-gray-700 border-b-[1px]">
          <BookInfoProfile
            profileSelect={profileSelect}
            profileClickHandler={profileClickHandler}
            title="저자"
            context="글쓴사람이름"
            dataIndex={1}
          />
          <span className="font text-lg text-gray-600 hover:text-gray-400 cursor-pointer">
            |
          </span>
          <BookInfoProfile
            profileSelect={!profileSelect}
            profileClickHandler={profileClickHandler}
            title="번역"
            context="번역한사람이름"
            dataIndex={2}
          />
        </div>

        {profileSelect && writerInfo !== undefined ? (
          <div>
            <div>
              <p>{writerInfo.name}</p>
              <p>
                <span>출생: </span> <span>{writerInfo.birth}</span>
              </p>
              <p>
                <span>국적: </span> <span>{writerInfo.nationality}</span>
              </p>
              <p>
                <span>학력: </span> <span>{writerInfo.education}</span>
              </p>
              <p>
                <span>경력: </span> <span>{writerInfo.career}</span>
              </p>
              <p>
                <span>수상: </span> <span>{writerInfo.awards}</span>
              </p>
              <p>
                <span>소개: </span> <span>{writerInfo.description}</span>
              </p>
            </div>
          </div>
        ) : translatorInfo !== undefined ? (
          <div>
            <div>
              <p>{translatorInfo.name}</p>
              <p>
                <span>출생: </span> <span>{translatorInfo.birth}</span>
              </p>

              <p>
                <span>국적: </span> <span>{translatorInfo.nationality}</span>
              </p>
              <p>
                <span>학력: </span> <span>{translatorInfo.education}</span>
              </p>
              <p>
                <span>경력: </span> <span>{translatorInfo.career}</span>
              </p>
              <p>
                <span>수상: </span> <span>{translatorInfo.awards}</span>
              </p>
              <p>
                <span>소개: </span> <span>{translatorInfo.description}</span>
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {writerInfo === undefined ? (
        <div>정보가 없습니다</div>
      ) : (
        <DescriptionSummary
          title="저자 소개"
          description={writerInfo.description}
        />
      )}

      {bookInfo === undefined ? (
        <div>정보가 없습니다</div>
      ) : (
        <DescriptionSummary
          title="목차"
          description={bookInfo.bookDescription}
        />
      )}
    </>
  );
}
