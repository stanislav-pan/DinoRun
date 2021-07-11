import React, { FC } from "react";
import cn from "classnames";

import { Props } from "./types";
import styles from "./Wrapper.module.css";

export const Wrapper: FC<Props> = ({ children, className }: Props) => (
  <div className={cn(styles.wrapper, className)}>{children}</div>
);
