import React from "react";
import StarSVG from "./svg/Star";

interface BookScoreProps {
  score: string;
}

export default function BookScore({ score }: BookScoreProps) {
  return (
    <div className="flex items-center space-x-1 text-gray-500 text-xs">
      <StarSVG score={score} />
      <p>{score}</p>
    </div>
  );
}
