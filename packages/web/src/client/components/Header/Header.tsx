import React, { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

import { LogoSvg } from "@icons/LogoSvg";
import { MenuSvg } from "@icons/MenuSvg";
import { Title } from "@components/Title";
import { Select } from "@components/Select";
import { Menu } from "@components/Menu";
import { userAllSelector } from "@redux/user/selectors";
import { useDinoTheme } from "@hooks/useTheme";

export const Header: FC = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { userStyle, changeTheme } = useDinoTheme();
  const { userTheme, allThemes } = useSelector(userAllSelector);

  const onChangeValue = useCallback(
    (e) => {
      const currentTheme = allThemes?.find(
        (item) => item.theme === e.target.value
      );
      if (currentTheme) {
        changeTheme({ ...currentTheme });
      }
    },
    [allThemes]
  );
  return (
    <>
      <div className={cn("flex items-center justify-between")}>
        <div
          className="hover:bg-blue-50 hover:bg-opacity-20 cursor-pointer rounded-md"
          onClick={() => setIsMenu(true)}
        >
          <MenuSvg />
        </div>
        <div className="flex justify-center items-center flex-1">
          <Title className={userStyle?.title}>
            DinoRun
            <LogoSvg />
          </Title>
        </div>
        <Select
          onChangeValue={onChangeValue}
          userTheme={userTheme?.theme || ""}
          themes={allThemes}
          buttonStyle={userStyle?.buttonStyle}
          color={userStyle?.color}
        />
      </div>
      {isMenu && <Menu setIsMenu={setIsMenu} />}
    </>
  );
};
