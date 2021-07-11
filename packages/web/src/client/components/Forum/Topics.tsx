import React, { FC } from "react";
import { useSelector } from "react-redux";
import { forumSelector } from "@redux/forum/selectors";
import { TopicItem } from "./TopicItem";

export const Topic: FC = () => {
  const { data } = useSelector(forumSelector);
  return (
    <>
      {data &&
        data.map((item) => {
          return <TopicItem key={item.id} {...item} />;
        })}
    </>
  );
};
