import type { NextPage } from "next";
import dynamic from "next/dynamic";
import {
  motion,
  useAnimate,
  useMotionValue,
  useTransform,
  LayoutGroup,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { Container, ContentsContainer } from "styles/common";
import { CalendarWrapper, Wrapper } from "./index.style";
import { GlobalContext } from "pages/_app";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import Calendar from "react-calendar";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard: NextPage = () => {
  const [startDt, setStartDt] = useState<string>("");
  const [endDt, setEndDt] = useState<string>("");

  // Get 구매 이력 List (일, 주, 월, 연 각각 조회.)
  const { queryResult: buyHistoryResult, isLoading } = mySqlUtil.getBuyHistory(
    startDt,
    endDt
  );
  console.log("🚀 ~ file: index.tsx:30 ~ buyHistoryResult:", buyHistoryResult);
  /* new Date().getFullYear()
  new Date().getMonth() + 1
  new Date().getDate() */

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

  [
    {
      id: 2,
      userId: "vRIATCo6bqCB9YHugY7IyGYXh0yV1Xxa3Aw6tg1fqFU",
      aid: "A48516010dc40ec99af6",
      cid: "TC0ONETIME",
      tid: "T48515f20dc40ec99af5",
      paymentType: "MONEY",
      partnerOrderId: "RIDI0CLONEITEMS4",
      partnerUserId:
        "RIDI0CLONEUSERvRIATCo6bqCB9YHugY7IyGYXh0yV1Xxa3Aw6tg1fqFU",
      itemName: "book title 9",
      itemCode: "4",
      quantity: 1,
      totalAmount: 100900,
      vatAmount: 9173,
      redirectMobile:
        "https://online-pay.kakao.com/mockup/v1/22f6eda08bf4ee2616610e8d784030e1bcb04fed912938c5fe0f362c3572adf8/mInfo",
      redirectApp:
        "https://online-pay.kakao.com/mockup/v1/22f6eda08bf4ee2616610e8d784030e1bcb04fed912938c5fe0f362c3572adf8/aInfo",
      redirectPc:
        "https://online-pay.kakao.com/mockup/v1/22f6eda08bf4ee2616610e8d784030e1bcb04fed912938c5fe0f362c3572adf8/info",
      success: true,
      errorCode: null,
      errorMsg: null,
      paymentCreated: "2023-06-11T09:31:46",
      paymentApproved: "2023-06-11T09:32:05",
      expirationPeriod: "2023-06-11T09:31:46",
      createUser: "vRIATCo6bqCB9YHugY7IyGYXh0yV1Xxa3Aw6tg1fqFU",
      createDt: "2023-06-11T00:31:47.491Z",
      updateUser: "vRIATCo6bqCB9YHugY7IyGYXh0yV1Xxa3Aw6tg1fqFU",
      updateDt: "2023-06-11T00:32:06.915Z",
    },
  ];

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

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  const variants = {
    start: { opacity: 0, scale: 0.5, y: 100 },
    end: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  /* const rotate = useTransform(value, [-100, 850, 1680], [-360, 0, 360]);
  const { scrollY, scrollYProgress } = useScroll();
  const scrollWidth = useTransform(
    scrollYProgress,
    [0, 1],
    [0, globalThis?.innerWidth ?? 0]
  );
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    console.log("scrollYProgress started on x", v);
  });

  useMotionValueEvent(value, "change", (latest) => {
    console.log("x changed to", latest);
  }); */

  const [value, onChange] = useState(new Date());

  const { user } = useContext(GlobalContext);

  return (
    <Container>
      <ContentsContainer className="max-h-[75vh]">
        <h1>관리자 ID : {user?.id}</h1>
        <h1>관리자: {user?.name}</h1>
        <hr className="mt-2 pb-4" />

        <CalendarWrapper className="shadow-lg">
          <Calendar
            locale="KR"
            onChange={(value, event) => console.log(value)}
            value={value}
          />
        </CalendarWrapper>

        <Wrapper className="shadow-lg">
          <h1>그래프</h1>
          {isLoading ? (
            <h1>데이터 조회중...</h1>
          ) : (
            <Chart
              options={options}
              series={series}
              type="line"
              width={"100%"}
              height={600}
            />
          )}
        </Wrapper>
        {/* <SimpleBox style={{}}>
        {!center ? <Circle layoutId="1" /> : null}
      </SimpleBox>
      <SimpleBox style={{}}>
        {center ? <Circle layoutId="1" /> : null}
      </SimpleBox>  <motion.div
        className="h-[15px] bg-red-600 sticky top-0"
        style={{
          width: scrollWidth,
        }}
      ></motion.div>  <SwitchBox isOn={isOn} onClick={toggleSwitch}>
        <SwitchHandle
          layout
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30,
          }}
        />
      </SwitchBox>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width={128}
        height={128}
        style={{
          left: "30%",
          position: "relative",
        }}
      >
        <motion.path
          fill="white"
          stroke="red"
          strokeWidth={2}
          initial={"start"}
          animate={"end"}
          variants={svgVariants}
          transition={{
            default: {
              duration: 3,
            },
            fill: {
              duration: 3,
              delay: 1,
            },
          }}
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        />
      </svg>  <SimpeBox
        variants={variants}
        initial={"start"}
        animate={"end"}
        transition={{}}
      >
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </SimpeBox>  <BigBox ref={biggerRef}>
        <SimpleBox
          drag
          dragConstraints={biggerRef}
          whileDrag={{
            backgroundColor: "rgba(155, 89, 182,1.0)",
          }}
          whileHover={{
            scale: 2,
            rotateZ: 90,
            transition: {
              type: "just",
            },
          }}
          whileTap={{ borderRadius: "50px" }}
        ></SimpleBox>
      </BigBox> <button onClick={() => value.set(200)}>clicked</button>
      <SimpleBox
        drag="x"
        style={{
          x: value,
          rotateZ: rotate,
        }}
      />
      <SimpleBox drag /> */}
      </ContentsContainer>
    </Container>
  );
};

const Child = () => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      onClick={() => setOpen((cur) => !cur)}
      style={{
        height: "300px",
        width: open ? "200px" : "500px",
        backgroundColor: "blue",
        left: "300px",
        position: "relative",
      }}
    ></motion.div>
  );
};

export default Dashboard;
