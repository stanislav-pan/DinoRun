import React, { FC } from "react";

import { Props } from "./types";
import styles from "./Date.module.css";

export const FormattedDate: FC<Props> = ({ children }: Props) => {
  if (!children) return null;

  return (
    <time className={styles.date}>{new Date(children).toLocaleString()}</time>
  );
};
