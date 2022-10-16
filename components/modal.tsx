import { useRef } from "react";

interface ModalProps {
  title: string;
  toggle?: boolean;
  modalRef: any;
}

export default function Modal({ title, toggle, modalRef }: ModalProps) {
  if (toggle && modalRef) {
    modalRef.current?.classList.add("test");
    setTimeout(() => {
      modalRef.current?.classList.remove("test");
    }, 1500);
  }

  return (
    <div
      ref={modalRef}
      className={`fixed inset-x-0 mx-auto z-[100] bg-gray-300 opacity-0 bg-opacity-75 w-1/2`}
    >
      <p className="font-medium text-3xl text-red-600 text-center">{title}</p>
      <p className="font-medium text-1xl text-center text-black">
        장바구니에 추가했습니다.
      </p>
    </div>
  );
}
