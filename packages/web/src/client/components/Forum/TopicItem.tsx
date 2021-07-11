import React, { FC } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { ForumsType } from "@api/types/forum.types";
import styles from "./Forum.module.css";

export const TopicItem: FC<ForumsType> = ({
  name,
  description,
  commentsCount,
  user,
  id,
}: ForumsType) => {
  return (
    <Link to={`forum/${id}`}>
      <div className={cn(styles.topicRow)}>
        <div className={cn(styles.rowHeader)}>{name}</div>
        <div className={styles.topicInfo}>
          <div className="w-2/4">{user.displayName}</div>
          <div className="w-2/4">{description}</div>
          <div className="w-24">{commentsCount}</div>
        </div>
      </div>
    </Link>
  );
};
