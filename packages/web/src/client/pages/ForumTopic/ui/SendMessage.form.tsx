import React, { FC, useCallback, useContext } from "react";
import { useParams } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import cn from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiService } from "@api/api.service";
import { SendMessageSchema } from "@client/validation-schemas";
import { SubCommentContext } from "@core/subComment.context";
import { TEXTS } from "@core/translate";

import { SendMessageView } from "./SendMessage.view";

interface SendMessageData {
  message: string;
}

const defaultValues: SendMessageData = {
  message: "",
};

interface Props {
  fetchComments: () => void;
  className?: string;
  subComments?: boolean;
}

export const SendMessageForm: FC<Props> = ({
  fetchComments,
  className,
  subComments,
}: Props) => {
  const { commentId, toggle } = useContext(SubCommentContext);
  const methods = useForm<SendMessageData>({
    defaultValues,
    resolver: yupResolver(SendMessageSchema),
  });

  const { handleSubmit, reset } = methods;
  const { topicId } = useParams<{ topicId: string }>();

  const prepareData = useCallback(
    ({ text }: { text: string }) => {
      if (commentId && subComments) {
        return {
          text,
          topicId: parseInt(topicId),
          parentId: commentId,
        };
      } else {
        return {
          text,
          topicId: parseInt(topicId),
        };
      }
    },
    [subComments, topicId, commentId]
  );

  const onSubmit = useCallback(
    (data: { text: string }) => {
      const formatedData = prepareData(data);
      try {
        apiService.dino
          .addComment({
            ...formatedData,
          })
          .then(() => {
            fetchComments();
            reset();
            commentId && toggle(false);
          });
      } catch {
        console.log(TEXTS.ERRORS.SOMETHING_WENT_WRONG);
      }
    },
    [topicId]
  );

  return (
    <FormProvider {...methods}>
      <form
        className={cn("p-5 mt-4 bg-white rounded", className || "w-full")}
        onSubmit={handleSubmit(onSubmit)}
      >
        <SendMessageView />
      </form>
    </FormProvider>
  );
};
