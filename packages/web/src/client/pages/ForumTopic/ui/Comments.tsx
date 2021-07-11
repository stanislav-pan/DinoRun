import React, { FC } from "react";
import { useSelector } from "react-redux";

import { Messages } from "@components/Forum/Messages";
import { Spinner } from "@components/Spinner";
import { TEXTS } from "@core/translate";
import { NotFoundDataSvg } from "@icons/NotFoundDataSvg";
import { topicSelector } from "@redux/topic/selectors";

export const Comments: FC = () => {
  const { data, loading, error } = useSelector(topicSelector);

  if (loading) return <Spinner />;

  if (error)
    return (
      <NotFoundDataSvg>{TEXTS.ERRORS.SOMETHING_WENT_WRONG}</NotFoundDataSvg>
    );

  if (!data.comments.length)
    return <NotFoundDataSvg>{TEXTS.FORUM.NO_COMMENT}</NotFoundDataSvg>;

  return <Messages />;
};
