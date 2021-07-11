import { CommentOwner, CommentsType, TopicType } from "@api/types/forum.types";
import { TOPIC_REQUEST, TOPIC_SUCCESS, TOPIC_FAILURE } from "./actions";
import { TopicActions } from "./types";

interface TopicState {
  loading: boolean;
  data: {
    topic: TopicType | null;
    comments: CommentsType[];
    users: CommentOwner[];
  };
  error: string | null;
}

const initialState: TopicState = {
  loading: false,
  data: {
    topic: null,
    comments: [],
    users: [],
  },
  error: null,
};

export default (state = initialState, action: TopicActions): TopicState => {
  switch (action.type) {
    case TOPIC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TOPIC_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case TOPIC_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error || "Something went wrong!",
      };
    default:
      return state;
  }
};
