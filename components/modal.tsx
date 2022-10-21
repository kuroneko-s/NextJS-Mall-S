import { cls } from "@lib/client/common";
import { useEffect, useRef, useState } from "react";

interface ModalProps {
  title: string;
  modalOpen: boolean;
}

export default function Modal({ title, modalOpen }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [timeoutKey, setTimeoutKey] = useState<NodeJS.Timeout>();

  // 이 컴포넌트는 어떤 값을 띄우고, 띄울 여부만 묻고 나머지는 스스로 해결하는 방향으로 진행
  setTimeout(() => {
    modalRef.current?.classList.remove("modal-active");
  }, 1500);

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
