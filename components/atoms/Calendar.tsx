import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-date-picker/dist/DatePicker.css";

// @ts-ignore
const DatePickerLazy = dynamic(() => import("react-date-picker"), {
  ssr: false,
});

interface CalendarProps {
  value: Date;
  setter: React.Dispatch<React.SetStateAction<Date>>;
}

export default function Calendar({ value, setter }: CalendarProps) {
  const [value2, onChange] = useState(new Date());
  return (
    <div>
      <div>
        <DatePickerLazy
          onChange={(e) => {
            console.log(e);
          }}
          value={value2}
        ></DatePickerLazy>
      </div>
    </div>
  );
}
