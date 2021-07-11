import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { apiService } from "@api/api.service";
import { ChangePasswordRequest, ChangeProfileRequest } from "@api/types";
import { userSelector } from "@redux/user/selectors";
import { setUser } from "@redux/user/actions";
import { IUser } from "@api/interfaces/user.interfaces";

export type UseProfile = {
  changeProfile: (changedUser: ChangeProfileRequest) => Promise<IUser>;
  changeAvatar: (file: File) => Promise<IUser>;
  changePassword: (data: ChangePasswordRequest) => Promise<unknown>;
};

export const useProfile = (): UseProfile => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const changeProfile = useCallback(
    (changedUser: ChangeProfileRequest) => {
      return apiService.users
        .changeProfile({
          ...user,
          ...changedUser,
        })
        .then(({ data: user }) => {
          dispatch(setUser({ user }));
          return user;
        });
    },
    [dispatch, user]
  );

  const changeAvatar = useCallback(
    (file: File) => {
      return apiService.users.changeAvatar(file).then(({ data: user }) => {
        dispatch(setUser({ user }));
        return user;
      });
    },
    [dispatch]
  );

  const changePassword = useCallback((data: ChangePasswordRequest) => {
    return apiService.users.changePassword(data);
  }, []);

  return {
    changeProfile,
    changeAvatar,
    changePassword,
  };
};
