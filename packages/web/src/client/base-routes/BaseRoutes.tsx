import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";

import { PrivateRoute } from "@components/PrivateRoute";
import { ROUTES } from "./routes";

const HomePage = loadable(() => import("@pages/Home"));
const SignInPage = loadable(() => import("@pages/SignIn"));
const SignInUpPage = loadable(() => import("@pages/SignUp"));
const LeaderbordPage = loadable(() => import("@pages/Leaderbord"));
const ProfilePage = loadable(() => import("@pages/Profile"));
const ForumPage = loadable(() => import("@pages/Forum"));
const GamePage = loadable(() => import("@pages/Game"));
const ErrorServerPage = loadable(() => import("@pages/ErrorServer"));
const NotFoundPage = loadable(() => import("@pages/NotFound"));

export const BaseRoutes: FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.HOME} exact>
        <HomePage />
      </Route>
      <Route path={ROUTES.SIGN_IN}>
        <SignInPage />
      </Route>
      <Route path={ROUTES.SIGN_UP}>
        <SignInUpPage />
      </Route>
      <Route path={ROUTES.LEADERBOARD}>
        <LeaderbordPage />
      </Route>

      <PrivateRoute path={ROUTES.PROFILE}>
        <ProfilePage />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.FORUM}>
        <ForumPage />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.GAME}>
        <GamePage />
      </PrivateRoute>

      <Route path={ROUTES.ERROR}>
        <ErrorServerPage />
      </Route>

      <Route path={ROUTES.NOT_FOUND}>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
