import { createSelector } from "reselect";
import { AppState } from "../rootReducer";

const selectSelf = (state: AppState) => state;

export const forumSelector = createSelector(selectSelf, (state) => state.forum);
