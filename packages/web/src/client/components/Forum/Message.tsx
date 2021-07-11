import React, { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import { Emoji } from "emoji-mart";

import { Avatar } from "@components/Avatar";
import { FormattedDate } from "@components/Date";
import { CommentOwner, ReactionOfComments } from "@api/types/forum.types";

import { userSelector } from "@redux/user/selectors";
import { ReactionSvg } from "@icons/ReactionSvg";
import { apiService } from "@api/api.service";
import { TEXTS } from "@core/translate";
import { EmojiPicker } from "@components/EmojiPicker/EmojiPicker";
import { AddCommentButton } from "@components/AddCommentButton/AddCommentButton";
import styles from "./Forum.module.css";

interface Props {
  createdAt?: string;
  text: string;
  user?: CommentOwner;
  isEmoji?: boolean;
  commentId?: number;
  reactions?: ReactionOfComments;
}

export const Message: FC<Props> = ({
  createdAt,
  text,
  user,
  isEmoji = true,
  commentId,
  reactions,
}: Props) => {
  const yandexUser = useSelector(userSelector);
  const [reactionsOfComments, setReactions] = useState<ReactionOfComments>(
    reactions || []
  );
  const [emojiPickerState, setEmojiPicker] = useState(false);

  const removeReactionOfComment = useCallback((reactionUsersId: string) => {
    try {
      apiService.dino.removeReactionOfComment(reactionUsersId).then((res) => {
        setReactions(res.data);
      });
    } catch {
      console.log(TEXTS.ERRORS.SOMETHING_WENT_WRONG);
    }
  }, []);

  const addReactionOfComment = useCallback(
    (test: { commentId: number; emojiId: string }) => {
      try {
        apiService.dino.addReactionOfComment(test).then((res) => {
          setReactions(res.data);
        });
      } catch {
        console.log(TEXTS.ERRORS.SOMETHING_WENT_WRONG);
      }
    },
    []
  );

  return (
    <>
      <div className={styles.userInfo}>
        <div className="text-gray-500">{user?.displayName}</div>
        <Avatar src={user?.avatarUrl} />
      </div>
      <div className={cn(styles.messageBlock, "relative")}>
        <p className={styles.message}>{text}</p>
        {createdAt && <FormattedDate>{createdAt}</FormattedDate>}
        {isEmoji && (
          <button
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => setEmojiPicker(!emojiPickerState)}
          >
            <ReactionSvg />
          </button>
        )}
        {commentId && <AddCommentButton commentId={commentId} />}
        <ul className="z-10 flex flex-wrap">
          {reactionsOfComments.map((item) => {
            if (!item.reactionUsers.length) return;
            return (
              <li
                key={item.emojiId}
                className="flex items-center justify-center h-8 w-14 bg-gray-200 mr-2 mb-2 rounded-full cursor-pointer"
                onClick={() => {
                  try {
                    const currentReaction = reactions?.find(
                      (reactions) => reactions.emojiId === item.emojiId
                    );
                    const currentUser = currentReaction?.reactionUsers?.find(
                      (reaction) =>
                        reaction.userName === yandexUser?.displayName
                    );
                    if (currentUser) {
                      removeReactionOfComment(item.id);
                    } else {
                      commentId &&
                        addReactionOfComment({
                          commentId,
                          emojiId: item.emojiId,
                        });
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Emoji emoji={item.emojiId} size={20} />
                <span className="ml-1 text-sm font-semibold text-lightPrimary">
                  {item.reactionUsers.length}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      {emojiPickerState && commentId && (
        <EmojiPicker
          commentId={commentId}
          addReactionOfComment={addReactionOfComment}
          setEmojiPicker={setEmojiPicker}
        />
      )}
    </>
  );
};
