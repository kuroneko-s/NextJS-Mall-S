import CartSvg from "@svg/Cart";
import LibrarySvg from "@svg/Library";
import NotificationSvg from "@svg/Notification";
import ProfileSvg from "@svg/Profile";
import ReadingGlassesSvg from "@svg/ReadingGlasses";
import Link from "next/link";
import React from "react";
import Logo from "@components/Logo";
import { Container, ContentsContainer } from "styles/common";

export default function MainMenu() {
  return (
    <Container>
      <ContentsContainer className="flex justify-between items-center">
        <Logo />
        <div className="flex space-x-5 items-center">
          <div className="relative">
            <ReadingGlassesSvg />
            <input
              type={"text"}
              className="bg-gray-200 h-full pl-8 py-2 rounded-lg"
            />
          </div>

          <Link href={"/notification"}>
            <a>
              <NotificationSvg />
            </a>
          </Link>

          <Link href={"/cart"}>
            <a>
              <CartSvg />
            </a>
          </Link>

          <Link href={"/library"}>
            <a>
              <LibrarySvg />
            </a>
          </Link>

          <Link href={"/profile"}>
            <a>
              <ProfileSvg />
            </a>
          </Link>
        </div>
      </ContentsContainer>
    </Container>
  );
}
