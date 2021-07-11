import { all, fork } from "redux-saga/effects";
import loginSaga from "./login/sagas";
import userSaga from "./user/sagas";
import forumSaga from "./forum/sagas";
import topicSaga from "./topic/sagas";

export function* rootSaga(): any {
  yield all([
    fork(loginSaga),
    fork(userSaga),
    fork(forumSaga),
    fork(topicSaga),
  ]);
}
