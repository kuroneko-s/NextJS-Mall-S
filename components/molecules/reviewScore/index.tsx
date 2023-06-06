import StarSvg from "@components/atoms/svg/Star";
import React from "react";
import { EmptyScoreBox, ScoreBox, StarScoreBox } from "./index.style";

interface ReviewScoreProps {
  index: number;
  width: number;
}

export default function ReviewScore({ index, width }: ReviewScoreProps) {
  return (
    <div className="flex items-center space-x-1 text-sm">
      <StarSvg fill="gray" stroke="gray" />
      <span>{index}</span>
      <StarScoreBox className="space-x-1">
        <EmptyScoreBox>
          <ScoreBox w={width} />
        </EmptyScoreBox>
      </StarScoreBox>
    </div>
  );
}
