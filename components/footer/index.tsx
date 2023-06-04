import React from "react";
import ServiceCenterSvg from "@svg/ServiceCenter";
import NorticeSvg from "@svg/Nortice";
import { Container, ContentsContainer } from "styles/common";
import Link from "next/link";
import GitHub from "@svg/GItHub";
import LinkedText from "@components/_atoms/LinkedText";

export default function Footer() {
  return (
    <Container className="footer mt-6 bottom-0 border-t-2 space-y-12">
      <ContentsContainer className="space-y-6 whitespace-nowrap">
        <div className="flex space-x-36">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <LinkedText
                url="/cs"
                size="md"
                context="고객센터"
                isNewPage={true}
              >
                <ServiceCenterSvg />
              </LinkedText>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <LinkedText
                url="/notice"
                size="md"
                context="공지사항"
                isNewPage={true}
              >
                <NorticeSvg />
              </LinkedText>
            </div>
          </div>

          {/* 
          <CommunityBox className="space-y-3">
            <p className="font-bold">서비스</p>
          </CommunityBox>

          <CommunityBox className="space-y-3">
            <p className="font-bold">기타 문의</p>
          </CommunityBox>

          <CommunityBox className="space-y-3">
            <p className="font-bold">회사</p>
          </CommunityBox> 
          */}

          <div className="flex justify-end flex-1 space-x-4">
            <Link
              href={"https://github.com/kuroneko-s/NextJS-Mall-S/tree/develop"}
            >
              <a
                className="h-fit p-2 rounded-xl bg-slate-100 cursor-pointer text-gray-800 hover:text-gray-500"
                target="_blank"
              >
                <GitHub />
              </a>
            </Link>
          </div>
        </div>

        <div className="space-y-2 w-fit">
          <div className="flex space-x-2 text-sm">
            <LinkedText
              url="/tou"
              size="sm"
              context="이용약관"
              isNewPage={true}
            />
            <p>|</p>
            <LinkedText
              url="/tou"
              size="sm"
              context="개인정보 처리방침"
              isNewPage={true}
            />
            <p>|</p>
            <LinkedText
              url="/tou"
              size="sm"
              context="청소년보호정책"
              isNewPage={true}
            />
          </div>
          <div className="text-xs pt-3">© RIDI Corp.</div>
        </div>
      </ContentsContainer>
    </Container>
  );
}
