import CartSvg from "@components/atoms/svg/Cart";
import LibrarySvg from "@components/atoms/svg/Library";
import NotificationSvg from "@components/atoms/svg/Notification";
import ProfileSvg from "@components/atoms/svg/Profile";
import React from "react";
import { Container, ContentsContainer } from "styles/common";
import Search from "./Search";
import Logo from "@components/atoms/Logo";
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
