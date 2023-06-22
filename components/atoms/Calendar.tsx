import React from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import "react-date-picker/dist/DatePicker.css";
import { cls } from "@lib/client/common";

// @ts-ignore
const DatePickerLazy = dynamic(() => import("react-date-picker"), {
  ssr: false,
});

const CalendarWrapper = styled.div`
  .react-date-picker__wrapper {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 2px 5px;
  }

  .react-date-picker__calendar {
    z-index: 99;
  }

  .react-date-picker__calendar .react-calendar {
    background-color: white;
  }
`;

interface CalendarProps {
  value: Date;
  setter: React.Dispatch<React.SetStateAction<Date>>;
  minDate?: Date;
  [key: string]: any;
}

export default function Calendar({
  value,
  setter,
  minDate = new Date("2022-01-01"),
  ...props
}: CalendarProps) {
  return (
    <CalendarWrapper
      className={cls(
        "shadow-sm w-fit pointer",
        props.hasOwnProperty("className") ? props.className : ""
      )}
    >
      <DatePickerLazy
        onChange={(e) => setter(e as Date)}
        value={value}
        minDate={minDate}
      ></DatePickerLazy>
    </CalendarWrapper>
  );
}
