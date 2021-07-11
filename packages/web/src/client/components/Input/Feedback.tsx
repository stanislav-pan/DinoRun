import React, { FC } from "react";
import styles from "./Input.module.css";

interface Props {
  children?: string;
}

export const Feedback: FC<Props> = ({ children }: Props) => (
  <div className={styles.feedback}>{children}</div>
);
