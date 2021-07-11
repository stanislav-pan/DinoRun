import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import App from "@pages/App";
import { history } from "@client/history";

import { configureStore } from "./redux";
import "./tailwind.css";

const { store } = configureStore();

ReactDOM.hydrate(
  <StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
  document?.getElementById("app")
);
