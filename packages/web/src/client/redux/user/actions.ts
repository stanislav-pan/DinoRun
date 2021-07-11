import {
  UserRequest,
  UserSuccess,
  UserSuccessPayload,
  UserFailure,
  UserFailurePayload,
  FETCH_USER_R,
  FETCH_USER_F,
  FETCH_USER_S,
  SET_USER,
  SetUserPayload,
  SetUser,
} from "./types";

export const fetchUserR = (): UserRequest => ({
  type: FETCH_USER_R,
});

export const fetchUserS = (payload: UserSuccessPayload): UserSuccess => ({
  type: FETCH_USER_S,
  payload,
});

export const fetchUserF = (payload: UserFailurePayload): UserFailure => ({
  type: FETCH_USER_F,
  payload,
});

export const setUser = (payload: SetUserPayload): SetUser => ({
  type: SET_USER,
  payload,
});
