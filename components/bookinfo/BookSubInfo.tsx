import AndroidSvg from "@components/svg/Android";
import AppleSvg from "@components/svg/Apple";
import HeadPhoneSvg from "@components/svg/HeadPhone";
import MacSvg from "@components/svg/Mac";
import WindowSvg from "@components/svg/Window";
import {
  ServiceInfoContents,
  ServiceInfoTitle,
} from "pages/bookInfo/bookInfo.style";
import { BookInfoProps } from "pages/bookInfo/info.type";
import React from "react";

export default function BookSubInfo({ bookInfo }: BookInfoProps) {
  return (
    <div className="border-gray-150 border-4 py-4 px-10 flex space-x-8 text-sm text-gray-800">
      <div className="flex flex-col">
        <p>
          <ServiceInfoTitle>출간정보</ServiceInfoTitle> :{" "}
          <ServiceInfoContents>{bookInfo?.publisher}</ServiceInfoContents>
        </p>
        <p>
          <ServiceInfoTitle>파일정보</ServiceInfoTitle>:{" "}
          <ServiceInfoContents>
            {bookInfo?.file_type} | {bookInfo?.file_size}MB |{" "}
            {bookInfo?.text_count}
          </ServiceInfoContents>
        </p>
        <p>
          <ServiceInfoTitle>ISBN</ServiceInfoTitle> :{" "}
          <ServiceInfoContents>{bookInfo?.isbn}</ServiceInfoContents>
        </p>
      </div>
      <div className="flex flex-col flex-1">
        <p>
          <ServiceInfoTitle>듣기기능</ServiceInfoTitle>:{" "}
          {bookInfo?.listening_yn === "Y" ? (
            <ServiceInfoContents className="space-x-1">
              <HeadPhoneSvg width={15} height={15} />
              <span>듣기 가능</span>{" "}
            </ServiceInfoContents>
          ) : (
            "미지원"
          )}
        </p>
        <div>
          <p className="flex items-center space-x-1">
            <ServiceInfoTitle>지원기기</ServiceInfoTitle>:{" "}
            <ServiceInfoContents>
              {bookInfo?.android_yn === "Y" ? (
                <span className="space-x-1">
                  <AndroidSvg width={15} height={15} />
                  <span className="text-sm">Android</span>
                </span>
              ) : null}
            </ServiceInfoContents>
            {bookInfo?.ios_yn === "Y" ? (
              <ServiceInfoContents className="space-x-1">
                <AppleSvg width={20} height={20} />
                <span className="text-sm">Android</span>
              </ServiceInfoContents>
            ) : null}
            {bookInfo?.window_yn === "Y" ? (
              <ServiceInfoContents className="space-x-1">
                <WindowSvg width={15} height={15} />
                <span className="text-sm">Android</span>
              </ServiceInfoContents>
            ) : null}
            {bookInfo?.mac_yn === "Y" ? (
              <ServiceInfoContents className="space-x-1">
                <MacSvg width={15} height={15} />
                <span className="text-sm">Android</span>
              </ServiceInfoContents>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}
