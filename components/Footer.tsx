import React from "react";
import ServiceCenterSvg from "./svg/ServiceCenter";
import NorticeSvg from "./svg/Nortice";

export default function Footer() {
  return (
    <div className="footer px-16 py-12 mt-6 bottom-0 border-t-2 space-y-12">
      <div className="max-w-[1280px] mx-auto space-y-6">
        <div className="flex space-x-36">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-1">
              <ServiceCenterSvg />
              <span className="font-bold">고객센터</span>
            </div>
            <div className="flex items-center space-x-1">
              <NorticeSvg />
              <span className="font-bold">공지사항</span>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="font-bold">서비스</p>
            <p>서비스1</p>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="font-bold">기타 문의</p>
            <p>기타 문의</p>
            <p>기타 문의</p>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="font-bold">회사</p>
            <p>회사</p>
            <p>회사</p>
          </div>
          <div className="flex justify-end flex-1 space-x-4">
            <div className="h-fit p-2 rounded-xl bg-slate-100 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>

            <div className="h-fit p-2 rounded-xl bg-slate-100 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>

            <div className="h-fit p-2 rounded-xl bg-slate-100 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex text-sm items-center">
            리디(주) 사업자 정보{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <div className="hidden text-sm">
            <p>
              대표자 배기식 사업자 등록번호 120-87-27435 통신판매업 신고번호
              제2009-서울강남 35-02139호 이메일 help@ridi.com 대표전화 1644-0331
              주소 서울시 강남구 역삼동 702-28 어반벤치빌딩 10층(테헤란로 325)
            </p>
          </div>
          <div className="flex space-x-2 text-sm">
            <p>이용약관</p>
            <p>|</p>
            <p>개인정보 처리방침</p>
            <p>|</p>
            <p>청소년보호정책</p>
            <p>|</p>
            <p>사업자정보확인</p>
          </div>
          <div className="text-xs pt-3">© RIDI Corp.</div>
        </div>
      </div>
    </div>
  );
}
