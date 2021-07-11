import React, { FC, useCallback, useContext, useState } from "react";
import { SubCommentContext } from "@core/subComment.context";
import { AddCommentSvg } from "@icons/AddCommentSvg";

interface Props {
  commentId: number;
}

export const AddCommentButton: FC<Props> = ({ commentId }: Props) => {
  const [hover, setHover] = useState(false);
  const { setCommentId, toggle } = useContext(SubCommentContext);

  const handlerOnMouse = () => {
    setHover(!hover);
  };

  const handlerClick = useCallback(() => {
    setCommentId(commentId);
    toggle(true);
  }, [commentId]);

  return (
    <div
      className="absolute right-2 bottom-1 cursor-pointer"
      onMouseEnter={handlerOnMouse}
      onMouseLeave={handlerOnMouse}
      onClick={handlerClick}
    >
      <AddCommentSvg />
      {hover && (
        <span className="absolute -top-6 -left-2 text-sm text-gray-400">
          Reply
        </span>
      )}
    </div>
  );
};
