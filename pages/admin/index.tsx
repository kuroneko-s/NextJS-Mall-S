import type { NextPage } from "next";
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
import { useContext, useState } from "react";
import { Container, ContentsContainer } from "styles/common";
import {
  AdminInfoWrapper,
  Button,
  MenuTabWrapper,
  Wrapper,
} from "./index.style";
import { GlobalContext } from "pages/_app";
import Chart from "@components/templates/admin/Chart";
import Book from "@components/templates/admin/Book";
import Event from "@components/templates/admin/Event";
import History from "@components/templates/admin/History";

type TabType = "CHART" | "BOOK" | "EVENT" | "HISTORY";

const Dashboard: NextPage = () => {
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

  const [selectedTab, setSelectedTab] = useState<TabType>("CHART");
  const { user } = useContext(GlobalContext);

  return (
    <Container className="h-[74vh] max-h-[74vh]">
      <ContentsContainer className="flex flex-col">
        <AdminInfoWrapper className="w-fit self-end flex flex-col items-end">
          <h1 className="select-none">관리자: {user?.name}</h1>
          <h1 className="select-none">
            관리자 ID : {user?.id.substring(0, 10) + "*".repeat(5)}
          </h1>
        </AdminInfoWrapper>

        <hr className="mt-2 pb-4" />

        <Wrapper className="shadow-md space-y-2">
          <MenuTabWrapper className="grid grid-cols-4 gap-2 h-14">
            <Button
              className={selectedTab === "CHART" ? "active" : ""}
              onClick={() => setSelectedTab("CHART")}
            >
              <span>Chart</span>
            </Button>
            <Button
              className={selectedTab === "BOOK" ? "active" : ""}
              onClick={() => setSelectedTab("BOOK")}
            >
              <span>Book</span>
            </Button>
            <Button
              className={selectedTab === "EVENT" ? "active" : ""}
              onClick={() => setSelectedTab("EVENT")}
            >
              <span>Event</span>
            </Button>
            <Button
              className={selectedTab === "HISTORY" ? "active" : ""}
              onClick={() => setSelectedTab("HISTORY")}
            >
              <span>History</span>
            </Button>
          </MenuTabWrapper>

          {selectedTab === "CHART" ? <Chart /> : null}
          {selectedTab === "BOOK" ? <Book /> : null}
          {selectedTab === "EVENT" ? <Event /> : null}
          {selectedTab === "HISTORY" ? <History /> : null}
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

export default Dashboard;
