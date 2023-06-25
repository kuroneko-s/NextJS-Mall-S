import React, { useState } from "react";
import Calendar from "@components/atoms/Calendar";
import styled from "styled-components";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import { dateFormatYYYMMDD } from "@lib/client/common";
import dynamic from "next/dynamic";

interface ISeries {
  name: string;
  type: string;
  data: number[];
}

const ChartComponent = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ContentsWrapper = styled.div``;

let series: ISeries[] = [
  {
    name: "매출 총액",
    type: "column",
    data: [],
  },
  {
    name: "판매량",
    type: "line",
    data: [],
  },
];

const options = {
  stroke: {
    width: [0, 4],
  },
  title: {
    text: "판매 이력 (단위: 원)",
    align: "center",
    style: {
      fontSize: "16px",
      fontWeight: "bold",
    },
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1],
  },
  labels: [""], // x축 일자
  yaxis: [
    {
      title: {
        text: "매출 총액",
      },
    },
    {
      opposite: true,
      title: {
        text: "판매량",
      },
    },
  ],
};
export default function Chart() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  // Post 구매 이력 List (일, 주, 월, 연 각각 조회.)
  const { queryResult: buyHistoryAggregationResult, isLoading } =
    mySqlUtil.getBuyHistoryList(
      startDate ? dateFormatYYYMMDD(startDate) : "",
      endDate ? dateFormatYYYMMDD(endDate) : ""
    );
  if (buyHistoryAggregationResult?.ok) {
    const dtList = buyHistoryAggregationResult?.data.map(
      (result) =>
        `${result.DT.substring(0, 4)}년 ${result.DT.substring(
          4,
          6
        )}월 ${result.DT.substring(6)}일`
    );
    const totalAmountList = buyHistoryAggregationResult?.data.map(
      (result) => result.TOTAL_AMOUNT
    );
    const totalList = buyHistoryAggregationResult?.data.map(
      (result) => result.TOTAL
    );

    options.labels = [...dtList];

    series[0] = {
      name: "매출 총액",
      type: "column",
      data: [...totalAmountList],
    };

    series[1] = {
      name: "판매량",
      type: "line",
      data: [...totalList],
    };
  }

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
          // @ts-ignore
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
