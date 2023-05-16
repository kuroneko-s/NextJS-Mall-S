import React from "react";
import ServiceCenterSvg from "@svg/ServiceCenter";
import NorticeSvg from "@svg/Nortice";
import { Container, ContentsContainer } from "styles/common";
import { CommunityBox, CommunityBoxWithSvg } from "./index.style";
import RightArrow from "@svg/RightArrow";
import Youtube from "@svg/Youtube";
import Instagram from "@svg/Instagram";
import Facebook from "@svg/Facebook";
import Link from "next/link";
import GitHub from "@svg/GItHub";

export default function Footer() {
  return (
    <Container className="footer mt-6 bottom-0 border-t-2 space-y-12">
      <ContentsContainer className="space-y-6 whitespace-nowrap">
        <div className="flex space-x-36">
          <div className="flex flex-col space-y-4">
            <Link href={"/cs"}>
              <a className="flex items-center w-[90px]">
                <ServiceCenterSvg />
                <span className="font-bold">고객센터</span>
              </a>
            </Link>
            <Link href={"/notice"}>
              <a className="flex items-center w-[90px]">
                <NorticeSvg />
                <span className="font-bold">공지사항</span>
              </a>
            </Link>
          </div>

          <CommunityBox className="space-y-3">
            <p className="font-bold">서비스</p>
          </CommunityBox>

          <CommunityBox className="space-y-3">
            <p className="font-bold">기타 문의</p>
          </CommunityBox>

          <CommunityBox className="space-y-3">
            <p className="font-bold">회사</p>
          </CommunityBox>

          <div className="flex justify-end flex-1 space-x-4">
            <Link
              href={"https://github.com/kuroneko-s/NextJS-Mall-S/tree/develop"}
            >
              <a className="h-fit p-2 rounded-xl bg-slate-100 cursor-pointer">
                <GitHub />
              </a>
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <Link href={"/dvInfo"}>
            <a className="flex text-sm items-center">
              동혁(최) 정보 <RightArrow />
            </a>
          </Link>
          <div className="flex space-x-2 text-sm">
            <Link href={"/tou"}>
              <a target="_blank">이용약관</a>
            </Link>
            <p>|</p>
            <Link href={"/"}>개인정보 처리방침</Link>
            <p>|</p>
            <Link href={"/"}>청소년보호정책</Link>
            <p>|</p>
            <Link href={"/"}>사업자정보확인</Link>
          </div>
          <div className="text-xs pt-3">© RIDI Corp.</div>
        </div>
      </ContentsContainer>
    </Container>
  );
}
