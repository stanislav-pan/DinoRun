import React, { FC } from "react";
import styles from "./Forum.module.css";

interface Props {
  children: string;
}

export const ForumHeader: FC<Props> = ({ children }: Props) => {
  return (
    <header className={styles.forumHeader}>
      <h1 className="font-bold">{children}</h1>
    </header>
  );
};
