import React, { FC } from "react";
import cn from "classnames";

import { Props } from "./types";
import styles from "./Button.module.css";

export const Button: FC<Props> = ({ children, className, ...props }: Props) => (
  <button
    className={cn(styles.root, className)}
    data-testid={"button"}
    {...props}
  >
    {children}
  </button>
);
