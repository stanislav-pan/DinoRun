import React, { FC } from "react";
import styles from "./Input.module.css";

interface Props {
  children?: string;
}

export const Info: FC<Props> = ({ children }: Props) => (
  <div className={styles.info}>{children}</div>
);
