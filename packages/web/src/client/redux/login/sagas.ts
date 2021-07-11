import { all, call, put, takeLatest } from "redux-saga/effects";

import { ROUTES } from "@client/base-routes/routes";
import { fetchUserS } from "@redux/user/actions";
import { apiService } from "@api/api.service";
import { history } from "@client/history";

import { LoginSuccess, LoginFailure, LOGIN_REQUEST } from "./actions";

interface LoginRequestPayload {
  login: string;
  password: string;
}

const getUser = () => apiService.auth.fetchUser();
const signin = (data: LoginRequestPayload) => apiService.auth.signin(data);
const fetchUserTheme = () => apiService.dino.fetchUserTheme();
const fetchAllThemes = () => apiService.dino.fetchThemes();

const redirectTo = (location: string) => history.push(location);

function* authSaga(data: Record<string, any>) {
  try {
    const response = yield call(signin, data.payload);

    yield put(LoginSuccess(response.data));
    const responseUser = yield call(getUser);
    const userTheme = yield call(fetchUserTheme);
    const allTheme = yield call(fetchAllThemes);

    yield put(
      fetchUserS({
        user: responseUser.data,
        userTheme: userTheme.data,
        allThemes: allTheme.data,
      })
    );

    yield call(redirectTo, ROUTES.PROFILE);
  } catch (error) {
    yield put(
      LoginFailure({
        error: error.toString(),
      })
    );
  }
}

function* saga() {
  yield all([takeLatest(LOGIN_REQUEST, authSaga)]);
}

export default saga;
