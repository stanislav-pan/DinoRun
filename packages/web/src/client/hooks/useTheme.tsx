import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userAllSelector } from "@redux/user/selectors";

import { apiService } from "@api/api.service";
import styles from "@components/Theme/Theme.module.css";
import { fetchUserS } from "@redux/user/actions";

export interface DinoThemeType {
  id: number;
  theme: string;
  description: string;
}

export interface DinoStylesType {
  buttonStyle: string;
  background: string;
  text: string;
  title: string;
  color: string;
  gameStyle: {
    textColor: string;
  };
}

export const useDinoTheme = () => {
  const data = useSelector(userAllSelector);
  const { user, userTheme, allThemes, error } = data;

  const dispatch = useDispatch();

  useEffect(() => {
    !!error &&
      dispatch(
        fetchUserS({
          ...data,
          userTheme: {
            id: 1,
            theme: "LIGHT",
            description: "LIGHT",
          },
        })
      );
  }, [error]);

  const changeTheme = (theme: DinoThemeType) => {
    try {
      const userTheme = allThemes?.find((item) => item.theme === theme.theme);
      if (user && userTheme) {
        apiService.dino.updateUserTheme(theme.id).then(() => {
          dispatch(
            fetchUserS({
              user,
              userTheme,
              allThemes,
            })
          );
        });
      }
    } catch {
      console.error(error);
    }
  };

  const getStyles = useCallback((): DinoStylesType | undefined => {
    switch (userTheme?.theme) {
      case "DARK":
        return {
          buttonStyle: styles.darkButton,
          background: styles.darkBackground,
          text: styles.darkText,
          title: styles.darkTitle,
          color: "#4c1d95",
          gameStyle: {
            textColor: "#fff",
          },
        };
      case "LIGHT":
        return {
          buttonStyle: styles.lightButton,
          background: styles.lightBackground,
          text: styles.lightText,
          title: styles.lightTitle,
          color: "#fff",
          gameStyle: {
            textColor: "#047857",
          },
        };
      default:
        break;
    }
  }, [userTheme]);

  const userStyle = useMemo(() => getStyles(), [getStyles]);

  return {
    changeTheme,
    userStyle,
  };
};
