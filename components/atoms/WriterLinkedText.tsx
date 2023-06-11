import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface WriterLinkedTextProps {
  writerId: number;
  writerName: string;
}

const CustomA = styled.a`
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));

  &:hover {
    --tw-text-opacity: 1;
    color: rgb(156 163 175 / var(--tw-text-opacity));
  }
`;

export default function WriterLinkedText({
  writerId,
  writerName,
}: WriterLinkedTextProps) {
  return (
    <Link href={`/writer/${writerId}`} passHref>
      <CustomA>{writerName}</CustomA>
    </Link>
  );
}
