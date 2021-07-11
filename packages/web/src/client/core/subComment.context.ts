import React from "react";
import isEmpty from "lodash/isEmpty";

export const SubCommentContext = React.createContext<{
  isVisible: boolean;
  toggle: (isVisible: boolean) => void;
  commentId: number | null;
  setCommentId: (commentId: number) => void;
}>({
  isVisible: false,
  toggle: isEmpty,
  commentId: null,
  setCommentId: isEmpty,
});
