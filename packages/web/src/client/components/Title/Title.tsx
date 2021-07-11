import React, { FC } from "react";
import cn from "classnames";

import { Props } from "./types";
import styles from "./Title.module.css";

export const Title: FC<Props> = ({ children, className }: Props) => (
  <h1 className={cn(styles.root, className)}>{children}</h1>
);
