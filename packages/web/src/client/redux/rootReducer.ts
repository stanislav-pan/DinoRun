import { combineReducers } from "redux";
import authReducer from "./login/reducer";
import userReducer from "./user/reducer";
import forumReducer from "./forum/reducer";
import topicResucer from "./topic/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  forum: forumReducer,
  topic: topicResucer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
