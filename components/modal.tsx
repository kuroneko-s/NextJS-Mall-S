import ReactModal from "react-modal";

interface ModalProps {
  modalTitle: string;
  modalIsOpen: boolean;
  closeModal: () => void;
}

export default function Modal({
  modalTitle,
  modalIsOpen,
  closeModal,
}: ModalProps) {
  ReactModal.setAppElement("#__next");

  function afterOpenModal() {}

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

  return (
    <ReactModal
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
        onClick={closeModal}
      >
        팝업 닫기
      </button>
    </ReactModal>
  );
}
