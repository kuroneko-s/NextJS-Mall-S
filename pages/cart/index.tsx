import { COOKIE_NAME, server } from "@lib/common";
import { getCookie } from "@lib/cookies";
import kakaoPay from "@lib/client/kakaoPay";
import { GlobalContext } from "pages/_app";
import React, { useEffect, useContext, useRef } from "react";
import { mySqlUtil } from "@lib/client/MySqlUtil";
import IsLoading from "@components/common/IsLoading";
import BookItem from "@components/cart/BookItem";
import { Container, ContentsContainer } from "styles/common";
import kakaoPayImg from "@images/kakao_pay.png";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Cart() {
  const {
    baskets: bookIds,
    appendBooks,
    removeAll,
  } = useContext(GlobalContext);

  const router = useRouter();
  const isbn = router.query?.isbn;
  const itemIds =
    isbn !== undefined ? isbn.toString() : bookIds?.join(",") ?? "";

  const { queryResult, isLoading } = mySqlUtil.getBookListForIds(itemIds);

  // cookie 적용
  useEffect(() => {
    const cookie = getCookie(COOKIE_NAME);
    if (bookIds && bookIds.length <= 0) {
      if (cookie && cookie.length >= 1) {
        appendBooks && appendBooks(...cookie);
      }
    }
  }, [bookIds, appendBooks]);

  const kakaoPayHandler = async () => {
    if (queryResult?.data === undefined) return false;

    const itemName =
      queryResult?.data.length === 1
        ? `${queryResult?.data[0].title}`
        : `${queryResult?.data[0].title} 외 ${
            (queryResult?.data.length ?? 0) - 1
          }개`;

    const result = await kakaoPay({
      item_name: itemName,
      item_code: itemIds.replaceAll(",", "_"),
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
          <Head>
            <title>장바구니 | 흑우냥이</title>
          </Head>
          <ContentsContainer className="space-y-2">
            <h1 className="font-extrabold text-gray-700 text-2xl">장바구니</h1>
            <div className="flex space-x-4">
              <div className="w-2/3">
                <div className="space-y-4">
                  {queryResult?.data === undefined ? (
                    <div className="flex w-full space-x-8 rounded-md shadow-sm py-4 px-2 mt-2 bg-slate-50">
                      <p className="text-lg font-semibold text-gray-700">
                        장바구니가 비어있습니다.
                      </p>
                    </div>
                  ) : (
                    <>
                      {isbn !== undefined ? null : (
                        <div
                          className="group w-fit rounded-md shadow-sm py-2 px-2 mt-2 bg-slate-50 group-hover:bg-slate-200 cursor-pointer"
                          onClick={() => removeAll && removeAll()}
                        >
                          <p className="text-lg font-semibold text-gray-700 right-0 group-hover:text-gray-500">
                            전체 삭제
                          </p>
                        </div>
                      )}

                      {queryResult?.data.map((book) => (
                        <BookItem
                          key={book.isbn}
                          book={book}
                          buyDirect={isbn}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div className="w-1/3 h-screen p-2">
                <div className="bg-slate-100 rounded-md flex flex-col justify-center items-center space-y-2 py-4 px-2">
                  <h1 className="font-semibold text-lg">총 결제 금액</h1>
                  <p>
                    {queryResult?.data === undefined
                      ? 0
                      : new Intl.NumberFormat("ko-KR").format(
                          queryResult?.data.reduce(
                            (acc, cur) => acc + cur.price,
                            0
                          ) ?? 0
                        )}
                    원
                  </p>

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
