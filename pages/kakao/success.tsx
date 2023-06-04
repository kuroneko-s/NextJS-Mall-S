import HomeSvg from "@components/atoms/svg/Home";
import Head from "next/head";
import Link from "next/link";
import { GlobalContext } from "pages/_app";
import { useEffect, useContext } from "react";
import { Container, ContentsContainer } from "styles/common";

export default function PaySuccess() {
  const { removeItemsAll } = useContext(GlobalContext);

  useEffect(() => {
    removeItemsAll && removeItemsAll();
  }, [removeItemsAll]);

  return (
    <Container>
      <Head>
        <title>성공 | 흑우냥이</title>
      </Head>
      <ContentsContainer className="min-h-[57vh] mt-12 flex items-start justify-center">
        <div className="flex flex-col items-center bg-slate-100 space-y-12 py-20 w-full rounded-md shadow-sm">
          <h1 className="font-extrabold text-gray-700 text-2xl">결제 성공</h1>
          <Link href="/">
            <a
              className="flex items-center text-2lg hover:bg-blue-400 hover:text-white hover:fill-white rounded-md py-4 px-9"
              onClick={() => {
                removeItemsAll && removeItemsAll();
              }}
            >
              <HomeSvg />
              <span className="ml-2">홈 화면</span>
            </a>
          </Link>
        </div>
      </ContentsContainer>
    </Container>
  );
}
