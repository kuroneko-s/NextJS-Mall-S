import CartSvg from "@svg/Cart";
import LibrarySvg from "@svg/Library";
import NotificationSvg from "@svg/Notification";
import ProfileSvg from "@svg/Profile";
import Link from "next/link";
import React from "react";
import Logo from "@components/common/Logo";
import { Container, ContentsContainer } from "styles/common";
import Search from "./Search";
import LinkedText from "@components/atoms/LinkedText";

export default function MainMenu() {
  return (
    <Container>
      <ContentsContainer className="flex justify-between items-center">
        <Logo />
        <div className="flex space-x-2 items-center">
          <Search />

          <LinkedText url="/notification" size="md">
            <NotificationSvg />
          </LinkedText>

          <LinkedText url="/cart" size="md">
            <CartSvg />
          </LinkedText>

          <LinkedText url="/library" size="md">
            <LibrarySvg />
          </LinkedText>

          <LinkedText url="/profile" size="md">
            <ProfileSvg />
          </LinkedText>
        </div>
      </ContentsContainer>
    </Container>
  );
}
