import CartSvg from "@svg/Cart";
import HomeSvg from "@svg/Home";
import Link from "next/link";
import { Container, ContentsContainer } from "styles/common";

export default function PaySuccess() {
  return (
    <Container>
      <ContentsContainer className="min-h-[57vh] mt-12 flex items-start justify-center">
        <div className="flex flex-col items-center bg-slate-100 py-20 w-full rounded-md shadow-sm">
          <h1 className="font-extrabold text-gray-700 text-2xl mb-12">
            결제 취소
          </h1>
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
