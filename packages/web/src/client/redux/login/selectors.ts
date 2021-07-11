import { createSelector } from "reselect";
import { AppState } from "../rootReducer";

const selectSelf = (state: AppState) => state;

export const errorSelector = createSelector(
  selectSelf,
  (state) => state.auth.error
);
