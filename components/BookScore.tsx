import React from "react";
import StarSvg from "./svg/Star";

interface BookScoreProps {
  score: string;
}

export default function BookScore({ score }: BookScoreProps) {
  return (
    <div className="flex items-center space-x-1 text-gray-500 text-xs">
      <StarSvg
        fill={score !== "0" ? "red" : "none"}
        stroke={score !== "0" ? "red" : "gray"}
      />
      <p>{score}</p>
    </div>
  );
}
