import React, { FC, useCallback } from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuth } from "@hooks/useAuth";

import { Props } from "./types";

export const PrivateRoute: FC<Props> = ({
  children,
  component,
  ...rest
}: Props) => {
  const { isAuth, wasInit } = useAuth();

  const render = useCallback(() => {
    const renderElement = children || component;

    if (!wasInit) {
      return null;
    }

    return isAuth ? renderElement : <Redirect to="/login" />;
  }, [isAuth, wasInit, children, component]);

  return <Route {...rest} render={render} />;
};
