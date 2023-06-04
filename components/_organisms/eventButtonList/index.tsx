import React from "react";
import EventButton from "@components/_atoms/EventButton";

export default function EventButtonList() {
  return (
    <div className="my-4 flex justify-center space-x-6">
      <EventButton symbol="E" title="행사" url="/event" />
    </div>
  );
}
