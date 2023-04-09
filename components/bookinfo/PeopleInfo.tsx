import { BookInfoProps } from "pages/bookInfo/info.type";
import React from "react";

interface PeopleInfoProps {
  [key: string]: string;
}

export default function PeopleInfo(obj: PeopleInfoProps) {
  return (
    <div>
      <div>
        <p>{obj?.name}</p>
        {obj?.birth !== undefined && (
          <p>
            <span>출생: </span> <span>{obj?.birth}</span>
          </p>
        )}

        {obj?.nationality !== undefined && (
          <p>
            <span>국적: </span> <span>{obj?.nationality}</span>
          </p>
        )}
        {obj?.education !== undefined && (
          <p>
            <span>학력: </span> <span>{obj?.education}</span>
          </p>
        )}
        {obj?.career !== undefined && (
          <p>
            <span>경력: </span> <span>{obj?.career}</span>
          </p>
        )}
        {obj?.awards !== undefined && (
          <p>
            <span>수상: </span> <span>{obj?.awards}</span>
          </p>
        )}
        {obj?.description !== undefined && (
          <p>
            <span>소개: </span> <span>{obj?.description}</span>
          </p>
        )}
      </div>
    </div>
  );
}
