import { all, call, put, takeLatest } from "redux-saga/effects";
import { apiService } from "@api/api.service";

import { ForumSuccess, ForumFailure, FORUM_REQUEST } from "./actions";

const fetchForumTopics = () => apiService.dino.fetchTopics();

function* fetchForumSaga() {
  try {
    const response = yield call(fetchForumTopics);
    yield put(ForumSuccess(response.data));
  } catch (error) {
    yield put(
      ForumFailure({
        error: error.toString(),
      })
    );
  }
}

function* saga() {
  yield all([takeLatest(FORUM_REQUEST, fetchForumSaga)]);
}

export default saga;
