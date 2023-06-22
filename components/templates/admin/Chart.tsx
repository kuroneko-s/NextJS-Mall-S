import React, { useState } from "react";
import Calendar from "@components/atoms/Calendar";
import styled from "styled-components";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import { dateFormatYYYMMDD } from "@lib/client/common";
import dynamic from "next/dynamic";

const ChartComponent = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ContentsWrapper = styled.div``;

const series = [
  {
    name: "Website Blog",
    type: "column",
    data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
  },
  {
    name: "Social Media",
    type: "line",
    data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
  },
];

const options = {
  stroke: {
    width: [0, 4],
  },
  title: {
    text: "Traffic Sources",
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1],
  },
  labels: [
    "01 Jan 2001",
    "02 Jan 2001",
    "03 Jan 2001",
    "04 Jan 2001",
    "05 Jan 2001",
    "06 Jan 2001",
    "07 Jan 2001",
    "08 Jan 2001",
    "09 Jan 2001",
    "10 Jan 2001",
    "11 Jan 2001",
    "12 Jan 2001",
  ],
  /* xaxis: {
      type: "datetime",
    }, */
  yaxis: [
    {
      title: {
        text: "Website Blog",
      },
    },
    {
      opposite: true,
      title: {
        text: "Social Media",
      },
    },
  ],
};
export default function Chart() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  // Get 구매 이력 List (일, 주, 월, 연 각각 조회.)
  const { queryResult: buyHistoryResult, isLoading } =
    mySqlUtil.getBuyHistoryList(
      startDate ? dateFormatYYYMMDD(startDate) : "",
      endDate ? dateFormatYYYMMDD(endDate) : ""
    );

  console.log("buyHistoryResult - ", buyHistoryResult);

  return (
    <ContentsWrapper className="flex flex-col space-y-2">
      <div className="flex self-center space-x-3 items-center">
        <span className="select-none">시작일 :</span>
        <Calendar value={startDate} setter={setStartDate} />
        <span className="select-none">|</span>
        <span className="select-none">종료일 :</span>
        <Calendar value={endDate} setter={setEndDate} minDate={startDate} />
      </div>

      {isLoading ? (
        <h1>데이터 조회중...</h1>
      ) : (
        <ChartComponent
          options={options}
          series={series}
          type="line"
          width={"100%"}
          height={600}
        />
      )}
    </ContentsWrapper>
  );
}
