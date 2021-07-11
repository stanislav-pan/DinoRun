import React, { FC } from "react";

import { Props } from "./types";
import styles from "./Form.module.css";

export const Form: FC<Props> = ({ children, ...props }: Props) => (
  <form className={styles.form} {...props}>
    {children}
  </form>
);
