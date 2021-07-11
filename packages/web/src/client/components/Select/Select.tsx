import React, { FC } from "react";
import cn from "classnames";

import { ArrowDownSvg } from "@icons/ArrowUpSvg";
import { DinoThemeType } from "@hooks/useTheme";

interface Props {
  onChangeValue: (e: any) => void;
  userTheme: string;
  themes?: DinoThemeType[];
  color?: string;
  buttonStyle?: string;
}

export const Select: FC<Props> = ({
  onChangeValue,
  userTheme,
  themes,
  color,
  buttonStyle,
}: Props) => {
  if (!themes || (themes && !themes.length)) return null;
  return (
    <div className="relative flex items-center">
      <select
        className={cn(
          "appearance-none pl-6 pr-12 py-2 rounded-full cursor-pointer",
          buttonStyle
        )}
        value={userTheme}
        onChange={onChangeValue}
      >
        {themes.map(({ id, theme }) => {
          return (
            <option key={id} value={theme}>
              {theme}
            </option>
          );
        })}
      </select>
      <ArrowDownSvg className="absolute right-3" color={color} />
    </div>
  );
};
