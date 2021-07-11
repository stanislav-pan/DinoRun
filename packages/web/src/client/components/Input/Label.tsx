import React, { FC } from "react";
import styles from "./Input.module.css";

interface Props {
  children?: string;
  name: string;
  visible: boolean;
}
export const Label: FC<Props> = ({ children, name, visible }: Props) => {
  if (!visible) return null;

  return (
    <label htmlFor={name} className={styles.label}>
      {children}
    </label>
  );
};
