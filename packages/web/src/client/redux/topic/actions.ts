import {
  TopicFailurePayload,
  TSuccess,
  TRequest,
  TFailure,
  TopicSuccessPayload,
} from "./types";

export const TOPIC_REQUEST = "TOPIC_REQUEST";
export const TOPIC_SUCCESS = "TOPIC_SUCCESS";
export const TOPIC_FAILURE = "TOPIC_FAILURE";

export const TopicRequest = (payload: string): TRequest => ({
  type: TOPIC_REQUEST,
  payload,
});

export const TopicSuccess = (payload: TopicSuccessPayload): TSuccess => ({
  type: TOPIC_SUCCESS,
  payload,
});

export const TopicFailure = (payload: TopicFailurePayload): TFailure => ({
  type: TOPIC_FAILURE,
  payload,
});
