import React from "react";
import { ImageContainer } from "./index.style";

export default function Event() {
  return (
    <div className="w-full min-h-screen space-y-14">
      <ImageContainer>
        <div className="w-full h-full bg-red-300 rounded-md"></div>
      </ImageContainer>

      {/* <BookList bookInfoList={BookSample} title={"가장 많이 본 책"} /> */}
    </div>
  );
}
