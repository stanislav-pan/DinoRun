import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actions";

export interface RequestPayload {
  login: string;
  password: string;
}

export interface SuccessPayload {
  id: number;
}

export interface FailurePayload {
  error: string;
}

export type Request = {
  type: typeof LOGIN_REQUEST;
  payload: RequestPayload;
};

export type Success = {
  type: typeof LOGIN_SUCCESS;
  payload: SuccessPayload;
};

export type Failure = {
  type: typeof LOGIN_FAILURE;
  payload: FailurePayload;
};
