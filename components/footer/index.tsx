import React from "react";
import ServiceCenterSvg from "@svg/ServiceCenter";
import NorticeSvg from "@svg/Nortice";
import { Container, ContentsContainer } from "styles/common";
import { CommunityBox, CommunityBoxWithSvg } from "./index.style";
import RightArrow from "@svg/RightArrow";
import Youtube from "@svg/Youtube";
import Instagram from "@svg/Instagram";
import Facebook from "@svg/Facebook";

export default function Footer() {
  return (
    <Container className="footer mt-6 bottom-0 border-t-2 space-y-12">
      <ContentsContainer className="space-y-6 whitespace-nowrap">
        <div className="flex space-x-36">
          <div className="flex flex-col space-y-4">
            <CommunityBoxWithSvg className="space-x-1">
              <ServiceCenterSvg />
              <span className="font-bold">고객센터</span>
            </CommunityBoxWithSvg>
            <CommunityBoxWithSvg className="space-x-1">
              <NorticeSvg />
              <span className="font-bold">공지사항</span>
            </CommunityBoxWithSvg>
          </div>

          <CommunityBox className="space-y-3">
            <p className="font-bold">서비스</p>
            <p>서비스1</p>
          </CommunityBox>

          <CommunityBox className="space-y-3">
            <p className="font-bold">기타 문의</p>
            <p>기타 문의</p>
            <p>기타 문의</p>
          </CommunityBox>

          <CommunityBox className="space-y-3">
            <p className="font-bold">회사</p>
            <p>회사</p>
            <p>회사</p>
          </CommunityBox>

          <div className="flex justify-end flex-1 space-x-4">
            <div className="h-fit p-2 rounded-xl bg-slate-100 cursor-pointer">
              <Youtube />
            </div>
            <div className="h-fit p-2 rounded-xl bg-slate-100 cursor-pointer">
              <Instagram />
            </div>
            <div className="h-fit p-2 rounded-xl bg-slate-100 cursor-pointer">
              <Facebook />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex text-sm items-center">
            리디(주) 사업자 정보 <RightArrow />
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
      </ContentsContainer>
    </Container>
  );
}
