import React, { useEffect, useRef, useState } from "react";
import ImageSlider from "./ImageSlider";

interface active {
  [any: string]: string;
}

export default function Event() {
  const imageContainer = useRef<HTMLDivElement>(null);
  const imageEl = useRef<HTMLDivElement>(null);

  const [imageEls, setImageEls] = useState<HTMLCollection>();
  const [imageIdx, setImageIdx] = useState(0);
  const [activeEl, setActiveEl] = useState<active>({});

  useEffect(() => {
    setImageEls(imageContainer.current?.children);
  }, []);

  const leftBtnHandler = (e: React.MouseEvent<HTMLElement>) => {
    let idx = imageIdx;

    setActiveEl((cur) => {
      cur[idx + ""] = "0px";
      console.log("before cur - ", cur);
      return cur;
    });

    idx = idx === 0 ? imageEls!.length - 1 : idx - 1;

    setImageIdx(idx);

    setActiveEl((cur) => {
      cur[idx + ""] = imageEl.current?.offsetWidth + "px";
      return cur;
    });
  };

  const rightBtnHandler = (e: React.MouseEvent<HTMLElement>) => {
    console.log(imageEls);

    setImageIdx((cur) => {
      if (cur === imageEls!.length - 1) {
        return 0;
      }
      return cur + 1;
    });
  };

  return (
    <div className="w-full h-screen">
      <ImageSlider />
    </div>
  );
}
