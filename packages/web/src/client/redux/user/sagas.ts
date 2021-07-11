import { all, call, put, takeLatest } from "redux-saga/effects";

import { history } from "@client/history";
import { apiService } from "@api/api.service";
import { ROUTES } from "@client/base-routes/routes";

import { fetchUserS, fetchUserF } from "./actions";
import { FETCH_USER_R } from "./types";

const getUser = () => apiService.auth.fetchUser();
const fetchUserTheme = () => apiService.dino.fetchUserTheme();
const fetchAllThemes = () => apiService.dino.fetchThemes();

const redirectTo = (location: string) => history.push(location);

function* fetchUserSaga() {
  try {
    const response = yield call(getUser);
    const userTheme = yield call(fetchUserTheme);
    const allTheme = yield call(fetchAllThemes);

    yield put(
      fetchUserS({
        user: response.data,
        userTheme: userTheme.data,
        allThemes: allTheme.data,
      })
    );

    yield call(() => {
      const path = location.pathname;

      if (!(path === ROUTES.SIGN_IN || path === ROUTES.SIGN_UP)) {
        return;
      }

      history.push(ROUTES.PROFILE);
    });
  } catch (error) {
    yield put(
      fetchUserF({
        error: error?.message,
      })
    );
    const path = location.pathname;
    const paths = [
      ROUTES.SIGN_IN,
      ROUTES.SIGN_UP,
      ROUTES.LEADERBOARD,
      ROUTES.PROFILE,
      ROUTES.FORUM,
      ROUTES.GAME,
      ROUTES.ERROR,
      ROUTES.NOT_FOUND,
    ];

    if (paths.some((item: string) => item === path)) {
      if (path === ROUTES.SIGN_UP) {
        yield call(redirectTo, ROUTES.SIGN_UP);
      } else {
        yield call(redirectTo, ROUTES.SIGN_IN);
      }
    }
  }
}

function* saga() {
  yield all([takeLatest(FETCH_USER_R, fetchUserSaga)]);
}

export default saga;
