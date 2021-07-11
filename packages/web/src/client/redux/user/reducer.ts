import {
  TUserActions,
  UserState,
  FETCH_USER_R,
  FETCH_USER_S,
  FETCH_USER_F,
  SET_USER,
} from "./types";

const initialState: UserState = {
  pending: false,
  user: null,
  allThemes: [],
  userTheme: null,
  error: null,
};

export default (state = initialState, action: TUserActions): UserState => {
  switch (action.type) {
    case FETCH_USER_R:
      return {
        ...state,
        pending: true,
      };
    case FETCH_USER_S:
      return {
        ...state,
        pending: false,
        user: action.payload?.user,
        userTheme: action.payload?.userTheme || null,
        allThemes: action.payload?.allThemes,
        error: null,
      };
    case FETCH_USER_F:
      return {
        ...state,
        pending: false,
        user: null,
        error: action.payload.error,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
