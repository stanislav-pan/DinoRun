import { useState, useCallback } from "react";

export type UseModal = {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModal = (isOpened = false): UseModal => {
  const [isOpenModal, setOpenModal] = useState(isOpened);

  const openModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  return {
    isOpenModal,

    openModal,
    closeModal,
  };
};
