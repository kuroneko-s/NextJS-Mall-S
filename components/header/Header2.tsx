import CartSvg from "@components/svg/Cart";
import LibrarySvg from "@components/svg/Library";
import NotificationSvg from "@components/svg/Notification";
import ProfileSvg from "@components/svg/Profile";
import ReadingGlassesSvg from "@components/svg/ReadingGlasses";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Header2() {
  const router = useRouter();

  return (
    <div className="px-16 py-4">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        <div className="text-3xl font-extrabold cursor-pointer">
          <Link href={"/"}>
            <p>
              <span className="text-blue-500">RIDI</span>
              {router.asPath === "/" ? <span>BOOKS</span> : null}
            </p>
          </Link>
        </div>
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
      </div>
    </div>
  );
}
