import React, { FC } from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import orderBy from "lodash/orderBy";
import reverse from "lodash/reverse";

import { SubComments } from "@components/SubComments/SubComments";
import { topicSelector } from "@redux/topic/selectors";
import styles from "./Forum.module.css";
import { Message } from "./Message";

export const Messages: FC = () => {
  const { data } = useSelector(topicSelector);
  return (
    <ul className={styles.messageList}>
      {data.comments.map((comment) => {
        const user = data.users.find((item) => item.id === comment.userId);
        const sortedSubComments = reverse(
          orderBy(comment.children, "createdAt")
        );
        return (
          <li key={comment.id} className={cn(styles.messageItem)}>
            <div className={cn(styles.messageInfo)}>
              <Message
                createdAt={comment.createdAt}
                text={comment.text}
                user={user}
                commentId={comment.id}
                reactions={comment.reactions}
              />
            </div>
            {!!sortedSubComments.length && (
              <SubComments subComments={sortedSubComments} />
            )}
          </li>
        );
      })}
    </ul>
  );
};
