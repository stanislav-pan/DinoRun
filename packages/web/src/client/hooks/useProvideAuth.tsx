import { useCallback, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { SignupRequest } from "@api/types";
import { apiService } from "@api/api.service";
import { userSelector } from "@redux/user/selectors";
import { fetchUserR, setUser } from "@redux/user/actions";
import { isServer } from "@utils/is-server";

export type UseProvideAuth = {
  isAuth: boolean;
  wasInit: boolean;

  signup: (data: SignupRequest) => Promise<void>;
  logout: () => void;
};

export const useProvideAuth = (): UseProvideAuth => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const itWasInit = useRef(isServer || !!user);

  const signup = useCallback(
    (data: SignupRequest) => {
      return apiService.auth
        .signup(data)
        .then(() => dispatch(fetchUserR()))
        .then(() => history.push("/profile"))
        .catch(() => {
          throw new Error("Ошибка регистрации");
        });
    },
    [history, dispatch]
  );

  const logout = useCallback((): void => {
    apiService.auth
      .logout()
      .then(() => dispatch(setUser({ user: null })))
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      return;
    }

    dispatch(fetchUserR());

    itWasInit.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return {
    isAuth: !!user,
    wasInit: itWasInit.current,

    signup,
    logout,
  };
};
