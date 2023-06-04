import EventButton from "@components/atoms/EventButton";
import React from "react";

export default function EventButtonList() {
  return (
    <div className="my-4 flex justify-center space-x-6">
      <EventButton symbol="E" title="행사" url="/event" />
    </div>
  );
}
