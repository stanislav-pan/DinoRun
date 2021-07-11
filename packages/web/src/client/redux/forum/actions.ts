import {
  FFailure,
  FailurePayload,
  FRequest,
  FSuccess,
  SuccessPayload,
} from "./types";

export const FORUM_REQUEST = "FORUM_REQUEST";
export const FORUM_SUCCESS = "FORUM_SUCCESS";
export const FORUM_FAILURE = "FORUM_FAILURE";

export const ForumRequest = (): FRequest => ({
  type: FORUM_REQUEST,
});

export const ForumSuccess = (payload: SuccessPayload): FSuccess => ({
  type: FORUM_SUCCESS,
  payload,
});

export const ForumFailure = (payload: FailurePayload): FFailure => ({
  type: FORUM_FAILURE,
  payload,
});
