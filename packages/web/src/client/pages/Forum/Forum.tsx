import React, { FC } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { ForumTopic } from "@pages/ForumTopic/ForumTopic";
import { ForumTopics } from "@pages/ForumTopics/ForumTopics";

export const Forum: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/`} component={ForumTopics} exact />
      <Route path={`${path}/:topicId`} component={ForumTopic} exact />
    </Switch>
  );
};
