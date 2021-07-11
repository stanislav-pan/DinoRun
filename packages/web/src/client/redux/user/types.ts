import { IUser } from "@api/interfaces";
import { DinoThemeType } from "@hooks/useTheme";

export const FETCH_USER_R = "FETCH_USER_R";
export const FETCH_USER_S = "FETCH_USER_S";
export const FETCH_USER_F = "FETCH_USER_F";
export const SET_USER = "SET_USER";

export interface UserState {
  pending: boolean;
  user: IUser | null;
  allThemes?: DinoThemeType[];
  userTheme: DinoThemeType | null;
  error: string | null;
}

export interface UserSuccessPayload {
  user: IUser | null;
  userTheme?: DinoThemeType;
  allThemes?: DinoThemeType[];
}

export interface UserFailurePayload {
  error: string;
}

export interface SetUserPayload {
  user: IUser | null;
}

export type UserRequest = {
  type: typeof FETCH_USER_R;
};

export type UserSuccess = {
  type: typeof FETCH_USER_S;
  payload: UserSuccessPayload;
};

export type UserFailure = {
  type: typeof FETCH_USER_F;
  payload: UserFailurePayload;
};

export type SetUser = {
  type: typeof SET_USER;
  payload: SetUserPayload;
};

export type TUserActions = UserRequest | UserSuccess | UserFailure | SetUser;
