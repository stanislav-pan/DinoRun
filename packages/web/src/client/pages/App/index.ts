import { hot } from "react-hot-loader/root";
import { App } from "./App";

export default USE_HMR ? hot(App) : App;
