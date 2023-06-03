import { cls } from "@lib/client/common";
import Link from "next/link";
import React from "react";

interface LinkedTextProps {
  url: string;
  context?: string;
  size: "sm" | "md" | "xl";
  isNewPage?: boolean;
  children?: React.ReactNode;
}

export default function LinkedText({
  url,
  context,
  size,
  isNewPage = false,
  children,
}: LinkedTextProps) {
  return (
    <Link href={url}>
      <a
        className={cls(
          `font-bold text-gray-800 hover:text-gray-400 text-${size}`,
          children ? "flex items-center justify-center space-x-2" : ""
        )}
        target={isNewPage ? "_blank" : "_parent"}
      >
        {children}
        <span>{context}</span>
      </a>
    </Link>
  );
}
