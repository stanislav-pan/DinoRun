import { createBrowserHistory, createMemoryHistory } from "history";
import { isServer } from "./utils/is-server";

export const history = !isServer
  ? createBrowserHistory()
  : createMemoryHistory();
