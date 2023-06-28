import type { NextPage } from "next";
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

type TabType = "CHART" | "BOOK" | "EVENT" | "HISTORY";

const Dashboard: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("CHART");
  const { user } = useContext(GlobalContext);

  return (
    <Container className="min-h-[74vh]">
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
            {/* <Button
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
            </Button> */}
          </MenuTabWrapper>

          {selectedTab === "CHART" ? <Chart /> : null}
          {/* {selectedTab === "BOOK" ? <Book /> : null} */}
          {/* {selectedTab === "EVENT" ? <Event /> : null} */}
          {/* {selectedTab === "HISTORY" ? <History /> : null} */}
        </Wrapper>
      </ContentsContainer>
    </Container>
  );
};

export default Dashboard;
