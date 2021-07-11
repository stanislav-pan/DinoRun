import { all, call, put, takeLatest } from "redux-saga/effects";
import orderBy from "lodash/orderBy";
import { apiService } from "@api/api.service";

import { TopicSuccess, TopicFailure, TOPIC_REQUEST } from "./actions";

const fetchTopic = (topicId: string) => apiService.dino.fetchTopic(topicId);
const fetchComment = (topicId: string) =>
  apiService.dino.fetchComments(topicId);

function* fetchTopicSaga(data: {
  payload: string;
  type: typeof TOPIC_REQUEST;
}) {
  try {
    const topic = yield call(fetchTopic, data.payload);
    const comment = yield call(fetchComment, data.payload);
    const sortedComment = orderBy(comment.data.data.comments, "createdAt");

    yield put(
      TopicSuccess({
        comments: sortedComment,
        users: comment.data.data.users,
        topic: topic.data,
      })
    );
  } catch (error) {
    yield put(
      TopicFailure({
        error: error.toString(),
      })
    );
  }
}

function* saga() {
  yield all([takeLatest(TOPIC_REQUEST, fetchTopicSaga)]);
}

export default saga;
