import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./actions";
import { Failure, Request, Success } from "./types";

interface LoginState {
  pending: boolean;
  userId: number | null;
  error: string | null;
}

const initialState: LoginState = {
  pending: false,
  userId: null,
  error: null,
};

type LoginActions = Request | Success | Failure;

export default (state = initialState, action: LoginActions): LoginState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        pending: false,
        userId: action.payload.id,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error || "Something went wrong!",
      };
    default:
      return state;
  }
};
