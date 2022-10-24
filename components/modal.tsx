import { cls } from "@lib/client/common";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRef } from "react";

interface ModalProps {
  title: string;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  modalOpenFn: () => void;
  modalCloseFn: () => void;
}

export default function ModalEx({
  title,
  modalOpen,
  setModalOpen,
  modalOpenFn,
  modalCloseFn,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  console.log("modal run");

  if (modalOpen) {
    modalRef.current?.classList.remove("modal-active");
    modalRef.current?.classList.add("modal-active");
  } else {
    modalRef.current?.classList.remove("modal-active");
  }

  return (
    <div
      ref={modalRef}
      className={cls(
        "fixed inset-x-0 mx-auto z-[100] bg-gray-300 opacity-0 bg-opacity-75 w-1/2",
        modalOpen ? "modal-active" : ""
      )}
    >
      <p className="font-medium text-3xl text-red-600 text-center">{title}</p>
      <p className="font-medium text-1xl text-center text-black">
        추가되었습니다.
      </p>
    </div>
  );
}
