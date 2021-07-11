import React, { FC } from "react";
import cn from "classnames";

import { Props } from "./types";
import styles from "./ButtonIcon.module.css";

export const ButtonIcon: FC<Props> = ({
  children,
  className,
  ...props
}: Props) => (
  <button className={cn(styles.root, className)} {...props}>
    {children}
  </button>
);
