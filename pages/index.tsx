import useUser from "@lib/client/useUser";
import { objectIsEmpty } from "@lib/common";
import { getIronSession } from "iron-session";
import Link from "next/link";
import { SWRConfig } from "swr";
import type { NextPage } from "next";
import Item from "components/Item";
import useItem from "@lib/itemSample";
import { useContext, useRef, useState } from "react";
import { GlobalContext } from "./_app";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(99, 110, 114, .5)",
  },
  content: {
    width: "350px",
    height: "180px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(178, 190, 195,1.0)",
  },
};

Modal.setAppElement("#__next");

const Home: NextPage = () => {
  console.log("index component");

  const { appendItems, removeAll } = useContext(GlobalContext);
  const { user, isLoading, error, mutate } = useUser();
  const sampleItemArr = useItem();
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState(false);

  var date = new Date();
  date.setDate(date.getDate() + 1);

  const itemBtnClickHandler = (id: string, name: string) => {
    appendItems && appendItems(id + "");
    setModalTitle(name);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  console.log();
  return (
    <div>
      <h1 className="mt-12">쇼핑몰</h1>
      <div>
        <button
          className="bg-yellow-500"
          type="button"
          onClick={() => {
            removeAll && removeAll();
          }}
        >
          REMOVE_COOKIE_ALL
        </button>
      </div>
      <div>
        <Link href={"/buy"}>
          <a className="mr-1">
            <button>구매</button>
          </a>
        </Link>
        {user?.data?.role === "ADMIN" ? (
          <Link href={"/admin"}>
            <a>
              <button>Dashboard</button>
            </a>
          </Link>
        ) : null}
      </div>

      <Link href={"/login"}>
        <a style={{ marginRight: "5px" }}>
          <button>Login</button>
        </a>
      </Link>
      <Link href={"/api/login/logout"}>
        <a>
          <button className="bg-yellow-500" type="button">
            logout
          </button>
        </a>
      </Link>

      {!isLoading && user && user?.ok ? (
        <p>user: {user?.data?.name}</p>
      ) : (
        <p>you need Login</p>
      )}

      <h1>품목 리스트</h1>

      <div id="item_div">
        {sampleItemArr &&
          sampleItemArr.map((item, i) => (
            <Item
              key={item.id}
              index={i}
              item={item}
              btnHandler={(e: any) => {
                itemBtnClickHandler(item.id + "", item.name);
                openModal();
              }}
            />
          ))}
      </div>
      <Modal
        closeTimeoutMS={200}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p className="font-medium text-3xl text-gray-900 text-center">
          {modalTitle}
        </p>
        <p className="font-medium text-1xl text-center text-gray-900">
          장바구니에 추가되었습니다.
        </p>
        <button
          className="items-center bg-slate-600 text-gray-300"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          팝업 닫기
        </button>
      </Modal>
    </div>
  );
};

export default function Page({ defaultUser }: any) {
  console.log("SWR");
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/user/info": {
            user: {
              ...defaultUser,
              ok: true,
            },
            isLoading: false,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
}

export async function getServerSideProps({ req, res }: any) {
  console.log("SSR RUn");
  const cookieOptions = {
    cookieName: "shop-user-info",
    password: process.env.IRON_PASSWORD!, // complex_password_at_least_32_characters_long
  };

  const result = await getIronSession(req, res, cookieOptions);

  let defaultUser = {};

  if (!objectIsEmpty(result)) {
    defaultUser = {
      id: result?.user?.id,
      name: result?.user?.name,
    };
  }

  return {
    props: {
      defaultUser,
    },
  };
}
