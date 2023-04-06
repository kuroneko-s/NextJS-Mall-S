import React from "react";
import { FILL_COLOR } from "./Common";

interface AndroidSvgProps {
  width: number;
  height: number;
}

export default function AndroidSvg({ width, height }: AndroidSvgProps) {
  return (
    <svg
      className="inline-block"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="-147 -70 294 345"
      width={width}
      height={height}
    >
      <g fill={FILL_COLOR}>
        <use strokeWidth="14.4" xlinkHref="#b" stroke="#FFF" />
        <use xlinkHref="#a" transform="scale(-1,1)" />
        <g id="a" stroke="#FFF" strokeWidth="7.2">
          <rect
            rx="6.5"
            transform="rotate(29)"
            height="86"
            width="13"
            y="-86"
            x="14"
          />
          <rect id="c" rx="24" height="133" width="48" y="41" x="-143" />
          <use y="97" x="85" xlinkHref="#c" />
        </g>
        <g id="b">
          <ellipse cy="41" rx="91" ry="84" />
          <rect rx="22" height="182" width="182" y="20" x="-91" />
        </g>
      </g>
      <g stroke="#FFF" strokeWidth="7.2" fill="#FFF">
        <path d="m-95 44.5h190" />
        <circle cx="-42" r="4" />
        <circle cx="42" r="4" />
      </g>
    </svg>
  );
}
