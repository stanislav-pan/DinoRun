import React, { FC, useMemo } from "react";

import { Avatar } from "@components/Avatar";
import { BriefUserInformation } from "@components/BriefUserInformation";
import { useProfile } from "@hooks/useProfile";

import { Props } from "./types";

export const ProfileBriefInformation: FC<Props> = ({
  user,
  canEdit,
}: Props) => {
  const { changeProfile, changeAvatar } = useProfile();

  const avatarProps = useMemo(() => {
    return {
      ...(canEdit && { upload: changeAvatar }),
    };
  }, [canEdit, changeAvatar]);

  const briefUserInformationProps = useMemo(() => {
    return {
      ...(canEdit && {
        changeName: (name: string) => changeProfile({ displayName: name }),
      }),
    };
  }, [canEdit, changeProfile]);

  if (!user) {
    return null;
  }

  return (
    <div className="mt-9 mr-8 mb-5 ml-8">
      <BriefUserInformation
        name={user.displayName || ""}
        {...briefUserInformationProps}
      >
        <Avatar src={user.avatar} {...avatarProps} />
      </BriefUserInformation>
    </div>
  );
};
