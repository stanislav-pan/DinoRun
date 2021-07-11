import React, { FC, useEffect, useState } from "react";
import cn from "classnames";
import ReactDOM from "react-dom";

import { Props } from "./types";
import styles from "./Toast.module.css";

export const Toast: FC<Props> = ({ children, type }: Props) => {
  const [style, setStyle] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStyle("duration-1000 opacity-1 opacity-0");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return ReactDOM.createPortal(
    <div role="alert" className={cn(styles.toastWrapper, style)}>
      <div
        className={cn(
          styles.toastTitle,
          type === "error" ? styles.titleError : styles.titleSuccess
        )}
      >
        Error
      </div>
      <div
        className={cn(
          styles.toast,
          type === "error" ? styles.toastError : styles.toastSuccess
        )}
      >
        <p>{children}</p>
      </div>
    </div>,
    document?.body
  );
};
