import {
  Failure,
  FailurePayload,
  Request,
  RequestPayload,
  Success,
  SuccessPayload,
} from "./types";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LoginRequest = (payload: RequestPayload): Request => ({
  type: LOGIN_REQUEST,
  payload,
});

export const LoginSuccess = (payload: SuccessPayload): Success => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const LoginFailure = (payload: FailurePayload): Failure => ({
  type: LOGIN_FAILURE,
  payload,
});
