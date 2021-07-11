import React, { FC } from "react";

import { SETTINGS } from "./const";
import { SettingsListItem } from "./types";

import styles from "./Settings.module.css";

export type SettingsProps = {
  onClick: (item: SettingsListItem) => void;
};

export const Settings: FC<SettingsProps> = ({ onClick }: SettingsProps) => {
  return (
    <ul>
      {SETTINGS.map((item, index) => {
        const { title, icon } = item;

        return (
          <li className={styles.item} key={index}>
            <button className={styles.button} onClick={() => onClick(item)}>
              <div className={styles.icon}>{icon}</div>
              <span className={styles.span}>{title}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
