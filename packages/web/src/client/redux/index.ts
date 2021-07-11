import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { isServer } from "@utils/is-server";

import rootReducer from "./rootReducer";
import { rootSaga } from "./rootSaga";

const getInitialState = () => {
  let initialState = {};

  if (!isServer) {
    initialState = window.INITIAL_STATE || {};

    delete window.INITIAL_STATE;
  }

  return initialState;
};

export const configureStore = () => {
  const initialState = getInitialState();

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return { store };
};
