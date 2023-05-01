import { COOKIE_NAME } from "@lib/common";
import { getCookie } from "@lib/cookies";
import kakaoPay from "@lib/server/kakaoPay";
import { GlobalContext } from "pages/_app";
import React, { useEffect, useContext } from "react";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import IsLoading from "@components/common/IsLoading";
import BookItem from "@components/cart/BookItem";
import { Container, ContentsContainer } from "styles/common";
import kakaoPayImg from "@images/kakao_pay.png";
import Image from "next/image";

export default function Cart() {
  const {
    baskets: bookIds,
    appendBooks,
    removeAll,
  } = useContext(GlobalContext);

  const { queryResult, isLoading } = mySqlUtil.getBookListForIds(
    bookIds?.join(",") ?? ""
  );

  // cookie 적용
  useEffect(() => {
    const cookie = getCookie(COOKIE_NAME);
    if (bookIds === undefined || (bookIds && bookIds.length <= 0)) {
      if (cookie.length >= 1) {
        appendBooks && appendBooks(...cookie);
      }
    }
  }, [bookIds, appendBooks]);

  const kakaoPayHandler = async () => {
    if (queryResult?.data === undefined) return false;

    const result = await kakaoPay({
      item_name: `${queryResult?.data[0].title} 외 ${
        (queryResult?.data.length ?? 0) - 1
      }개`,
      quantity: queryResult.data.length ?? 1,
      tax_free_amount: 0,
      total_amount:
        queryResult?.data.reduce((acc, cur) => acc + cur.price, 0) ?? 0,
    });

    window.location.href = result;
  };

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <Container>
          <ContentsContainer className="space-y-2">
            <h1 className="font-extrabold text-gray-700 text-2xl">장바구니</h1>
            <div className="flex space-x-4">
              <div className="w-2/3">
                <div className="space-y-4">
                  {queryResult?.data.map((book) => (
                    <BookItem key={book.isbn} book={book} />
                  ))}
                </div>
              </div>
              <div className="w-1/3 h-screen p-2">
                <div className="bg-slate-100 rounded-md flex flex-col justify-center items-center space-y-2 py-4">
                  <h1 className="font-semibold text-lg">결제</h1>
                  <div className="cursor-pointer" onClick={kakaoPayHandler}>
                    <Image
                      src={kakaoPayImg}
                      placeholder="blur"
                      alt="kakaoPay Button"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ContentsContainer>
        </Container>
      )}
    </>
  );
}
