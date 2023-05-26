import CartSvg from "@svg/Cart";
import LibrarySvg from "@svg/Library";
import NotificationSvg from "@svg/Notification";
import ProfileSvg from "@svg/Profile";
import Link from "next/link";
import React from "react";
import Logo from "@components/common/Logo";
import { Container, ContentsContainer } from "styles/common";
import Search from "./Search";

export default function MainMenu() {
  return (
    <Container>
      <ContentsContainer className="flex justify-between items-center">
        <Logo />
        <div className="flex space-x-5 items-center">
          <Search />

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
