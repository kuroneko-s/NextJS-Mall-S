import CartSvg from "@svg/Cart";
import HomeSvg from "@svg/Home";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, ContentsContainer } from "styles/common";

export default function PaySuccess() {
  const router = useRouter();
  const message = router?.query?.message?.toString() ?? "";

  return (
    <Container>
      <Head>
        <title>실패 | 흑우냥이</title>
      </Head>
      <ContentsContainer className="min-h-[57vh] mt-12 flex items-start justify-center">
        <div className="flex flex-col items-center bg-slate-100 py-20 w-full rounded-md shadow-sm">
          <div className="text-gray-700 mb-12 text-center">
            <p className="text-2xl font-extrabold">결제 실패</p>
            {message !== "" ? (
              <p className="mt-3 text-xl font-semibold">
                {message.replaceAll("_", " ")}
              </p>
            ) : null}
          </div>

          <Link href="/">
            <a className="flex items-center w-[217px] text-2lg hover:bg-blue-400 hover:text-white hover:fill-white rounded-md py-4 px-9 mb-2">
              <HomeSvg />
              <span className="ml-2">홈 화면</span>
            </a>
          </Link>
          <Link href="/cart">
            <a className="flex items-center text-2lg hover:bg-blue-400 hover:text-white hover:fill-white rounded-md py-4 px-9 ">
              <CartSvg />
              <span className="ml-2">장바구니 화면</span>
            </a>
          </Link>
        </div>
      </ContentsContainer>
    </Container>
  );
}
