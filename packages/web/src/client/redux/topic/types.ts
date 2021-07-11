import { CommentOwner, CommentsType, TopicType } from "@api/types/forum.types";
import { TOPIC_FAILURE, TOPIC_REQUEST, TOPIC_SUCCESS } from "./actions";

export interface TopicSuccessPayload {
  topic: TopicType;
  comments: CommentsType[];
  users: CommentOwner[];
}

export interface TopicFailurePayload {
  error: string;
}

export type TRequest = {
  type: typeof TOPIC_REQUEST;
  payload: string;
};

export type TSuccess = {
  type: typeof TOPIC_SUCCESS;
  payload: TopicSuccessPayload;
};

export type TFailure = {
  type: typeof TOPIC_FAILURE;
  payload: TopicFailurePayload;
};

export type TopicActions = TRequest | TSuccess | TFailure;
