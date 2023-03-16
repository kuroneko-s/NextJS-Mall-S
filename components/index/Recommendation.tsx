import useUser from "@lib/client/useUser";
import useItem from "@lib/itemSample";
import Modal from "components/modal";
import Link from "next/link";
import Item from "components/Item";
import { GlobalContext } from "pages/_app";
import React, { useContext, useState } from "react";

export default function Recommendation() {
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
    <>
      <h1>쇼핑몰</h1>
      <div>
        <button
          className="bg-yellow-500"
          type="button"
          onClick={() => {
            removeAll && removeAll();
          }}
        >
          REMOVE_COOKIE_ALL test
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
    </>
  );
}
