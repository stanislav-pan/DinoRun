import { ForumsType } from "@api/types/forum.types";
import { FORUM_REQUEST, FORUM_SUCCESS, FORUM_FAILURE } from "./actions";
import { ForumActions } from "./types";

interface ForumState {
  loading: boolean;
  data: ForumsType[];
  error: string | null;
}

const initialState: ForumState = {
  loading: false,
  data: [],
  error: null,
};

export default (state = initialState, action: ForumActions): ForumState => {
  switch (action.type) {
    case FORUM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORUM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FORUM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error || "Something went wrong!",
      };
    default:
      return state;
  }
};
