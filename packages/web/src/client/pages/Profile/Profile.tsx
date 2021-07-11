import React, { FC, useCallback } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import cn from "classnames";

import { ROUTES } from "@client/base-routes/routes";
import { TEXTS } from "@core/translate";
import { useAuth } from "@hooks/useAuth";
import { useDinoTheme } from "@hooks/useTheme";
import { Header } from "@components/Header";

import { Settings } from "./ui/Settings/Settings";
import { ProfileHeader } from "./ui/ProfileHeader/ProfileHeader";
import { EditProfile } from "./ui/EditProfile/EditProfile";
import { ChangePassword } from "./ui/ChangePassword/ChangePassword";
import { SettingsListItem } from "./ui/Settings/types";
import styles from "./Profile.module.css";

export const Profile: FC = () => {
  const { userStyle } = useDinoTheme();
  const { path } = useRouteMatch();
  const history = useHistory();
  const { logout } = useAuth();

  const onSettingClick = useCallback(
    (item: SettingsListItem) => {
      history.push(`${path}/${item.path}`);
    },
    [history, path]
  );

  return (
    <div
      className={cn(
        "bg-cover p-4",
        history.location.pathname === "/profile/edit"
          ? "flex flex-col"
          : "h-screen",
        userStyle?.background
      )}
    >
      <Header />
      <div className={cn(styles.profile)}>
        <ProfileHeader />

        <Switch>
          <Route path={`${path}/`} exact>
            <div className="mb-7">
              <Settings onClick={onSettingClick} />
            </div>

            <div className="flex justify-center mb-7">
              <button className={styles.logoutBtn} onClick={logout}>
                {TEXTS.LOGOUT}
              </button>
            </div>
          </Route>
          <Route
            path={`${path}/:setting`}
            render={({ match: { params } }) => {
              if (!("setting" in params)) {
                return null;
              }

              const setting = params.setting;

              const settingComponent =
                setting === "edit" ? (
                  <EditProfile />
                ) : setting === "change-password" ? (
                  <ChangePassword />
                ) : (
                  <Redirect to={ROUTES.PROFILE} />
                );

              return (
                <>
                  <div className={styles.divider} />
                  <div className={styles.formWrapper}>{settingComponent}</div>
                </>
              );
            }}
          />
          <EditProfile />
        </Switch>
      </div>
    </div>
  );
};
