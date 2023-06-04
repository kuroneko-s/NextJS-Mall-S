import React from "react";
import { DEFAUL_COLOR } from "./Common";

interface MacSvgProps {
  width: number;
  height: number;
}

export default function MacSvg({ width, height }: MacSvgProps) {
  return (
    <svg
      className="inline-block"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 515.91 728.5"
      version="1.1"
      viewBox="0 0 512.00003 512"
      height={width}
      width={height}
      xmlSpace="preserve"
    >
      <defs id="defs7" />
      <g
        id="g10184"
        transform="matrix(1.2190477,0,0,1.2190477,-6357.3341,-4512.915)"
      >
        <path
          d="m 5425.0003,3702.0003 c -115.983,0 -210,94.024 -210,210 0,115.983 94.017,210 210,210 115.983,0 210,-94.017 210,-210 0,-115.976 -94.017,-210 -210,-210 z"
          id="path10182"
          fill={DEFAUL_COLOR}
          fillOpacity={1}
        />
        <path
          d="m 5445.0073,3924.6083 80.353,117.26 h -22.726 l -55.523,-81.014 -22.111,-32.265 -22.11,32.266 -55.523,81.014 h -22.726 l 80.353,-117.26 8.644,-12.609 -8.645,-12.608 -80.353,-117.259 h 22.726 l 55.523,81.013 22.111,32.265 22.11,-32.266 55.523,-81.013 h 22.726 l -80.353,117.259 -8.644,12.609 8.645,12.608 z"
          id="path236"
          fill="#ffffff"
          fillOpacity={1}
        />
      </g>
    </svg>
  );
}
