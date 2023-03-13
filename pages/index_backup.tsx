import useUser from "@lib/client/useUser";
import { objectIsEmpty } from "@lib/common";
import { getIronSession } from "iron-session";
import Link from "next/link";
import { SWRConfig } from "swr";
import type { NextPage } from "next";
import Item from "components/Item";
import useItem from "@lib/itemSample";
import { useContext, useState } from "react";
import { GlobalContext } from "./_app";
import Modal from "components/modal";

const Home: NextPage = () => {
  const { appendItems, removeAll } = useContext(GlobalContext);
  const { user, isLoading, error, mutate } = useUser();
  const sampleItemArr = useItem();
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState(false);

  let date = new Date();
  date.setDate(date.getDate() + 1);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const itemBtnClickHandler = (id: string, name: string) => {
    appendItems && appendItems(id + "");
    setModalTitle(name);
  };

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
        modalTitle={modalTitle}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
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
