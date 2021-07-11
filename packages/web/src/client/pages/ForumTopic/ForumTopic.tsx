import React, { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

import { ForumHeader } from "@components/Forum/ForumHeader";
import { Wrapper } from "@components/Wrapper";
import { Message } from "@components/Forum/Message";
import { Header } from "@components/Header";
import { useDinoTheme } from "@hooks/useTheme";

import { TopicRequest } from "@redux/topic/actions";
import { topicSelector } from "@redux/topic/selectors";
import { SubCommentContext } from "@core/subComment.context";

import { SendMessageForm } from "./ui/SendMessage.form";
import { Comments } from "./ui/Comments";
import { AddSubComment } from "./ui/AddSubComment";

export const ForumTopic: FC = () => {
  const { userStyle } = useDinoTheme();
  const { data } = useSelector(topicSelector);
  const { topicId } = useParams<{ topicId: string }>();
  const dispatch = useDispatch();
  const [isAddSubComment, setIsAddSubComment] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number | null>(null);

  const fetchComments = useCallback(() => {
    dispatch(TopicRequest(topicId));
  }, [topicId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <SubCommentContext.Provider
      value={{
        isVisible: isAddSubComment,
        toggle: setIsAddSubComment,
        commentId,
        setCommentId,
      }}
    >
      <Wrapper className="flex-col bg-purple-50 ">
        <div className={cn("w-full bg-cover", userStyle?.background)}>
          <Header />
        </div>
        <div className="w-full bg-primary py-1 mb-5">
          {data.topic && (
            <>
              <ForumHeader>{data.topic.name}</ForumHeader>
              <div className="flex">
                <Message
                  text={data.topic.description}
                  user={data.topic.user}
                  isEmoji={false}
                />
              </div>
            </>
          )}
        </div>
        <Comments />
        <SendMessageForm fetchComments={fetchComments} />
        <AddSubComment fetchComments={fetchComments} />
      </Wrapper>
    </SubCommentContext.Provider>
  );
};
