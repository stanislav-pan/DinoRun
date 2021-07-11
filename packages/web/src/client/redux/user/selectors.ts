import { createSelector } from "reselect";
import { AppState } from "../rootReducer";

export const selectSelf = (state: AppState): AppState => state;

export const errorSelector = createSelector(
  selectSelf,
  (state) => state.user.error
);

export const userAllSelector = createSelector(
  selectSelf,
  (state) => state.user
);

export const userSelector = createSelector(
  selectSelf,
  (state) => state.user.user
);

export const userThemeSelector = createSelector(
  selectSelf,
  (state) => state.user.userTheme
);

export const allThemeSelector = createSelector(
  selectSelf,
  (state) => state.user.allThemes
);
