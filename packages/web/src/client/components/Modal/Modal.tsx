import React, { FC, PropsWithChildren, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

import { Props } from "./types";
import styles from "./Modal.module.css";

export const MODAL_ROOT_ID = "modal-root";

export const Modal: FC<Props> = ({
  onCloseModal,
  children,
}: PropsWithChildren<Props>) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalRoot = document?.createElement("div");

  if (modalRoot) {
    modalRoot.setAttribute("id", MODAL_ROOT_ID);
    document?.body?.appendChild(modalRoot);
  }

  const closeModal = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const clickedOverlay = modalRef.current === event.target;

      if (clickedOverlay && typeof onCloseModal === "function") {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  if (!document) return null;

  return createPortal(
    <div
      role="document"
      ref={modalRef}
      className={styles.modalOverlay}
      style={{ backgroundColor: "rgba(87, 90, 137, .8)" }}
      onClick={closeModal}
    >
      {children}
    </div>,
    modalRoot
  );
};
