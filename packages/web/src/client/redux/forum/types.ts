import { ForumsType } from "@api/types/forum.types";
import { FORUM_FAILURE, FORUM_REQUEST, FORUM_SUCCESS } from "./actions";

export type SuccessPayload = ForumsType[];

export interface FailurePayload {
  error: string;
}

export type FRequest = {
  type: typeof FORUM_REQUEST;
};

export type FSuccess = {
  type: typeof FORUM_SUCCESS;
  payload: SuccessPayload;
};

export type FFailure = {
  type: typeof FORUM_FAILURE;
  payload: FailurePayload;
};

export type ForumActions = FRequest | FSuccess | FFailure;
