import React, { FC, useMemo } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

import { ButtonIcon } from "@components/ButtonIcon";
import { ArrowBackSvg } from "@icons/ArrowBackSvg";
import { userSelector } from "@redux/user/selectors";

import { SETTINGS } from "../Settings/const";
import { ProfileBriefInformation } from "../ProfileBriefInformation/ProfileBriefInformation";

import styles from "./ProfileHeader.module.css";

export const ProfileHeader: FC = () => {
  const { isExact } = useRouteMatch();
  const match = useRouteMatch<{ setting: string }>("/profile/:setting");
  const history = useHistory();

  const userData = useSelector(userSelector);
  const user = useMemo(() => userData, [userData]);

  let header = "Settings";
  let isEditPage = false;
  const isSettingsPage = isExact;

  if (match && "setting" in match.params) {
    const setting = match.params.setting;
    const currentSetting = SETTINGS.find(({ path }) => path === setting);

    isEditPage = setting === "edit";

    if (currentSetting) {
      header = currentSetting.title;
    }
  }

  const backButton = useMemo(() => {
    return isSettingsPage ? null : (
      <ButtonIcon
        onClick={() => history.push("/profile")}
        className={styles.backIcon}
      >
        <ArrowBackSvg />
      </ButtonIcon>
    );
  }, [history, isSettingsPage]);

  return (
    <>
      <div className={styles.profileHeader}>
        <div className="flex items-center">
          {backButton}

          <h2 className="text-lg font-medium">{header}</h2>
        </div>
      </div>
      <ProfileBriefInformation user={user} canEdit={isEditPage} />
    </>
  );
};
