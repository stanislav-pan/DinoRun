import React, { FC, useContext, MouseEvent, useRef } from "react";
import { SubCommentContext } from "@core/subComment.context";
import { SendMessageForm } from "./SendMessage.form";

interface Props {
  fetchComments: () => void;
}

export const AddSubComment: FC<Props> = ({ fetchComments }: Props) => {
  const { isVisible, toggle } = useContext(SubCommentContext);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hideModal = (event: MouseEvent<HTMLDivElement>) => {
    if (wrapperRef.current === event.target) {
      toggle(false);
    }
  };

  if (!isVisible) return null;
  return (
    <div
      ref={wrapperRef}
      className="fixed h-full w-full flex items-center justify-center bg-gray-900 bg-opacity-70 z-40"
      onClick={hideModal}
    >
      <SendMessageForm
        fetchComments={fetchComments}
        className="w-2/5"
        subComments
      />
    </div>
  );
};
