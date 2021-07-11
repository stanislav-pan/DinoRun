import React, { FC } from "react";
import { useSelector } from "react-redux";
import { forumSelector } from "@redux/forum/selectors";
import { Topic } from "@components/Forum/Topics";
import { NoDataSvg } from "@icons/NoDataSvg";
import { TEXTS } from "@core/translate";
import { NotFoundDataSvg } from "@icons/NotFoundDataSvg";
import { Spinner } from "@components/Spinner";

export const ForumTopicsList: FC = () => {
  const { data, loading, error } = useSelector(forumSelector);

  if (loading) return <Spinner />;

  if (error)
    return (
      <NotFoundDataSvg>{TEXTS.ERRORS.SOMETHING_WENT_WRONG}</NotFoundDataSvg>
    );
  if (!data.length) return <NoDataSvg />;

  return <Topic />;
};
